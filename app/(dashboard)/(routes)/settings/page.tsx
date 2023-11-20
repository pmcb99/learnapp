import { Settings } from "lucide-react";

import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import Image from "next/image";

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="">
      <div className="h-full">
        <Heading
          title="Settings"
          description="Manage account settings."
          subject='settings'
          icon={Settings}
          iconColor="text-gray-700"
          bgColor="bg-gray-700/10"
        />
        <div className="px-4 lg:px-8 space-y-4">
          <div className="text-muted-foreground text-sm">
            {isPro
              ? "You are currently on a Pro plan (beta)."
              : "You are currently on a free plan. Join the beta to get access to all features."}
          </div>
          <SubscriptionButton isPro={isPro} />
        </div>
      </div>
      <div className="flex pt-6 items-center justify-center">
        <Image
          src="/beta-lab.png"
          className="rounded-full"
          width={300}
          height={100}
          objectFit="cover"
          alt=":)"
        />
      </div>
      <footer className="mr-4 mt-7 text-right text-foreground text-xs">Send us a message</footer>
    </div>
  );
};

export default SettingsPage;
