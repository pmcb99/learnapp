"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { tools } from "@/constants";
import { lcSubjects as lcSubjects } from "@/constants";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function HomePage() {
  const router = useRouter();
  // create a list of subjects from the enum SubjectName

  const hrefPrefix = "/lc/higher/";

  return (
    <div>
      <div className="pb-4 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center pb-2">
          Pick your subjects...
        </h2>
        <h3 className="flex text-xl justify-center pb-7">
          And get access to notes, paper questions for each topic, and talk to a personal AI tutor for each subject. 
        </h3>

        <div className="flex items-center gap-x-7 justify-center text-xl pb-4">
          <h3>
            I am studying for the...
          </h3>
          <RadioGroup defaultValue="leaving-certificate">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="leaving-certificate" id="r1" />
              <Label htmlFor="r1" className="text-xl font-semibold">Leaving Certificate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="junior-certificate" id="r2" />
              <Label htmlFor="r2" className="text-xl font-semibold">Junior Certificate</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="grid grid-cols-2 md:px-20 lg:px-32 space-y-4">
        {lcSubjects.map((subject) => (
          <Card
            onClick={() => router.push(`${hrefPrefix}${subject.href}`)}
            key={subject.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className="font-semibold">
                <Image
                  src={subject.imageIconPath || ""}
                  alt=""
                  width={50}
                  height={50}
                  className="dark:hidden"
                />
                <Image
                  src={subject.imageIconPath.replace("light", "dark") || ""}
                  alt=""
                  width={50}
                  height={50}
                  className="hidden dark:block"
                />
              </div>
              <div></div>
              <div className="font-semibold">{subject.label}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
}
