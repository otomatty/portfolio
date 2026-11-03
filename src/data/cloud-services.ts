import type { CloudServiceId } from '@/types/works';

export type CloudVendor = 'cloudflare' | 'aws' | 'external';

export interface CloudService {
  name: string;
  vendor: CloudVendor;
  /** public からのアイコンのパス */
  icon: string;
}

/**
 * 構成図に置くサービスの名前とアイコン。
 * AWS は AWS Architecture Icons、Cloudflare は Cloudflare Docs のアイコン（CC BY 4.0）を色だけ変えて使う。
 */
export const CLOUD_SERVICES: Record<CloudServiceId, CloudService> = {
  browser: { name: 'ブラウザ', vendor: 'external', icon: '/icons/cloud/browser.svg' },
  google: { name: 'Google ログイン', vendor: 'external', icon: '/images/oauth/google.webp' },
  llm: { name: 'LLM API', vendor: 'external', icon: '/icons/cloud/llm.svg' },

  'cloudflare-workers': { name: 'Workers', vendor: 'cloudflare', icon: '/icons/cloud/cloudflare-workers.svg' },
  'cloudflare-static-assets': { name: 'Static Assets', vendor: 'cloudflare', icon: '/icons/cloud/cloudflare-cdn.svg' },
  'cloudflare-d1': { name: 'D1', vendor: 'cloudflare', icon: '/icons/cloud/cloudflare-d1.svg' },
  'cloudflare-r2': { name: 'R2', vendor: 'cloudflare', icon: '/icons/cloud/cloudflare-r2.svg' },
  'cloudflare-durable-objects': { name: 'Durable Objects', vendor: 'cloudflare', icon: '/icons/cloud/cloudflare-durable-objects.svg' },
  'cloudflare-kv': { name: 'KV', vendor: 'cloudflare', icon: '/icons/cloud/cloudflare-kv.svg' },
  'cloudflare-queues': { name: 'Queues', vendor: 'cloudflare', icon: '/icons/cloud/cloudflare-queues.svg' },
  'cloudflare-cron': { name: 'Cron Triggers', vendor: 'cloudflare', icon: '/icons/cloud/cloudflare-cron.svg' },
  'cloudflare-browser-rendering': { name: 'Browser Rendering', vendor: 'cloudflare', icon: '/icons/cloud/cloudflare-browser-rendering.svg' },
  'cloudflare-email': { name: 'Email Service', vendor: 'cloudflare', icon: '/icons/cloud/cloudflare-email.svg' },
  'cloudflare-workers-ai': { name: 'Workers AI', vendor: 'cloudflare', icon: '/icons/cloud/cloudflare-workers-ai.svg' },
  'cloudflare-images': { name: 'Images', vendor: 'cloudflare', icon: '/icons/cloud/cloudflare-images.svg' },
  'cloudflare-pages': { name: 'Pages', vendor: 'cloudflare', icon: '/icons/cloud/cloudflare-pages.svg' },

  'aws-cloudfront': { name: 'CloudFront', vendor: 'aws', icon: '/icons/cloud/aws-cloudfront.svg' },
  'aws-s3': { name: 'S3', vendor: 'aws', icon: '/icons/cloud/aws-s3.svg' },
  'aws-api-gateway': { name: 'API Gateway', vendor: 'aws', icon: '/icons/cloud/aws-api-gateway.svg' },
  'aws-api-gateway-websocket': { name: 'API Gateway（WebSocket）', vendor: 'aws', icon: '/icons/cloud/aws-api-gateway.svg' },
  'aws-lambda': { name: 'Lambda', vendor: 'aws', icon: '/icons/cloud/aws-lambda.svg' },
  'aws-aurora': { name: 'Aurora Serverless', vendor: 'aws', icon: '/icons/cloud/aws-aurora.svg' },
  'aws-dynamodb': { name: 'DynamoDB', vendor: 'aws', icon: '/icons/cloud/aws-dynamodb.svg' },
  'aws-elasticache': { name: 'ElastiCache', vendor: 'aws', icon: '/icons/cloud/aws-elasticache.svg' },
  'aws-sqs': { name: 'SQS', vendor: 'aws', icon: '/icons/cloud/aws-sqs.svg' },
  'aws-ses': { name: 'SES', vendor: 'aws', icon: '/icons/cloud/aws-ses.svg' },
  'aws-eventbridge': { name: 'EventBridge Scheduler', vendor: 'aws', icon: '/icons/cloud/aws-eventbridge.svg' },
  'aws-step-functions': { name: 'Step Functions', vendor: 'aws', icon: '/icons/cloud/aws-step-functions.svg' },
  'aws-cognito': { name: 'Cognito', vendor: 'aws', icon: '/icons/cloud/aws-cognito.svg' },
  'aws-appsync': { name: 'AppSync', vendor: 'aws', icon: '/icons/cloud/aws-appsync.svg' },
  'aws-fargate': { name: 'Fargate', vendor: 'aws', icon: '/icons/cloud/aws-fargate.svg' },
  'aws-secrets-manager': { name: 'Secrets Manager', vendor: 'aws', icon: '/icons/cloud/aws-secrets-manager.svg' },
  'aws-bedrock': { name: 'Bedrock', vendor: 'aws', icon: '/icons/cloud/aws-bedrock.svg' },
  'aws-opensearch': { name: 'OpenSearch', vendor: 'aws', icon: '/icons/cloud/aws-opensearch.svg' },
};
