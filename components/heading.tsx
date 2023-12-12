import { Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface HeadingProps {
  title: string;
  description: string;
  icon: Icon;
  iconColor?: string;
  bgColor?: string;
  subject: string;
}

export const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
  subject
}: HeadingProps) => {
  return (
      <div className="px-4 flex items-center gap-x-3 mb-8">
        <div className="flex flex-shrink-0">
          {/* <Icon className={cn("w-10 h-10", iconColor)} /> */}
          <Image src={`/subject-icons/${subject}-light.png`} width={50} height={50} alt="" className="dark:hidden"/>
          <Image src={`/subject-icons/${subject}-dark.png`} width={50} height={50} alt="" className="hidden dark:block"/>
        </div>
        <div className="hidden md:block">
          <h2 className="text-3xl font-bold">{title.replaceAll("-"," ")}</h2>
          <p className="text-sm text-muted-foreground">
            {description.replaceAll("-", " ")}
          </p>
        </div>
      </div>
  );
};
