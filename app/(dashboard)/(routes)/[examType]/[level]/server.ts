import { s3 } from "@/app/api/(s3)/client";
import { PresignedUrl } from "@/types/global";
import { auth } from "@clerk/nextjs";
import { Redis } from "@upstash/redis/nodejs";
import axios from "axios";

export const getPresignedUrls = async (level: string, subject: string, bucket: string, year?: string | null) => {
  // sets presignedUrls to contain ALL papers for that subject and level
  // const url = `/api/documents/presigned-urls?Bucket=${LC_BUCKET_NAME}&Prefix=${level}_${subject}_2022`;
  const keySlashed = year ? `${level}/${subject}/${year}` : `${level}/${subject}`

  if (!bucket || !keySlashed) {
    throw new Error("[ERROR] Missing bucket or key.");
  }

  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

  const values = {
    Bucket: bucket,
    Prefix: keySlashed
  }

  const files = await s3.listObjects(values).promise();
  if (!files || !files.Contents ) {
    throw new Error("[ERROR]");
  }

  // get the presigned URLs from redis
  const redis = Redis.fromEnv();
  const redisKey = `${bucket}:${keySlashed}`;

  const cachedValue = (await redis.get(redisKey)) as PresignedUrl[] | null;

  if (cachedValue != null) {
    const presignedUrls: PresignedUrl[] = cachedValue;
    return presignedUrls;
  } else {
  }

  // iterate over files and create a presigned URL for each
  const presignedUrls: PresignedUrl[] = files.Contents
  .filter((file) => file.Key && file.Key.endsWith(".pdf")) // filter any files that do not end with ".pdf"
  .map((file) => {
    const url = s3.getSignedUrl("getObject", {
      Bucket: values.Bucket,
      Key: file.Key,
      Expires: 3600*10,
    });
    return { url, bucket: values.Bucket, key: file.Key! };
  });

  if (!presignedUrls) {
    throw new Error("[ERROR] No presigned URLs found.");
  }

  (async () => {
    try {
      const data = await redis.set(redisKey, JSON.stringify(presignedUrls))
      await redis.expire(redisKey, 3558)
    } catch (error) {
      console.error(error);
    }
  })();

  return presignedUrls;

  } catch (error) {
    return [];
  }
};
