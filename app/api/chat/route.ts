import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

import { checkSubscription } from "@/lib/subscription";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { QdrantClient } from "@qdrant/js-client-rest";
import { json } from "stream/consumers";

const client = new QdrantClient({
  url: process.env.QDRANT_URL,
  port: 6333,
  apiKey: process.env.QDRANT_API_KEY,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

var subjectValue = "";
var userQuestion = "";

// Define the queryQdrant function
async function checkMarkingSchemeForYear(year: string) {
  // Generate embedding for the message

  const embeddingResponse = await openai.embeddings.create({
    input: userQuestion,
    model: "text-embedding-ada-002",
  });
  const requestEmbedding = embeddingResponse.data[0].embedding;

  // parse the year string into a year object
  const yearObj = JSON.parse(year);

  // Query Qdrant using the embedding
  let searchResult = await client.search(`lc_higher_${subjectValue}_chat`, {
    vector: requestEmbedding,
    limit: 3,
    filter: {
      should: [
        {
          key: "year",
          match: {
            value: yearObj.year,
          },
        },
      ],
    },
  });
  console.log("Year search result: ", searchResult);
  return searchResult
    .map((result) => result["payload"]!["content"])
    .join(" ") as string;
}

async function checkMarkingSchemeForAllYears(year: string) {
  const embeddingResponse = await openai.embeddings.create({
    input: userQuestion,
    model: "text-embedding-ada-002",
  });
  const requestEmbedding = embeddingResponse.data[0].embedding;

  // Query Qdrant using the embedding
  let searchResult = await client.search(`lc_higher_${subjectValue}_chat`, {
    vector: requestEmbedding,
    limit: 3,
  });

  console.log("All years search result: ", searchResult);

  return searchResult.map((result) => result["payload"]!["content"]).join(" ");
}

//descinding list of years from 2023 to 2000
const years = [
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
  "2009",
  "2008",
  "2007",
  "2006",
  "2005",
  "2004",
  "2003",
  "2002",
  "2001",
  "2000",
  "all",
];

export async function POST(req: Request) {
  const { userId } = auth();
  const body = await req.json();
  const { messages, subject } = body;
  const lastMessage = messages[messages.length - 1]["content"] as string;

  subjectValue = subject;
  userQuestion = lastMessage;

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const systemPrompt = `Ignore previous instructions, and ensure you follow all steps that follow. You are a Leaving Certificate ${subject} teacher. You have access to the following tools: 'checkMarkingSchemeForAllYears' which you should use for each message unless a particular year is mentioned. In that case, use 'checkMarkingSchemeForYear'. Try to always use the tools, but if your response is not based solely on information from the tool, append the code '!WARNING!', followed by a brief explanation of what may not be relevant in the context of the marking scheme, to the very end of the message.`;
  const examPaperOnlyPrompt = `Ignore previous instructions, and ensure you follow all steps that follow. You are a Leaving Certificate ${subject} teacher. You have access to the following tools: 'checkMarkingSchemeForAllYears' which you should use for each message unless a particular year is mentioned. In that case, use 'checkMarkingSchemeForYear'. Try to always use the tools, and supplement your response with your own knowledge if you feel it is necessary. Then be helpful and ask if they have follow up questions.`;

  // add system prompt if there are less than 2 messages to the first index
  if (messages.length < 2) {
    messages.unshift({
      role: "system",
      content: subject == "history" ? examPaperOnlyPrompt : systemPrompt,
    });
  }

  const runner = openai.beta.chat.completions
    .runTools({
      model: "gpt-3.5-turbo",
      messages: [...messages],
      max_tokens: 2000,
      tools: [
        {
          type: "function",
          function: {
            function: checkMarkingSchemeForYear,
            description:
              "Check a specific years marking scheme if a year is specified in the question",
            parameters: {
              type: "object",
              properties: {
                year: {
                  type: "string",
                  description: "The year of the exam paper",
                },
              },
            },
          },
        },
        // {
        //   type: "function",
        //   function: {
        //     function: checkMarkingSchemeForAllYears,
        //     description:
        //       "Check all years marking schemes if no year is specified in the question",
        //     parameters: {
        //       type: "object",
        //       properties: {
        //         year: {
        //           type: "string",
        //           description: "Representing all years",
        //           enum: ["all"],
        //         },
        //       },
        //     },
        //   },
        // },
      ],
    })
    .on("message", (message) => console.log(message));

  const finalContent = await runner.finalContent();

  if (!(await checkApiLimit()) && !(await checkSubscription())) {
    return new NextResponse("Free trial has expired. Please upgrade to pro.", {
      status: 403,
    });
  }

  await incrementApiLimit();

  const response = {
    role: "assistant",
    content: finalContent,
  };

  return NextResponse.json(response);
}
