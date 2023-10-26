import { Definition } from "@prisma/client";
import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface DefinitionListProps {
  definitions: Definition[];
}

const DefinitionList: React.FC<DefinitionListProps> = ({ definitions }) => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {definitions.map((definition, index) => (
        <div className="">
          <div
            key={index}
            className="mb-4 bg-white p-4 rounded shadow hover:shadow-lg transition-shadow duration-200"
          >
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="w-full">
                <AccordionTrigger className="font-semibold text-2xl text-primary">{definition.term}</AccordionTrigger>
                <AccordionContent className="text-xl">
                    <div className="rounded bg-slate-300">
                  {definition.definition}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      ))}

      <footer className="mt-10 text-center text-foreground">© Rewize</footer>
    </div>
  );
};

export default DefinitionList;
