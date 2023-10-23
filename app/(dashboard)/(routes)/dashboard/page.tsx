"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import Image from "next/image"
import { cn } from "@/lib/utils";

import { tools } from "@/constants";
import { subjects } from "@/constants";


export default function HomePage() {
  const router = useRouter();
  // create a list of subjects from the enum SubjectName


  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          My Subjects
        </h2>
        {/* <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI - Experience the power of AI
        </p> */}
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {subjects.map((subject) => (
          <Card onClick={() => router.push(subject.href)} key={subject.href} className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", subject.bgColor)}>
                <subject.icon className={cn("w-8 h-8", subject.color)} />
              </div>
              <div className="font-semibold">
                <Image src={subject.imageIconPath || ""} alt="" width={50} height={50}/>
              </div>
              <div className="font-semibold">
                {subject.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
}
