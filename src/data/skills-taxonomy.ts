import type {
  SkillCategory,
  SkillCategoryGroup,
  SkillRole,
  SkillTag,
} from '@/types/skill';

/**
 * 大カテゴリ（視覚的なグループ分け）
 */
export const skillCategoryGroups: SkillCategoryGroup[] = [
  {
    id: 'frontend',
    label: 'フロントエンド',
    description: 'UI/UX開発に関連する技術',
    categoryIds: [
      'language',
      'frontend-framework',
      'frontend-styling',
      'frontend-state',
      'frontend-ui',
      'frontend-animation',
      'frontend-form',
      'frontend-testing',
      'frontend-tooling',
    ],
  },
  {
    id: 'backend',
    label: 'バックエンド',
    description: 'サーバーサイド・データ処理に関連する技術',
    categoryIds: [
      'backend-runtime',
      'backend-baas',
      'backend-api',
      'database',
      'orm',
    ],
  },
  {
    id: 'infra',
    label: 'インフラ・DevOps',
    description: 'インフラ・運用に関連する技術',
    categoryIds: ['cloud', 'container', 'cicd', 'monitoring'],
  },
  {
    id: 'other',
    label: 'その他',
    description: 'デザイン・マネジメント・AIツール等',
    categoryIds: ['design', 'management', 'ai-tools'],
  },
];

/**
 * サブカテゴリ（詳細な分類）
 */
export const skillCategories: SkillCategory[] = [
  // ===== プログラミング言語 =====
  {
    id: 'language',
    groupId: 'frontend',
    label: 'プログラミング言語',
    description: 'Web開発で使用する言語',
  },

  // ===== フロントエンド =====
  {
    id: 'frontend-framework',
    groupId: 'frontend',
    label: 'フレームワーク',
    description: 'UIフレームワーク・メタフレームワーク',
  },
  {
    id: 'frontend-styling',
    groupId: 'frontend',
    label: 'スタイリング',
    description: 'CSS/スタイリング関連ツール',
  },
  {
    id: 'frontend-state',
    groupId: 'frontend',
    label: '状態管理',
    description: '状態管理ライブラリ',
  },
  {
    id: 'frontend-ui',
    groupId: 'frontend',
    label: 'UIライブラリ',
    description: 'UIコンポーネントライブラリ',
  },
  {
    id: 'frontend-animation',
    groupId: 'frontend',
    label: 'アニメーション',
    description: 'アニメーション・モーションライブラリ',
  },
  {
    id: 'frontend-form',
    groupId: 'frontend',
    label: 'フォーム',
    description: 'フォーム・バリデーション',
  },
  {
    id: 'frontend-testing',
    groupId: 'frontend',
    label: 'テスト',
    description: 'テストフレームワーク',
  },
  {
    id: 'frontend-tooling',
    groupId: 'frontend',
    label: '開発ツール',
    description: 'ビルドツール・Linter等',
  },

  // ===== バックエンド =====
  {
    id: 'backend-runtime',
    groupId: 'backend',
    label: 'ランタイム',
    description: 'JavaScript/TypeScriptランタイム',
  },
  {
    id: 'backend-baas',
    groupId: 'backend',
    label: 'BaaS',
    description: 'Backend as a Service',
  },
  {
    id: 'backend-api',
    groupId: 'backend',
    label: 'APIフレームワーク',
    description: 'API構築フレームワーク',
  },
  {
    id: 'database',
    groupId: 'backend',
    label: 'データベース',
    description: 'RDBMS・NoSQL',
  },
  {
    id: 'orm',
    groupId: 'backend',
    label: 'ORM',
    description: 'ORM・クエリビルダー',
  },

  // ===== インフラ・DevOps =====
  {
    id: 'cloud',
    groupId: 'infra',
    label: 'クラウド',
    description: 'クラウドプラットフォーム',
  },
  {
    id: 'container',
    groupId: 'infra',
    label: 'コンテナ',
    description: 'コンテナ技術',
  },
  {
    id: 'cicd',
    groupId: 'infra',
    label: 'CI/CD',
    description: '継続的インテグレーション・デプロイ',
  },
  {
    id: 'monitoring',
    groupId: 'infra',
    label: '監視',
    description: '監視・ロギング',
  },

  // ===== その他 =====
  {
    id: 'design',
    groupId: 'other',
    label: 'デザイン',
    description: 'デザインツール',
  },
  {
    id: 'management',
    groupId: 'other',
    label: 'マネジメント',
    description: 'プロジェクト管理',
  },
  {
    id: 'ai-tools',
    groupId: 'other',
    label: 'AIツール',
    description: 'AI支援開発ツール・エージェント',
  },
];

export const skillRoles: SkillRole[] = [
  {
    id: 'frontend',
    label: 'フロントエンド開発',
    description: 'モダンな UI/UX を実現するための設計と実装。',
    tasks: [
      'React を使った UI 設計と実装',
      'コンポーネント設計とデザインシステム運用',
      'パフォーマンス改善（Core Web Vitals 対応）',
      'アクセシビリティを意識した実装',
    ],
  },
  {
    id: 'backend',
    label: 'バックエンド開発',
    description: 'API とデータベースを中心としたサービス開発。',
    tasks: [
      'REST API の設計と実装',
      '認証・認可の設計と運用',
      'データベース設計と最適化',
      'バッチ処理やジョブの設計',
    ],
  },
  {
    id: 'infra',
    label: 'インフラ・DevOps',
    description: 'クラウド基盤と開発環境の整備。',
    tasks: [
      'サーバーレス基盤の設計・運用',
      'CI/CD パイプラインの整備',
      'Docker を用いた環境構築',
      '監視・ログの設計',
    ],
  },
  {
    id: 'design',
    label: 'UI/UXデザイン',
    description: 'ユーザー体験を重視したデザインと設計。',
    tasks: [
      'Figma を使った UI デザイン',
      'プロトタイピングとユーザーテスト',
      'デザインシステムの構築・運用',
      'アクセシビリティを考慮した設計',
    ],
  },
];

export const skillTags: SkillTag[] = [
  { id: 'ui', label: 'UI' },
  { id: 'state', label: 'State Management' },
  { id: 'performance', label: 'Performance' },
  { id: 'type-safety', label: 'Type Safety' },
  { id: 'tooling', label: 'Tooling' },
  { id: 'ssr', label: 'SSR/SSG' },
  { id: 'api', label: 'API' },
  { id: 'runtime', label: 'Runtime' },
  { id: 'database', label: 'Database' },
  { id: 'baas', label: 'BaaS' },
  { id: 'auth', label: 'Auth' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'serverless', label: 'Serverless' },
  { id: 'container', label: 'Container' },
  { id: 'ai', label: 'AI' },
  { id: 'agent', label: 'Agent' },
  { id: 'consulting', label: 'Consulting' },
];
