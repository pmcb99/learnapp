"use client";

import { useEffect, useState } from "react";

import { ProModal } from "@/components/pro-modal";
import { TopicModal } from "./topic-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ProModal />
      {/* <TopicModal /> */}
    </>
  );
};
