import React from "react";
import { Button } from "./ui/button";
import { PresignedUrl } from "@/types/global";



function TopicPaperToggle() {

  return (
    <>
    <div className="flex flex-col items-center font-bold p-2">
      <Button>
        Exam Paper
      </Button>
      <Button>
        Marking Scheme 
      </Button>
    </div>
    </>
  );
}

export default TopicPaperToggle;
