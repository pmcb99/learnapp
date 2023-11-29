import * as z from "zod";
import axios from "axios";
import { set, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema, getBucketName } from "@/app/constants";
import { JC_BUCKET_NAME, LC_BUCKET_NAME } from "@/app/constants";
import PDFViewer from "@/components/pdf-viewer";
import PaperQuestionsByTopicPage from "@/components/paper-questions-by-topic-page";
import { PresignedUrl } from "@/types/global";
import { useExamDocumentStore } from "@/hooks/pdf-viewer-page-store";
import PaperViewPage from "@/components/paper-view-page";
import { revalidatePath } from "next/cache";
import { getPresignedUrls } from "../../../server";

interface PageParams {
  examType: string;
  level: string;
  subject: string;
  year: string;
  paper: string;
}

export default async function SingleYearPage({
  params,
}: {
  params: PageParams;
}) {
  const bucketName = getBucketName(params.examType);
  const allYearPresignedUrls: PresignedUrl[] = await getPresignedUrls(
    params.level,
    params.subject,
    bucketName,
    params.year
  )

  return <PaperViewPage params={params} presignedUrls={allYearPresignedUrls} />;
}
