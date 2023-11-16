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
    <div className="p-8 bg-transparent min-h-screen">
      {definitions.map((definition, index) => (
        <div className="" key={index}>
          <div
            key={index}
            className="mb-4 bg-transparent p-4 rounded shadow hover:shadow-lg transition-shadow duration-200"
          >
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="w-full">
                <AccordionTrigger className="font-semibold text-2xl text-primary">
                  {definition.term}
                </AccordionTrigger>
                <AccordionContent className="text-xl">
                  <div className="flex rounded items-center">
                    <div>{definition.definition}</div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      ))}

    </div>
  );
};

export default DefinitionList;
