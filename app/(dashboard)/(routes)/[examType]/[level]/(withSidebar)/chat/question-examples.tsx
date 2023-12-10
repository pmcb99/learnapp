import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";


interface QuestionExamplesProps {
    // a list of questions, should be 3 elements
    questions: string[],
    // a function that takes a question and sets the form value to that question
    askQuestionOnClick: (question: string) => void
}


const QuestionExamples = (
    {questions, askQuestionOnClick}: QuestionExamplesProps
) => {
    return ( 
        <div className="space-x-3 pt-4 grid grid-cols-3 grid-rows-1">
        {questions.map((question) => (
            <Button
                className="bg-transparent border dark:text-white text-black border-black dark:border-white hover:bg-slate-100 dark:hover:bg-slate-800  group relative"
                onClick={() => askQuestionOnClick(question)}
            >
                {question}
                <ArrowUp className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            ))}
      </div>
     );
}
 
export default QuestionExamples;