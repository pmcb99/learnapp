"use client";

import axios from "axios";
import { useState } from "react";
import { Check, Zap } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PricingComponent } from "./pricing-component";
import { Pricing } from "aws-sdk";
import { ScrollArea } from "./ui/scroll-area";

interface ProModalProps {
  userPlan: string;
}

export const ProModal = (
  props: ProModalProps
) => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="">
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
          <DialogContent className="flex flex-col min-w-full min-h-screen max-h-screen overflow-auto md:overflow-hidden">
            <div className="flex flex-col justify-between h-screen">
              <DialogTitle className="flex items-center justify-center py-3">
                Upgrade to Rewise{" "}
                <span className="ml-1">
                  {<Badge variant="premium">PRO</Badge>}
                </span>
              </DialogTitle>
              <DialogDescription className="flex flex-grow items-center justify-center">
                {/* <ScrollArea className="w-full h-full overflow-y-auto rounded-md border"> */}
                <PricingComponent userPlan={props.userPlan}/>
                {/* </ScrollArea> */}
              </DialogDescription>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
