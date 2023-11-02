"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("9ca33738-9268-49e1-bd3e-fd95a0fd8da8");
  }, []);

  return null;
};
