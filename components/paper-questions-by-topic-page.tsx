"use client";
import prismadb from "@/lib/prismadb";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useExamDocumentStore } from "@/hooks/pdf-viewer-page";
import { Separator } from "@radix-ui/react-separator";


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PaperQuestionsByTopic } from "@prisma/client";
import { useEffect, useState } from "react";
import { set } from "zod";


const PaperQuestionsByTopicPage = (
    params: { params: {paper: string, subject: string, level: string, examType: string, year: string}; },
) => {

    const [topics, setTopics] = useState<PaperQuestionsByTopic[]>([]);

    const { examPaperIsShown, flipDocumentShown } = useExamDocumentStore((state) => ({
        examPaperIsShown: state.examPaperIsShown,
        flipDocumentShown: state.flipDocumentShown
    }));

    function flipTo(whichButton: 'examPaper' | 'markingScheme' = 'examPaper') {
        if (whichButton === 'examPaper' && !examPaperIsShown){
            flipDocumentShown(examPaperIsShown)
        }else if (whichButton === 'examPaper' && !examPaperIsShown){

        }else if (whichButton === 'markingScheme' && examPaperIsShown){
            flipDocumentShown(!examPaperIsShown)
        } else {

        }
    }

    async function getPaperTopics(): Promise<PaperQuestionsByTopic[]> {
        const topics = await prismadb.paperQuestionsByTopic.findMany({
            where: {
                subject: params.params.subject,
                level: params.params.level,
                examType: params.params.examType,
                year: Number(params.params.year),
            },
            orderBy: {
                topic: 'asc'
            }
        })
        setTopics(topics);
        return topics;
    }

    useEffect(() => {
      getPaperTopics();
    }, []);

    return (
    <div className="flex flex-col">
            <Button 
                onClick={() => flipTo('examPaper')} 
                className={cn({ "": examPaperIsShown, "scale-105": !examPaperIsShown })}>
                Exam Paper
            </Button>
            <Button 
                onClick={() => flipTo('markingScheme')} 
                className={cn({ "scale-105": examPaperIsShown, "": !examPaperIsShown })}>
                Marking Scheme
            </Button>
            <Separator className="my-4" />

    // list of topics mapped to h3s
    {topics.map((topic) => (
        <h3 key={topic.topic} className="text-2xl font-bold">{topic.topic}</h3>
    ))}

    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </div>
   )
}


export default PaperQuestionsByTopicPage;