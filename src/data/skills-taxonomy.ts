import type { SkillCategory, SkillRole, SkillTag } from '@/types/skill';

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'フロントエンド',
    description: 'UI設計と体験設計を中心とした開発領域。',
  },
  {
    id: 'backend',
    label: 'バックエンド',
    description: 'API設計やデータ処理を中心としたサーバー領域。',
  },
  {
    id: 'database',
    label: 'データベース',
    description: 'スキーマ設計やクエリ最適化などのデータ基盤。',
  },
  {
    id: 'cloud',
    label: 'クラウド',
    description: 'サーバーレスやクラウド運用を中心とした基盤。',
  },
  {
    id: 'infra',
    label: 'インフラ・DevOps',
    description: '開発環境やCI/CDなどの運用基盤。',
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
];
