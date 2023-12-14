import { Settings } from "lucide-react";

import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkWhatPlanUserIsOn, checkSubscription } from "@/lib/subscription";
import Image from "next/image";
import AccessCodeForm from "@/components/access-form";

const SettingsPage = async () => {
  const isPro = await checkSubscription();
  const userPlan = await checkWhatPlanUserIsOn();

  if (userPlan == false) {
    return null;
  } 


  return (
    <div className="flex flex-col">
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
              ? "You are currently on the Pro plan."
              : "You are currently on a free plan."}
          </div>
          <SubscriptionButton isPro={isPro} userPlan={userPlan} />
          {!isPro && <AccessCodeForm />}
        </div>
      </div>
      <div className="flex flex-col justify-end">
        {/* <div className="flex flex-auto text-4xl bg-gray-700/10">
          🧑‍🎄
        </div> */}
        {/* <Image
          src="/beta-lab.png"
          className="rounded-full"
          width={300}
          height={100}
          objectFit="cover"
          alt=":)"
        /> */}
      <footer className="text-right text-foreground text-xs fixed bottom-0 right-0 mr-2">Send us a message</footer>
</div>
    </div>
  );
};

export default SettingsPage;
