"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/sidebar";

export const MobileSidebar = ({
  apiLimitCount = 0,
  isPro = false,
  userHasAccessCode
}: {
  apiLimitCount: number;
  isPro: boolean;
  userHasAccessCode: boolean;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <SheetTrigger className="">
        <div className="flex items-center justify-center pr-3 hover:bg-slate-300 hover:bg-opacity-30 rounded-md">
        <Button onClick={()=>setIsOpen(!isOpen)} variant="ghost" size="icon" className="gap-x-2 hover:bg-transparent">
          <Menu />
        </Button>
        Menu
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-full">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} setIsOpen={setIsOpen} userHasAccessCode={userHasAccessCode}/>
      </SheetContent>
    </Sheet>
  );
};

