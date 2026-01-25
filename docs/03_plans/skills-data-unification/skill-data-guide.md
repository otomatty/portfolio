# スキルデータ整備ガイド

## 概要

このドキュメントでは、ポートフォリオサイトのスキル情報を整備するためのデータ構造、調査方法、設定手順を説明します。

---

## 目次

1. [データ構造](#1-データ構造)
2. [スキルインタビュー質問リスト](#2-スキルインタビュー質問リスト)
3. [設定チェックリスト](#3-設定チェックリスト)
4. [設定例（React）](#4-設定例react)
5. [整備対象スキル一覧](#5-整備対象スキル一覧)
6. [追加予定のスキル](#6-追加予定のスキル)
7. [作業ログ](#7-作業ログ)
8. [セマンティックHTML対応](#8-セマンティックhtml対応)
9. [実装済みの改善（2026-01-25）](#9-実装済みの改善2026-01-25)
10. [次のアクション](#10-次のアクション)
11. [インタビュー質問テンプレート](#11-インタビュー質問テンプレート)
12. [関連ファイル](#12-関連ファイル更新版)

---

## 1. データ構造

### 1.1 スキルレコード（SkillRecord）

各スキルは以下の構造で定義します。

```typescript
interface SkillRecord {
  id: string;              // 一意のID（例: 'react', 'typescript'）
  name: string;            // 表示名（例: 'React', 'TypeScript'）
  categoryIds: string[];   // 所属カテゴリ（例: ['frontend-framework']）
  roleIds: string[];       // 対応する役割（例: ['frontend']）
  tagIds?: string[];       // タグ（例: ['ui', 'state']）
  startDate?: string;      // 開始日（YYYY-MM-DD）
  icon?: string;           // アイコンパス（例: '/icons/react.svg'）★追加
  summary?: string;        // 概要説明（1〜2文）
  scope?: string[];        // 主な対応範囲（3〜6項目）
  strengths?: string[];    // 強み（3〜5項目）
  useCases?: string[];     // 主な用途・成果（3〜5項目）
  projects?: SkillProject[];  // 代表プロジェクト（2〜3件）
  links?: SkillLink[];     // 関連リンク
  learning?: string[];     // 学習中（1〜3件）
  interests?: string[];    // 関心（1〜3件）
}
```

### 1.2 プロジェクト（SkillProject）

```typescript
interface SkillProject {
  name: string;         // プロジェクト名
  url: string;          // GitHub URL など
  description?: string; // 簡潔な説明
}
```

### 1.3 リンク（SkillLink）

```typescript
interface SkillLink {
  type: 'project' | 'repository' | 'article' | 'certificate' | 'slides' | 'contribution' | 'other';
  name: string;
  url: string;
}
```

### 1.4 カテゴリ構造（Taxonomy）

スキルの分類は `src/data/skills-taxonomy.ts` で定義します。

#### 大カテゴリグループ（SkillCategoryGroup）

```typescript
interface SkillCategoryGroup {
  id: string;
  label: string;
  description?: string;
  categoryIds: string[];
}
```

| ID | ラベル | 説明 |
|----|--------|------|
| `frontend` | フロントエンド | UI/UX開発に関連する技術 |
| `backend` | バックエンド | サーバーサイド・データ処理 |
| `infra` | インフラ・DevOps | インフラ・運用 |
| `other` | その他 | デザイン・マネジメント等 |

#### サブカテゴリ（SkillCategory）

| カテゴリID | グループ | ラベル |
|-----------|----------|--------|
| `language` | frontend | プログラミング言語 |
| `frontend-framework` | frontend | フレームワーク |
| `frontend-styling` | frontend | スタイリング |
| `frontend-state` | frontend | 状態管理 |
| `frontend-ui` | frontend | UIライブラリ |
| `frontend-animation` | frontend | アニメーション |
| `frontend-form` | frontend | フォーム |
| `frontend-testing` | frontend | テスト |
| `frontend-tooling` | frontend | 開発ツール |
| `backend-runtime` | backend | ランタイム |
| `backend-baas` | backend | BaaS |
| `backend-api` | backend | APIフレームワーク |
| `database` | backend | データベース |
| `orm` | backend | ORM |
| `cloud` | infra | クラウド |
| `container` | infra | コンテナ |
| `cicd` | infra | CI/CD |
| `monitoring` | infra | 監視 |
| `design` | other | デザイン |
| `management` | other | マネジメント |

#### 役割（SkillRole）

| ID | ラベル | 説明 |
|----|--------|------|
| `frontend` | フロントエンド | UI/UX開発を担当 |
| `backend` | バックエンド | サーバーサイド開発を担当 |
| `infra` | インフラ | インフラ構築・運用を担当 |

#### タグ（SkillTag）

| ID | ラベル | 色 |
|----|--------|-----|
| `ui` | UI | 青 |
| `state` | 状態管理 | 緑 |
| `performance` | パフォーマンス | オレンジ |
| `api` | API | 紫 |
| `testing` | テスト | 黄 |
| `styling` | スタイリング | ピンク |

---

## 2. 調査方法

### 2.1 ヒアリング項目

各スキルについて、以下の情報を収集します。

| 項目 | 質問例 | 備考 |
|------|--------|------|
| **開始時期** | いつから実務/学習を開始したか？ | YYYY-MM-DD 形式 |
| **主な対応範囲** | どのような業務を担当できるか？ | 3〜6項目 |
| **強み** | 他と比較して得意な点は？ | 3〜5項目 |
| **用途・成果** | 実務での具体的な利用場面は？ | 3〜5項目 |
| **代表プロジェクト** | このスキルを活用したプロジェクトは？ | 2〜3件（GitHub URL） |
| **学習中** | 現在学習しているトピックは？ | 1〜3件 |
| **関心** | 今後習得したい関連技術は？ | 1〜3件 |
| **リンク** | 記事/登壇/リポジトリなど | 任意 |
| **アイコン** | 技術のアイコンパス | `/icons/xxx.svg` |

### 2.2 調査の進め方

1. **既存データの確認**  
   `src/data/skills.ts` の現在のデータを確認し、不足項目を特定する。

2. **GitHub リポジトリの調査**  
   代表プロジェクトは実在する GitHub リポジトリから選択する。  
   例: `https://github.com/otomatty/kouden`

3. **開始時期の整合性確認**  
   同時期に学習開始したスキルは、開始日を揃える。  
   例: React と TypeScript は同時期 → 両方 `2022-08-01`

4. **カテゴリ/ロールの割り当て**  
   - プログラミング言語 → `categoryIds: ['language']`
   - フロントエンドフレームワーク → `categoryIds: ['frontend-framework']`
   - UIライブラリ → `categoryIds: ['frontend-ui']`
   - 状態管理 → `categoryIds: ['frontend-state']`
   - バックエンドランタイム → `categoryIds: ['backend-runtime']`
   - データベース → `categoryIds: ['database']`
   - BaaS → `categoryIds: ['backend-baas']`
   - コンテナ → `categoryIds: ['container']`
   - CI/CD → `categoryIds: ['cicd']`

---

## 3. 設定手順

### 3.1 新規スキルの追加

1. `src/data/skills.ts` を開く
2. `skills` 配列に新しいスキルオブジェクトを追加
3. 必要に応じて `src/data/skills-taxonomy.ts` にカテゴリ/ロール/タグを追加

### 3.2 既存スキルの更新

1. 対象スキルの `id` を確認
2. 該当オブジェクトのプロパティを更新
3. エラーがないか確認（`bun run dev` で動作確認）

### 3.3 カテゴリ/ロールの追加

1. `src/data/skills-taxonomy.ts` を開く
2. 該当の配列（`skillCategories` / `skillRoles` / `skillTags`）に追加
3. スキル側で新しい ID を参照

---

## 4. 表示ロジック

### 4.1 サマリーの経験年数

サマリー（スキル概要）の経験年数は、カテゴリごとに以下のロジックで算出します。

1. 該当カテゴリに属するスキルを抽出
2. 最も古い `startDate` を取得
3. 現在日付との差分を年・月に変換

**該当ファイル:**
- `src/lib/skills/selectors.ts` - サマリー集計
- `src/lib/dateUtils.ts` - 年月計算

### 4.2 対応可能な業務

ロール（`skillRoles`）に定義された `tasks` が「対応可能な業務」として表示されます。

### 4.3 技術スタック詳細

カテゴリ別にスキルをグループ化し、各スキルの `scope`（対応範囲）を表示します。

---

## 5. 設定例

### React の例

```typescript
{
  id: 'react',
  name: 'React',
  categoryIds: ['frontend-framework'],  // ★新カテゴリID
  roleIds: ['frontend'],
  tagIds: ['ui', 'state', 'performance'],
  startDate: '2022-08-01',
  icon: '/icons/react.svg',  // ★追加
  summary: 'コンポーネント設計と状態管理を中心に、UIの設計・実装から改善まで担当。',
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
}
```

---

## 6. チェックリスト

新規スキル追加時のチェックリスト：

- [ ] `id` は一意か？
- [ ] `name` は正式名称か？
- [ ] `categoryIds` は適切か？（新カテゴリID使用）
- [ ] `roleIds` は適切か？
- [ ] `startDate` は YYYY-MM-DD 形式か？
- [ ] `icon` はパスが設定されているか？（任意）
- [ ] `scope` は 3〜6 項目あるか？
- [ ] `strengths` は 3〜5 項目あるか？
- [ ] `useCases` は 3〜5 項目あるか？
- [ ] `projects` は 2〜3 件あるか？
- [ ] `projects` の URL は実在するか？
- [ ] `learning` は 1〜3 件あるか？
- [ ] `interests` は 1〜3 件あるか？
- [ ] エラーなくビルドできるか？

---

## 7. 関連ファイル

| ファイル | 説明 |
|----------|------|
| `src/data/skills/index.ts` | スキルデータ集約 |
| `src/data/skills/frontend-core.ts` | HTML/CSS, JS, TS, React, Next.js, Astro |
| `src/data/skills/frontend-styling.ts` | CSS フレームワーク, CSS-in-JS, UIライブラリ |
| `src/data/skills/frontend-ecosystem.ts` | 状態管理, フォーム, アニメーション, テスト |
| `src/data/skills/backend-infra.ts` | Node.js, DB, クラウド, インフラ |
| `src/data/skills-taxonomy.ts` | カテゴリ/ロール/タグ辞書 |
| `src/types/skill.ts` | 型定義 |
| `src/lib/skills/selectors.ts` | UI用データ変換 |
| `src/lib/dateUtils.ts` | 日付計算ユーティリティ |
| `src/components/about/skills/` | スキル表示コンポーネント |

---

## 8. 今後追加予定のスキル

以下のスキルは今後のインタビューを経て追加予定です。

### 8.1 プログラミング言語

| スキル | カテゴリ | 備考 |
|--------|----------|------|
| Rust | backend | システムプログラミング、CLI、WebAssembly |
| Go | backend | サーバーサイド、CLI |
| Python | backend | スクリプト、データ処理、AI/ML |
| PHP | backend | Web開発（Laravel等） |

### 8.2 バックエンドフレームワーク

| スキル | カテゴリ | 備考 |
|--------|----------|------|
| Express.js | backend | Node.js用軽量フレームワーク |
| Hono | backend | 高速エッジ対応フレームワーク |

### 8.3 データベース・ORM

| スキル | カテゴリ | 備考 |
|--------|----------|------|
| SQLite | database | 軽量データベース |
| LibSQL | database | 軽量データベース |
| Prisma | backend | TypeScript-first ORM |

### 8.4 DevOps・CI/CD

| スキル | カテゴリ | 備考 |
|--------|----------|------|
| GitHub Actions | infra | CI/CDパイプライン |
| Vercel | cloud | デプロイ/ホスティング |

### 8.5 ツール

| スキル | カテゴリ | 備考 |
|--------|----------|------|
| Git | infra | バージョン管理 |
| Figma | design | UIデザイン（カテゴリ追加が必要） |
| Notion/Linear | management | プロジェクト管理（カテゴリ追加が必要） |

### 8.6 デザイン系スキル

| スキル | カテゴリ | 備考 |
|--------|----------|------|
| UIデザイン | design | Figma、Adobe XD |
| UXデザイン | design | ユーザーリサーチ、プロトタイピング |
| グラフィックデザイン | design | バナー、ロゴ、印刷物 |
| 動画編集 | design | Premiere Pro、After Effects等 |

### 8.7 プロダクトマネジメント系スキル

| スキル | カテゴリ | 備考 |
|--------|----------|------|
| プロダクトマネジメント | management | 要件定義、ロードマップ策定 |
| プロジェクト管理 | management | アジャイル、スクラム |
| 要件定義・仕様策定 | management | PRD作成、ユーザーストーリー |

### 8.8 サーバーレスアーキテクチャ・BaaS

| スキル | カテゴリ | 種別 | 備考 |
|--------|----------|------|------|
| **Supabase** | serverless | BaaS | PostgreSQL、認証、リアルタイム、ストレージ（※既に登録済み） |
| Firebase | serverless | BaaS | Firestore、認証、ホスティング、Functions |
| Turso | serverless | Database | エッジ対応SQLite（LibSQL） |
| Neon | serverless | Database | サーバーレスPostgreSQL |
| Clerk | serverless | Auth | 認証・ユーザー管理特化 |
| Stripe | serverless | Payment | 決済・サブスクリプション |
| Convex | serverless | BaaS | リアクティブバックエンド |

#### 追加候補（検討中）

| スキル | 種別 | 備考 |
|--------|------|------|
| AWS Amplify | BaaS | AWSのBaaSソリューション |
| Cloudflare Workers | Edge Runtime | エッジコンピューティング |
| Cloudflare D1 | Database | エッジSQLite |
| Cloudflare KV | Database | エッジKey-Value |
| Auth0 | Auth | エンタープライズ認証 |
| Resend | Email | メール配信API |
| Contentful | CMS | ヘッドレスCMS |

### 8.9 インタビュー時の質問項目

各スキルについて以下を確認：

1. **開始時期**: いつから使い始めたか？（YYYY-MM-DD）
2. **主な対応範囲（scope）**: どのような業務を担当できるか？
3. **強み（strengths）**: 他の技術と比較して得意な点
4. **用途・成果（useCases）**: 実務での具体的な利用場面
5. **代表プロジェクト（projects）**: このスキルを活用したプロジェクト
6. **学習中（learning）**: 現在学習しているトピック
7. **関心（interests）**: 今後習得したい関連技術

---

## 9. 実装済みの改善（2026-01-25）

### 9.1 カテゴリ構造の再設計

以下の大カテゴリ + サブカテゴリ構造を実装しました。

#### 大カテゴリ（SkillCategoryGroup）

| ID | ラベル | 色 | 説明 |
|----|--------|-----|------|
| `frontend` | フロントエンド | 青 | UI/UX開発に関連する技術 |
| `backend` | バックエンド | 緑 | サーバーサイド・データ処理に関連する技術 |
| `infra` | インフラ・DevOps | オレンジ | インフラ・運用に関連する技術 |
| `other` | その他 | 紫 | デザイン・マネジメント等 |

#### サブカテゴリ（SkillCategory）

**フロントエンド:**
- `language` - プログラミング言語
- `frontend-framework` - フレームワーク
- `frontend-styling` - スタイリング
- `frontend-state` - 状態管理
- `frontend-ui` - UIライブラリ
- `frontend-animation` - アニメーション
- `frontend-form` - フォーム
- `frontend-testing` - テスト
- `frontend-tooling` - 開発ツール

**バックエンド:**
- `backend-runtime` - ランタイム
- `backend-baas` - BaaS
- `backend-api` - APIフレームワーク
- `database` - データベース
- `orm` - ORM

**インフラ・DevOps:**
- `cloud` - クラウド
- `container` - コンテナ
- `cicd` - CI/CD
- `monitoring` - 監視

**その他:**
- `design` - デザイン
- `management` - マネジメント

### 9.2 型定義の更新

以下の型を追加・更新しました：

```typescript
// 大カテゴリ
interface SkillCategoryGroup {
  id: string;
  label: string;
  description?: string;
  categoryIds: string[];
}

// サブカテゴリ（groupId追加）
interface SkillCategory {
  id: string;
  groupId: string;
  label: string;
  description?: string;
  icon?: string;
}

// スキルレコード（icon追加）
interface SkillRecord {
  // ...既存フィールド
  icon?: string; // 技術アイコンのパス
}

// スキルスタックグループ（groupId追加）
interface SkillStackGroup {
  id: string;
  groupId: string;
  label: string;
  description: string;
  skills: SkillStackItem[];
}
```

### 9.3 UI改善

1. **大カテゴリでのグループ化表示**: スキル詳細ページで大カテゴリごとにセクション分け
2. **色分け**: 大カテゴリごとに左ボーダーで色分け（青・緑・オレンジ・紫）
3. **アイコン表示**: 技術ごとにSVGアイコンを表示
4. **レベル表示の削除**: tech-stack.tsx からレベル（エキスパート/上級/中級）を削除
5. **スコープ表示の最適化**: 3つまで表示 + 残りは「+N」で省略

### 9.4 更新したファイル

| ファイル | 変更内容 |
|----------|----------|
| `src/types/skill.ts` | `SkillCategoryGroup`, `icon`, `groupId` 追加 |
| `src/data/skills-taxonomy.ts` | 大カテゴリ + 17サブカテゴリに再構成 |
| `src/data/skills/frontend-core.ts` | categoryIds更新, icon追加 |
| `src/data/skills/frontend-styling.ts` | categoryIds更新, icon追加 |
| `src/data/skills/frontend-ecosystem.ts` | categoryIds更新, icon追加 |
| `src/data/skills/backend-infra.ts` | categoryIds更新, icon追加, Git/GitHub Actions追加 |
| `src/lib/skills/selectors.ts` | `getSkillStackByGroup()` 追加 |
| `src/components/about/tech-stack.tsx` | レベル削除, シンプル化 |
| `src/components/about/skills/skill-summary.tsx` | 大カテゴリ対応, 色分け |
| `src/components/about/skills/skill-stack.tsx` | 大カテゴリグループ化, アイコン表示 |

---

## 10. 次のアクション

### 10.1 高優先度（すぐに実施）

#### 10.1.1 アイコンの追加

現在アイコンが設定されていないスキルにアイコンを追加する。

**アイコン未設定のスキル:**

| スキル | 推奨アイコン | 対応 |
|--------|-------------|------|
| HTML/CSS | `/icons/css/css.svg` | ✅ 設定済み |
| JavaScript | `/icons/js/javascript-large.svg` | ✅ 設定済み |
| TypeScript | `/icons/typescript.svg` | ✅ 設定済み |
| React | `/icons/react.svg` | ✅ 設定済み |
| Next.js | `/icons/next-js.svg` | ✅ 設定済み |
| Astro | 未取得 | 🔲 要取得 |
| Sass/SCSS | 未取得 | 🔲 要取得 |
| CSS Modules | なし（汎用アイコン使用） | - |
| Tailwind CSS | `/icons/tailwind-css-2.svg` | ✅ 設定済み |
| styled-components | 未取得 | 🔲 要取得 |
| Emotion | 未取得 | 🔲 要取得 |
| shadcn/ui | `/icons/shadcn.svg` | ✅ 設定済み |
| MUI | 未取得 | 🔲 要取得 |
| Ant Design | 未取得 | 🔲 要取得 |
| Daisy UI | 未取得 | 🔲 要取得 |
| Jotai | `/icons/jotai.png` | ✅ 設定済み |
| Zustand | 未取得 | 🔲 要取得 |
| React Hook Form | 未取得 | 🔲 要取得 |
| Zod | 未取得 | 🔲 要取得 |
| Framer Motion | `/icons/motion/motion-logo.svg` | ✅ 設定済み |
| GSAP | 未取得 | 🔲 要取得 |
| Storybook | `/icons/storybook.svg` | ✅ 設定済み |
| Vitest | `/icons/vite.svg` | ✅ 設定済み（Viteアイコン） |
| Jest | 未取得 | 🔲 要取得 |
| React Testing Library | なし（汎用アイコン使用） | - |
| Node.js | `/icons/nodejs.svg` | ✅ 設定済み |
| Supabase | `/icons/supabase/supabase-logo-icon.svg` | ✅ 設定済み |
| PostgreSQL | `/icons/postgresql.svg` | ✅ 設定済み |
| AWS | 未取得 | 🔲 要取得 |
| Docker | `/icons/docker.svg` | ✅ 設定済み |
| GitHub Actions | `/icons/github.svg` | ✅ 設定済み |
| Git | `/icons/git.svg` | ✅ 設定済み |

**アイコン取得方法:**
- [Simple Icons](https://simpleicons.org/) からSVGをダウンロード
- [devicon](https://devicon.dev/) から取得
- 公式サイトのブランドガイドラインから取得

#### 10.1.2 スキルデータのインタビュー

以下のスキルについて、ユーザーにインタビューを実施する：

1. **プログラミング言語** - Rust, Go, Python, PHP
2. **バックエンドフレームワーク** - Express.js, Hono
3. **データベース・ORM** - SQLite, LibSQL, Prisma, Drizzle
4. **デザイン** - Figma, UIデザイン, UXデザイン
5. **マネジメント** - プロジェクト管理, 要件定義

### 10.2 中優先度（今週中）

#### 10.2.1 サーバーレス・BaaS スキルの追加

以下のスキルを追加する（インタビュー後）：

| スキル | カテゴリ | アイコン |
|--------|----------|----------|
| Firebase | `backend-baas` | 要取得 |
| Turso | `database` | 要取得 |
| Neon | `database` | 要取得 |
| Clerk | `backend-baas` | 要取得 |
| Stripe | `backend-baas` | 要取得 |
| Vercel | `cloud` | 要取得 |
| Cloudflare | `cloud` | 要取得 |

#### 10.2.2 ドキュメントの更新

- [x] `skill-data-guide.md` のデータ構造セクションを新しい型定義に合わせて更新
- [x] 設定例（React）を新しいカテゴリIDに更新
- [x] チェックリストに `icon` フィールドを追加

### 10.3 低優先度（今後検討）

#### 10.3.1 スキルマップ可視化

スキル間の関係性を可視化するインタラクティブなマップ表示。

**検討事項:**
- D3.js または React Flow を使用
- スキル間の依存関係データの定義
- パフォーマンス考慮（スキル数増加時）

#### 10.3.2 スキル詳細ページ

各スキルの詳細ページを個別に作成。

**表示内容:**
- 概要、強み、用途
- 代表プロジェクト（カード形式）
- 関連リンク
- 学習中・関心事項

#### 10.3.3 フィルタリング機能

スキル一覧のフィルタリング機能を追加。

**フィルタ条件:**
- 大カテゴリ（フロントエンド/バックエンド/インフラ）
- サブカテゴリ
- タグ
- 経験年数

---

## 11. インタビュー質問テンプレート

スキル追加時に使用する質問テンプレート：

```
【スキル名】: ______

1. 開始時期: いつから使い始めましたか？（YYYY-MM-DD）
   → 

2. 主な対応範囲（scope）: どのような業務を担当できますか？（3〜6項目）
   → 
   → 
   → 

3. 強み（strengths）: 他の技術と比較して得意な点は？（3〜5項目）
   → 
   → 
   → 

4. 用途・成果（useCases）: 実務での具体的な利用場面は？（3〜5項目）
   → 
   → 
   → 

5. 代表プロジェクト（projects）: このスキルを活用したプロジェクトは？（2〜3件）
   - 名前: 
     URL: 
     説明: 

6. 学習中（learning）: 現在学習しているトピックは？（1〜3件）
   → 

7. 関心（interests）: 今後習得したい関連技術は？（1〜3件）
   → 
```

---

## 12. 関連ファイル（更新版）

| ファイル | 説明 |
|----------|------|
| `src/types/skill.ts` | 型定義（SkillCategoryGroup追加） |
| `src/data/skills-taxonomy.ts` | 大カテゴリ + サブカテゴリ定義 |
| `src/data/skills/index.ts` | スキルデータ集約 |
| `src/data/skills/frontend-core.ts` | HTML/CSS, JS, TS, React, Next.js, Astro |
| `src/data/skills/frontend-styling.ts` | CSS フレームワーク, CSS-in-JS, UIライブラリ |
| `src/data/skills/frontend-ecosystem.ts` | 状態管理, フォーム, アニメーション, テスト |
| `src/data/skills/backend-infra.ts` | Node.js, DB, クラウド, インフラ, CI/CD |
| `src/lib/skills/selectors.ts` | UI用データ変換（getSkillStackByGroup追加） |
| `src/lib/dateUtils.ts` | 日付計算ユーティリティ |
| `src/components/about/skills/skill-summary.tsx` | スキル概要（大カテゴリ対応） |
| `src/components/about/skills/skill-stack.tsx` | 技術スタック詳細（グループ化対応） |
| `src/components/about/skills/skill-capabilities.tsx` | 対応可能な業務 |
| `src/components/about/skills/skill-development.tsx` | 学習中・関心事項 |
| `src/components/about/tech-stack.tsx` | トップページ用技術スタック |
| `public/icons/` | 技術アイコン格納ディレクトリ |
