import { Stack } from 'aws-cdk-lib';
import { Alias } from 'aws-cdk-lib/aws-kms';
import { IKey } from 'aws-cdk-lib/aws-kms';

interface IKeyAliasProps {
  key: IKey;
  alias: string;
  name: string;
}

export const KeyAlias = (stack: Stack, props: IKeyAliasProps) => {
  return new Alias(stack, props.name, {
    aliasName: props.alias,
    targetKey: props.key,
  });
};
