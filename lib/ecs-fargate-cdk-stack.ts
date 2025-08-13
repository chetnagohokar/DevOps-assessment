import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';

export class EcsFargateCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'Vpc', { maxAzs: 2 });

    const cluster = new ecs.Cluster(this, 'Cluster', { vpc });

    new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'FargateService', {
      cluster,
      memoryLimitMiB: 512,
      cpu: 256,
      desiredCount: 1,
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry('<470715245179.dkr.ecr.ap-south-1.amazonaws.com/simple-nodejs:30a245fe142a460fba5abf726b78eeb6ebc7f641>'),
        containerPort: 3000,
      },
      publicLoadBalancer: true,
    });
  }
}
