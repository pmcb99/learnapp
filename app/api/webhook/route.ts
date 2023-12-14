import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }
    if (session.mode === "subscription") {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      await prismadb.userSubscription.create({
        data: {
          userId: session?.metadata?.userId,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        },
      });
    }
  } else if (session.mode === "payment") {
    // Handle one-time payment logic

    //July 15th of this year + 1 year
    var july15thNextYear = new Date();
    july15thNextYear.setMonth(7);
    july15thNextYear.setDate(15);
    july15thNextYear.setFullYear(july15thNextYear.getFullYear() + 1);


    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    if (!session.amount_total) {
      return new NextResponse("Amount is required", { status: 400 });
    }

    // Create a new userPayment record
    await prismadb.userPayment.create({
      data: {
        userId: session?.metadata?.userId,
        stripeCustomerId: session.customer as string,
        amount: session.amount_total,
        accessEndDate: july15thNextYear,
      },
    });

    // Create a new userSubscription record which will be used to track the user's subscription status for features
    await prismadb.userSubscription.create({
      data: {
        userId: session?.metadata?.userId,
        stripeCustomerId: session.customer as string,
        stripePriceId: session.id,
        stripeCurrentPeriodEnd: july15thNextYear,
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await prismadb.userSubscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}
