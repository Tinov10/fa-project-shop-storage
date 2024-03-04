/* eslint-disable max-lines */
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import * as ddb from 'aws-cdk-lib/aws-dynamodb';

import { EncryptionKey } from './services/key';
import { KeyAlias } from './services/keyAlias';
import { S3Bucket } from './services/bucket';
import { TableWithSorting } from './services/table-with-sorting';
import { TableWithoutSorting } from './services/table-without-sorting';

import {
  IAwsStorageStackProps,
  ISecondaryIndexesWithSortingKey,
  ISecondaryIndexesWithoutSortingKey,
} from '../bin/types';

export class AwsStorageStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: IAwsStorageStackProps) {
    super(scope, id, props);

    /*-----------Images------------------- */

    const imagesKey = EncryptionKey(this, {
      name: props.images.key.name,
      description: props.images.key.description,
    });

    const imagesKeyAlias = KeyAlias(this, {
      key: imagesKey,
      name: props.images.keyAlias.name,
      alias: props.images.keyAlias.alias,
    });

    const imagesBucket = S3Bucket(this, {
      key: imagesKey,
      origin: props.images.bucket.origin,
      name: props.images.bucket.name,
    });

    /*------------------Users -------------------- */

    const usersKey = EncryptionKey(this, {
      name: props.users.key.name,
      description: props.users.key.description,
    });

    const usersKeyAlias = KeyAlias(this, {
      key: usersKey,
      name: props.users.keyAlias.name,
      alias: props.users.keyAlias.alias,
    });

    const usersTableWithoutSorting = TableWithoutSorting(this, {
      name: props.users.table.name,
      partitionKey: props.users.table.partitionKey,
      encryptionKey: usersKey,
    });

    // Add secondary indexes to the users table
    props.users.table.secondaryIndexes.map(
      //
      (secondaryIndex: ISecondaryIndexesWithoutSortingKey) => {
        //
        usersTableWithoutSorting.addGlobalSecondaryIndex({
          //
          indexName: secondaryIndex.indexName, // indexName
          //
          partitionKey: {
            name: secondaryIndex.partitionKey, // partitionKey
            type: ddb.AttributeType.STRING,
          },
        });
      }
    );

    /*-----------Orders------------------- */

    const ordersKey = EncryptionKey(this, {
      name: props.orders.key.name,
      description: props.orders.key.description,
    });

    const ordersKeyAlias = KeyAlias(this, {
      key: ordersKey,
      name: props.orders.keyAlias.name,
      alias: props.orders.keyAlias.alias,
    });

    const ordersTableWithSorting = TableWithSorting(this, {
      name: props.orders.table.name,
      partitionKey: props.orders.table.partitionKey,
      sortingKey: props.orders.table.sortingKey,
      encryptionKey: ordersKey,
    });

    // Add secondary indexes to the orders table
    props.orders.table.secondaryIndexes.map(
      (secondaryIndex: ISecondaryIndexesWithSortingKey) => {
        //
        ordersTableWithSorting.addGlobalSecondaryIndex({
          //
          indexName: secondaryIndex.indexName, // indexName
          partitionKey: {
            name: secondaryIndex.partitionKey, // partitionKey
            type: ddb.AttributeType.STRING,
          },
          //
          sortKey: {
            name: secondaryIndex.sortingKey, // sortingKey
            type: ddb.AttributeType.STRING,
          },
        });
      }
    );
  }
}

/*

The users table has no sorting key. What is the effect of this? When we update a field inside the userstable inside 1 of the stepfunctions we only have the users account id --> sub. And we call the accountId / sub the PARTITIONKEY (primary key). If we included a sorting key we also need this sorting key to update the field. But we don't have it at this moment. Therefore we don't use a sorting key inside the users table. 

Why adding a secondary index? So we can also find users with another field than the partitionKey / PrimaryKey / sub / usersId. In this case we also want to search by email. 

*/
