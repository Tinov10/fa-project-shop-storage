import { Stack, RemovalPolicy } from 'aws-cdk-lib';
import {
  Table,
  BillingMode,
  AttributeType,
  TableEncryption,
} from 'aws-cdk-lib/aws-dynamodb';
import { IKey } from 'aws-cdk-lib/aws-kms';

interface ITableWithoutSortingProps {
  partitionKey: string;
  encryptionKey: IKey;
  name: string;
}

export const TableWithoutSorting = (
  stack: Stack,
  props: ITableWithoutSortingProps
) => {
  return new Table(stack, props.name, {
    //
    tableName: props.name,
    billingMode: BillingMode.PAY_PER_REQUEST,
    // sortKey
    partitionKey: {
      name: props.partitionKey,
      type: AttributeType.STRING,
    },
    encryption: TableEncryption.CUSTOMER_MANAGED,
    encryptionKey: props.encryptionKey,
    removalPolicy: RemovalPolicy.DESTROY, // change for production
  });
};
