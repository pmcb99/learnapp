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
    <>
      <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
        <div >
          {/* <Icon className={cn("w-10 h-10", iconColor)} /> */}
          <Image src={`/subject-icons/${subject}-light.png`} width={50} height={50} alt="Subject" className="dark:hidden"/>
          <Image src={`/subject-icons/${subject}-dark.png`} width={50} height={50} alt="Subject" className="hidden dark:block"/>
        </div>
        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </>
  );
};
