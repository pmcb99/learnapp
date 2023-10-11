import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { s3 } from "../../(s3)/client";
import { redisClient } from "@/lib/redis";

export async function GET(
  req: Request,
) {
  const { searchParams } = new URL(req.url)
  const bucket = searchParams.get('Bucket')
  const keyDashed = searchParams.get('Prefix') as string;
  const keySlashed = keyDashed.replaceAll(/-/g, '/')

  if (!bucket || !keyDashed) {
    return new NextResponse("[ERROR] Missing bucket or key.", { status: 400 });
  }

  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

  const values = {
    Bucket: bucket,
    Prefix: keySlashed
  }

  const files = await s3.listObjects(values).promise();
  if (!files || !files.Contents ) {
    return new NextResponse("[ERROR] No files found.", { status: 404 });
  }

  // get the presigned URLs from redis
  const redisKey = `${bucket}:${keySlashed}`;
  try {
    const redisValue = await redisClient.get(redisKey);
    if (redisValue) {
      console.log("Already in Redis")
      const presignedUrls = JSON.parse(redisValue);
      return NextResponse.json({ presignedUrls });
    }
  } catch (error) {
      console.log("[REDIS_GET_ERROR]", error);
  } 

  // iterate over files and create a presigned URL for each
  const presignedUrls = files.Contents.map((file) => {
    const url = s3.getSignedUrl("getObject", {
      Bucket: values.Bucket,
      Key: file.Key,
      Expires: 3600,
    });
    return { url, bucket: values.Bucket, key: file.Key}
  });

  if (!presignedUrls) {
    return new NextResponse("[ERROR] No presigned URLs found.", { status: 404 });
  }

  // if (!redisValue && presignedUrls){
  if (presignedUrls){
    try {
      await redisClient.set(redisKey, JSON.stringify(presignedUrls), {
        "EX": 3600
      });
    } catch (error) {
      console.log("[REDIS_SET_ERROR]", error);
    } 
  }

  console.log(presignedUrls)
  return NextResponse.json({ presignedUrls });

  } catch (error) {
    console.log("[GET_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
