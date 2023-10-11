"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "@/app/constants";
import { JC_BUCKET_NAME, LC_BUCKET_NAME } from "@/app/constants";
import PDFViewer, { PresignedUrl } from "@/components/pdf-viewer";
import PaperQuestionsByTopicPage from "@/components/paper-questions-by-topic-page";



const ConversationPage = (params: {
  params: {
    examType: string;
    level: string;
    subject: string;
    year: string;
    paper: string;
  };
}) => {
  const proModal = useProModal();
  const [presignedUrls, setPresignedUrls] = useState<PresignedUrl[]>([]);

  const [scrollPosition, setScrollPosition] = useState(0);

  const [pageNumber, setPageNumber] = useState<number>(1);

  const [year, setYear] = useState<number>(2023);

  useEffect(() => {
    // Save scroll position
    setScrollPosition(window.scrollY);
  }, [pageNumber]); // assuming pageNumber change triggers the re-render

  useEffect(() => {
    // Restore scroll position
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  const bucket =
    params.params.examType === "lc" ? LC_BUCKET_NAME : JC_BUCKET_NAME;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async () => {
    try {
      const response = await axios.get(
        `/api/documents/presigned-urls?Bucket=${LC_BUCKET_NAME}&Prefix=${params.params.level}-${params.params.subject}-${year}-`
      );
      setPresignedUrls(response.data.presignedUrls);
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  useEffect(() => {
    onSubmit();
  }, [year]);

  return (
    <div className="flex">

      <div className="h-full w-full">
        <PaperQuestionsByTopicPage params={params.params} updateYear={setYear} />
      </div>
      <div className="h-full w-full">
        <PDFViewer
          presignedUrls={presignedUrls}
          bucket={bucket}
          paperName={params.params.paper}
          year={year}
          documentId={params.params.paper}
          viewId=""
          linkId=""
        />
      </div>
    </div>
  );
};

export default ConversationPage;
