"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import Image from "next/image"
import { cn } from "@/lib/utils";

import { proFeatures } from "@/constants";
import { lcSubjects } from "@/constants";


export default function HomePage() {
  const router = useRouter();
  // create a list of subjects from the enum SubjectName

  const hrefPrefix = "/lc/higher/";


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
      <div className="grid grid-cols-2 px-4 md:px-20 lg:px-32 space-y-4">
        {lcSubjects.map((subject) => (
          <Card onClick={() => router.push(`${hrefPrefix}${subject.href}`)} key={subject.href} className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-x-4">
              <div className="font-semibold">
                <Image src={subject.imageIconPath || ""} alt="" width={50} height={50} className="dark:hidden"/>
                <Image src={subject.imageIconPath.replace("light","dark") || ""} alt="" width={50} height={50} className="hidden dark:block"/>
              </div>
              <div>

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
