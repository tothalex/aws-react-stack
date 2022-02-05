import { Construct } from 'constructs'
import {
  CloudFrontWebDistribution,
  CloudFrontAllowedMethods,
  CloudFrontAllowedCachedMethods,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront'
import { IBucket } from 'aws-cdk-lib/aws-s3'

export const createDistribution = (props: {
  scope: Construct
  name: string
  bucket: IBucket
}) => {
  const distribution = new CloudFrontWebDistribution(
    props.scope,
    `${props.name}-distribution`,
    {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: props.bucket,
          },
          behaviors: [
            {
              isDefaultBehavior: true,
              compress: true,
              allowedMethods: CloudFrontAllowedMethods.ALL,
              cachedMethods: CloudFrontAllowedCachedMethods.GET_HEAD_OPTIONS,
              forwardedValues: {
                queryString: true,
                cookies: {
                  forward: 'none',
                },
                headers: [
                  'Access-Control-Request-Headers',
                  'Access-Control-Request-Method',
                  'Origin',
                ],
              },
            },
          ],
        },
      ],
      viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    },
  )

  return distribution
}
