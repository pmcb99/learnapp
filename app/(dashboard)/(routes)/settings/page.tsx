import { Settings } from "lucide-react";

import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import Image from "next/image";

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="flex ">
      <div className="">
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
        <div className="flex justify-end items-end h-full">Got a question? Send us a message</div>
      </div>
      <div className="flex pt-6">
        <Image
          src="/beta-lab.png"
          className="rounded-full"
          width={300}
          height={100}
          objectFit="cover"
          alt=":)"
        />
      </div>
    </div>
  );
};

export default SettingsPage;
