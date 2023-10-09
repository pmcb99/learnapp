import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { s3 } from "../../(s3)/client";
import { client } from "@/lib/redis";

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
  await client.connect();
  const redisValue = await client.get(redisKey);
  if (redisValue) {
    console.log("Already in Redis")
    const presignedUrls = JSON.parse(redisValue);
    return NextResponse.json({ presignedUrls });
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
    await client.set(redisKey, JSON.stringify(presignedUrls), {
      "EX": 3600
    });
  }
  await client.disconnect();

  console.log(presignedUrls)
  return NextResponse.json({ presignedUrls });

  } catch (error) {
    console.log("[GET_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(
  req: Request,
) {
  // Get all files from S3 for the given bucket and prefix, and return a presigned URL for each, cached in Redis for 1 hour
  const { Bucket, Key }= await req.json();
  // console.log(searchParams.get('bucket'));
  // console.log(searchParams.get('key'));
  try {
    console.log(Bucket);
    console.log(Key);
  //   const { userId } = auth();
  //   if (!userId) {
  //     return new NextResponse("Unauthorized", { status: 401 });
    // }

  // const values = {
  //   Bucket: params.bucket,
  //   Prefix: params.key
  // }

  // const files = await s3.listObjects(values).promise();
  // if (!files || !files.Contents ) {
  //   return new NextResponse("[ERROR] No files found.", { status: 404 });
  // }

  // // get the presigned URLs from redis
  // const redisKey = `${params.bucket}:${params.key}`;
  // const redisValue = await client.get(redisKey);
  // if (redisValue) {
  //   const presignedUrls = JSON.parse(redisValue);
  //   return NextResponse.json({ presignedUrls });
  // }

  // // iterate over files and create a presigned URL for each
  // const presignedUrls = files.Contents.map((file) => {
  //   const url = s3.getSignedUrl("getObject", {
  //     Bucket: params.bucket,
  //     Key: file.Key,
  //     Expires: 3600,
  //   });
  //   return { url, bucket: params.bucket, key: file.Key}
  // });

  // if (!presignedUrls) {
  //   return new NextResponse("[ERROR] No presigned URLs found.", { status: 404 });
  // }

  // if (!redisValue){
  //   await client.set(redisKey, JSON.stringify(presignedUrls), {
  //     "EX": 3600
  //   });
  // }

  // return NextResponse.json({ presignedUrls });

  return NextResponse.json({ presignedUrls: "test" });

  } catch (error) {
    console.log("[GET_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

