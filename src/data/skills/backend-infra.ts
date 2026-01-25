/**
 * バックエンド・インフラスキル
 * - Node.js, バックエンドサービス
 * - データベース
 * - クラウド・インフラ
 */
import type { SkillRecord } from '@/types/skill';

export const backendInfraSkills: SkillRecord[] = [
  // バックエンド - ランタイム
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: '/icons/nodejs.svg',
    categoryIds: ['backend-runtime'],
    roleIds: ['backend'],
    tagIds: ['api', 'runtime'],
    startDate: '2021-08-01',
    summary: 'REST APIとバッチ処理を中心にサーバーサイドを担当。',
    scope: ['REST API設計', '認証・認可', '非同期処理', 'バッチ/ジョブ'],
    strengths: ['API設計', 'ログ/監視の組み込み', '運用保守対応'],
    useCases: ['社内向け業務API', '外部サービス連携'],
    learning: ['Streams API', 'パフォーマンスチューニング'],
    interests: ['Bun', 'Deno'],
  },
  // バックエンド - BaaS
  {
    id: 'supabase',
    name: 'Supabase',
    icon: '/icons/supabase/supabase-logo-icon.svg',
    categoryIds: ['backend-baas'],
    roleIds: ['backend'],
    tagIds: ['baas', 'auth'],
    startDate: '2023-03-01',
    summary: 'BaaSを活用した認証/DB/リアルタイム機能の構築。',
    scope: ['認証設計', 'RLS設計', 'リアルタイム', 'ストレージ'],
    strengths: ['RLS設計', 'SQLと認証の統合'],
    useCases: ['プロトタイプ開発', '小規模SaaS'],
    learning: ['Storage API詳細', 'Vector Database'],
    interests: ['セルフホスティング構成'],
  },
  // データベース
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    icon: '/icons/postgresql.svg',
    categoryIds: ['database'],
    roleIds: ['backend'],
    tagIds: ['database'],
    startDate: '2022-12-01',
    summary: 'スキーマ設計とクエリ最適化を中心に担当。',
    scope: ['スキーマ設計', 'クエリ最適化', '運用・保守'],
    strengths: ['正規化/非正規化の判断', 'インデックス設計'],
    useCases: ['業務データ管理', 'レポート生成'],
    learning: ['EXPLAIN ANALYZE', 'レプリケーション'],
    interests: ['PostGIS', 'TimescaleDB'],
  },
  // クラウド
  {
    id: 'aws',
    name: 'AWS',
    categoryIds: ['cloud'],
    roleIds: ['infra'],
    tagIds: ['cloud', 'serverless'],
    startDate: '2022-05-20',
    summary: 'サーバーレス構成の設計と運用を担当。',
    scope: ['サーバーレス設計', 'IAM管理', '監視設計'],
    strengths: ['Lambda/API Gateway構成', 'S3/CloudFront運用'],
    useCases: ['小規模API基盤', '静的サイト配信'],
    learning: ['AWS CDK', 'ECS/Fargate'],
    interests: ['Well-Architected Framework', 'Bedrock'],
  },
  // インフラ - コンテナ
  {
    id: 'docker',
    name: 'Docker',
    icon: '/icons/docker.svg',
    categoryIds: ['container'],
    roleIds: ['infra'],
    tagIds: ['container'],
    startDate: '2021-11-01',
    summary: '開発環境の統一とCIでの利用を中心に活用。',
    scope: ['Dockerfile作成', 'Compose運用', 'CI連携'],
    strengths: ['開発環境の再現性向上', '軽量イメージ作成'],
    useCases: ['ローカル開発環境の共通化', 'CIビルドの標準化'],
    learning: ['Kubernetes基礎', 'コンテナセキュリティ'],
    interests: ['BuildKit最適化'],
  },
  // CI/CD
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    icon: '/icons/github.svg',
    categoryIds: ['cicd'],
    roleIds: ['infra'],
    tagIds: ['tooling'],
    startDate: '2022-01-01',
    summary: 'CI/CDパイプラインの構築と運用。',
    scope: ['ワークフロー設計', 'カスタムアクション', '自動デプロイ'],
    strengths: ['マトリックスビルド', 'キャッシュ最適化'],
    useCases: ['自動テスト', 'デプロイ自動化', 'コード品質チェック'],
    learning: ['Reusable Workflows', 'OIDC認証'],
    interests: ['Self-hosted Runners'],
  },
  // Git
  {
    id: 'git',
    name: 'Git',
    icon: '/icons/git.svg',
    categoryIds: ['frontend-tooling'],
    roleIds: ['frontend', 'backend', 'infra'],
    tagIds: ['tooling'],
    startDate: '2020-12-01',
    summary: 'バージョン管理とチーム開発のワークフロー構築。',
    scope: ['ブランチ戦略', 'マージ/リベース', 'コンフリクト解消'],
    strengths: ['Git Flow / GitHub Flow運用', 'コミット履歴の整理'],
    useCases: ['チーム開発', 'コードレビュー', 'リリース管理'],
    learning: ['git bisect', 'git worktree'],
    interests: ['Conventional Commits自動化'],
  },
];
