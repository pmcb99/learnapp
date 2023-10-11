import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { redisClient } from "@/lib/redis";

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

    console.log("searchParams", searchParams);


    // get topic names from db if namesOnly is true
    console.log("namesOnly", namesOnly)
    if (namesOnly === "true") {
      console.log("with names")

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
      const topics = await prismadb.paperQuestionsByTopic.findMany({
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

      console.log("topics", topics);

      // cache in redis indefinitely
      try {
        await redisClient.set(
          `topics:${subject}:${level}:${examType}:names`,
          JSON.stringify(topics)
        );
      } catch (error) {
        console.log("error", error);
      }
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
        ]
      });

      // cache in redis indefinitely
      try {
        await redisClient.set(
          `topics:${subject}:${level}:${examType}`,
          JSON.stringify(topics)
        );
      } catch (error) {
        console.log("error", error);
      }
      return new NextResponse(JSON.stringify({ topics: topics }));
    }
  } catch (error) {
    console.log("error", error);
    return new NextResponse(JSON.stringify({ error: error }));
  }
}
