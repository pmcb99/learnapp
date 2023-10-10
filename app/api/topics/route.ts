import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";


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
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const topics = await getAllUniqueTopics();
    
    return new NextResponse(JSON.stringify({ topics : topics }))

  } catch (error) {
    console.log('error', error)
    return new NextResponse(JSON.stringify({ error : error}))
    }
};
