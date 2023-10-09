import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { tools } from "@/constants";
import { subjects } from "@/constants";
import prismadb from "@/lib/prismadb";
import CardList from "@/components/card-list";


export default async function HomePage() {
  // create a list of unique topics
  const uniqueTopics = await prismadb.definition.findMany({
    select: {
      topic: true,
    },
    distinct: ["topic"]
  });

  const topicCardListProps = uniqueTopics.map((topic) => ({
    //convert topic to kebab case
    href: `/biology/definitions/${topic.topic.replace(/\s+/g, '-').toLowerCase()}`,
    label: topic.topic,
    bgColor: "bg-blue-500",
    color: "text-white",
  }));
  
  const heading = "Past Papers"

  return (
    <CardList heading={heading} items={topicCardListProps} />
  );
}
