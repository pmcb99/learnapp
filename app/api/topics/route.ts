import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";
// import { redisClient } from "@/lib/redis";

export const dynamic = 'force-dynamic'


function parseQuestion(question: any) {
  if (!question) return { numericPart: 0, alphabeticPart: '' };
  const match = question.match(/^(\d+)([a-zA-Z]*)$/);
  const numericPart = match ? parseInt(match[1], 10) : 0;
  const alphabeticPart = match && match[2] ? match[2] : '';
  return { numericPart, alphabeticPart };
}

function customSort(a: any, b: any) {
  const parsedA = parseQuestion(a.question);
  const parsedB = parseQuestion(b.question);

  if (parsedA.numericPart !== parsedB.numericPart) {
    return parsedA.numericPart - parsedB.numericPart;
  }

  return parsedA.alphabeticPart.localeCompare(parsedB.alphabeticPart);
}


export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    const { searchParams } = new URL(req.url);

    const subject = searchParams.get("subject") as string;
    const level = searchParams.get("level") as string;
    const examType = searchParams.get("examType") as string;
    const namesOnly = searchParams.get("namesOnly") as string;
    const topic = searchParams.get("topic") as string;

    // get topic names from db if namesOnly is true
    if (namesOnly === "true") {

    //   // check redis cache
    //   try {
    //     const cachedTopics = await redisClient.get(
    //       `topics:${subject}:${level}:${examType}:names`
    //     );

    //     if (cachedTopics) {
    //       console.log("cachedTopics", cachedTopics);
    //       return new NextResponse(cachedTopics);
    //     }
    //   } catch (error) {
    //     console.log("error", error);
    //   }

      // redis cache miss, get from db
      var topics = await prismadb.paperQuestionsByTopic.findMany({
        where: {
          subject: subject,
          level: level,
          examType: examType,
        },
        select: {
          topic: true,
        },
        distinct: ["topic"],
      });


      // cache in redis indefinitely
      // try {
      //   await redisClient.set(
      //     `topics:${subject}:${level}:${examType}:names`,
      //     JSON.stringify(topics)
      //   );
      // } catch (error) {
      //   console.log("error", error);
      // }
      return new NextResponse(JSON.stringify({ topics: topics }));

      // get all topic data from db if namesOnly is false
    } else {

      console.log("Return all data")
      if (!topic) {
        return new NextResponse(JSON.stringify({ topics: []}));
      }

      // check redis cache
      // try {
      //   const cachedTopics = await redisClient.get(
      //     `topics:${subject}:${level}:${examType}`
      //   );

      //   if (cachedTopics) {
      //     return new NextResponse(cachedTopics);
      //   }
      // } catch (error) {
      //   console.log("error", error);
      // }


    // const freeTrial = await checkApiLimit();
    const isPro = true;
    // const isPro = await checkSubscription();

      console.log("no cached topics");

      const topics = await prismadb.paperQuestionsByTopic.findMany({
        where: {
          subject: subject,
          level: level,
          examType: examType,
          topic: topic
        },
        orderBy: [
          {
            year: "desc",
          },
          {
            question: "desc",
          },
          {
            parts: "desc"
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

      // cache in redis indefinitely
      // try {
      //   await redisClient.set(
      //     `topics:${subject}:${level}:${examType}`,
      //     JSON.stringify(topics)
      //   );
      // } catch (error) {
      //   console.log("error", error);
      // }
      return new NextResponse(JSON.stringify({ topics: topics }));
    }
  } catch (error) {
    console.log("error", error);
    return new NextResponse(JSON.stringify({ error: error }));
  }
}
