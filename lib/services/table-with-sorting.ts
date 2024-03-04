import { Stack, RemovalPolicy } from 'aws-cdk-lib';
import {
  Table,
  BillingMode,
  AttributeType,
  TableEncryption,
} from 'aws-cdk-lib/aws-dynamodb';
import * as kms from 'aws-cdk-lib/aws-kms';

interface ITableWithSortingProps {
  partitionKey: string;
  encryptionKey: kms.IKey;
  name: string;

  sortingKey: string;
}

export const TableWithSorting = (
  stack: Stack,
  props: ITableWithSortingProps
) => {
  return new Table(stack, props.name, {
    //
    tableName: props.name,
    billingMode: BillingMode.PAY_PER_REQUEST,
    encryption: TableEncryption.CUSTOMER_MANAGED,
    //
    encryptionKey: props.encryptionKey,
    removalPolicy: RemovalPolicy.DESTROY, // change for production
    //
    //
    sortKey: {
      name: props.sortingKey,
      type: AttributeType.STRING,
    },

    partitionKey: {
      name: props.partitionKey,
      type: AttributeType.STRING,
    },
  });
};
