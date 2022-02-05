import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib'
import { Construct } from 'constructs'

import { AppProps } from './types'
import { createBucket } from './bucket'
import { createDistribution } from './distribution'
import { createDeployment } from './deployment'

export default class AwsReactStackStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    appProps: AppProps,
    stackProps?: StackProps,
  ) {
    super(scope, id, stackProps)

    const bucket = createBucket({ scope: this, name: appProps.name })

    const distribution = createDistribution({
      scope: this,
      name: appProps.name,
      bucket,
    })

    createDeployment({
      scope: this,
      name: appProps.name,
      entry: appProps.entry,
      bucket,
      distribution,
    })

    new CfnOutput(this, 'CloudFront URL', {
      value: distribution.distributionDomainName,
    })
  }
}
