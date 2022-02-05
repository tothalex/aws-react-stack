import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'

export const createBucket = (props: { scope: Construct; name: string }) => {
  const bucket = new Bucket(props.scope, `${props.name}-bucket`, {
    publicReadAccess: true,
    websiteIndexDocument: 'index.html',
    websiteErrorDocument: 'index.html',
  })

  const cfnBucket = bucket.node.findChild('Resource') as CfnBucket
  cfnBucket.addPropertyOverride('CorsConfiguration', {
    CorsRules: [
      {
        AllowedOrigins: ['*'],
        AllowedMethods: ['HEAD', 'GET', 'PUT', 'POST', 'DELETE'],
        ExposedHeaders: [
          'x-amz-server-side-encryption',
          'x-amz-request-id',
          'x-amz-id-2',
        ],
        AllowedHeaders: ['*'],
      },
    ],
  })

  return bucket
}
