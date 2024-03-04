import { StackProps } from 'aws-cdk-lib';

export interface IAwsStorageStackProps extends StackProps {
  orders: ITableWithSortingKey;
  users: ITableWithoutSortingKey;
  images: IBucket;
}

export interface ITableWithSortingKey {
  key: IKms;
  keyAlias: IAlias;
  table: {
    name: string;
    partitionKey: string;
    secondaryIndexes: ISecondaryIndexesWithSortingKey[];
    sortingKey: string;
  };
}

export interface ITableWithoutSortingKey {
  key: IKms;
  keyAlias: IAlias;
  table: {
    name: string;
    partitionKey: string;
    secondaryIndexes: ISecondaryIndexesWithoutSortingKey[];
  };
}

export interface IBucket {
  key: IKms;
  keyAlias: IAlias;
  bucket: {
    name: string;
    origin: string;
  };
}

export interface ISecondaryIndexesWithSortingKey {
  indexName: string;
  partitionKey: string;
  sortingKey: string;
}

export interface ISecondaryIndexesWithoutSortingKey {
  indexName: string;
  partitionKey: string;
}

export interface IKms {
  name: string;
  description: string;
}

export interface IAlias {
  name: string;
  alias: string;
}
