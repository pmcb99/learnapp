"use client";

import axios from "axios";
import { useState } from "react";
import { Zap } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";

interface SubscriptionButtonProps {
  isPro: boolean;
  userPlan: string;
}

export const SubscriptionButton = (
  props: SubscriptionButtonProps
) => {
  const [loading, setLoading] = useState(false);
  const proModal = useProModal();



  const onClick = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/stripe-monthly");

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-start gap-x-4">
    {props.isPro && <Button variant={"default"} disabled={loading} onClick={onClick} >
      {"Manage Subscription"}
    </Button>}
    {!props.isPro && <Button variant={"premium"} disabled={loading} onClick={proModal.onOpen} >
      {"Upgrade"}
    {<Zap className="w-4 h-4 ml-2 fill-white" />}
  </Button>}
    {props.userPlan == "MONTHLY" && <Button className="text-white" variant={"premium"} disabled={loading} onClick={proModal.onOpen} >
      Change to Annual Plan
      </Button>}
  </div>
  )
};
