import { Stack, RemovalPolicy } from 'aws-cdk-lib';
import { Key } from 'aws-cdk-lib/aws-kms';

interface IKmsProps {
  name: string;
  description: string;
}

export const EncryptionKey = (stack: Stack, props: IKmsProps) => {
  return new Key(stack, props.name, {
    removalPolicy: RemovalPolicy.DESTROY, // change for production
    enableKeyRotation: true,
    description: props.description,
  });
};
