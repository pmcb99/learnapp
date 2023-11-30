import { getBucketName } from "@/app/constants";
import { PresignedUrl } from "@/types/global";
import PaperViewPage from "@/components/paper-view-page";
import { getPresignedUrls } from "../../../../server";

interface PageParams {
  examType: string;
  level: string;
  subject: string;
  year: string;
  paper: string;
}

export default async function MultiYearPage({
  params,
}: {
  params: PageParams;
}) {
  const bucketName = getBucketName(params.examType);
  const allSubjectPresignedUrls: PresignedUrl[] = await getPresignedUrls(
    params.level,
    params.subject,
    bucketName
  )

  return <PaperViewPage params={params} presignedUrls={allSubjectPresignedUrls} />;
}
