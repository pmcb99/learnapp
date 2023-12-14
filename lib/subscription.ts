import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  // check if user model has checkoutCode
  const user = await prismadb.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      checkoutCode: true,
    },
  });

  if (user?.checkoutCode) {
    return true;
  }

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  })

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  return !!isValid;
};

export const checkIfUserHasAccessCode = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const user = await prismadb.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      checkoutCode: true,
    },
  });

  if (user?.checkoutCode) {
    return true;
  }

  return false;
}

export const checkWhatPlanUserIsOn = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId: userId,
    },
  })

  if (!userSubscription) {
    return "FREE";
  }

  const TWO_MONTHS_IN_MS = 2*2628002880

  // check if userSub currentPeriodEnd is further than one month from now
  const isMonthly =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! < Date.now() + TWO_MONTHS_IN_MS
    && userSubscription.stripeCurrentPeriodEnd?.getTime()! > Date.now()

    if (isMonthly) {
      return "MONTHLY"
    }

  const isYearly =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! > Date.now() + TWO_MONTHS_IN_MS
    && userSubscription.stripeCurrentPeriodEnd?.getTime()! > Date.now()

    if (isYearly) {
      return "YEARLY"
    }

  return "FREE";
}