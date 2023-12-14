"use client";

import { useEffect, useState } from "react";

import { ProModal } from "@/components/pro-modal";
import { TopicModal } from "./topic-modal";
import { checkWhatPlanUserIsOn } from "@/lib/subscription";

interface ModalProviderProps {
  userPlan: string | false;
}

export const ModalProvider = (
  props: ModalProviderProps
) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!props.userPlan) {
    return null;
  }


  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ProModal userPlan={props.userPlan}/>
      {/* <TopicModal /> */}
    </>
  );
};
