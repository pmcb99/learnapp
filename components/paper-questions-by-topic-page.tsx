"use client";
import prismadb from "@/lib/prismadb";
import TopicListByPage from "./topic-list-by-paper";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useExamDocumentStore } from "@/hooks/pdf-viewer-page";


const PaperQuestionsByTopicPage = (
    params: { params: {paper: string, subject: string, level: string, examType: string}; },
) => {

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

    return (
    <div>
            <Button 
                onClick={() => flipTo('markingScheme')} 
                className={cn({ "": examPaperIsShown, "scale-105": !examPaperIsShown })}>
                Exam Paper
            </Button>
            <Button 
                onClick={() => flipTo('examPaper')} 
                className={cn({ "scale-105": examPaperIsShown, "": !examPaperIsShown })}>
                Marking Scheme
            </Button>
    </div>
   )
}


export default PaperQuestionsByTopicPage;