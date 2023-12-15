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

const PaperViewPage = ({
  params,
  presignedUrls,
}: {
  params: PageParams;
  presignedUrls: PresignedUrl[];
}) => {
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

  const bucket = params.examType === "lc" ? LC_BUCKET_NAME : JC_BUCKET_NAME;


  const setCurrentExamPaper = () => {

    if (presignedUrls && !currentPresignedUrl) {
      setCurrentPresignedUrl(presignedUrls[0]);
    } else {
      // set new current presigned url to the same paperVersion as the current one
      if (currentPresignedUrl.key.includes("paper-two")) {
        const paperTwo = presignedUrls.find((presignedUrl) =>
          presignedUrl.key.includes("paper-two") && presignedUrl.key.includes(year.toString())
        );
      }
        else if (currentPresignedUrl.key.includes("aural")) {
          const aural = presignedUrls.find((presignedUrl) =>
            presignedUrl.key.includes("aural") && presignedUrl.key.includes(year.toString())
          );
      } else {
        const paperOne = presignedUrls.find((presignedUrl) =>
          presignedUrl.key.includes("paper-one") && presignedUrl.key.includes(year.toString())
        );
      }
    }
  };

  useEffect(() => {
    setCurrentExamPaper();
  }, [presignedUrls, year]);

  return (
    <div>
      {/* <div>Higher Level</div> */}
    <div className="flex w-full gap-x-3 justify-center">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:inset-y-0 z-80 ml-5">
        <PaperQuestionsByTopicPage
          params={params}
          presignedUrls={presignedUrls}
        />
      </div>
      <div className="h-full w-auto ">
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
        <div></div>
      </div>
    </div>
    </div>
  );
};

export default PaperViewPage;
