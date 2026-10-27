/**
 * 「興味関心」ページの文章
 */

export type TechnicalInterest = {
  name: string;
  description: string;
  tags: string[];
  details: {
    overview: string;
    experience: string;
    projects: string[];
    learningGoals: string[];
  };
};

export type InterestItem = {
  title: string;
  description: string;
};

export type FutureGoal = InterestItem & {
  /** 短期・中期・長期 */
  period: string;
};

export const technicalInterests: TechnicalInterest[] = [
  {
    name: 'Web フロントエンド',
    description:
      'React エコシステム全般と、Rust を活用したフロントエンド技術に強い関心があります。',
    tags: ['React', 'Next.js', 'TypeScript', 'Tauri', 'WebAssembly'],
    details: {
      overview:
        'モダンなWebフロントエンド開発において、Reactを中心としたエコシステムを深く理解し、パフォーマンスと開発体験の両立を目指しています。',
      experience:
        'Next.js App Router、React Server Components、TypeScriptを用いた型安全な開発、Tauriによるデスクトップアプリ開発の経験があります。',
      projects: [
        'Next.js 15 を使用したポートフォリオサイト',
        'Tauri + React によるデスクトップアプリ',
        'WebAssembly を活用した高速画像処理ツール',
      ],
      learningGoals: [
        'React 19 の新機能の習得',
        'Rust + WebAssembly によるパフォーマンス最適化',
        'フロントエンドのテスト戦略の改善',
      ],
    },
  },
  {
    name: 'Web バックエンド',
    description:
      'Rust による高パフォーマンスなバックエンド開発に興味を持っています。',
    tags: ['Rust', 'Axum', 'Actix-web', 'Node.js', 'GraphQL'],
    details: {
      overview:
        '高パフォーマンスで信頼性の高いバックエンドシステムの構築に情熱を持っています。特にRustの型システムを活用した堅牢なAPI開発に興味があります。',
      experience:
        'Node.js/Express での REST API 開発、GraphQL サーバーの構築、Rust/Axum での高速 API 開発の経験があります。',
      projects: [
        'Axum を使用したマイクロサービス API',
        'GraphQL スキーマ設計と実装',
        'リアルタイム通信を含むバックエンドシステム',
      ],
      learningGoals: [
        'Rust によるシステムプログラミング',
        'gRPC と Protocol Buffers の習得',
        'データベース最適化とクエリパフォーマンス',
      ],
    },
  },
  {
    name: 'クラウド・データベース',
    description:
      'スケーラブルなクラウドインフラと、エッジで動作するデータベースに注目しています。',
    tags: ['AWS', 'Turso', 'LibSQL', 'Edge Computing'],
    details: {
      overview:
        'クラウドネイティブなアーキテクチャとエッジコンピューティングを組み合わせた、低レイテンシで高可用性なシステム設計に興味があります。',
      experience:
        'AWS (Lambda, S3, RDS, CloudFront) の構築運用、Supabase によるバックエンド開発、エッジデータベースの検証経験があります。',
      projects: [
        'サーバーレスアーキテクチャによる API 構築',
        'Turso を使用したエッジデータベース検証',
        'CDN と Edge Functions の最適化',
      ],
      learningGoals: [
        'Kubernetes とコンテナオーケストレーション',
        'マルチリージョンデプロイメント',
        'コスト最適化とパフォーマンス監視',
      ],
    },
  },
  {
    name: 'DevOps・CI/CD',
    description: '効率的な開発ワークフローの構築と自動化に取り組んでいます。',
    tags: ['GitHub Actions', 'Docker', 'Terraform', 'IaC'],
    details: {
      overview:
        '開発から本番環境へのデリバリーを自動化し、チームの生産性と品質を向上させるDevOps文化の構築に取り組んでいます。',
      experience:
        'GitHub Actions によるCI/CDパイプライン構築、Docker によるコンテナ化、Terraform による Infrastructure as Code の実践経験があります。',
      projects: [
        'モノレポでの CI/CD パイプライン最適化',
        'Docker Compose による開発環境統一',
        'Terraform によるクラウドリソース管理',
      ],
      learningGoals: [
        'GitOps ワークフローの導入',
        '監視とオブザーバビリティの改善',
        'セキュリティ自動化（DevSecOps）',
      ],
    },
  },
  {
    name: 'AI ツール・開発支援',
    description:
      'AI を活用した開発効率化ツールの活用と、新しい開発手法の確立に興味があります。',
    tags: ['Cursor', 'Devin', 'GitHub Copilot', 'AI-Driven Development'],
    details: {
      overview:
        'AI アシスタントを活用した新しい開発スタイルを模索し、人間とAIが協調して高品質なソフトウェアを効率的に開発する手法を研究しています。',
      experience:
        'Cursor、GitHub Copilot を日常的に使用した開発、AI ペアプログラミング、プロンプトエンジニアリングの実践経験があります。',
      projects: [
        'AI アシスタントを活用した開発ワークフロー確立',
        'プロンプトテンプレートの作成と改善',
        'AI コードレビューの導入',
      ],
      learningGoals: [
        'LLM のファインチューニングと RAG',
        'AI エージェントの開発と活用',
        'AI 駆動開発のベストプラクティス確立',
      ],
    },
  },
];

export const privateInterests: InterestItem[] = [
  {
    title: '盆栽',
    description:
      '日本の伝統的な盆栽の育成を楽しんでいます。自然の美しさをミニチュアで表現する奥深さに魅了されています。',
  },
  {
    title: 'DIY',
    description:
      '家具や小物の制作など、ものづくりを楽しんでいます。設計から完成まで自分の手で作り上げる達成感があります。',
  },
  {
    title: '旅行',
    description:
      '国内外問わず、新しい土地や文化に触れることが好きです。特に自然豊かな場所や歴史的な街並みを訪れています。',
  },
  {
    title: '映画',
    description:
      'さまざまなジャンルの映画を観ることが好きです。ストーリーや映像美から新しいインスピレーションを得ています。',
  },
  {
    title: '家庭菜園',
    description:
      '野菜やハーブを育てています。自分で育てた作物を収穫する喜びと、土に触れるリラックス効果を楽しんでいます。',
  },
  {
    title: '美術館・博物館',
    description:
      'アートや歴史的な展示物を鑑賞することが好きです。新しい知識や視点を得られる貴重な時間です。',
  },
];

export const technicalChallenges: InterestItem[] = [
  {
    title: 'Rust × WebAssembly',
    description:
      'Rust と WebAssembly を活用して、Web アプリケーションのパフォーマンスを大幅に向上させるソリューションに挑戦しています。',
  },
  {
    title: 'AI 駆動開発の実践',
    description:
      'Cursor や Devin などの AI ツールを活用し、開発効率を最大化する新しいワークフローの確立を目指しています。',
  },
  {
    title: 'エッジコンピューティング',
    description:
      'Turso や Cloudflare Workers を活用した、低レイテンシで高可用性なアプリケーションアーキテクチャの構築に取り組んでいます。',
  },
];

export const futureGoals: FutureGoal[] = [
  {
    period: '短期目標',
    title: 'AI 駆動開発のエキスパート',
    description:
      'Cursor や Devin などの AI ツールを活用した効率的な開発手法を確立し、チームに展開していきます。',
  },
  {
    period: '中期目標',
    title: 'テックリード・技術顧問',
    description:
      '技術選定や設計レビューをリードし、チーム全体の技術力向上に貢献できる立場を目指します。',
  },
  {
    period: '長期目標',
    title: 'OSS への貢献・起業',
    description:
      'オープンソースプロジェクトへの積極的な貢献と、将来的には自身の技術を活かした事業立ち上げを視野に入れています。',
  },
];
