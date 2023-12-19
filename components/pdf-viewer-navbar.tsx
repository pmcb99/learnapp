import React from "react";
import { Button } from "./ui/button";
import { TopicButton } from "./topic-button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PaperNavigationBar from "@/app/(dashboard)/(routes)/[examType]/[level]/(withoutSidebar)/paper-navigation-bar";

export function Nav({
  pageNumber,
  numPages,
  pdfName,
  topicComponent,
  topicComponentProps,
  nextPageFunc,
  prevPageFunc,
  visiblePage,
}: {
  pageNumber: number;
  numPages: number;
  pdfName: string;
  topicComponent: any;
  topicComponentProps: any;
  nextPageFunc: any;
  prevPageFunc: any;
  visiblePage: number;
}) {
  const TopicComponent = topicComponent;

  return (
    <nav className="flex md:flex-row flex-col bg-primary w-full rounded-xl items-center justify-center text-center gap-y-2 h-auto md:py-2 py-4 px-4">
      <div className="flex flex-col">
        <PaperNavigationBar />
      <div>

      <div>
        <p className="text-2xl font-bold text-white dark:text-black mr-3">
          {pdfName.replace("_", " ")}
        </p>
      </div>

      <div className="flex justify-between gap-x-3">


      <Button onClick={prevPageFunc}
        disabled={visiblePage <= 1}
        // className="focus:z-20 gap-x-3 ml-4"
        variant={"hollow"}
      >
        {<ArrowLeft className="w-5 h-5" />}
        Previous Page
      </Button>

      <TopicButton
        topicComponent={TopicComponent}
        topicComponentProps={topicComponentProps}
      />


      <Button 
      onClick={nextPageFunc}
      disabled={visiblePage >= numPages!}
      // className="focus:z-20 gap-x-3"
      variant={"hollow"}
      >
        Next Page
        {<ArrowRight className="w-5 h-5 hover:scale-105" />}
      </Button>
</div>
      {/* <div className="flex items-center ">
              <div className="bg-primary/60 text-black rounded-md px-3 py-2 text-sm font-medium"> */}
      {/* <span>{pageNumber}</span> */}
      {/* <span className="text-black-400"> / {numPages}</span> */}
      {/* </div> */}
      {/* </div> */}
</div>

</div>
    </nav>
  );
}
