import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

async function getAllUniqueTopics() {
  const uniqueTopics = await prismadb.definition.findMany({
    select: {
      topic: true,
    },
    distinct: ["topic"]
  });

  return uniqueTopics.map(entry => entry.topic);
}

async function getDefinitionsByTopic(topicName: string) {
  const definitions = await prismadb.definition.findMany({
    where: {
      topic: topicName,
    }
  });
  return definitions;
}


export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const definitions = await getDefinitionsByTopic(topicName);
    
      return new NextResponse(JSON.stringify({ url: stripeSession.url }))
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Rewize Pro",
              description: "Unlimited answers to your questions"
            },
            unit_amount: 1000,
            recurring: {
              interval: "month"
            }
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    })

    return new NextResponse(JSON.stringify({ url: stripeSession.url }))
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
