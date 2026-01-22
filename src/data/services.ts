import type { Service, ProcessStep, FAQItem, PricingPlan } from '@/types/services';

/**
 * 提供サービス一覧
 */
export const services: Service[] = [
  {
    title: 'プロダクト開発',
    description:
      'フロントエンドからバックエンド、インフラまで一貫して開発を行います。モダンな技術スタックを活用し、高品質なWebアプリケーションを提供します。',
    features: [
      '要件定義・設計',
      'フロントエンド開発',
      'バックエンド開発',
      'データベース設計',
      'インフラ構築',
      'CI/CD構築',
      '保守・運用',
    ],
    price: '100万円〜/月',
    technologies: [
      'Next.js',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'AWS',
      'Docker',
    ],
  },
  {
    title: 'フロントエンド開発',
    description:
      'モダンなフロントエンド技術を活用し、ユーザー体験の高いWebアプリケーションを開発します。パフォーマンスとアクセシビリティを重視した実装を行います。',
    features: [
      'UI/UX設計',
      'コンポーネント設計',
      '状態管理設計',
      'レスポンシブ対応',
      'パフォーマンス最適化',
      'アクセシビリティ対応',
      'ユニットテスト',
    ],
    price: '80万円〜/月',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Jest',
      'Storybook',
    ],
  },
  {
    title: '技術コンサルティング',
    description:
      'プロジェクトの技術選定や設計レビュー、パフォーマンス改善など、技術面での課題解決をサポートします。',
    features: [
      '技術選定支援',
      'アーキテクチャ設計',
      'コードレビュー',
      'パフォーマンス改善',
      'セキュリティ対策',
      'チーム体制構築',
      '技術研修',
    ],
    price: '50万円〜/月',
    technologies: [
      'React',
      'Next.js',
      'Node.js',
      'AWS',
      'Docker',
      'GitHub Actions',
    ],
  },
];

/**
 * 開発プロセス
 */
export const processes: ProcessStep[] = [
  {
    step: 1,
    title: 'ヒアリング・要件定義',
    description:
      'プロジェクトの目的、要件、予算、スケジュールなどについて詳しくお伺いします。',
    duration: '1-2週間',
  },
  {
    step: 2,
    title: '設計・提案',
    description:
      'ヒアリングした内容をもとに、システム設計、UI/UX設計、技術選定などを行い、具体的な提案書を作成します。',
    duration: '2-3週間',
  },
  {
    step: 3,
    title: '開発・実装',
    description:
      '承認された設計書に基づいて、実際の開発作業を進めます。定期的な進捗報告と中間デモを行います。',
    duration: 'プロジェクトによる',
  },
  {
    step: 4,
    title: 'テスト・品質確認',
    description:
      '実装したシステムの動作確認、品質チェック、セキュリティテストなどを実施します。',
    duration: '2-3週間',
  },
  {
    step: 5,
    title: 'リリース・納品',
    description:
      '最終確認を経て、本番環境へのデプロイを行います。必要に応じて、運用マニュアルの作成や操作説明も実施します。',
    duration: '1週間',
  },
];

/**
 * FAQ
 */
export const faqItems: FAQItem[] = [
  {
    question: '初回の相談は無料ですか？',
    answer: 'はい、初回のヒアリングは無料で承っております。お気軽にお問い合わせください。',
    category: '料金',
  },
  {
    question: 'リモートでの開発は可能ですか？',
    answer: 'はい、基本的にリモートでの開発を行っております。必要に応じてオンラインミーティングやチャットでコミュニケーションを取りながら進めます。',
    category: '開発体制',
  },
  {
    question: '開発期間の目安を教えてください',
    answer: 'プロジェクトの規模や複雑さによりますが、一般的なWebアプリケーションで2〜4ヶ月程度が目安です。詳細はヒアリング後にお見積りいたします。',
    category: '開発期間',
  },
  {
    question: '保守・運用のサポートはありますか？',
    answer: 'はい、開発後の保守・運用サポートも承っております。バグ修正、機能追加、サーバー監視など、ご要望に応じたサポートプランをご用意しています。',
    category: 'サポート',
  },
  {
    question: '途中で仕様変更は可能ですか？',
    answer: 'はい、アジャイル開発手法を採用しており、柔軟に仕様変更に対応できます。ただし、大幅な変更の場合はスケジュールや費用の再調整が必要になる場合があります。',
    category: '開発体制',
  },
  {
    question: 'どのような技術を使用しますか？',
    answer: 'React、Next.js、TypeScript、Node.js、PostgreSQL、AWS などのモダンな技術スタックを使用しています。プロジェクトの要件に応じて最適な技術を選定します。',
    category: '技術',
  },
];

/**
 * 料金プラン
 */
export const pricingPlans: PricingPlan[] = [
  {
    title: 'スポット開発',
    price: '50万円〜',
    description: '特定の機能開発やバグ修正など、短期的な開発案件に対応します。',
    features: [
      '単発の機能開発',
      'バグ修正・改善',
      'コードレビュー',
      '技術相談',
    ],
  },
  {
    title: '月額契約',
    price: '80万円〜',
    period: '/月',
    description: '継続的な開発支援やプロダクト開発に最適なプランです。',
    features: [
      '週20〜40時間の稼働',
      '優先サポート',
      '定期ミーティング',
      'チャットサポート',
      '進捗レポート',
    ],
    highlighted: true,
  },
  {
    title: 'プロジェクト契約',
    price: '要見積り',
    description: 'プロジェクト全体を請負で開発します。明確なゴールがある場合に最適です。',
    features: [
      '要件定義から納品まで',
      'プロジェクト管理',
      'ドキュメント整備',
      '保守サポート（オプション）',
    ],
  },
];
