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
import PaperNavigationBar from "@/app/(dashboard)/(routes)/[examType]/[level]/(withoutSidebar)/paper-navigation-bar";
import SubjectPage from "@/app/(dashboard)/(routes)/[examType]/[level]/(withSidebar)/(routes)/_quiz/page";
import ChatComponent, { ChatPage } from "./chat";
import { Button } from "./ui/button";
import { useChatComponentStore } from "@/hooks/chat-window-store";

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

  const chatHook = useChatComponentStore((state) => ({
    chatShown: state.chatShown,
    setChatShown: state.setChatShown,
  }));

  const setCurrentExamPaper = () => {
    if (presignedUrls && !currentPresignedUrl) {
      setCurrentPresignedUrl(presignedUrls[0]);
    } else {
      // set new current presigned url to the same paperVersion as the current one
      if (currentPresignedUrl.key.includes("paper-two")) {
        const paperTwo = presignedUrls.find(
          (presignedUrl) =>
            presignedUrl.key.includes("paper-two") &&
            presignedUrl.key.includes(year.toString())
        );
      } else if (currentPresignedUrl.key.includes("aural")) {
        const aural = presignedUrls.find(
          (presignedUrl) =>
            presignedUrl.key.includes("aural") &&
            presignedUrl.key.includes(year.toString())
        );
      } else {
        const paperOne = presignedUrls.find(
          (presignedUrl) =>
            presignedUrl.key.includes("paper-one") &&
            presignedUrl.key.includes(year.toString())
        );
      }
    }
  };

 const [shouldRenderChat, setShouldRenderChat] = useState(chatHook.chatShown);
 const [shouldSlideIn, setShouldSlideIn] = useState(chatHook.chatShown);

  useEffect(() => {
    if (chatHook.chatShown) {
      setShouldSlideIn(true);
      setShouldRenderChat(true);
    } else {
      setShouldSlideIn(false);
      setTimeout(() => {
        setShouldRenderChat(false);
      }, 500); // delay should match transition duration
    }
  }, [chatHook.chatShown]);

  useEffect(() => {
    setCurrentExamPaper();
  }, [presignedUrls, year]);

  return (
    <div className="flex gap-x-3 justify-center md:pr-52 ">
      <div
        className={`fixed rounded-s-2xl inset-y-10 z-10 right-0 transform ${
          shouldSlideIn ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out pt-5 w-2/5 bg-primary overflow-scroll px-3`}
      >
        {shouldRenderChat && <ChatComponent params={params} />}
      </div>
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:inset-y-0 z-80 ml-5">
        {
          <div className={`transition-opacity duration-500`}>
            <PaperQuestionsByTopicPage
              params={params}
              presignedUrls={presignedUrls}
            />
          </div>
        }
      </div>

      <div className="h-full ">
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
          topicComponentProps={{
            params: params,
            presignedUrls: presignedUrls,
          }}
        />
        <div>{/* <ChatPage params={params} /> */}</div>
      </div>
    </div>
  );
};

export default PaperViewPage;
