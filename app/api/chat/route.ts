import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

import { checkSubscription } from "@/lib/subscription";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";


import { QdrantClient } from "@qdrant/js-client-rest";
import axios from "axios";

const client = new QdrantClient({
  url: process.env.QDRANT_URL,
  port: 6333,
  apiKey: process.env.QDRANT_API_KEY,
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });


export async function POST(req: Request) {
  const { userId } = auth();
  const body = await req.json();
  const { messages, subject } = body;

  const lastMessage = messages[messages.length - 1]['content'] as string;


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
    limit: 3,
  });

  const freeTrial = await checkApiLimit();
  const isPro = await checkSubscription();

  if (!freeTrial && !isPro) {
  return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
  }


  // const content = searchResult[0]['payload']!['content']

  const content = searchResult.map((result) => result['payload']!['content']).join(' ')

  const restrainedPrompt = `You are a tutor for the Leaving Certificate. Only use information in the 'Content' to answer the question. If a question not related to the subject ${subject} or the content, tell the student they need to ask their teacher to be sure. Question: ${lastMessage} Content: ${content}. Provide an answer to the question: `

  const unrestrainedPrompt = `You are a tutor for the Leaving Certificate. If a question not related to the subject of study ${subject}, tell them you they should check with their teacher. If the question does not relate to the content, answer the question based on your knowledge instead of the content. Question: ${lastMessage} Content: ${content}. Provide an answer to the question: `

  const unrestrainedSubjects = ['english','irish','french','spanish','german', 'history']

  const prompt = unrestrainedSubjects.includes(subject) ? unrestrainedPrompt : restrainedPrompt

  console.log("prompt", prompt)


  const newMessages: OpenAI.Chat.ChatCompletionCreateParams = {
  //   messages: [    {
  //     role: "system",
  //     content: prompt
  // },
    messages: [ ...messages,
  {
      role: "user",
      content: `Question: ${lastMessage} Content: ${content}. Provide an answer to the question: `
  }],
    model: 'gpt-3.5-turbo-1106',
  };

  const chatResponse: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create({
    ...newMessages,
    max_tokens: 300
  });


  if (!isPro) {
  await incrementApiLimit();
  }
//   return NextResponse.json(chatResponse.choices[0].text);
//   return NextResponse.json(response.data.choices[0].message);
  return NextResponse.json(chatResponse.choices[0].message);
}
