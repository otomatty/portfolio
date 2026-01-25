/**
 * フロントエンドエコシステムスキル
 * - 状態管理
 * - フォーム管理
 * - アニメーション
 * - テスト/ツール
 */
import type { SkillRecord } from '@/types/skill';

export const frontendEcosystemSkills: SkillRecord[] = [
  // 状態管理
  {
    id: 'jotai',
    name: 'Jotai',
    icon: '/icons/jotai.png',
    categoryIds: ['frontend-state'],
    roleIds: ['frontend'],
    tagIds: ['state'],
    startDate: '2023-01-01',
    summary:
      'アトミックな状態管理ライブラリ。シンプルなAPIで柔軟な状態設計を実現。',
    scope: [
      'アトム設計',
      '派生状態（derived atoms）',
      '非同期状態管理',
      'React Suspense連携',
    ],
    strengths: [
      'ボトムアップな状態設計',
      '最小限の再レンダリング',
      'TypeScriptとの親和性',
    ],
    useCases: [
      'コンポーネント間の状態共有',
      'フォーム状態の管理',
      'UIの一時的な状態管理',
    ],
    projects: [
      {
        name: 'Kouden',
        url: 'https://github.com/otomatty/kouden',
        description: 'アプリ全体の状態管理基盤',
      },
    ],
    learning: ['jotai-tanstack-query連携'],
    interests: ['jotai-xstate', 'atomWithStorage'],
  },
  {
    id: 'zustand',
    name: 'Zustand',
    categoryIds: ['frontend-state'],
    roleIds: ['frontend'],
    tagIds: ['state'],
    startDate: '2023-01-01',
    summary:
      '軽量でシンプルな状態管理ライブラリ。Fluxパターンをベースに設計。',
    scope: ['ストア設計', 'ミドルウェア活用', '永続化', 'セレクタ最適化'],
    strengths: [
      'シンプルなAPI設計',
      'Redux DevTools対応',
      'ボイラープレートの少なさ',
    ],
    useCases: ['グローバル状態管理', 'ユーザー設定の永続化'],
    learning: ['immer連携', 'persist middleware'],
    interests: ['zustand/contextとの比較'],
  },
  // フォーム管理・バリデーション
  {
    id: 'react-hook-form',
    name: 'React Hook Form',
    categoryIds: ['frontend-form'],
    roleIds: ['frontend'],
    tagIds: ['ui', 'performance'],
    startDate: '2023-01-01',
    summary:
      'パフォーマンス重視のフォーム管理ライブラリ。非制御コンポーネントベース。',
    scope: [
      'フォーム状態管理',
      'バリデーション',
      'エラーハンドリング',
      '動的フォーム',
    ],
    strengths: [
      '最小限の再レンダリング',
      'Zodとのシームレスな連携',
      '複雑なフォームの管理',
    ],
    useCases: [
      '複数ステップのフォーム',
      '動的なフィールド追加/削除',
      'リアルタイムバリデーション',
    ],
    projects: [
      {
        name: 'Kouden',
        url: 'https://github.com/otomatty/kouden',
        description: '各種入力フォームの実装',
      },
    ],
    learning: ['useFieldArray高度な活用'],
    interests: ['Conform（Server Actions対応）'],
  },
  {
    id: 'zod',
    name: 'Zod',
    categoryIds: ['frontend-form'],
    roleIds: ['frontend', 'backend'],
    tagIds: ['type-safety'],
    startDate: '2023-01-01',
    summary: 'TypeScriptファーストのスキーマバリデーションライブラリ。',
    scope: ['スキーマ定義', 'バリデーション', '型推論', 'データ変換（transform）'],
    strengths: [
      'TypeScript型との完全な連携',
      'React Hook Formとの統合',
      'APIレスポンスの型安全なパース',
    ],
    useCases: [
      'フォームバリデーション',
      'APIリクエスト/レスポンスの検証',
      '環境変数のバリデーション',
    ],
    projects: [
      {
        name: 'Kouden',
        url: 'https://github.com/otomatty/kouden',
        description: 'フォームバリデーションとAPI型定義',
      },
    ],
    learning: ['カスタムエラーメッセージのi18n'],
    interests: ['Valibot（軽量代替）'],
  },
  // アニメーション
  {
    id: 'framer-motion',
    name: 'Framer Motion',
    icon: '/icons/motion/motion-logo.svg',
    categoryIds: ['frontend-animation'],
    roleIds: ['frontend'],
    tagIds: ['ui', 'performance'],
    startDate: '2023-01-01',
    summary: 'Reactのための宣言的アニメーションライブラリ。',
    scope: [
      '基本アニメーション',
      'ジェスチャー対応',
      'レイアウトアニメーション',
      'AnimatePresence',
    ],
    strengths: [
      '宣言的なAPI設計',
      'スムーズなレイアウトアニメーション',
      'Exit animationの簡単な実装',
    ],
    useCases: [
      'ページ遷移アニメーション',
      'モーダル/ドロワーの開閉',
      'リスト項目のアニメーション',
    ],
    projects: [
      {
        name: 'Kouden',
        url: 'https://github.com/otomatty/kouden',
        description: 'UIアニメーションの実装',
      },
    ],
    learning: ['useScroll', 'useInView'],
    interests: ['Motion One（軽量版）'],
  },
  {
    id: 'gsap',
    name: 'GSAP',
    categoryIds: ['frontend-animation'],
    roleIds: ['frontend'],
    tagIds: ['ui', 'performance'],
    startDate: '2023-01-01',
    summary:
      '高性能なアニメーションライブラリ。複雑なアニメーションシーケンスに対応。',
    scope: [
      'Tweenアニメーション',
      'Timelineシーケンス',
      'ScrollTrigger',
      'SVGアニメーション',
    ],
    strengths: [
      '高いパフォーマンス',
      '複雑なシーケンス制御',
      'スクロール連動アニメーション',
    ],
    useCases: [
      'ランディングページのアニメーション',
      'スクロール駆動のインタラクション',
      'SVGアニメーション',
    ],
    learning: ['ScrollSmoother', 'SplitText'],
    interests: ['WebGL連携'],
  },
  // テスト・ツール
  {
    id: 'storybook',
    name: 'Storybook',
    icon: '/icons/storybook.svg',
    categoryIds: ['frontend-tooling'],
    roleIds: ['frontend'],
    tagIds: ['tooling'],
    startDate: '2023-01-01',
    summary: 'UIコンポーネントの開発・ドキュメント化ツール。',
    scope: [
      'コンポーネントカタログ',
      'インタラクションテスト',
      'ビジュアルリグレッションテスト',
      'ドキュメント生成',
    ],
    strengths: [
      '独立したコンポーネント開発',
      'デザイナーとの共有基盤',
      'a11yチェックの自動化',
    ],
    useCases: [
      'デザインシステムの構築',
      'コンポーネントのドキュメント化',
      'UIの視覚的テスト',
    ],
    projects: [
      {
        name: 'Kouden',
        url: 'https://github.com/otomatty/kouden',
        description: 'コンポーネントカタログの整備',
      },
    ],
    learning: ['Chromatic連携', 'Play function'],
    interests: ['Storybook 8'],
  },
  {
    id: 'vitest',
    name: 'Vitest',
    icon: '/icons/vite.svg',
    categoryIds: ['frontend-testing'],
    roleIds: ['frontend'],
    tagIds: ['tooling'],
    startDate: '2024-01-01',
    summary: 'Viteベースの高速テストフレームワーク。Jest互換のAPIを提供。',
    scope: ['ユニットテスト', 'コンポーネントテスト', 'モック', 'カバレッジ'],
    strengths: [
      'Viteとの統合による高速実行',
      'Jest互換API',
      'TypeScriptネイティブサポート',
    ],
    useCases: [
      'ユーティリティ関数のテスト',
      'カスタムフックのテスト',
      'コンポーネントロジックのテスト',
    ],
    learning: ['Browser Mode', 'Benchmark'],
    interests: ['Playwright連携'],
  },
  {
    id: 'jest',
    name: 'Jest',
    categoryIds: ['frontend-testing'],
    roleIds: ['frontend', 'backend'],
    tagIds: ['tooling'],
    startDate: '2024-06-01',
    summary: 'JavaScriptの標準的なテストフレームワーク。',
    scope: [
      'ユニットテスト',
      'スナップショットテスト',
      'モック/スパイ',
      'カバレッジレポート',
    ],
    strengths: ['豊富なエコシステム', '直感的なAPI', '並列実行による高速化'],
    useCases: ['Node.jsアプリケーションのテスト', 'Reactコンポーネントのテスト'],
    learning: ['カスタムマッチャー'],
    interests: ['Jest 30'],
  },
  {
    id: 'react-testing-library',
    name: 'React Testing Library',
    categoryIds: ['frontend-testing'],
    roleIds: ['frontend'],
    tagIds: ['tooling'],
    startDate: '2024-06-01',
    summary: 'ユーザー視点でのReactコンポーネントテストライブラリ。',
    scope: [
      'コンポーネントレンダリング',
      'ユーザーイベントシミュレーション',
      'アクセシビリティクエリ',
      '非同期テスト',
    ],
    strengths: [
      'ユーザー視点のテスト設計',
      'アクセシビリティを促進するクエリ',
      '実装詳細に依存しないテスト',
    ],
    useCases: [
      'インタラクションテスト',
      'フォームの動作テスト',
      '条件付きレンダリングのテスト',
    ],
    learning: ['user-event v14'],
    interests: ['Testing Library for other frameworks'],
  },
];
