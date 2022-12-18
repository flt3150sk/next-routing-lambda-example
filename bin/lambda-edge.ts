import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { LambdaEdgeStack } from "../lib/lambda-edge-stack";

const app = new cdk.App();
new LambdaEdgeStack(app, "LambdaEdgeStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
