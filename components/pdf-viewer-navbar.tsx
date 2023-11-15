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
    topicComponentProps: any
  }) {
    
    const TopicComponent = topicComponent;

    return (
      <nav className="bg-primary w-full h-24 rounded-xl">

        <div className="mx-auto px-2 sm:px-6 lg:px-8 h-full flex flex-col justify-center">

          <div className="relative flex h-16 items-center justify-between text-center">
            <div className="flex flex-1 items-center justify-center ">
              <div className="flex flex-col flex-shrink-0 items-center justify-center">
                <p className="text-2xl font-bold tracking-tighter text-white dark:text-black">
                  {pdfName.replace("_", " ")}
                </p>
              </div>

              <TopicButton topicComponent={TopicComponent} topicComponentProps={topicComponentProps}/>
            </div>
            <div className="flex items-center ">
              <div className="bg-primary/60 text-black rounded-md px-3 py-2 text-sm font-medium">
                <span>{pageNumber}</span>
                <span className="text-black-400"> / {numPages}</span>
              </div>
            </div>
          </div>

        </div>

      </nav>
    );
  }
