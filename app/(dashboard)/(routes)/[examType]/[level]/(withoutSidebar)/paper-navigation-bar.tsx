"use client";
import { Button } from "@/components/ui/button";
import { useChatComponentStore } from "@/hooks/chat-window-store";
import { Book, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function PaperNavigationBar() {
  const router = useRouter();

  // get current client side url
  const currentUrl = window.location.href;

  const chatHook = useChatComponentStore((state) => ({
    chatShown: state.chatShown,
    setChatShown: state.setChatShown,
  }));

  console.log(chatHook.chatShown);

  return (
    <div className=" flex px-5 items-center justify-center gap-x-5">
      <Button
        className="w-auto h-auto"
        variant={"hollow"}
        onClick={() => chatHook.setChatShown(!chatHook.chatShown)}
      >
        {!chatHook.chatShown && (
          <div className="flex gap-x-3">
            <MessageCircle className="" size={20} />
            <h3>Open Rewise Chat</h3>
          </div>
        )}
        {chatHook.chatShown && (
          <div className="flex gap-x-3">
            <Image className="animate-spin duration-1000" src="/logoR-circle.png" width={20} height={20} alt=""/>
            <h3 className="">Chatting..</h3>
          </div>
        )}
      </Button>
      {/* {currentUrl.includes("higher") && <Button className="w-auto h-auto" variant="hollow" onClick={() => router.push(currentUrl.replaceAll("higher","ordinary")) }>Switch To Ordinary</Button>}
    {currentUrl.includes("ordinary") && <Button className="w-auto h-auto" variant="hollow" onClick={() => router.push(currentUrl.replaceAll("ordinary","higher")) }>Switch To Higher</Button>} */}
    </div>
  );
}

export default PaperNavigationBar;
