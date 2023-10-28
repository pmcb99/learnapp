
type BucketName = typeof LC_BUCKET_NAME | typeof JC_BUCKET_NAME;

export interface PresignedUrl {
    url: string;
    bucket: BucketName;
    key: string;
  }