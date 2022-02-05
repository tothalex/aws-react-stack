import { Construct } from 'constructs'
import { IBucket } from 'aws-cdk-lib/aws-s3'
import { IDistribution } from 'aws-cdk-lib/aws-cloudfront'
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment'

export const createDeployment = (props: {
  scope: Construct
  name: string
  entry: string
  bucket: IBucket
  distribution: IDistribution
}) => {
  const deployment = new BucketDeployment(
    props.scope,
    `${props.name}-deployment`,
    {
      sources: [Source.asset(props.entry)],
      destinationBucket: props.bucket,
      distribution: props.distribution,
      distributionPaths: ['/*'],
    },
  )

  return deployment
}
