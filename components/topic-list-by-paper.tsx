"use client";
import { PaperQuestionsByTopic } from "@prisma/client";
import { Button } from "./ui/button";

interface PaperQuestionsByTopicPageProps {
    questionsByTopic: PaperQuestionsByTopic[];
    params: { params: {paper: string, subject: string, level: string, examType: string}; };
}

const TopicListByPage = (
    props: PaperQuestionsByTopicPageProps
    ) => {
    return ( 
    <>
        <h1>{props.params.params.subject}</h1>
        <ul className="flex flex-col gap-y-3 w-4/5 items-center">
            {props.questionsByTopic.map((topic) => (
                <button className="flex" onClick={() => console.log(1)}>
                <li key={topic.id}>{topic.topic} - {topic.question} {topic.parts}</li>
                </button>
            ))}
        </ul> 
    </> );
}
 
export default TopicListByPage;

