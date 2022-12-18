import { Stack, StackProps, aws_lambda_nodejs as lambda } from "aws-cdk-lib";
import { Construct } from "constructs";

export class LambdaEdgeStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    new lambda.NodejsFunction(this, "RedirectS3Lambda", {
      entry: "lambda/index.ts",
    });
  }
}
