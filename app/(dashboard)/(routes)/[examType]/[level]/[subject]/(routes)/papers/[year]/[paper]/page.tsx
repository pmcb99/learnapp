import PaperQuestionsByTopicPage from "@/components/paper-questions-by-topic-page";
import { JC_BUCKET_NAME, LC_BUCKET_NAME } from "/Users/paulmcbrien/Documents/Side Projects/learnapp/app/(dashboard)/(routes)/constants"
import { s3 } from "@/app/api/(s3)/client";
import axios from "axios";
import PDFViewer from "@/components/pdf-viewer";


const PastPaperPage = async (params: {
  params: {
    paper: string;
    subject: string;
    level: string;
    year: string;
    examType: string;
  };
}) => {
  const SERVER_ENDPOINT =
    process.env.SERVER_ENDPOINT || "http://localhost:3000";

  const allPapersForGivenYearPrefix =
    `${params.params.level}/${params.params.subject}/${params.params.year}`.replaceAll(
      "/",
      "%2F"
    );
  const bucket =
    params.params.examType === "lc" && params.params.level === "higher"
      ? LC_BUCKET_NAME
      : JC_BUCKET_NAME;

  const values = {
    Bucket: bucket,
    Prefix: allPapersForGivenYearPrefix,
  };
  // const files = await s3.listObjects(values).promise();

  const res = await axios.get(`/api/documents/presigned-urls`, {
    params: {
      bucket: bucket,
      prefix: allPapersForGivenYearPrefix,
    },
  });

  // const response = await axios.post('/api/conversation', { messages: values });
  const encodedPrefix = encodeURIComponent(allPapersForGivenYearPrefix);
  // const response = await axios.post('/api/documents/presigned-urls/', { Bucket: LC_BUCKET_NAME, Prefix: allPapersForGivenYearPrefix});
  console.log(encodedPrefix);
  const response = await axios.post('/api/documents/presigned-urls/', { Bucket: LC_BUCKET_NAME, Prefix: "higher/biology/2017/"});

  console.log(response.data);

  // if (res.status !== 200) {
  //   throw new Error(res.statusText);
  // } else {
  //   var presignedUrls: PresignedUrl[] = await res.data();
  // }

  // console.log(presignedUrls);

  // var fileContents = files.Contents?.filter(file => file.Key?.includes(params.params.subject) && file.Key !== undefined) as AWS.S3.ObjectList

  return (
    <div className="flex justify-between h-full w-full">
      <div className="h-full w-full">
        <PaperQuestionsByTopicPage params={params.params} />
      </div>
      <div className="h-full w-full">
        <PDFViewer
          presignedUrls={presignedUrls}
          bucket={bucket}
          paperName={params.params.paper}
          year={params.params.year}
          documentId={params.params.paper}
          viewId=""
          linkId=""
        />
      </div>
    </div>
  );
};

export default PastPaperPage;
