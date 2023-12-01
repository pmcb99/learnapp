import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { proFeatures } from "@/constants";
import { lcSubjects } from "@/constants";
import prismadb from "@/lib/prismadb";
import CardList from "@/components/card-list";



export default async function HomePage(
  { params }: { params: { examType: string; level: string, subject: string } }
) {
  // create a list of unique topics
  const uniqueTopics = await prismadb.definitions.findMany({
    select: {
      topic: true,
    },
    where: {
      subject: params.subject,
    },
    distinct: ["topic"]
  });

  const topicCardListProps = uniqueTopics.map((topic) => ({
    //convert topic to kebab case
    href: `/lc/higher/${params.subject}/definitions/${topic.topic.replace(/\s+/g, '-').toLowerCase()}`,
    label: topic.topic,
    bgColor: "bg-primary",
    color: "text-white",
  }));
  
  const heading = "Definitions"

  return (
    <CardList heading={heading} items={topicCardListProps} />
  );
}
