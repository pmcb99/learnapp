import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

import { checkSubscription } from "@/lib/subscription";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { nearTextQuery } from "../../(weaviate)/query";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(
  req: Request
) {
  // Takes in a list of messages called newMessages, const newMessages = [...messages, userMessage];
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages  } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    // const freeTrial = await checkApiLimit();
    // const isPro = await checkSubscription();

    // if (!freeTrial && !isPro) {
    //   return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    // }

    // messages = [{ role: 'system', content: 'You are a tutor for the Leaving Certificate. Only use information in the messages' }, ...messages}]

    const lastUserMessage = messages[messages.length - 1].content;

    const routeName = 'Lc_biology_quiz';

    const weaviateResponse = await nearTextQuery(routeName, `${lastUserMessage}`);
    // log each message in the data object
    const weaviateMessage: string = weaviateResponse.data.Get[routeName][0]["_additional"]["generate"]["singleResult"];

    // console.log(messages);
    // const response = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages
    // });

    // if (!isPro) {
    //   await incrementApiLimit();
    // }

    // return NextResponse.json(response.data.choices[0].message);
    const messageResponse = {
      role: 'assistant',
      content: weaviateMessage
    }
    // console.log(response.data.choices[0].message);
    return NextResponse.json(messageResponse);
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
