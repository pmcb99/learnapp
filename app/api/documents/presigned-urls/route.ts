import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { s3 } from "../../(s3)/client";
import { Redis } from '@upstash/redis';

export async function GET(
  req: Request,
) {
  const { searchParams } = new URL(req.url)
  const bucket = searchParams.get('Bucket')
  const keyDashed = searchParams.get('Prefix') as string;
  const keySlashed = keyDashed.replaceAll(/_/g, '/')

  console.log("keySlashed", keySlashed)

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


  // filter any files that are not PDFs
  const filteredFiles = files.Contents.filter((file) => {
    // skip any undefined files
    return file.Key && file.Key.endsWith(".pdf");
  });

  // get the presigned URLs from redis
  // const redis = Redis.fromEnv();
  // const redisKey = `${bucket}:${keySlashed}`;

  // // const cachedValue = (await redis.get(redisKey)) as string | null;
  // const cachedValue = null;

  // if (cachedValue != null) {
  //   console.log("In Redis")
  //   return NextResponse.json({ presignedUrls: cachedValue});
  // } else {
  //   console.log("Not in Redis")
  // }

  // iterate over files and create a presigned URL for each
  const presignedUrls = files.Contents
  .filter((file) => file.Key && file.Key.endsWith(".pdf")) // filter any files that do not end with ".pdf"
  .map((file) => {
    const url = s3.getSignedUrl("getObject", {
      Bucket: values.Bucket,
      Key: file.Key,
      Expires: 3600*10,
    });
    return { url, bucket: values.Bucket, key: file.Key };
  });

  if (!presignedUrls) {
    return new NextResponse("[ERROR] No presigned URLs found.", { status: 404 });
  }

  // (async () => {
  //   try {
  //     const data = await redis.set(redisKey, JSON.stringify(presignedUrls))
  //     await redis.expire(redisKey, 3558)
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // })();

  return NextResponse.json({ presignedUrls });

  } catch (error) {
    console.log("[GET_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
