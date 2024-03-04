import { Stack, RemovalPolicy } from 'aws-cdk-lib';
import { Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';

export interface IBucketProps {
  key: any;
  origin: string;
  name: string;
}

export const S3Bucket = (stack: Stack, props: IBucketProps) => {
  return new Bucket(stack, props.name, {
    bucketName: props.name,
    encryptionKey: props.key,
    versioned: true,
    encryption: BucketEncryption.KMS,
    removalPolicy: RemovalPolicy.DESTROY, // change for production
    enforceSSL: true,
    serverAccessLogsPrefix: 'access-logs',
  });
};
