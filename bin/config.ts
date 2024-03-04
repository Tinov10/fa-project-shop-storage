import { IAwsStorageStackProps } from './types';

export const stackConfig: IAwsStorageStackProps = {
  images: {
    key: {
      name: 'ph-images-key',
      description: 'EncryptionKey for PrintHelix images bucket',
    },
    keyAlias: {
      name: 'ph-images-keyAlias',
      alias: 'alias/ph-images-key',
    },
    //
    bucket: {
      name: 'ph-images-bucket',
      origin: 'https://www.lorem.com',
    },
  },

  orders: {
    key: {
      name: 'ph-orders-key',
      description: 'EncryptionKey for PrintHelix orders table',
    },
    keyAlias: { name: 'ph-orders-keyAlias', alias: 'alias/ph-orders-key' },
    //
    table: {
      name: 'ph-orders-table',
      partitionKey: 'order_id', // order_id will be generated with uuid
      //
      sortingKey: 'account_id',
      secondaryIndexes: [
        {
          indexName: 'order_id_index',
          partitionKey: 'order_id', // order_id will be generated with uuid
          sortingKey: 'order_date',
        },
        {
          indexName: 'order_date_index',
          partitionKey: 'order_date',
          sortingKey: 'shipment_date',
        },
        {
          indexName: 'shipment_date_index',
          partitionKey: 'shipment_date',
          sortingKey: 'order_date',
        },
        {
          indexName: 'account_id_index',
          partitionKey: 'account_id',
          sortingKey: 'order_id', // order_id will be generated with uuid
        },
        {
          indexName: 'order_status_index',
          partitionKey: 'order_status',
          sortingKey: 'order_date',
        },
        {
          indexName: 'receipt_email_index',
          partitionKey: 'receipt_email',
          sortingKey: 'order_id', // order_id will be generated with uuid
        },
      ],
    },
  },

  users: {
    key: {
      name: 'ph-users-key',
      description: 'EncryptionKey for PrintHelix users table',
    },
    keyAlias: { name: 'ph-users-keyAlias', alias: 'alias/ph-users-key' },

    //
    table: {
      name: 'ph-users-table',
      partitionKey: 'account_id',
      //
      secondaryIndexes: [
        {
          indexName: 'email_index',
          partitionKey: 'account_email',
        },
      ],
    },
  },
};

/*

What are the different keys used for? 

partitionKey 
key on which we will find data that’s stored inside the table (key on which we can search on)

sortingKey 
sort the data that we are searching (date —> latest / newest)

secondaryIndexes 
indexes that we can add to the table that enable to search the data with different partitionKeys and sortingKeys 

*/
