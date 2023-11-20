"use client";

import * as z from "zod";
import axios from "axios";
import { ArrowRight, MessageSquare, SeparatorVertical } from "lucide-react";
import { useForm } from "react-hook-form";
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
import { getSubjectFromHref } from "@/constants";

const SubjectPage = (params: {
  params: { subject: string; examType: string; level: string };
}) => {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<any[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: any = {
        role: "user",
        content: values.prompt,
      };
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
        toast.error("Chat for this subject is coming in the next few weeks!");
      }
    } finally {
      router.refresh();
    }
  };
  const questionExample =
    getSubjectFromHref(`/${params.params.subject}`)?.questionExample ||
    "Ask a question";
  return (
    <div className="">
      <div className="flex items-center pt-8 ">
        <Button className="bg-primary mb-7" onClick={() => router.back()}>
          Back
        </Button>
        <Heading
          title={params.params.subject.toUpperCase()}
          description=""
          icon={MessageSquare}
          iconColor="text-violet-500"
          subject={params.params.subject}
        />
        <div className="w-full">
          <Button
            className="bg-primary mx-2 mb-8 w-[170px]"
            onClick={() =>
              router.push(
                `/${params.params.examType}/${params.params.level}/${params.params.subject}/definitions`
              )
            }
          >
            Definitions
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button
            className="bg-primary mx-2 mb-8 w-[170px]"
            onClick={() =>
              router.push(
                `/${params.params.examType}/${params.params.level}/multi-year/${params.params.subject}/`
              )
            }
          >
            Past Papers
            <ArrowRight className="w-5 h-5" />
          </Button>
          {/* <Button className="bg-primary mx-2 mb-8 w-[170px]" onClick={() => router.push(`/${params.params.examType}/${params.params.level}/${params.params.subject}/quiz`)}>
          Quiz
          <ArrowRight className="w-5 h-5" />
        </Button> */}
        </div>
      </div>

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder={questionExample}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Ask
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty
              label="No conversation started."
              subject={params.params.subject}
            />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "p-8 w-full flex gap-x-8 rounded-lg items-center",
                  message.role === "user"
                    ? "bg-slate-800 text-white border border-black/10 dark:bg-slate-900"
                    : "bg-muted dark:text-white"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
