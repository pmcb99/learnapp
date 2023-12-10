"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import Image from "next/image"

import { lcHigherSubjects } from "@/constants";

import { Badge } from "@/components/ui/badge";


export default function HomePage() {
  const router = useRouter();
  // create a list of subjects from the enum SubjectName

  const hrefPrefix = "/lc/higher";


  return (
    <div>
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-center">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Chat
        </h2>
        {/* <Badge className="ml-2 uppercase" variant="secondary">NEW</Badge> */}
        </div>
        <h3 className=" text-center text-slate-600">
          Ask questions and get specific answers based on the Leaving Cert curriculum.
        </h3>
        {/* <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI - Experience the power of AI
        </p> */}
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-x-2 gap-y-2 px-20 lg:px-32 ">
        {lcHigherSubjects.map((subject) => (
          <Card onClick={() => router.push(`${hrefPrefix}/chat/${subject.href}/`)} key={subject.href} className="p-4 border-slate-700 flex items-center justify-between hover:shadow-md hover:scale-105 transition cursor-pointer">
            <div className="flex md:justify-center md:items-center gap-x-4 w-auto md:flex-row flex-col ">
              <div className="font-semibold">
                <Image src={subject.imageIconPath || ""} alt="" width={50} height={50} className="dark:hidden"/>
                <Image src={subject.imageIconPath.replace("light","dark") || ""} alt="" width={50} height={50} className="hidden dark:block"/>
              </div>
              <div>

              </div>
              <div className="font-semibold overflow-hidden text-lg">
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

