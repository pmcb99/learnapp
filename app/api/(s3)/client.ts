import AWS from 'aws-sdk';

// Update AWS configuration
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Store your access key id in an environment variable
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Store your secret access key in an environment variable
  region: process.env.AWS_REGION, // Store your region in an environment variable
  signatureVersion: 'v4'
});


export const s3 = new AWS.S3()
