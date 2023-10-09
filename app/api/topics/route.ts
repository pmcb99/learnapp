import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

async function getAllUniqueTopics() {
  const uniqueTopics = await prismadb.definition.findMany({
    select: {
      topic: true,
    },
    distinct: ["topic"]
  });

  return uniqueTopics.map(entry => entry.topic);
}

export async function GET(req: Request) {
  try {
    console.log('req', req)
    const { userId } = auth();
    const user = await currentUser();
    return new NextResponse(JSON.stringify({ userId : userId}))
  } catch (error) {
    console.log('error', error)
    return new NextResponse(JSON.stringify({ error : error}))
    }

    // if (!userId || !user) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    
    // const definitions = await getAllUniqueTopics(topicName);
    
    //   return new NextResponse(JSON.stringify({ url: stripeSession.url }))
    // }

};
