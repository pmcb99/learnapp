import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

import { checkSubscription } from "@/lib/subscription";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({
  url: process.env.QDRANT_URL,
  port: 6333,
  apiKey: process.env.QDRANT_API_KEY,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

var subjectValue = ""
var userQuestion = ""


// Define the queryQdrant function
async function queryQdrant(year: string) {
  // Generate embedding for the message

  const embeddingResponse = await openai.embeddings.create({
    input: userQuestion,
    model: "text-embedding-ada-002",
  });
  const requestEmbedding = embeddingResponse.data[0].embedding;

  // Query Qdrant using the embedding
  let searchResult = await client.search(`lc_higher_${subjectValue}_chat`, {
    vector: requestEmbedding,
    limit: 3,
    // filter: {
    //   must: [
    //     {
    //       key: "year",
    //       match: {
    //         value: year,
    //       },
    //     },
    //   ],
    // },
  });

  console.log("searchResult", searchResult)
  return searchResult.map(result => result['payload']!['content']).join(' ');
}

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

  const runner = openai.beta.chat.completions
    .runFunctions({
      model: 'gpt-3.5-turbo-1106',
      messages: [...messages],
      functions: [
        {
          function: queryQdrant,
          parameters: {
            type: 'object',
            properties: {
              year: { type: 'string', description: 'The year of the exam paper' },
            }
          },
        }
      ]
    })

  const finalContent = await runner.finalContent();
  console.log(finalContent);

  if (!await checkApiLimit() && !await checkSubscription()) {
    return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
  }

  await incrementApiLimit();
  return NextResponse.json(finalContent!);
};
