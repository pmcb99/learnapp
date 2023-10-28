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

async function getDefinitionsByTopic(topicName: string) {
  const definitions = await prismadb.definition.findMany({
    where: {
      topic: topicName,
    }
  });
  return definitions;
}

