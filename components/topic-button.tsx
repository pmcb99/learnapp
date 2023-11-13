"use client";

import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { useTopicModal } from "@/hooks/use-topic-modal";
import axios from "axios";
import { useState } from "react";
import { useProModal } from "@/hooks/use-pro-modal";
import { TopicModal } from "./topic-modal";


const TopicButton = () => {
  const topicModal = useTopicModal();
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);


  return ( 
    <div>
    {/* <Button variant="default" onClick={topicModal.onOpen} >
      Switch Topics
    </Button> */}

    <Button variant="default" onClick={() => <TopicModal/>} >
      Switch Topics
    </Button>

    <Button variant="default" onClick={proModal.onOpen} >
      Switch Topics
    </Button>
</div>
  )
}
 
export default TopicButton;