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
import PDFViewer from "@/components/pdf-viewer";
import PaperQuestionsByTopicPage from "@/components/paper-questions-by-topic-page";
import { PresignedUrl } from "@/types/global";
import PaperQuestionsByTopicPageYear from "@/components/paper-questions-by-topic-page-year";
import { useExamDocumentStore } from "@/hooks/pdf-viewer-page-store";



const PaperViewPage = (params: {
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

  const {
    currentPresignedUrl,
    setCurrentPresignedUrl,
    year,
    setYear,
  } = useExamDocumentStore((state) => ({
    currentPresignedUrl: state.currentPresignedUrl,
    setCurrentPresignedUrl: state.setCurrentPresignedUrl,
    year: state.year,
    setYear: state.setYear,
  }));

  // useEffect(() => {
  //   setYear(Number(params.params.year!));
  //   console.log("params", params.params.year)
  //   console.log("year", year)
  //   fetchPresignedUrls();
  // }, [params.params.year]);



  useEffect(() => {
    // Save scroll position
    setScrollPosition(window.scrollY);
  }, [pageNumber]); // assuming pageNumber change triggers the re-render

  useEffect(() => {
    // Restore scroll position
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  const bucket = params.params.examType === "lc" ? LC_BUCKET_NAME : JC_BUCKET_NAME;

  const fetchPresignedUrls = async () => {
    try {
      const response = await axios.get(
        `/api/documents/presigned-urls?Bucket=${LC_BUCKET_NAME}&Prefix=${params.params.level}_${params.params.subject}_${params.params.year}_`
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

  const setCurrentExamPaper = () => {
    if (!presignedUrls) {
      return 
    }
    else if (presignedUrls && !currentPresignedUrl) {
      setCurrentPresignedUrl(presignedUrls[0])
    } else {
    const examPaper = presignedUrls.find(
      (presignedUrl) =>
        presignedUrl.key.includes(year.toString()) &&
        presignedUrl.key.includes("exam-paper")
    );
    examPaper ? setCurrentPresignedUrl(examPaper!) : console.log("no exam paper");
    }
  }

  useEffect(() => {
    setYear(Number(params.params.year))
    fetchPresignedUrls();
  }, []);

  useEffect(() => {
    if (presignedUrls.length > 0) {
      setCurrentExamPaper();
    }
    console.log("presignedUrls", presignedUrls)
  }, [presignedUrls]);

  return (
    <div className="flex w-full gap-x-4">

      <div className="hidden h-full md:flex md:w-72 md:flex-col md:inset-y-0 z-80">
        <PaperQuestionsByTopicPage params={params.params} presignedUrls={presignedUrls}/>
      </div>
      <div className="h-full w-full">
        <PDFViewer
          presignedUrls={presignedUrls}
          bucket={bucket}
          paperName={params.params.paper}
          year={Number(params.params.year)}
          documentId={params.params.paper}
          viewId=""
          linkId=""
          params={params.params}
          topicComponent={PaperQuestionsByTopicPage}
          topicComponentProps={{ params: params.params, presignedUrls: presignedUrls }}
        />
        <div>
        </div>
      </div>
    </div>
  );
};

export default PaperViewPage;
