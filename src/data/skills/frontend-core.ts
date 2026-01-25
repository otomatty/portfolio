/**
 * フロントエンド基礎スキル
 * - HTML/CSS, JavaScript, TypeScript
 * - React, Next.js, Astro
 */
import type { SkillRecord } from '@/types/skill';

export const frontendCoreSkills: SkillRecord[] = [
  {
    id: 'html-css',
    name: 'HTML/CSS',
    icon: '/icons/css/css.svg',
    categoryIds: ['language'],
    roleIds: ['frontend'],
    tagIds: ['ui'],
    startDate: '2020-12-01',
    summary:
      'セマンティックHTMLとアクセシビリティを意識したマークアップ、CSSによるレイアウト設計を担当。',
    scope: [
      'セマンティックHTML',
      'アクセシビリティ対応',
      'レスポンシブデザイン',
      'CSSレイアウト（Flexbox/Grid）',
      'アニメーション実装',
    ],
    strengths: [
      'WAI-ARIAを活用したアクセシブルなマークアップ',
      'セマンティックな構造設計',
      'CSSカスタムプロパティを用いたテーマ設計',
    ],
    useCases: [
      'ランディングページのマークアップ',
      'アクセシビリティ改善',
      'レスポンシブ対応',
      'SEOを意識した構造設計',
    ],
    projects: [
      {
        name: 'Saedgewell Portfolio',
        url: 'https://github.com/otomatty/saedgewell',
        description: 'ポートフォリオサイトのマークアップとスタイリング',
      },
    ],
    learning: ['CSS Houdini', 'Container Queries'],
    interests: ['CSS Nesting', 'Scroll-driven Animations'],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '/icons/js/javascript-large.svg',
    categoryIds: ['language'],
    roleIds: ['frontend'],
    tagIds: ['ui', 'runtime'],
    startDate: '2020-12-01',
    summary:
      'ES6+を活用したモダンなJavaScript開発。非同期処理やDOM操作を中心に実装。',
    scope: [
      'ES6+構文',
      '非同期処理（async/await）',
      'DOM操作',
      'イベントハンドリング',
      'モジュールシステム',
    ],
    strengths: [
      'モダンな構文を活用した可読性の高いコード',
      '非同期処理の適切な設計',
      '型安全性を意識した実装（TypeScriptへの橋渡し）',
    ],
    useCases: [
      'インタラクティブなUI実装',
      'API連携処理',
      'フォームバリデーション',
      'アニメーション制御',
    ],
    projects: [
      {
        name: 'Kouden',
        url: 'https://github.com/otomatty/kouden',
        description: 'クライアントサイドロジックの実装',
      },
    ],
    learning: ['TC39 Stage 3 Proposals', 'Web APIs'],
    interests: ['Temporal API', 'Pattern Matching'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: '/icons/typescript.svg',
    categoryIds: ['language'],
    roleIds: ['frontend', 'backend'],
    tagIds: ['type-safety', 'tooling'],
    startDate: '2021-08-01',
    summary:
      'フロント/バックエンドの双方で型安全な開発を推進し、設計・実装・運用まで対応。',
    scope: [
      '型設計',
      'API型安全化',
      'フロント/バックエンド統一型定義',
      'リファクタリング',
      'テスト支援',
      'ビルド/開発体験の改善',
    ],
    strengths: [
      '複雑なドメインを型で表現する設計力',
      'Generics/Utility Types を用いた再利用性の高い型設計',
      '型の共通化とリファクタリングの安全性向上',
      'API契約の明確化と破壊的変更の抑制',
    ],
    useCases: [
      'APIレスポンス/リクエストの型安全化',
      'フロント/バックエンド間の型共有',
      'コンポーネント設計時の型ガード整備',
      'フォーム/バリデーションの型推論設計',
      'ドメインモデルの一貫性維持',
    ],
    projects: [
      {
        name: 'Kouden',
        url: 'https://github.com/otomatty/kouden',
        description: '業務アプリの型設計とUI実装でTypeScriptを活用',
      },
      {
        name: 'Zedi',
        url: 'https://github.com/otomatty/zedi',
        description: 'アプリ基盤の型安全化とUI構成の改善',
      },
      {
        name: 'Printing ERP',
        url: 'https://github.com/otomatty/printing-erp',
        description: '業務フローに合わせた型設計とデータモデル整備',
      },
    ],
    links: [
      {
        type: 'repository',
        name: 'GitHub: Kouden',
        url: 'https://github.com/otomatty/kouden',
      },
    ],
    learning: ['高度な型テクニック', '型テストの導入', 'Zod連携強化'],
    interests: ['Type-level Testing', 'TC39 Proposals', '型安全なAPI設計'],
  },
  {
    id: 'react',
    name: 'React',
    icon: '/icons/react.svg',
    categoryIds: ['frontend-framework'],
    roleIds: ['frontend'],
    tagIds: ['ui', 'state', 'performance'],
    startDate: '2021-08-01',
    summary:
      'コンポーネント設計と状態管理を中心に、UIの設計・実装から改善まで担当。',
    scope: [
      'UI設計',
      'コンポーネント設計',
      '状態管理',
      'パフォーマンス最適化',
      'テスト設計',
    ],
    strengths: [
      '再利用性の高いコンポーネント設計',
      '状態管理の分割と依存関係の整理',
      'パフォーマンス課題の原因特定と改善',
    ],
    useCases: [
      '管理画面やダッシュボードのUI構築',
      '複雑なフォームの状態管理とバリデーション',
      '既存UIのリファクタリングと改善',
      'デザインシステムに沿ったUI実装',
    ],
    projects: [
      {
        name: 'Saedgewell Portfolio',
        url: 'https://github.com/otomatty/saedgewell',
        description: 'ポートフォリオサイトのUI実装と構成整理',
      },
      {
        name: 'Skill Quest AI',
        url: 'https://github.com/otomatty/skill-quest-ai',
        description: 'LXPプロトタイプのUI設計と画面構成',
      },
      {
        name: 'Kouden',
        url: 'https://github.com/otomatty/kouden',
        description: '業務アプリのUI改善とコンポーネント整理',
      },
    ],
    links: [
      {
        type: 'repository',
        name: 'GitHub: Saedgewell Portfolio',
        url: 'https://github.com/otomatty/saedgewell',
      },
    ],
    learning: ['React Server Components', 'Remix', 'アクセシビリティ改善'],
    interests: ['Design Systems', 'Micro Frontends', 'WebAssembly連携'],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    icon: '/icons/next-js.svg',
    categoryIds: ['frontend-framework'],
    roleIds: ['frontend', 'backend'],
    tagIds: ['ssr', 'performance'],
    startDate: '2021-08-01',
    summary:
      'SSR/SSG と API 連携を活用したフロント中心のフルスタック開発を担当。',
    scope: [
      'App Router設計',
      'SSR/SSG/ISR運用',
      'API Routes/Route Handlers',
      'データ取得戦略',
      'パフォーマンス最適化',
      'SEO/OGP最適化',
    ],
    strengths: [
      'ページ設計とルーティング整理',
      'データ取得とキャッシュ戦略の設計',
      'SEOを意識した構造設計',
      'パフォーマンス改善（LCP/CLS対策）',
    ],
    useCases: [
      'SEOを重視したサービスサイト構築',
      '管理画面/ダッシュボードの実装',
      'CSR/SSRの使い分け設計',
      '多言語対応のルーティング設計',
    ],
    projects: [
      {
        name: 'Kouden',
        url: 'https://github.com/otomatty/kouden',
        description: 'サービスサイト/管理画面の構成整理とUI実装',
      },
      {
        name: 'Zedi',
        url: 'https://github.com/otomatty/zedi',
        description: 'Next.jsでのUI実装とページ構成の最適化',
      },
      {
        name: 'Printing ERP',
        url: 'https://github.com/otomatty/printing-erp',
        description: '業務向け画面の構成設計とSSR/SSG活用',
      },
    ],
    links: [
      {
        type: 'repository',
        name: 'GitHub: Printing ERP',
        url: 'https://github.com/otomatty/printing-erp',
      },
    ],
    learning: ['Edge Functions', 'Turbopack', 'Server Actions'],
    interests: ['Streaming UI', '部分的レンダリング最適化'],
  },
  {
    id: 'astro',
    name: 'Astro',
    icon: '/icons/astro.svg',
    categoryIds: ['frontend-framework'],
    roleIds: ['frontend'],
    tagIds: ['ssr', 'performance'],
    startDate: '2023-01-01',
    summary:
      'コンテンツ重視の静的サイトジェネレーター。Islands Architectureを採用。',
    scope: [
      '静的サイト生成',
      'Islands Architecture',
      'マルチフレームワーク対応',
      'Content Collections',
    ],
    strengths: [
      'ゼロJSデフォルトによる高速化',
      'React/Vue/Svelteの混在利用',
      'MDX/Markdownとの親和性',
    ],
    useCases: [
      'ポートフォリオサイト',
      'ブログ・ドキュメントサイト',
      'マーケティングサイト',
    ],
    projects: [
      {
        name: 'Saedgewell Portfolio',
        url: 'https://github.com/otomatty/saedgewell',
        description: 'ポートフォリオサイトの構築',
      },
    ],
    learning: ['View Transitions API', 'Server Islands'],
    interests: ['Astro DB', 'Astro Actions'],
  },
  // フロントエンドフレームワーク - Remix
  {
    id: 'remix',
    name: 'Remix',
    categoryIds: ['frontend-framework'],
    roleIds: ['frontend', 'backend'],
    tagIds: ['ssr', 'performance'],
    startDate: '2023-01-01',
    summary: 'Web標準を重視したフルスタックフレームワーク。フォームやデータロードに強み。',
    scope: [
      'SSR/SSG',
      'ネストルーティング',
      'フォーム処理',
      'データローディング',
    ],
    strengths: [
      'Web標準に沿った設計',
      'プログレッシブエンハンスメント',
      'ネストルートによる効率的なデータ取得',
    ],
    useCases: [
      'フォーム中心のWebアプリ',
      'SEO重視のサイト構築',
    ],
    learning: ['Remix v2', 'React Router v7'],
    interests: ['Edge Functions', 'Cloudflare Workers連携'],
  },
  // フロントエンドフレームワーク - SolidJS
  {
    id: 'solidjs',
    name: 'SolidJS',
    categoryIds: ['frontend-framework'],
    roleIds: ['frontend'],
    tagIds: ['ui', 'performance'],
    startDate: '2023-01-01',
    summary: 'Reactライクな構文で高パフォーマンスを実現するリアクティブフレームワーク。',
    scope: [
      'リアクティブUI構築',
      'シグナルベース状態管理',
      'コンポーネント設計',
    ],
    strengths: [
      '仮想DOMなしの高速レンダリング',
      'Reactに似た学習曲線',
      '細粒度リアクティビティ',
    ],
    useCases: [
      '高パフォーマンスが必要なUI',
      'リアルタイムアプリケーション',
    ],
    learning: ['SolidStart', 'Solid Router'],
    interests: ['SolidJS エコシステム'],
  },
  // フロントエンドフレームワーク - Vue.js
  {
    id: 'vue',
    name: 'Vue.js',
    categoryIds: ['frontend-framework'],
    roleIds: ['frontend'],
    tagIds: ['ui', 'state'],
    startDate: '2025-01-01',
    summary: 'Composition APIを中心に学習中。段階的に採用可能なプログレッシブフレームワーク。',
    scope: [
      'Composition API',
      'コンポーネント設計',
      'リアクティブシステム',
    ],
    strengths: [
      '学習のしやすさ',
      'Reactとの比較による理解',
    ],
    useCases: [
      '学習・検証目的のプロジェクト',
    ],
    learning: ['Composition API', 'Pinia', 'Nuxt.js'],
    interests: ['Vue 3エコシステム', 'Nuxt 3'],
  },
  // デスクトップフレームワーク - Tauri
  {
    id: 'tauri',
    name: 'Tauri',
    categoryIds: ['frontend-framework'],
    roleIds: ['frontend'],
    tagIds: ['performance', 'desktop'],
    startDate: '2023-01-01',
    summary: 'Rustベースの軽量デスクトップアプリフレームワーク。Web技術でクロスプラットフォーム開発。',
    scope: [
      'デスクトップアプリ開発',
      'クロスプラットフォーム',
      'Rust連携',
      'システムAPI呼び出し',
    ],
    strengths: [
      'Electronより軽量なバイナリ',
      'Rustによるバックエンド処理',
      'セキュリティ重視の設計',
    ],
    useCases: [
      '軽量デスクトップアプリ開発',
      'Web技術を活かしたネイティブアプリ',
    ],
    learning: ['Tauri 2.0', 'プラグイン開発'],
    interests: ['モバイル対応', 'Tauri Mobile'],
  },
];
