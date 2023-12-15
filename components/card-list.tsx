"use client";
import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export interface CardProps {
    href: string;
    label: string;
    bgColor: string;
    color: string;
}

export type CardListProps = {
    items: CardProps[];
    heading: string
};


const CardList: React.FC<CardListProps> = ({items, heading}) => {
    const router = useRouter();
    return (     
    <div>
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center">
            {heading}
          </h2>
          {/* <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
            Chat with the smartest AI - Experience the power of AI
          </p> */}
        </div>
        <div className="px-4 md:px-20 lg:px-32 space-y-4">
          {items.map((item) => (
            <Card onClick={() => router.push(item.href)} key={item.href} 
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer "
            >
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md", item.bgColor)}>
                </div>
                <div className="font-semibold text-center">
                  {item.label}
                </div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </Card>
          ))}
        </div>
      </div> );
}
 
export default CardList;