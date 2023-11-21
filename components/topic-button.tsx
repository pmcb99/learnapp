
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PaperQuestionsByTopicPage from "./paper-questions-by-topic-page"
import { PresignedUrl } from "@/types/global"
import React from "react"
import { ScrollArea } from "./ui/scroll-area"

interface TopicButtonProps {
  topicComponent: any
  topicComponentProps: any
}

export function TopicButton(
  props: TopicButtonProps
) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-3 md:hidden" variant="outline">Browse Questions</Button>
      </DialogTrigger>
      <DialogContent className="h-full mb-5">
        <ScrollArea className="h-full">
        {props.topicComponent && React.createElement(props.topicComponent, props.topicComponentProps)}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
