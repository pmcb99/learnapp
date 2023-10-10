import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";


async function getTopicsForYear(
  year: number,
  level: 'higher' | 'ordinary',
  examType: 'jc' | 'lc',
  subject: string
  ) {
  const topics = await prismadb.paperQuestionsByTopic.findMany({
    where: {
      // subject: subject,
      // level: level,
      // examType: examType,
      year: Number(year),
    },
  });

  return topics
}

export async function GET(
  req: Request,
  params: {
    params: {
    examType: 'jc' | 'lc',
    level: 'higher' | 'ordinary',
    subject: string,
    year: string,
    }
  },
  ) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const year = params.params.year;
    const level = params.params.level;
    const examType = params.params.examType;
    const subject = params.params.subject;

    const topics = await prismadb.paperQuestionsByTopic.findMany({
      where: {
        subject: subject,
        level: level,
        examType: examType,
        year: Number(year),
      },
      orderBy: [
        {
        question: 'asc',
        },
        {
        parts: 'desc',
        }
    ],
    });


    // const topics = await getTopicsForYear(Number(year), level, examType, subject);
    
    return new NextResponse(JSON.stringify({ topics : topics }))

  } catch (error) {
    console.log('error', error)
    return new NextResponse(JSON.stringify({ error : error}))
    }
};
