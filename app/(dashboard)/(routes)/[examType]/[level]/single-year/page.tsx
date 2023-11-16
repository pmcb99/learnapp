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

  const hrefPrefix = "/lc/higher";


  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Subjects - Topics for Individual Year
        </h2>
        <h3 className=" text-center text-slate-600">
          Learn what topics come up each year, and get familiar with the paper structure.
        </h3>
        {/* <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI - Experience the power of AI
        </p> */}
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 px-20 lg:px-32">
        {lcSubjects.map((subject) => (
          <Card onClick={() => router.push(`${hrefPrefix}/single-year/${subject.href}/`)} key={subject.href} className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-x-4">
              <div className="font-semibold">
                <Image src={subject.imageIconPath || ""} alt="" width={50} height={50} className="dark:hidden"/>
                <Image src={subject.imageIconPath.replace("light","dark") || ""} alt="" width={50} height={50} className="hidden dark:block"/>
              </div>
              <div>

              </div>
              <div className="font-semibold sm:overflow-hidden text-lg">
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


