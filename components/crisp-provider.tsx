"use client";

import { CrispChat } from "@/components/crisp-chat";
import { useUser } from "@clerk/nextjs";

export const CrispProvider = () => {
  // ensure user is logged in
  const { user } = useUser();
  if (!user) return null;
  return (<CrispChat />)
};
