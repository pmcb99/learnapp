import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

function parseQuestion(question) {
  const match = question.match(/^(\d+)([a-zA-Z]*)$/);
  const numericPart = match ? parseInt(match[1], 10) : 0;
  const alphabeticPart = match && match[2] ? match[2] : '';
  return { numericPart, alphabeticPart };
}

function customSort(a, b) {
  const parsedA = parseQuestion(a.question);
  const parsedB = parseQuestion(b.question);

  if (parsedA.numericPart !== parsedB.numericPart) {
    return parsedA.numericPart - parsedB.numericPart;
  }

  return parsedA.alphabeticPart.localeCompare(parsedB.alphabeticPart);
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

    const isPro = false;
    // const isPro = await checkSubscription();

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

    topics.sort(customSort);

    if (!isPro) {
      const first4Topics = topics.slice(0, 4);
      var restOfTopics = topics.slice(4);

      restOfTopics = restOfTopics.map((topic) => {
        return {
          ...topic,
          examPaperPage: -1,
          markingSchemePage: -1,
        };
      });

      const lockedTopics = first4Topics.concat(restOfTopics);
      return new NextResponse(JSON.stringify({ topics : lockedTopics }))
    }

    // const topics = await getTopicsForYear(Number(year), level, examType, subject);
    
    return new NextResponse(JSON.stringify({ topics : topics }))

  } catch (error) {
    console.log('error', error)
    return new NextResponse(JSON.stringify({ error : error}))
    }
};
