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
        <div className="md:space-x-3 md:space-y-0 space-y-3 pt-4 grid md:grid-cols-3 md:grid-rows-1 grid-rows-3 grid-cols-1">
        {questions.map((question) => (
            <Button
                className="bg-transparent h-auto w-auto border dark:text-white text-black border-black dark:border-white hover:bg-slate-100 dark:hover:bg-slate-800  group relative"
                onClick={() => askQuestionOnClick(question)}
                key={question}
            >
                {question}
                <ArrowUp className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
            </Button>
            ))}
      </div>
     );
}
 
export default QuestionExamples;