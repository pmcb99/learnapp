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
import { useExamDocumentStore } from "@/hooks/pdf-viewer-page-store";

interface PageParams {
    examType: string;
    level: string;
    subject: string;
    year: string;
    paper: string;
  }

const PaperViewPage = ({ params }: { params: PageParams }) => {
  const proModal = useProModal();
  const [presignedUrls, setPresignedUrls] = useState<PresignedUrl[]>([]);

  const [scrollPosition, setScrollPosition] = useState(0);

  const [pageNumber, setPageNumber] = useState<number>(1);

  const {
    setExamPaperPage,
    setMarkingSchemePage,
    setSamplePaperPage,
    setProjectPaperPage,
    currentPresignedUrl,
    setCurrentPresignedUrl,
    year,
    setYear,
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
    setYear: state.setYear,
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
    params.examType === "lc" ? LC_BUCKET_NAME : JC_BUCKET_NAME;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });


  const fetchPresignedUrls = async () => {
    // sets presignedUrls to contain ALL papers for that subject and level
    try {
      const response = await axios.get(
        `/api/documents/presigned-urls?Bucket=${LC_BUCKET_NAME}&Prefix=${params.level}_${params.subject}_`
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
    if (presignedUrls && !currentPresignedUrl) {
      setCurrentPresignedUrl(presignedUrls[0])
    } else {
    const examPaper = presignedUrls.find(
      (presignedUrl) =>
        presignedUrl.key.includes(year.toString()) &&
        presignedUrl.key.includes("exam-paper/")
    );
    examPaper ? setCurrentPresignedUrl(examPaper!) : console.log("no exam paper");
    }
  }

  useEffect(() => {
    fetchPresignedUrls();
  }, []);

  useEffect(() => {
    setCurrentExamPaper();
  }, [presignedUrls, year]);


  return (
    <div className="flex w-full">

      <div className="hidden h-full md:flex md:w-72 md:flex-col md:inset-y-0 z-80">
        <PaperQuestionsByTopicPage params={params} presignedUrls={presignedUrls}/>
      </div>
      <div className="h-full w-full">
        <PDFViewer
          presignedUrls={presignedUrls}
          bucket={bucket}
          paperName={params.paper}
          year={year}
          documentId={params.paper}
          viewId=""
          linkId=""
          params={params}
          topicComponent={PaperQuestionsByTopicPage}
          topicComponentProps={{ params: params, presignedUrls: presignedUrls }}
        />
        <div>

        </div>
      </div>
    </div>
  );
};

export default PaperViewPage;
