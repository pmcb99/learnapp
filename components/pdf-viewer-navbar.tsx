import React from "react";
import { Button } from "./ui/button";
import { TopicButton } from "./topic-button";

export function Nav({
  pageNumber,
  numPages,
  pdfName,
  topicComponent,
  topicComponentProps,
}: {
  pageNumber: number;
  numPages: number;
  pdfName: string;
  topicComponent: any;
  topicComponentProps: any;
}) {
  const TopicComponent = topicComponent;

  return (
    <nav className="flex md:flex-row flex-col bg-primary w-full md:h-24 rounded-xl items-center justify-center text-center gap-y-2 h-auto md:py-0 py-4">
      <div>
        <p className="text-2xl font-bold text-white dark:text-black">
          {pdfName.replace("_", " ")}
        </p>
      </div>

      <TopicButton
        topicComponent={TopicComponent}
        topicComponentProps={topicComponentProps}
      />
      {/* <div className="flex items-center ">
              <div className="bg-primary/60 text-black rounded-md px-3 py-2 text-sm font-medium"> */}
      {/* <span>{pageNumber}</span> */}
      {/* <span className="text-black-400"> / {numPages}</span> */}
      {/* </div> */}
      {/* </div> */}
    </nav>
  );
}
