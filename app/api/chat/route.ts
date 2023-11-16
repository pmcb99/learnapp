import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

import { checkSubscription } from "@/lib/subscription";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";


import { QdrantClient } from "@qdrant/js-client-rest";
import axios from "axios";

const client = new QdrantClient({
  url: "https://9c0a7f11-a126-4b98-97a7-cd7ae1471798.us-east4-0.gcp.cloud.qdrant.io",
  port: 6333,
  apiKey: "7OtuBj1p7fhE4l6VTKdLQlGDh2_oBRzbSKtZ_adkxoWK4UyBBM6KiA",
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

// const instructionMessage: ChatCompletionRequestMessage = {
// role: "system",
// content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations."
// };

export async function POST(req: Request) {
  const { userId } = auth();
  const body = await req.json();
  const { messages, subject } = body;

  const lastMessage = messages[messages.length - 1]['content'] as string;

  console.log(lastMessage);

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }


  // if (!messages) {
  //     return new NextResponse("Messages are required", { status: 400 });
  // }


  const embeddingResponse = await openai.embeddings.create(
    {
        input: lastMessage,
        model: "text-embedding-ada-002",
    }
  )

  const requestEmbedding = embeddingResponse.data[0].embedding;


  let searchResult = await client.search(`lc_higher_${subject}_chat`, {
    vector: requestEmbedding,
    limit: 1,
  });

  // const freeTrial = await checkApiLimit();
  // const isPro = await checkSubscription();

  // if (!freeTrial && !isPro) {
  // return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
  // }


  const content = searchResult[0]['payload']!['content']
  console.log(content);

  const newMessages = [
    {
        "role": "system",
        "content": `You are a tutor for the Leaving Certificate. Only use information in the 'Content' to answer the question, text. If a question not related to the subject ${subject}, tell them you can only help with 'this subject'.`
    },
    {
        "role": "user",
        "content": `Question: ${lastMessage} Content: ${content}. Provide an answer to the question: `
    }
  ]

  const chatResponse = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: newMessages!,
  max_tokens: 300
  });


  // if (!isPro) {
  // await incrementApiLimit();
  // }
//   return NextResponse.json(chatResponse.choices[0].text);
//   return NextResponse.json(response.data.choices[0].message);
  return NextResponse.json(chatResponse.choices[0].message);
}
