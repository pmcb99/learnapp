"use client";

import * as z from "zod";
import axios from "axios";
import {
  AlertCircle,
  ArrowRight,
  ArrowUp,
  MessageSquare,
  SeparatorVertical,
} from "lucide-react";


import { UseFormReturn, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "@/app/constants";
import { getSubjectFromHref, subjectsWithDefinitions } from "@/constants";
import React from "react";
import QuestionExamples from "@/app/(dashboard)/(routes)/[examType]/[level]/(withSidebar)/chat/question-examples";
import { removeWarningFromString } from "@/app/(dashboard)/(routes)/[examType]/[level]/(withSidebar)/chat/[subject]/functions";
import { X } from "lucide-react";
import { useChatComponentStore } from "@/hooks/chat-window-store";




export const ChatPage = (params: {
  params: { subject: string; examType: string; level: string };
}) => {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<any[]>([]);

  const subjectObject = getSubjectFromHref(
    `/${params.params.examType}/${params.params.subject}`
  );

  const [questionExamplesVisible, setQuestionExamplesVisible] =
    useState<boolean>(true);

  const askButtonRef = React.useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  //check if subjectWithDefinitions contains 'lc_biology'
  const showDefinitions = subjectsWithDefinitions.includes(
    `${params.params.examType}_${params.params.subject}`
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setQuestionExamplesVisible(false);

    try {
      const userMessage: any = {
        role: "user",
        content: values.prompt,
      };

      // // validate if values are of type formSchema
      // try {
      //   formSchema.parse(values);
      // } catch (error) {
      //   toast.error("Please enter a valid question.");
      //   return;
      // }

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/chat", {
        messages: newMessages,
        subject: params.params.subject,
      });

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      router.refresh();
    }
  };

  const chatComponentStore = useChatComponentStore((state) => ({
    chatShown: state.chatShown,
    setChatShown: state.setChatShown,
  }));

  function askQuestionOnClick(question: string) {
    form.setValue("prompt", question);
    askButtonRef.current?.click();
  }

  return (

      <div className="">
        <div className="flex justify-end items-end">
        <Button variant={"hollow"} className="" onClick={() => chatComponentStore.setChatShown(!chatComponentStore.chatShown)}>
          <div className="flex gap-x-2 items-center">
            <X className="w-5 h-5" />
            <h3>Close Chat</h3>
          </div>
        </Button>
        </div>

        <div className="flex gap-y-5 pt-5 items-center justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                rounded-lg 
                border 
                px-3 
                bg-primary
                md:px-6 
                focus-within:shadow-sm
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0 text-center text-primary">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent bg-primary text-secondary"
                        disabled={isLoading}
                        placeholder={"Enter your question..."}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="w-full "
                type="submit"
                disabled={isLoading}
                size="icon"
                ref={askButtonRef}
                variant={"hollow"}
              >
                Ask
              </Button>
            </form>
          </Form>
        </div>

      <div className="px-3">
        {questionExamplesVisible && subjectObject?.questionExamples && (
          <QuestionExamples
            questions={subjectObject.questionExamples}
            askQuestionOnClick={askQuestionOnClick}
            variant="hollow"
          />
        )}
</div>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          <div className="flex flex-col items-center justify-center">
          {/* {messages.length === 0 && !isLoading && (
            <Empty
              label="No conversation started."
              subject={params.params.subject}
              height={150}
              width={150}
            />
          )} */}
</div>
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "p-8 flex gap-x-8 rounded-lg items-center",
                  message.role === "user"
                    ? "bg-slate-800 text-white border border-black/10 dark:bg-slate-900"
                    : "bg-muted dark:text-white"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm whitespace-pre-line">{removeWarningFromString(message.content)}</p>
                
                {/* {isWarningInString(message.content) && (<HoverCard>
                  <HoverCardTrigger><AlertCircle className="w-5 h-5 flex flex-shrink-0" /></HoverCardTrigger>
                  <HoverCardContent>
                    This may only be a partial answer so you should check the full answer in the marking scheme and your notes.
                  </HoverCardContent>
                </HoverCard>)} */}
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default ChatPage;
