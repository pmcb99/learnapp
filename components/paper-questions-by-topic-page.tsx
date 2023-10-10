"use client";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useExamDocumentStore } from "@/hooks/pdf-viewer-page";
import { Separator } from "@radix-ui/react-separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { PaperQuestionsByTopic } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const PaperQuestionsByTopicPage = (params: {
  params: {
    paper: string;
    subject: string;
    level: string;
    examType: string;
    year: string;
  };
}) => {
  const [topics, setTopics] = useState<PaperQuestionsByTopic[]>([]);

  const { examPaperIsShown, flipDocumentShown, examPaperPage, setExamPaperPage, markingSchemePage, setMarkingSchemePage} = useExamDocumentStore(
    (state) => ({
      examPaperIsShown: state.examPaperIsShown,
      flipDocumentShown: state.flipDocumentShown,
      examPaperPage: state.examPaperPage,
      setExamPaperPage: state.setExamPaperPage,
      markingSchemePage: state.markingSchemePage,
      setMarkingSchemePage: state.setMarkingSchemePage,
    })
  );

  function flipTo(whichButton: "examPaper" | "markingScheme" = "examPaper") {
    if (whichButton === "examPaper" && !examPaperIsShown) {
      flipDocumentShown(examPaperIsShown);
    } else if (whichButton === "examPaper" && !examPaperIsShown) {
    } else if (whichButton === "markingScheme" && examPaperIsShown) {
      flipDocumentShown(!examPaperIsShown);
    } else {
    }
  }

  const getTopics = async () => {
    try {
      const apiEndpoint = `/api/topics/${params.params.examType}/${params.params.level}/${params.params.subject}/${params.params.year}`;
      const response = await axios.get(apiEndpoint);
      setTopics(response.data.topics);
      return topics;
    } catch (error: any) {
      toast.error("Failed to fetch topics.");
    }
  };

  useEffect(() => {
    getTopics();
  }, []);

  const paperType = examPaperIsShown ? "exam-paper" : "marking-scheme";

  const findPageWithQuestion = async (question: number | null) => {
    try {
      const paramValues = {
        examType: params.params.examType,
        level: params.params.level,
        subject: params.params.subject,
        year: params.params.year,
        question: question,
        paperType: paperType
      };
      const apiEndpoint = '/api/documents/question-page/';
      const response = await axios.get(apiEndpoint, { params: paramValues });

      // iterate through response.data.pages and find the page with the question and paper type
      const examPageRes = response.data.pages.find((page: any) => page.paperType === 'exam-paper');
      const markingSchemePageRes = response.data.pages.find((page: any) => page.paperType === 'marking-scheme');

      if (examPaperIsShown) {
        setExamPaperPage(examPageRes.page);
        setMarkingSchemePage(markingSchemePageRes.page);
        console.log('exam', examPaperPage)
        console.log('mark', markingSchemePage)
      } else {
        setExamPaperPage(examPageRes.page);
        setMarkingSchemePage(markingSchemePageRes.page);
        console.log('exam', examPaperPage)
        console.log('mark', markingSchemePage)
      }
    } catch (error: any) {
      toast.error("Failed to find page with question.");
    }
  }


  return (
    <div className="flex flex-col h-full justify-center items-center">
      <h2 className="font-bold text-2xl"> Paper </h2>
      <div className="flex-1 flex ">
        <Button
          onClick={() => flipTo("examPaper")}
          className={cn({
            "": !examPaperIsShown,
            "scale-105": examPaperIsShown,
            "mx-6": true,
          })}
        >
          Exam Paper
        </Button>
        <Button
          onClick={() => flipTo("markingScheme")}
          className={cn({
            "scale-105": !examPaperIsShown,
            "": examPaperIsShown,
          })}
        >
          Marking Scheme
        </Button>
        <Separator className="my-4" />
      </div>

      <div className="flex-2 flex flex-col items-center justify-center">
        <h2 className="font-bold text-2xl mb-4 pt-8"> Topics </h2>
        <ScrollArea className="rounded-md border p-4 h-[240px] w-full">
          <div className="flex flex-col items-center">
            {topics.map((topic) => (
              <Button key={topic.id} className="my-2 w-3/4" onClick={() => findPageWithQuestion(topic.question)}>
                Q{topic.question} {topic.parts} - {topic.topic}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default PaperQuestionsByTopicPage;
