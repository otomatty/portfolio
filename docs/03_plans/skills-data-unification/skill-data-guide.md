# スキルデータ整備ガイド

## 概要

このドキュメントでは、ポートフォリオサイトのスキル情報を整備するためのデータ構造、調査方法、設定手順を説明します。

---

## 1. データ構造

### 1.1 スキルレコード（SkillRecord）

各スキルは以下の構造で定義します。

```typescript
interface SkillRecord {
  id: string;              // 一意のID（例: 'react', 'typescript'）
  name: string;            // 表示名（例: 'React', 'TypeScript'）
  categoryIds: string[];   // 所属カテゴリ（例: ['frontend', 'backend']）
  roleIds: string[];       // 対応する役割（例: ['frontend']）
  tagIds?: string[];       // タグ（例: ['ui', 'state']）
  startDate?: string;      // 開始日（YYYY-MM-DD）
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

### 1.4 Taxonomy（辞書）

スキルの分類は `src/data/skills-taxonomy.ts` で定義します。

| 辞書 | 説明 | 例 |
|------|------|-----|
| `skillCategories` | スキルのカテゴリ | frontend, backend, database, cloud, infra |
| `skillRoles` | 対応可能な役割 | frontend, backend, infra |
| `skillTags` | 細分類タグ | ui, state, performance, api |

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
   - フロントエンド技術 → `categoryIds: ['frontend']`
   - バックエンド技術 → `categoryIds: ['backend']`
   - フルスタック技術 → `categoryIds: ['frontend', 'backend']`

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
  categoryIds: ['frontend'],
  roleIds: ['frontend'],
  tagIds: ['ui', 'state', 'performance'],
  startDate: '2022-08-01',
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
- [ ] `categoryIds` は適切か？
- [ ] `roleIds` は適切か？
- [ ] `startDate` は YYYY-MM-DD 形式か？
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

## 9. UI改善提案

### 9.1 現状の課題

現在のスキル表示UIには以下の問題があります：

1. **テキストのみの表現**: スキルがテキストリストで表示されており、量が増えると視認性が低下
2. **分類の不明確さ**: UIライブラリと状態管理ライブラリの区別がつきにくい
3. **スキル間の関係性が見えない**: どのスキルが関連しているか把握しづらい
4. **習熟度の表現不足**: どのスキルに強みがあるか一目でわからない

### 9.2 改善案

#### 9.2.1 タグによる視覚的分類

`tagIds` を活用してスキルを視覚的に分類表示：

| タグ | 色（例） | 対象スキル例 |
|------|----------|--------------|
| `ui` | 青 | React, shadcn/ui, MUI |
| `state` | 緑 | Jotai, Zustand |
| `styling` | 紫 | Tailwind, styled-components |
| `form` | オレンジ | React Hook Form, Zod |
| `animation` | ピンク | Framer Motion, GSAP |
| `testing` | 黄 | Vitest, Jest |
| `tooling` | グレー | Storybook, ESLint |

**実装案:**
```tsx
// タグに応じたバッジカラーを表示
<Badge variant={getTagVariant(skill.tagIds[0])}>
  {skill.name}
</Badge>
```

#### 9.2.2 カテゴリ拡張

現在のカテゴリに加えて、新しいカテゴリを追加：

```typescript
// skills-taxonomy.ts への追加案
export const skillCategories = [
  // 既存
  { id: 'frontend', name: 'フロントエンド', icon: 'Monitor' },
  { id: 'backend', name: 'バックエンド', icon: 'Server' },
  { id: 'database', name: 'データベース', icon: 'Database' },
  { id: 'cloud', name: 'クラウド', icon: 'Cloud' },
  { id: 'infra', name: 'インフラ', icon: 'Settings' },
  // 新規追加
  { id: 'language', name: 'プログラミング言語', icon: 'Code' },
  { id: 'design', name: 'デザイン', icon: 'Palette' },
  { id: 'management', name: 'マネジメント', icon: 'Users' },
];
```

#### 9.2.3 スキルマップ表示

スキルの関係性を可視化するマップ形式の表示：

```
Frontend
├── Core
│   ├── HTML/CSS
│   ├── JavaScript
│   └── TypeScript
├── Framework
│   ├── React
│   ├── Next.js
│   └── Astro
├── UI Libraries
│   ├── shadcn/ui
│   ├── MUI
│   └── Ant Design
├── Styling
│   ├── Tailwind CSS
│   ├── CSS Modules
│   └── styled-components
├── State Management
│   ├── Jotai
│   └── Zustand
└── Testing
    ├── Vitest
    └── React Testing Library
```

#### 9.2.4 タグ拡張案

より細かい分類のためのタグ追加：

```typescript
// skills-taxonomy.ts への追加案
export const skillTags = [
  // 既存
  { id: 'ui', name: 'UI', color: 'blue' },
  { id: 'state', name: '状態管理', color: 'green' },
  { id: 'performance', name: 'パフォーマンス', color: 'orange' },
  // 新規追加
  { id: 'styling', name: 'スタイリング', color: 'purple' },
  { id: 'form', name: 'フォーム', color: 'amber' },
  { id: 'animation', name: 'アニメーション', color: 'pink' },
  { id: 'testing', name: 'テスト', color: 'yellow' },
  { id: 'css-in-js', name: 'CSS-in-JS', color: 'violet' },
  { id: 'ui-library', name: 'UIライブラリ', color: 'cyan' },
  { id: 'design-tool', name: 'デザインツール', color: 'rose' },
  { id: 'pm-tool', name: 'PM/管理ツール', color: 'slate' },
];
```

#### 9.2.5 グループ化表示コンポーネント

スキルをサブカテゴリでグループ化して表示：

```tsx
// 提案: SkillGroup コンポーネント
<SkillGroup title="UIライブラリ" icon={<Layers />}>
  <SkillBadge skill={shadcnui} />
  <SkillBadge skill={mui} />
  <SkillBadge skill={antDesign} />
</SkillGroup>

<SkillGroup title="状態管理" icon={<GitBranch />}>
  <SkillBadge skill={jotai} />
  <SkillBadge skill={zustand} />
</SkillGroup>
```

### 9.3 実装優先度

| 優先度 | 改善項目 | 工数 | 効果 |
|--------|----------|------|------|
| 高 | タグによる色分け表示 | 小 | 視認性向上 |
| 高 | カテゴリ追加（design, management, language） | 小 | 分類明確化 |
| 中 | グループ化表示 | 中 | 構造把握しやすく |
| 中 | タグ拡張（styling, form等） | 小 | 詳細分類 |
| 低 | スキルマップ可視化 | 大 | 関係性理解 |

### 9.4 データ構造の変更案

スキル分類をより明確にするため、`subCategory` フィールドの追加を検討：

```typescript
interface SkillRecord {
  // 既存フィールド...
  subCategory?: string; // 'ui-library' | 'state-management' | 'css-framework' | 'form' | 'animation' | 'testing' など
}
```

これにより、同一カテゴリ内でのグループ化が容易になります。
