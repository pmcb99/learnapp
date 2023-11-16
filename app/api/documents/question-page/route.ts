import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

import { Redis } from '@upstash/redis'

export const dynamic = 'force-dynamic'


async function getPageForQuestion(
  year: number,
  level: 'higher' | 'ordinary',
  examType: 'jc' | 'lc',
  subject: string,
  questionNumber: number,
  paperType: string
  ) {
  const topics = await prismadb.questionsByPage.findMany({
    where: {
      subject: subject,
      level: level,
      examType: examType,
      question: questionNumber,
      paperType: paperType,
      year: Number(year),
    },
  });

  return topics
}

export async function GET(
  req: Request,
  ) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    const year = searchParams.get('year') as string;
    const level = searchParams.get('level') as string;
    const examType = searchParams.get('examType') as string;
    const subject = searchParams.get('subject') as string;
    const question = searchParams.get('question') as string;
    const paperVersion = searchParams.get('paperVersion') as string;

    const pages = await prismadb.questionsByPage.findMany({
      where: {
        subject: subject,
        level: level,
        examType: examType,
        year: Number(year),
        question: Number(question),
        paperVersion: paperVersion,
      },
      orderBy: {
        page: 'desc'
      }
    });


    
    return new NextResponse(JSON.stringify({ pages }))

  } catch (error) {
    console.log('error', error)
    return new NextResponse(JSON.stringify({ error : error}))
    }
};
