"use client";

import * as z from "zod";
import axios from "axios";
import { set, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "@/app/constants";
import { JC_BUCKET_NAME, LC_BUCKET_NAME } from "@/app/constants";
import PDFViewer from "@/components/pdf-viewer";
import PaperQuestionsByTopicPage from "@/components/paper-questions-by-topic-page";
import { PresignedUrl } from "@/types/global";
import { useExamDocumentStore } from "@/hooks/pdf-viewer-page-store";


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

  const [currentYearsPresignedUrls, setCurrentYearsPresignedUrls] = useState<PresignedUrl[]>([]);

  const {
    examPaperPage,
    setExamPaperPage,
    markingSchemePage,
    setMarkingSchemePage,
    samplePaperPage,
    setSamplePaperPage,
    projectPaperPage,
    setProjectPaperPage,
    currentPresignedUrl,
    setCurrentPresignedUrl,
    year,
    setYear
  } = useExamDocumentStore((state) => ({
    examPaperPage: state.examPaperPage,
    setExamPaperPage: state.setExamPaperPage,
    markingSchemePage: state.markingSchemePage,
    setMarkingSchemePage: state.setMarkingSchemePage,
    samplePaperPage: state.samplePaperPage,
    setSamplePaperPage: state.setSamplePaperPage,
    projectPaperPage: state.projectPaperPage,
    setProjectPaperPage: state.setProjectPaperPage,
    currentPresignedUrl: state.currentPresignedUrl,
    setCurrentPresignedUrl: state.setCurrentPresignedUrl,
    year: state.year,
    setYear: state.setYear
  }));


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


  const setAllPresignedUrlsForSubject = async () => {
    try {
      const response = await axios.get(
        `/api/documents/presigned-urls?Bucket=${LC_BUCKET_NAME}&Prefix=${params.params.level}_${params.params.subject}`
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

  function filterPresignedUrlsByYear() {
    return presignedUrls.filter((presignedUrl) => {
      return presignedUrl.key.includes(year.toString());
    });
  }

  useEffect(() => {
    setAllPresignedUrlsForSubject();
  }, []);

  useEffect(() => {
    setCurrentYearsPresignedUrls(filterPresignedUrlsByYear());
    setCurrentPresignedUrl(filterPresignedUrlsByYear()[0]);
  }, [year, presignedUrls]);


  console.log("currentYearsPresignedUrls", currentYearsPresignedUrls);
  console.log("year", year);
  console.log("presignedUrls", presignedUrls)

  // const requestedPresignedUrl = presignedUrls.find((presignedUrl) => presignedUrl.key.includes()
  // if (!requestedPresignedUrl) {
  //   console.log("Something fucked up")
  //   console.log("presignedUrls:", presignedUrls);
  //   toast.error(".");
  //   return;
  // }
  // setCurrentPresignedUrl(requestedPresignedUrl);


  return (
    <div className="flex">

      <div className="h-full w-full">
        <PaperQuestionsByTopicPage params={params.params} presignedUrls={currentYearsPresignedUrls}/>
      </div>
      <div className="h-full w-full">
        {currentYearsPresignedUrls && <PDFViewer
          presignedUrls={currentYearsPresignedUrls}
          bucket={bucket}
          paperName={params.params.paper}
          year={year}
          documentId={params.params.paper}
          viewId=""
          linkId=""
        />}
      </div>
    </div>
  );
};

export default ConversationPage;
