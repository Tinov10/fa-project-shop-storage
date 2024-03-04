import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

import { AwsStorageStack } from '../lib/aws-storage-stack';

// inject values in to the stack
import { stackConfig } from './config';

const app = new cdk.App();

// we pass in all the props that we can use inside the stack = lib
new AwsStorageStack(app, 'AwsStackFunctionsStack', stackConfig);
