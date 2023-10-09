"use client";

import * as z from "zod";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";

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

import { formSchema } from "../../../../../constants";
import { JC_BUCKET_NAME, LC_BUCKET_NAME } from "@/app/(dashboard)/(routes)/constants";
import PDFViewer, { PresignedUrl } from "@/components/pdf-viewer";
import PaperQuestionsByTopicPage from "@/components/paper-questions-by-topic-page";

const ConversationPage = (
  params: { params: { 
    examType: string,
    level: string,
    subject: string,
    year: string,
    paper: string}}
) => {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [presignedUrls, setPresignedUrls] = useState<PresignedUrl[]>([]);

  const bucket = params.params.examType === "lc" ? LC_BUCKET_NAME : JC_BUCKET_NAME

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = { role: "user", content: values.prompt };
      const newMessages = [...messages, userMessage];

      const params = { Bucket: LC_BUCKET_NAME, Prefix: "higher-biology-2017-"};
      
      const response = await axios.get("/api/documents/presigned-urls/", { params });
      console.log(response.data.presignedUrls);
      // const response = await axios.post('/api/documents/presigned-urls/', { Bucket: LC_BUCKET_NAME, Prefix: "higher/biology/2017/"});
      setPresignedUrls(()=>response.data.presignedUrls);
      // const response = await axios.post('/api/conversation', { messages: newMessages , bookInstance: params.params.bookInstance});
      setMessages((current) => [...current, userMessage, response.data]);
      
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  }

  return ( 
    <div>
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
                        placeholder="What inconsistencies did you find?" 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
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
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div 
                key={message.content} 
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user" ? "bg-white border border-black/10" : "bg-muted",
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm whitespace-pre-line">
                  {message.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between h-full w-full">
      <div className="h-full w-full">
        <PaperQuestionsByTopicPage params={params.params} />
      </div>
      <div className="h-full w-full">
        <PDFViewer
          presignedUrls={presignedUrls}
          bucket={bucket}
          paperName={params.params.paper}
          year={params.params.year}
          documentId={params.params.paper}
          viewId=""
          linkId=""
        />
      </div>
    </div>
    </div>
   );
}
 
export default ConversationPage;

