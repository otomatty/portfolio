/**
 * フロントエンドスタイリング関連スキル
 * - CSS フレームワーク/ツール
 * - CSS-in-JS
 * - UIライブラリ
 */
import type { SkillRecord } from '@/types/skill';

export const frontendStylingSkills: SkillRecord[] = [
  // CSS フレームワーク/ツール
  {
    id: 'sass-scss',
    name: 'Sass/SCSS',
    categoryIds: ['frontend-styling'],
    roleIds: ['frontend'],
    tagIds: ['ui', 'tooling'],
    startDate: '2021-05-01',
    summary: 'CSSプリプロセッサを活用した効率的なスタイル管理。',
    scope: [
      '変数・ミックスイン',
      'ネスト構文',
      '関数・演算',
      'パーシャルとインポート',
    ],
    strengths: [
      '再利用可能なスタイル設計',
      '大規模プロジェクトでのCSS管理',
    ],
    useCases: [
      'テーマカラーの一元管理',
      'レスポンシブブレークポイントの共通化',
    ],
    learning: ['Dart Sass最新機能'],
    interests: ['CSS Nesting（ネイティブ）への移行'],
  },
  {
    id: 'css-modules',
    name: 'CSS Modules',
    categoryIds: ['frontend-styling'],
    roleIds: ['frontend'],
    tagIds: ['ui', 'tooling'],
    startDate: '2022-08-01',
    summary: 'スコープ付きCSSでコンポーネント単位のスタイル管理を実現。',
    scope: [
      'コンポーネントスコープCSS',
      'クラス名の自動生成',
      'Sass/SCSSとの併用',
    ],
    strengths: [
      'スタイルの衝突を防ぐ設計',
      'コンポーネント単位での保守性向上',
    ],
    useCases: [
      'Reactコンポーネントのスタイリング',
      '既存プロジェクトへの段階的導入',
    ],
    learning: ['TypeScript型定義の自動生成'],
    interests: ['Vanilla Extract'],
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    icon: '/icons/tailwind-css-2.svg',
    categoryIds: ['frontend-styling'],
    roleIds: ['frontend'],
    tagIds: ['ui', 'tooling'],
    startDate: '2024-10-01',
    summary:
      'ユーティリティファーストのCSSフレームワーク。カスタムテーマやプラグイン作成の経験あり。',
    scope: [
      'ユーティリティクラス設計',
      'カスタムテーマ作成',
      'プラグイン開発',
      'レスポンシブデザイン',
      'ダークモード対応',
    ],
    strengths: [
      'v3→v4移行の実践経験',
      'カスタムテーマとデザイントークン設計',
      'プラグイン作成による機能拡張',
    ],
    useCases: [
      '新規プロジェクトのスタイリング基盤',
      'デザインシステムの構築',
      'コンポーネントライブラリのスタイリング',
    ],
    projects: [
      {
        name: 'Kouden',
        url: 'https://github.com/otomatty/kouden',
        description: 'サービスサイト・管理画面のスタイリング',
      },
      {
        name: 'Skill Quest AI',
        url: 'https://github.com/otomatty/skill-quest-ai',
        description: 'LXPプロトタイプのUI実装',
      },
    ],
    learning: ['Tailwind CSS v4', '@layer 活用'],
    interests: ['CSS-in-JS との併用パターン'],
  },
  // CSS-in-JS
  {
    id: 'styled-components',
    name: 'styled-components',
    categoryIds: ['frontend-styling'],
    roleIds: ['frontend'],
    tagIds: ['ui', 'state'],
    startDate: '2022-08-01',
    summary:
      'CSS-in-JSライブラリ。Reactコンポーネントとスタイルの統合に活用。',
    scope: [
      'テンプレートリテラルCSS',
      '動的スタイリング',
      'テーマプロバイダー',
      'グローバルスタイル',
    ],
    strengths: [
      'propsに応じた動的スタイル設計',
      'テーマシステムの構築',
    ],
    useCases: [
      'デザインシステムの実装',
      '動的なテーマ切り替え',
      'コンポーネントライブラリ作成',
    ],
    learning: ['Server Components対応'],
    interests: ['パフォーマンス最適化'],
  },
  {
    id: 'emotion',
    name: 'Emotion',
    categoryIds: ['frontend-styling'],
    roleIds: ['frontend'],
    tagIds: ['ui', 'state'],
    startDate: '2022-12-01',
    summary: 'CSS-in-JSライブラリ。MUIなどのライブラリと併用。',
    scope: ['css prop', 'styled API', 'SSR対応'],
    strengths: ['MUIとのシームレスな連携', '柔軟なスタイリングAPI'],
    useCases: ['MUIのカスタマイズ', 'コンポーネントのスタイル拡張'],
    learning: ['Zero-runtime CSS-in-JS'],
    interests: ['Panda CSS'],
  },
  // UIライブラリ
  {
    id: 'shadcn-ui',
    name: 'shadcn/ui',
    icon: '/icons/shadcn.svg',
    categoryIds: ['frontend-ui'],
    roleIds: ['frontend'],
    tagIds: ['ui'],
    startDate: '2023-06-01',
    summary:
      'Radix UIベースのコンポーネントコレクション。個人開発で主に採用。',
    scope: [
      'コンポーネントのカスタマイズ',
      'テーマ設定',
      'Tailwind CSSとの統合',
      'アクセシビリティ対応',
    ],
    strengths: [
      'コピー&ペーストによる柔軟なカスタマイズ',
      'Radix UIによる堅牢なアクセシビリティ',
      'Tailwind CSSとの親和性',
    ],
    useCases: [
      '個人開発プロジェクトのUI基盤',
      '管理画面・ダッシュボードの構築',
      'フォームコンポーネントの実装',
    ],
    projects: [
      {
        name: 'Kouden',
        url: 'https://github.com/otomatty/kouden',
        description: 'サービス全体のUIコンポーネント基盤',
      },
      {
        name: 'Skill Quest AI',
        url: 'https://github.com/otomatty/skill-quest-ai',
        description: 'LXPプロトタイプのUIコンポーネント',
      },
    ],
    learning: ['新規コンポーネントの追加対応'],
    interests: ['Radix UI Themes'],
  },
  {
    id: 'mui',
    name: 'MUI (Material UI)',
    categoryIds: ['frontend-ui'],
    roleIds: ['frontend'],
    tagIds: ['ui'],
    startDate: '2024-01-01',
    summary: 'Material Designベースのコンポーネントライブラリ。業務で使用。',
    scope: ['コンポーネント活用', 'テーマカスタマイズ', 'sx prop', 'Emotion連携'],
    strengths: [
      '豊富なコンポーネントの活用',
      'Material Designに沿った一貫性のあるUI',
    ],
    useCases: ['業務システムのUI構築', '管理画面の開発'],
    learning: ['MUI X (Data Grid, Date Pickers)'],
    interests: ['Joy UI'],
  },
  {
    id: 'ant-design',
    name: 'Ant Design',
    categoryIds: ['frontend-ui'],
    roleIds: ['frontend'],
    tagIds: ['ui'],
    startDate: '2024-01-01',
    summary: 'エンタープライズ向けUIライブラリ。業務で使用。',
    scope: ['コンポーネント活用', 'テーマカスタマイズ', 'Form管理', 'Table/List'],
    strengths: [
      '業務システムに適した豊富なコンポーネント',
      '高機能なTable/Form',
    ],
    useCases: ['業務システムの管理画面', 'データ表示・編集機能'],
    learning: ['Ant Design 5.x'],
    interests: ['ProComponents'],
  },
  {
    id: 'daisyui',
    name: 'Daisy UI',
    categoryIds: ['frontend-ui'],
    roleIds: ['frontend'],
    tagIds: ['ui'],
    startDate: '2025-08-01',
    summary: 'Tailwind CSSベースのコンポーネントライブラリ。',
    scope: ['プリセットコンポーネント', 'テーマシステム', 'Tailwind CSS統合'],
    strengths: ['Tailwind CSSとの親和性', 'シンプルなクラスベースのAPI'],
    useCases: ['プロトタイプ開発', '小規模プロジェクト'],
    learning: ['カスタムテーマ作成'],
    interests: ['他UIライブラリとの比較検証'],
  },
];
