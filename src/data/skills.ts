import type { Skill } from '@/types/skill';

export const skillsData: Skill[] = [
  {
    id: 'react',
    name: 'React',
    category: 'Framework/Library',
    startDate: '2021-04-01',
    projectCount: 3,
    repositoryCount: 5,
    articleCount: 2,
    icon: 'react.svg',
    description:
      'コンポーネントベースのUI構築、状態管理、パフォーマンス最適化。',
    strengths: [
      '状態管理 (Zustand, Jotai)',
      'カスタムフックによるロジック分離',
      'パフォーマンスチューニング (memo, useMemo, useCallback)',
    ],
    relatedLinks: [
      {
        type: 'project',
        name: 'ワークス: ポートフォリオサイト',
        url: '/works/portfolio',
      },
      {
        type: 'repository',
        name: 'GitHub: ポートフォリオコード',
        url: 'https://github.com/your-username/portfolio',
      },
      {
        type: 'article',
        name: 'Zenn: React Hooks Deep Dive',
        url: 'https://zenn.dev/your-username/articles/react-hooks-deep-dive',
      },
    ],
    mainVersions: ['18', '17'],
    proficiency: 'Advanced (業務での主要技術)',
    learning: ['Remix', 'React Server Components詳細'],
    interests: ['WebAssemblyとの連携', 'Micro Frontends'],
    events: [
      {
        date: '2021-04-01',
        type: 'learning_start',
        description: '業務でReactの使用を開始',
      },
      {
        date: '2021-10-15',
        type: 'project',
        description: '初めてReactを使ったプロジェクトAを完了',
      },
      {
        date: '2022-03-08',
        type: 'article',
        description: 'React Hooksに関する記事をZennに公開',
      },
      {
        date: '2022-09-01',
        type: 'project',
        description: '大規模プロジェクトBでReactリーダーを担当',
      },
      {
        date: '2023-05-20',
        type: 'contribution',
        description: 'React関連ライブラリにドキュメント修正PR',
      },
      {
        date: '2024-01-15',
        type: 'project',
        description: 'ポートフォリオサイトをReactでリニューアル',
      },
    ],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Language',
    startDate: '2021-06-15',
    projectCount: 3,
    repositoryCount: 4,
    icon: 'typescript.svg',
    description: '静的型付けによるコード品質の向上、大規模開発での保守性確保。',
    strengths: ['型定義の設計', 'Generics活用', 'zod等でのバリデーション連携'],
    relatedLinks: [
      {
        type: 'repository',
        name: 'GitHub: 型定義ライブラリ貢献 (例)',
        url: 'https://github.com/some/typed-lib/pulls/your-pr',
      },
    ],
    mainVersions: ['5.x'],
    proficiency: 'Advanced (ほぼ全てのプロジェクトで使用)',
    learning: ['高度な型テクニック', 'Decorators'],
    interests: ['TC39 Proposals'],
    events: [
      {
        date: '2021-06-15',
        type: 'learning_start',
        description: 'プロジェクトでTypeScript導入',
      },
      {
        date: '2022-01-20',
        type: 'repository',
        description: '型定義ユーティリティライブラリ作成',
      },
      {
        date: '2022-07-10',
        type: 'project',
        description: 'フルTypeScriptプロジェクトCを完了',
      },
      {
        date: '2023-02-01',
        type: 'article',
        description: 'TypeScriptのGenerics活用記事公開',
      },
      {
        date: '2023-11-05',
        type: 'contribution',
        description: 'DefinitelyTypedに型定義修正PR',
      },
    ],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Framework/Library',
    startDate: '2022-01-10',
    projectCount: 2,
    repositoryCount: 2,
    articleCount: 1,
    icon: 'nextjs.svg',
    description:
      'App Router, Server Components, SSR, ISR を活用したWebアプリケーション開発。',
    strengths: ['App Router', 'Server Actions', 'Route Handlers', 'Vercel連携'],
    relatedLinks: [
      {
        type: 'project',
        name: 'ワークス: このサイト自体',
        url: '/works/portfolio',
      },
      {
        type: 'article',
        name: 'ブログ: Next.js 14移行記録',
        url: '/blog/nextjs14-migration',
      },
    ],
    mainVersions: ['14', '13'],
    proficiency: 'Intermediate (積極的に採用・学習中)',
    learning: ['Middleware詳細', 'Turbopack'],
    interests: ['Edge Functions', 'Streaming UI'],
    events: [
      {
        date: '2022-01-10',
        type: 'learning_start',
        description: 'Next.js (Pages Router) の学習開始',
      },
      {
        date: '2022-06-25',
        type: 'project',
        description: 'Next.js製ブログサイト公開',
      },
      {
        date: '2023-04-01',
        type: 'article',
        description: 'ISRに関する記事を公開',
      },
      {
        date: '2023-09-15',
        type: 'learning_start',
        description: 'App Routerへの移行・学習開始',
      },
      {
        date: '2024-01-15',
        type: 'project',
        description: 'ポートフォリオサイトをApp Routerで構築',
      },
    ],
  },
  {
    id: 'solidjs',
    name: 'Solid.js',
    category: 'Framework/Library',
    startDate: '2023-12-01',
    projectCount: 0,
    repositoryCount: 1,
    articleCount: 0,
    icon: 'solidjs.svg',
    description:
      'Fine-grained reactivity を特徴とする高パフォーマンスUIライブラリ。',
    strengths: [
      'JSX',
      'Reactivity (createSignal, createEffect)',
      'パフォーマンス意識',
    ],
    relatedLinks: [
      {
        type: 'repository',
        name: 'GitHub: SolidJS試用リポジトリ',
        url: 'https://github.com/your-username/solid-playground',
      },
    ],
    mainVersions: ['1.x'],
    proficiency: 'Beginner (学習・試用中)',
    learning: ['SolidStart (メタフレームワーク)', '状態管理'],
    interests: ['Web Components連携', 'Astroとの組み合わせ'],
    events: [
      {
        date: '2023-12-01',
        type: 'learning_start',
        description: 'Solid.jsの学習を開始',
      },
      {
        date: '2024-02-10',
        type: 'repository',
        description: 'SolidJS試用リポジトリ作成',
      },
      {
        date: '2024-03-05',
        type: 'other',
        description: 'SolidStartのチュートリアル完了',
      },
    ],
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Framework/Library',
    startDate: '2021-08-01',
    projectCount: 2,
    repositoryCount: 3,
    icon: 'nodejs.svg',
    description:
      'サーバーサイドJavaScript実行環境。APIサーバー構築などに利用。',
    strengths: ['非同期処理 (async/await)', 'npmエコシステム活用'],
    relatedLinks: [
      { type: 'project', name: 'ワークス: APIサーバーA', url: '/works/api-a' },
    ],
    mainVersions: ['20', '18'],
    proficiency: 'Intermediate (バックエンド開発の選択肢の一つ)',
    learning: ['Streams API', 'パフォーマンスモニタリング'],
    interests: ['Deno', 'Bun'],
    events: [
      {
        date: '2021-08-01',
        type: 'learning_start',
        description: 'Expressを用いたAPI開発を開始',
      },
      {
        date: '2022-04-10',
        type: 'project',
        description: 'APIサーバーAの開発完了',
      },
      {
        date: '2022-11-20',
        type: 'repository',
        description: 'Expressボイラープレート作成',
      },
      {
        date: '2023-07-01',
        type: 'learning_start',
        description: 'NestJSの学習開始',
      },
    ],
  },
  {
    id: 'hono',
    name: 'Hono',
    category: 'Framework/Library',
    startDate: '2022-08-01',
    projectCount: 1,
    repositoryCount: 2,
    articleCount: 0,
    icon: 'hono.svg',
    description:
      'Edge環境での動作に最適化された、高速で軽量なWebフレームワーク。',
    strengths: [
      'ルーティング定義',
      'ミドルウェア',
      'Cloudflare Workers/Deno/Bun対応',
      'RPCモード',
    ],
    relatedLinks: [
      {
        type: 'repository',
        name: 'GitHub: Hono APIサンプル',
        url: 'https://github.com/your-username/hono-api-example',
      },
    ],
    mainVersions: ['4.x'],
    proficiency: 'Intermediate (API開発で頻繁に利用)',
    learning: ['HonoX (フルスタック)', 'WebSocket対応'],
    interests: ['Edge Computing全般', 'Prisma連携'],
    events: [
      {
        date: '2022-08-01',
        type: 'learning_start',
        description: 'Cloudflare Workers上でHono利用開始',
      },
      {
        date: '2023-01-15',
        type: 'project',
        description: 'Hono製APIをデプロイ',
      },
      {
        date: '2023-06-20',
        type: 'repository',
        description: 'Hono + Deno のサンプルリポジトリ作成',
      },
      {
        date: '2024-03-01',
        type: 'article',
        description: 'HonoのRPCモードに関する記事を公開',
      },
    ],
  },
  {
    id: 'go',
    name: 'Go',
    category: 'Language',
    startDate: '2023-06-01',
    projectCount: 1,
    repositoryCount: 2,
    articleCount: 0,
    icon: 'go.svg',
    description:
      '静的型付け言語。シンプルな構文と並行処理機能が特徴。CLIツールやAPIサーバー開発に利用。',
    strengths: [
      'CLIツール開発',
      'シンプルなAPIサーバー実装',
      'Goroutineによる並行処理',
    ],
    relatedLinks: [
      {
        type: 'repository',
        name: 'GitHub: Go製CLIツール',
        url: 'https://github.com/your-username/go-cli-tool',
      },
    ],
    mainVersions: ['1.2x'],
    proficiency: 'Intermediate (特定用途で利用)',
    learning: ['gRPC連携', 'テスト手法 (testingパッケージ)'],
    interests: ['WebAssembly (TinyGo)', 'ジェネリクスの応用'],
    events: [
      {
        date: '2023-06-01',
        type: 'learning_start',
        description: 'Goの学習を開始',
      },
      {
        date: '2023-08-10',
        type: 'repository',
        description: 'シンプルなCLIツールをGoで作成',
      },
      {
        date: '2023-11-25',
        type: 'project',
        description: 'Go言語でAPIサーバーの一部を実装',
      },
      {
        date: '2024-04-01',
        type: 'learning_start',
        description: 'gRPC連携の学習開始',
      },
    ],
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'Cloud',
    startDate: '2022-05-20',
    projectCount: 2,
    certificates: ['AWS Certified Solutions Architect - Associate'],
    icon: 'aws.svg',
    description: '主要なクラウドプラットフォーム。幅広いサービスを提供。',
    strengths: [
      'サーバーレスアーキテクチャ (Lambda, API Gateway)',
      'S3静的ホスティング',
      'IAM管理',
    ],
    relatedLinks: [
      {
        type: 'certificate',
        name: 'SAA認定 (Credly等)',
        url: 'YOUR_CERT_VERIFICATION_URL',
      },
      {
        type: 'project',
        name: 'ワークス: サーバーレスアプリB',
        url: '/works/serverless-b',
      },
    ],
    mainVersions: [
      'EC2',
      'S3',
      'Lambda',
      'DynamoDB',
      'CloudFront',
      'API Gateway',
    ],
    proficiency: 'Intermediate (基本的なサービスは構築・運用可能)',
    learning: ['AWS CDK', 'ECS/Fargate', 'Step Functions'],
    interests: ['Bedrock (生成AI)', 'Well-Architected Framework'],
    events: [
      {
        date: '2022-05-20',
        type: 'learning_start',
        description: 'AWSの学習を開始、EC2/S3を利用',
      },
      {
        date: '2022-10-30',
        type: 'project',
        description: 'S3静的ホスティングでWebサイト公開',
      },
      {
        date: '2023-03-15',
        type: 'certificate',
        description: 'AWS SAA資格取得',
      },
      {
        date: '2023-08-01',
        type: 'project',
        description: 'LambdaとAPI GatewayでサーバーレスAPI構築',
      },
      {
        date: '2024-02-20',
        type: 'learning_start',
        description: 'AWS CDKの学習開始',
      },
    ],
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Database',
    startDate: '2022-12-01',
    projectCount: 2,
    icon: 'postgresql.svg',
    description: '高機能なオープンソースのリレーショナルデータベース。',
    strengths: [
      'スキーマ設計',
      'SQLクエリ (JOIN, Subquery, CTE)',
      'インデックス設計',
      'トランザクション管理',
    ],
    relatedLinks: [],
    mainVersions: ['16', '15', '14'],
    proficiency: 'Intermediate (基本的な操作・設計は可能)',
    learning: [
      'パフォーマンスチューニング (EXPLAIN ANALYZE)',
      'PL/pgSQL',
      'レプリケーション',
    ],
    interests: ['PostGIS (地理空間情報)', 'TimescaleDB (時系列)', '各種拡張機能'],
    events: [
      {
        date: '2022-12-01',
        type: 'learning_start',
        description: '業務でPostgreSQL利用開始',
      },
      {
        date: '2023-04-10',
        type: 'project',
        description: '複雑なクエリを含む案件を担当',
      },
      {
        date: '2023-09-05',
        type: 'other',
        description: 'パフォーマンスチューニングを実施 (インデックス追加)',
      },
      {
        date: '2024-03-20',
        type: 'learning_start',
        description: 'PL/pgSQLの学習開始',
      },
    ],
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Database',
    startDate: '2022-12-01',
    projectCount: 1,
    icon: 'mysql.svg',
    description:
      '広く利用されているオープンソースのリレーショナルデータベース。',
    strengths: ['基本的なCRUD操作', 'スキーマ設計', '単純なクエリ'],
    relatedLinks: [],
    mainVersions: ['8.x'],
    proficiency: 'Basic (基本的な操作が可能)',
    learning: ['インデックス最適化', 'ストアドプロシージャ'],
    interests: ['パフォーマンススキーマの活用', 'Vitess'],
    events: [
      {
        date: '2022-12-01',
        type: 'learning_start',
        description: '別プロジェクトでMySQL利用開始',
      },
      {
        date: '2023-05-15',
        type: 'project',
        description: '基本的なCRUD機能を持つアプリを開発',
      },
      {
        date: '2023-10-01',
        type: 'other',
        description: '既存DBのスキーマ改善提案',
      },
    ],
  },
  {
    id: 'firestore',
    name: 'Firestore',
    category: 'Database',
    startDate: '2023-01-01',
    projectCount: 1,
    icon: 'firestore.svg',
    description:
      'Google Cloud (Firebase) の NoSQL ドキュメントデータベース。スケーラブルでリアルタイム更新に強み。',
    strengths: [
      'データモデリング (非正規化)',
      'リアルタイムリスナー実装',
      'セキュリティルール設定',
    ],
    relatedLinks: [
      {
        type: 'project',
        name: 'ワークス: リアルタイムチャットアプリ (例)',
        url: '/works/realtime-chat',
      },
    ],
    mainVersions: ['-'],
    proficiency: 'Intermediate (小規模アプリで利用経験あり)',
    learning: ['複合クエリの最適化', 'オフラインサポート', 'バッチ書き込み'],
    interests: ['App Check連携によるセキュリティ強化', '他のFirebaseサービスとの連携'],
    events: [
      {
        date: '2023-01-01',
        type: 'learning_start',
        description: 'FirebaseプロジェクトでFirestore利用開始',
      },
      {
        date: '2023-06-10',
        type: 'project',
        description: 'リアルタイムチャットアプリのDB設計・実装',
      },
      {
        date: '2023-11-05',
        type: 'other',
        description: 'セキュリティルールの最適化',
      },
      {
        date: '2024-04-01',
        type: 'learning_start',
        description: 'オフラインサポート機能の調査開始',
      },
    ],
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'Cloud',
    startDate: '2023-03-01',
    projectCount: 1,
    icon: 'supabase.svg',
    description:
      'PostgreSQLをベースとしたオープンソースのBaaS (Backend as a Service)。認証、DB、ストレージなどを提供。',
    strengths: [
      'データベース操作 (SQL)',
      '認証 (Auth)',
      'リアルタイムサブスクリプション',
      'Edge Functions (Deno)',
    ],
    relatedLinks: [
      {
        type: 'repository',
        name: 'GitHub: Supabase利用アプリ (例)',
        url: 'https://github.com/your-username/supabase-app',
      },
    ],
    mainVersions: ['-'],
    proficiency: 'Intermediate (個人開発・プロトタイピングで利用)',
    learning: ['Storage API詳細', 'RLS (Row Level Security) 詳細', 'Vector Database機能'],
    interests: ['セルフホスティング構成', 'マイグレーション戦略'],
    events: [
      {
        date: '2023-03-01',
        type: 'learning_start',
        description: 'Supabaseの学習・試用開始',
      },
      {
        date: '2023-07-20',
        type: 'project',
        description: '個人開発アプリで認証・DBに利用',
      },
      {
        date: '2023-12-01',
        type: 'repository',
        description: 'Supabase Edge Functionsのサンプル作成',
      },
      {
        date: '2024-03-10',
        type: 'learning_start',
        description: 'RLSの詳細な学習を開始',
      },
    ],
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'Infra/Tool',
    startDate: '2021-11-01',
    projectCount: 2,
    icon: 'docker.svg',
    description: 'コンテナ仮想化技術。開発環境の統一やデプロイの簡略化に貢献。',
    strengths: [
      'Dockerfile作成',
      'Docker Composeによる複数コンテナ管理',
      'マルチステージビルドによるイメージサイズ削減',
    ],
    relatedLinks: [
      {
        type: 'repository',
        name: 'GitHub: 開発環境 Dockerfile集',
        url: 'https://github.com/your-username/dockerfiles',
      },
    ],
    mainVersions: ['Latest Stable'],
    proficiency: 'Intermediate (開発環境構築に必須レベルで利用)',
    learning: [
      'Kubernetes基礎',
      'コンテナセキュリティのベストプラクティス',
      'Docker Swarm',
    ],
    interests: ['BuildKit最適化', 'コンテナオーケストレーションツール比較'],
    events: [
      {
        date: '2021-11-01',
        type: 'learning_start',
        description: '開発環境のDocker化を開始',
      },
      {
        date: '2022-05-10',
        type: 'project',
        description: 'Docker Composeで複数コンテナ環境構築',
      },
      {
        date: '2022-12-05',
        type: 'repository',
        description: 'マルチステージビルドを用いたDockerfile集公開',
      },
      {
        date: '2023-08-15',
        type: 'other',
        description: '本番環境へのDocker導入を支援',
      },
      {
        date: '2024-01-20',
        type: 'learning_start',
        description: 'Kubernetes基礎の学習開始',
      },
    ],
  },
  {
    id: 'git',
    name: 'Git',
    category: 'Infra/Tool',
    startDate: '2020-01-01',
    icon: 'git.svg',
    description: '分散型バージョン管理システム。現代の開発に不可欠なツール。',
    strengths: [
      '基本的なコマンド (add, commit, push, pull, branch, merge)',
      'ブランチ戦略 (Git Flow, GitHub Flow)',
      'コンフリクト解消',
    ],
    relatedLinks: [],
    mainVersions: ['-'],
    proficiency: 'Advanced (日常的に不可欠なレベルで利用)',
    learning: ['rebase の高度な使い方', 'git bisect', 'submodule/subtree'],
    interests: ['Git内部構造の理解'],
    events: [
      {
        date: '2020-01-01',
        type: 'learning_start',
        description: 'Gitの利用開始',
      },
      {
        date: '2021-02-15',
        type: 'other',
        description: 'チームでのGit Flow導入',
      },
      {
        date: '2022-08-10',
        type: 'other',
        description: '複雑なコンフリクト解消の経験',
      },
      {
        date: '2023-04-05',
        type: 'learning_start',
        description: 'git rebase の学習開始',
      },
    ],
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    category: 'Infra/Tool',
    startDate: '2022-02-01',
    icon: 'githubactions.svg',
    description:
      'GitHubに統合されたCI/CDプラットフォーム。ビルド、テスト、デプロイの自動化。',
    strengths: [
      '基本的なワークフロー作成 (push/pull_requestトリガー)',
      'Dockerコンテナ利用',
      'Secrets管理',
      'キャッシュ活用',
    ],
    relatedLinks: [
      {
        type: 'repository',
        name: 'GitHub: ポートフォリオ (Actions設定例)',
        url: 'https://github.com/your-username/portfolio/.github/workflows',
      },
    ],
    mainVersions: ['-'],
    proficiency: 'Intermediate (基本的なCI/CDパイプラインは構築可能)',
    learning: [
      'Matrixビルド',
      '再利用可能なワークフロー (Reusable Workflows)',
      '自作Action開発',
    ],
    interests: ['Argo CD等との連携', 'セキュリティスキャンAction'],
    events: [
      {
        date: '2022-02-01',
        type: 'learning_start',
        description: 'GitHub Actionsの利用開始 (テスト自動化)',
      },
      {
        date: '2022-09-10',
        type: 'project',
        description: 'デプロイパイプラインを構築',
      },
      {
        date: '2023-05-20',
        type: 'repository',
        description: 'ポートフォリオサイトにActions設定',
      },
      {
        date: '2023-11-15',
        type: 'learning_start',
        description: 'Reusable Workflowsの学習開始',
      },
      {
        date: '2024-04-01',
        type: 'other',
        description: '自作Action (簡単なもの) の作成',
      },
    ],
  },
  {
    id: 'testing-jest-vitest',
    name: 'Testing (Jest/Vitest)',
    category: 'Methodology',
    startDate: '2021-10-01',
    icon: 'testing.svg',
    description:
      'JavaScript/TypeScriptのテストフレームワーク。単体テスト、結合テスト、スナップショットテスト等。',
    strengths: [
      '単体テスト作成 (Unit Testing)',
      'モック利用 (jest.fn, vi.fn)',
      '非同期テスト',
      '基本的なカバレッジ確認',
    ],
    relatedLinks: [],
    mainVersions: ['Jest 29.x', 'Vitest 1.x'],
    proficiency: 'Intermediate (基本的なテストは記述可能)',
    learning: [
      '結合テスト (Integration Testing)',
      'E2Eテスト (Playwright/Cypress連携)',
      'カバレッジ向上戦略',
    ],
    interests: ['テスト駆動開発 (TDD) の実践', 'Property-based testing'],
    events: [
      {
        date: '2021-10-01',
        type: 'learning_start',
        description: 'Jestを用いた単体テスト開始',
      },
      {
        date: '2022-04-20',
        type: 'project',
        description: 'テストカバレッジ目標を設定・達成',
      },
      {
        date: '2022-11-01',
        type: 'learning_start',
        description: 'Vitestへの移行・学習開始',
      },
      {
        date: '2023-06-15',
        type: 'project',
        description: '結合テスト導入を主導',
      },
      {
        date: '2024-02-10',
        type: 'article',
        description: '効果的なモック戦略に関する記事公開',
      },
    ],
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design',
    startDate: '2021-09-01',
    projectCount: 3,
    icon: 'figma.svg',
    description:
      'ブラウザベースのUIデザインツール。共同編集やプロトタイピングに強み。',
    strengths: [
      'コンポーネント設計 (Variants含む)',
      'Auto Layout活用',
      'インタラクティブプロトタイピング',
      'デザインレビュー',
    ],
    relatedLinks: [
      {
        type: 'other',
        name: 'Figma Community (公開ファイル例)',
        url: 'YOUR_FIGMA_COMMUNITY_PROFILE_URL',
      },
    ],
    mainVersions: ['-'],
    proficiency: 'Intermediate (デザイン作成・開発者連携に利用)',
    learning: [
      'FigJamによるブレスト・情報整理',
      'プラグイン開発の基礎',
      'デザインシステム構築',
    ],
    interests: ['Dev Modeの活用', 'アクセシビリティ対応デザイン'],
    events: [
      {
        date: '2021-09-01',
        type: 'learning_start',
        description: 'Figmaでのデザイン作成・レビュー開始',
      },
      {
        date: '2022-03-10',
        type: 'project',
        description: 'インタラクティブプロトタイプ作成',
      },
      {
        date: '2022-10-05',
        type: 'other',
        description: 'チームへのデザインコンポーネント導入',
      },
      {
        date: '2023-07-20',
        type: 'other',
        description: 'Auto Layoutを本格活用開始',
      },
      {
        date: '2024-01-10',
        type: 'learning_start',
        description: 'FigJamの利用開始',
      },
    ],
  },
  // TODO: Update data to match your own skills.
];
