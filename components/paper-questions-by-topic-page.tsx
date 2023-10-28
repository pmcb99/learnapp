"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useExamDocumentStore } from "@/hooks/pdf-viewer-page-store";
import { Separator } from "@radix-ui/react-separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { PaperQuestionsByTopic } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Scroll } from "lucide-react";
import { set } from "react-hook-form";
import PaperVersionAndTypeToggles from "./paper-version-and-type-toggles";
import { PresignedUrl } from "@/types/global";

interface PaperQuestionsByTopicPageProps {
  params: {
    paper: string;
    subject: string;
    level: string;
    examType: string;
    year: string;
  };

  presignedUrls: PresignedUrl[];
}


const PaperQuestionsByTopicPage = ({ params, presignedUrls }: PaperQuestionsByTopicPageProps) => {
  const [topics, setTopics] = useState<PaperQuestionsByTopic[]>([]);
  const [open, setOpen] = useState(false);
  const [chosenTopicValue, setChosenTopicValue] = useState("");
  const [topicNames, setTopicNames] = useState<TopicName[]>([]);

  const {
    examPaperPage,
    setExamPaperPage,
    markingSchemePage,
    setMarkingSchemePage,
    samplePaperPage,
    setSamplePaperPage,
    projectPaperPage,
    setProjectPaperPage,
    currentPresignedUrl,
    setCurrentPresignedUrl,
    year,
    setYear
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
    setYear: state.setYear
  }));

  const getTopicsForYear = async () => {
    try {
      const apiEndpoint = `/api/topics/${params.examType}/${params.level}/${params.subject}/${params.year}`;
      const response = await axios.get(apiEndpoint);
      setTopics(response.data.topics);
      return topics;
    } catch (error: any) {
      toast.error("Failed to fetch topics.");
    }
  };

  interface TopicName {
    topic: string;
  }


  const getTopicsNamesForSubject = async () => {
    try {
      const apiEndpoint = `/api/topics/`;
      const response = await axios.get(apiEndpoint, {
        params: {
          examType: params.examType,
          level: params.level,
          subject: params.subject,
          namesOnly: "true",
          topic: chosenTopicValue
        },
      });
      console.log("Response:", response);
      setTopicNames(response.data.topics);
      setChosenTopicValue(response.data.topics[0].topic);
      return topics;
    } catch (error: any) {
      console.log("Error:", error);
      toast.error("Failed to fetch topics.");
    }
  };

  const getTopicsForSubject = async () => {
    try {
      const apiEndpoint = `/api/topics/`;
      console.log(params)
      const response = await axios.get(apiEndpoint, {
        params: {
          examType: params.examType,
          level: params.level,
          subject: params.subject,
          namesOnly: "false",
          topic: chosenTopicValue
        },
      });
      setTopics(response.data.topics);
      console.log("Response:", response);
      return response.data;
    } catch (error: any) {
      toast.error("Failed to fetch topic names.");
    }
  };

  useEffect(() => {
    if (params.year) {
      getTopicsForYear();
    } else {
      getTopicsForSubject();
      getTopicsNamesForSubject();
    }
  }, [params.year, getTopicsForSubject, getTopicsNamesForSubject, getTopicsForYear]);

  useEffect(() => {
    if (!open) {
      getTopicsForSubject().then(() => {
        setOpen(false);
      });
    }
  }, [chosenTopicValue, getTopicsForSubject, open]);

  const paperType = currentPresignedUrl.key.split("/")[3];

  const findPageWithQuestion = async (topic: PaperQuestionsByTopic) => {
    setYear(year);

    if (topic.examPaperPage) {
      if (topic.paperVersion === "sample-paper") {
        setSamplePaperPage(topic.examPaperPage);
      } 
      if (topic.paperVersion.includes("project")) {
        setSamplePaperPage(topic.examPaperPage);
      } 
      if (topic.examPaperPage) {
        setExamPaperPage(topic.examPaperPage);
      } 
      if (topic.markingSchemePage) {
        setMarkingSchemePage(topic.markingSchemePage);
      } 
      return;
    }


    try {
      const paramValues = {
        examType: params.examType,
        level: params.level,
        subject: params.subject,
        year: year,
        question: Number(topic.question),
        paperVersion: topic.paperVersion
      };
      console.log(paramValues)
      console.log(topic)
      const response = await axios.get("/api/documents/question-page/", { params: paramValues });

      console.log("Response:", response);

      // const requestedPresignedUrl = presignedUrls.find((presignedUrl) => presignedUrl.key.includes(`${year}/${topicPaperVersion}`))
      // if (!requestedPresignedUrl) {
      //   console.log("Something fucked up")
      //   console.log("presignedUrls:", presignedUrls);
      //   toast.error(".");
      //   return;
      // }
      // setCurrentPresignedUrl(requestedPresignedUrl);


      // iterate through response.data.pages and find the page with the question and paper type
      const examPageRes = response.data.pages.find(
        (page: any) => page.paperType === "exam-paper"
      );
      const markingSchemePageRes = response.data.pages.find(
        (page: any) => page.paperType === "marking-scheme"
      );

      // find presigned url for this paper version
      response.data.pages.forEach((page: any) => {
        if (page.paperType === "exam-paper") {
          setExamPaperPage(page.page);
        } else if (page.paperType === "marking-scheme") {
          setMarkingSchemePage(page.page);
        } else if (page.paperType === "sample-paper") {
          setSamplePaperPage(page.page);
        } else if (page.paperType === "project") {
          setProjectPaperPage(page.page);
        }
      });

    } catch (error: any) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <div className="flex-1 flex flex-col items-center justify-between bg-gray-300 pb-4 rounded-xl">
        <PaperVersionAndTypeToggles presignedUrls={presignedUrls} />
      </div>


      {!params.year && (

        <div className="py-6">

      <div className="flex-1 flex flex-col items-center justify-between bg-gray-300 py-4 rounded-xl">
          <h3 className="flex font-bold text-xl justify-center items-center pb-4"> Topics </h3>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {chosenTopicValue
                  ? topicNames.find(
                      (topicName) => topicName.topic === chosenTopicValue
                    )?.topic
                  : "Select topic..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">

              <Command>
                <CommandInput placeholder="Search topic..." />
                <CommandEmpty>No topic found.</CommandEmpty>

                <CommandGroup>

                  <ScrollArea>
                  {topicNames.map((topicName) => (
                    <CommandItem
                      key={topicName.topic}
                      onSelect={() => {
                        setChosenTopicValue(topicName.topic);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          chosenTopicValue === topicName.topic
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {topicName.topic}
                    </CommandItem>
                  ))}

</ScrollArea>
                </CommandGroup>

              </Command>

            </PopoverContent>

          </Popover>
        </div>
        </div>
      )}

      <div className="flex-2 flex flex-col items-center justify-center">
        <h2 className="font-bold text-2xl mb-4 pt-8"> {params.year ? "Topics" : "Questions"} </h2>
        <ScrollArea className="rounded-md border p-4 h-[440px] w-full">
          <div className="flex flex-col items-center">
            {topics.map((topic) => (
              console.log(topic.paperVersion),
              console.log(currentPresignedUrl.key),
              currentPresignedUrl.key.includes(topic.paperVersion)&&(<Button
                key={topic.id}
                className="my-2 w-3/4"
                onClick={() => findPageWithQuestion(topic)}
              >
                {!params.year ? topic.year : ""} Q{topic.question} {topic.parts} - {topic.topic}
              </Button>)
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default PaperQuestionsByTopicPage;
