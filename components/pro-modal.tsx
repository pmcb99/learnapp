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

export const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  //   return (
  //     <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
  //       <DialogContent>
  //         <DialogHeader>
  //           <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
  //             <div className="flex items-center gap-x-2 font-bold text-xl">
  //               Upgrade to Rewise
  //               <Badge variant="premium" className="uppercase text-sm py-1">
  //                 pro
  //               </Badge>
  //             </div>
  //           </DialogTitle>
  //           <div className="flex space-x-4">
  //           <Card>
  //           <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
  //             <ul>
  //             {proFeatures.map((tool) => (
  //               <li key={tool.href} className="p-3 border-0 border-white border-collapse flex items-center justify-between">
  //                 <div className="flex items-center gap-x-3">
  //                   <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
  //                     <tool.icon className={cn("w-6 h-6", tool.color)} />
  //                   </div>
  //                   <div className="font-semibold text-sm">
  //                     {tool.label}
  //                   </div>
  //                 </div>
  //                 {tool.badge && (<div>
  //                   <Badge variant="outline" className="uppercase text-xs py-1">
  //                     {tool.badge}
  //                   </Badge>
  //                 </div>)}
  //                 <Check className="text-primary w-5 h-5" />
  //               </li>
  //             ))
  //             }
  //             </ul>
  //           </DialogDescription>
  //           <Button disabled={loading} onClick={onSubscribe} size="lg" variant="premium" className="w-full border border-black">
  //             Upgrade
  //             <Zap className="w-4 h-4 ml-2 fill-white" />
  //           </Button>
  //           </Card>
  //           <Card>
  //           <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
  //             {proFeatures.map((tool) => (
  //               <Card key={tool.href} className="p-3 border-black/5 flex items-center justify-between">
  //                 <div className="flex items-center gap-x-3">
  //                   <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
  //                     <tool.icon className={cn("w-6 h-6", tool.color)} />
  //                   </div>
  //                   <div className="font-semibold text-sm">
  //                     {tool.label}
  //                   </div>
  //                 </div>
  //                 {tool.badge && (<div>
  //                   <Badge variant="outline" className="uppercase text-xs py-1">
  //                     {tool.badge}
  //                   </Badge>
  //                 </div>)}
  //                 <Check className="text-primary w-5 h-5" />
  //               </Card>
  //             ))}
  //           </DialogDescription>
  //           <Button disabled={loading} onClick={onSubscribe} size="lg" variant="premium" className="w-full border border-black">
  //             Upgrade
  //             <Zap className="w-4 h-4 ml-2 fill-white" />
  //           </Button>
  //           </Card>
  //           </div>
  //         </DialogHeader>
  //         <DialogFooter>
  //           <Button disabled={loading} onClick={onSubscribe} size="lg" variant="premium" className="w-full border border-black">
  //             Upgrade
  //             <Zap className="w-4 h-4 ml-2 fill-white" />
  //           </Button>
  //         </DialogFooter>
  //       </DialogContent>
  //     </Dialog>
  //   );
  // };

  return (
    <>
      <div className="">
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
          <DialogContent className="flex flex-col min-w-full max-h-screen">
            <DialogTitle className="flex items-center justify-center">
              Upgrade to Rewise {<Badge variant="premium">PRO</Badge>}
            </DialogTitle>
            <DialogDescription className="flex items-center justify-center w-full">
              <PricingComponent />
            </DialogDescription>

          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
