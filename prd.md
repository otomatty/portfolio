# Astro ポートフォリオサイト移行 PRD

> **Version:** 1.2  
> **作成日:** 2026-01-22  
> **最終更新:** 2026-01-23  
> **ステータス:** In Progress

---

## 進捗サマリー

| フェーズ | ステータス | 進捗 |
|----------|----------|------|
| Phase 1: 基盤構築 | ✅ 完了 | 100% |
| Phase 2: コアページ実装 | ✅ 完了 | 100% |
| Phase 3: 詳細・補助ページ | ✅ 完了 | 100% |
| Phase 4: 最適化・品質保証 | 🟡 進行中 | 40% |

---

## 進捗更新（2026-01-23）

- Works ページを Next.js 版の構成に合わせて再実装（Hero/フィルター/カード）
- Works 用コンポーネント（`WorksHero`, `WorksFilter`, `WorkCard`）を追加
- `/works/company`, `/works/freelance`, `/works/personal` の初期カテゴリフィルターを適用
- `/works/[slug]` の実績詳細ページを追加（静的生成）
- Contact ページを静的表示として移行
- Privacy Policy / Terms ページを追加
- Works 詳細ページに Astro Image を適用し、主要画像のCLS対策を追加
- SEO メタタグ/OGP/JSON-LD を共通レイアウトに追加
- robots.txt を追加

---

## 進捗更新（2026-01-22）

- トップページを Next.js 版の構成に合わせて再実装（`Hero → Introduction → Achievements → AdditionalAchievements → CTA`）
- `@/components/home` と `@/components/magicui` を追加し、ホーム用の UI/アニメーションを移植
- ホーム用の静的データ（`metrics`, `tech-stack`, `homepage` コピー）を追加
- 画像参照をローカル `public/images` に切り替え、移行手順を整備
- About 系ページの UI を Next.js 版に合わせて再現（Hero/各セクションの再構成）
- GitHub Contributions をビルド時取得で表示（GitHub API連携）

---

## 1. エグゼクティブサマリー

### 1.1 背景
現在の `apps/web` は Next.js をベースとしたモノレポ構成で構築されています。認証機能や API ルートなど動的機能を含みますが、ポートフォリオとしての本質的な価値は静的コンテンツにあります。

### 1.2 目的
- Next.js から **Astro** への移行により、**静的配信で高パフォーマンス**なポートフォリオサイトを構築
- 既存の **UI/デザイン・ポートフォリオ内容を完全継承**
- **シンプルな構成**（モノレポではなく独立プロジェクト）で保守性を向上

### 1.3 成功指標
| 指標 | 目標値 |
|------|--------|
| Lighthouse Performance | 90+ |
| Lighthouse SEO | 95+ |
| First Contentful Paint (FCP) | < 1.0s |
| Largest Contentful Paint (LCP) | < 1.5s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| JavaScript バンドルサイズ | < 50KB (gzip) |
| ビルド時間 | < 30s |

---

## 2. スコープ

### 2.1 対象範囲（In Scope）

#### ページ構成
| パス | 説明 | 現行ファイル |
|------|------|------------|
| `/` | トップページ | `app/page.tsx` |
| `/about` | 自己紹介 | `app/about/page.tsx` |
| `/about/story` | ストーリー | `app/about/story/page.tsx` |
| `/about/career` | キャリア | `app/about/career/page.tsx` |
| `/about/skills` | スキル | `app/about/skills/page.tsx` |
| `/about/interests` | 興味・関心 | `app/about/interests/page.tsx` |
| `/works` | 実績一覧 | `app/works/page.tsx` |
| `/works/company` | 会社案件 | `app/works/company/page.tsx` |
| `/works/freelance` | フリーランス案件 | `app/works/freelance/page.tsx` |
| `/works/personal` | 個人プロジェクト | `app/works/personal/page.tsx` |
| `/works/[slug]` | 実績詳細（動的） | `app/works/[slug]/page.tsx` |
| `/services` | サービス | `app/services/page.tsx` |
| `/services/process` | 開発プロセス | `app/services/process/page.tsx` |
| `/services/pricing` | 料金 | `app/services/pricing/page.tsx` |
| `/services/faq` | FAQ | `app/services/faq/page.tsx` |
| `/contact` | 連絡先（静的表示のみ） | `app/contact/page.tsx` |
| `/privacy-policy` | プライバシーポリシー | `app/privacy-policy/page.tsx` |
| `/terms` | 利用規約 | `app/terms/page.tsx` |
| `/404` | Not Found | `app/not-found.tsx` |

#### 機能
- 静的サイト生成（SSG）
- レスポンシブデザイン
- ダークモード/ライトモード切替
- 多言語対応（日本語・英語・中国語・韓国語）
- SEO 最適化（メタタグ、OGP、JSON-LD）
- サイトマップ自動生成
- 画像最適化
- アニメーション（Motion ライブラリ）

### 2.2 対象外（Out of Scope）
| 機能 | 理由 |
|------|------|
| 認証機能（`/auth/*`） | ポートフォリオに不要 |
| 予約機能（`/booking/*`） | 動的機能は除外 |
| 見積り送信（`/services/estimate`） | 動的機能は除外 |
| お問い合わせ送信 | 動的機能は除外 |
| API ルート | 静的サイトには不要 |
| Supabase 連携 | データは静的 JSON で管理 |
| `@kit/*` パッケージ依存 | ローカル実装に置換 |
| 管理画面（`apps/admin`） | 対象外 |

---

## 3. 技術仕様

### 3.1 技術スタック

| カテゴリ | 技術 | バージョン |
|----------|------|----------|
| フレームワーク | Astro | ^5.0 |
| UI ライブラリ | React（Islands） | ^19.0 |
| スタイリング | Tailwind CSS | ^4.0 |
| アニメーション | Motion (framer-motion) | ^12.0 |
| アイコン | Lucide React | ^0.48x |
| 型システム | TypeScript | ^5.x |
| パッケージマネージャー | npm / pnpm | 最新安定版 |
| ホスティング | Vercel / Netlify / Cloudflare Pages | - |

### 3.2 Astro インテグレーション

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://saedgewell.com',
  output: 'static',
  integrations: [
    react(),
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'ja',
        locales: {
          ja: 'ja-JP',
          en: 'en-US',
          zh: 'zh-CN',
          ko: 'ko-KR',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en', 'zh', 'ko'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    build: {
      minify: 'esbuild',
    },
  },
});
```

### 3.3 ディレクトリ構成

```
portfolio/
├── public/                          # 静的アセット（そのまま配信）
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── robots.txt                   # 📌 未作成
│   ├── images/                      # 🟡 移行中（画像ファイル）
│   │   └── works/
│   └── locales/                     # 📌 未作成（翻訳 JSON）
│       ├── ja/
│       ├── en/
│       ├── zh/
│       └── ko/
├── src/
│   ├── pages/                       # ルーティング（Astro ページ）
│   │   ├── index.astro              # ✅ 作成済み
│   │   ├── about/                   # ✅ 作成済み（5ページ）
│   │   │   ├── index.astro          # ✅ About トップ
│   │   │   ├── story.astro          # ✅ ストーリー
│   │   │   ├── career.astro         # ✅ キャリア
│   │   │   ├── skills.astro         # ✅ スキル
│   │   │   └── interests.astro      # ✅ 興味・関心
│   │   ├── works/                   # ✅ 作成済み（5ページ）
│   │   │   ├── index.astro          # ✅ Works トップ
│   │   │   ├── company.astro        # ✅ 会社案件
│   │   │   ├── freelance.astro      # ✅ フリーランス
│   │   │   ├── personal.astro       # ✅ 個人開発
│   │   │   └── [slug].astro         # ✅ 実績詳細
│   │   ├── services/                # ✅ 作成済み（4ページ）
│   │   │   ├── index.astro          # ✅ Services トップ
│   │   │   ├── process.astro        # ✅ 開発プロセス
│   │   │   ├── pricing.astro        # ✅ 料金
│   │   │   └── faq.astro            # ✅ FAQ
│   │   ├── contact.astro            # ✅ 作成済み
│   │   ├── privacy-policy.astro     # ✅ 作成済み
│   │   ├── terms.astro              # ✅ 作成済み
│   │   └── 404.astro                # ✅ 作成済み
│   ├── layouts/                     # ✅ 作成済み（共通レイアウト）
│   │   ├── BaseLayout.astro         # ✅ 作成済み
│   │   └── PageLayout.astro         # ✅ 作成済み
│   ├── components/                  # 再利用コンポーネント
│   │   ├── common/                  # ✅ 作成済み（共通 UI）
│   │   │   ├── container.tsx        # ✅ 移行済み
│   │   │   ├── basic-hero.tsx       # ✅ 移行済み
│   │   │   ├── section-title.tsx    # ✅ 移行済み
│   │   │   ├── back-link.tsx        # ✅ 移行済み
│   │   │   ├── index.ts             # ✅ エクスポート
│   │   │   ├── Header.astro         # ✅ 作成済み
│   │   │   ├── Footer.astro         # ✅ 作成済み
│   │   │   ├── Navigation.tsx       # ✅ 作成済み（React Island）
│   │   │   ├── ThemeToggle.tsx      # ✅ 作成済み（React Island）
│   │   │   ├── LanguageSwitcher.tsx # ✅ 作成済み（React Island）
│   │   │   └── MobileSidebar.tsx    # ✅ 作成済み（React Island）
│   │   ├── ui/                      # ✅ shadcn/ui コンポーネント（21個）
│   │   │   ├── accordion.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── collapsible.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── table.tsx
│   │   │   └── textarea.tsx
│   │   ├── sections/                # ✅ 作成済み（ページセクション）
│   │   │   └── FAQAccordion.tsx     # ✅ FAQアコーディオン
│   │   ├── home/                    # 🟡 追加（トップページ用）
│   │   │   ├── Hero.tsx
│   │   │   ├── Introduction.tsx
│   │   │   ├── Achievements.tsx
│   │   │   ├── AdditionalAchievements.tsx
│   │   │   ├── CTASection.tsx
│   │   │   └── index.ts
│   │   └── magicui/                 # 🟡 追加（装飾/アニメーション）
│   │       ├── bento-grid.tsx
│   │       ├── magic-card.tsx
│   │       ├── neon-gradient-card.tsx
│   │       ├── scroll-text-animation.tsx
│   │       ├── gear-background.tsx
│   │       ├── orbit-animation.tsx
│   │       ├── orbiting-circles.tsx
│   │       ├── number-ticker.tsx
│   │       └── particles.tsx
│   │   └── works/                   # ✅ 作成済み（Works 関連）
│   │       ├── WorkCard.tsx
│   │       ├── WorksFilter.tsx
│   │       ├── WorksHero.tsx
│   │       └── index.ts
│   ├── data/                        # ✅ 作成済み（静的データソース）
│   │   ├── index.ts                 # ✅ エクスポート
│   │   ├── works.ts                 # ✅ Works データ・関数
│   │   ├── services.ts              # ✅ Services データ
│   │   ├── metrics.ts               # 🟡 ホーム用メトリクス
│   │   ├── tech-stack.ts            # 🟡 技術スタック
│   │   └── homepage.ts              # 🟡 ホーム文言
│   ├── hooks/                       # 🟡 追加（ユーティリティ）
│   │   ├── useWindowSize.ts
│   │   └── useAchievementBarAnimation.ts
│   ├── styles/                      # グローバルスタイル
│   │   └── global.css               # ✅ 作成済み（CSS変数、ダークモード）
│   ├── lib/                         # ユーティリティ
│   │   └── utils.ts                 # ✅ 作成済み（cn関数）
│   └── types/                       # ✅ 作成済み（型定義）
│       ├── index.ts                 # ✅ エクスポート
│       ├── works.ts                 # ✅ Work 型定義
│       ├── services.ts              # ✅ Service 型定義
│       └── metrics.ts               # 🟡 Metric 型定義
├── astro.config.mjs                 # ✅ 設定済み
├── components.json                  # ✅ shadcn/ui 設定
├── tsconfig.json                    # ✅ 設定済み
├── package.json                     # ✅ 依存関係設定済み
├── prd.md                           # ✅ 本ドキュメント
└── README.md
```

**凡例:**
- ✅ 作成済み・移行済み
- 📌 未作成・未移行

---

## 4. データ管理

### 4.1 作品データ

現行の `data/works/` を移行：

```typescript
// src/data/works/index.ts
import worksIndex from './index.json';
import type { Work } from '@/types/works';

export function getAllWorks(): Work[] {
  return worksIndex.works.filter(w => w.status === 'published');
}

export function getWorkBySlug(slug: string): Work | undefined {
  return getAllWorks().find(w => w.slug === slug);
}

export function getWorksByCategory(category: 'company' | 'freelance' | 'personal'): Work[] {
  return getAllWorks().filter(w => w.category === category);
}

export function getFeaturedWorks(): Work[] {
  return getAllWorks().filter(w => w.isPinned);
}
```

### 4.2 翻訳データ

既存の `public/locales/` をそのまま移行：

```typescript
// src/lib/i18n.ts
export async function getTranslations(locale: string, namespace: string) {
  const translations = await import(`../../public/locales/${locale}/${namespace}.json`);
  return translations.default;
}

export function t(translations: Record<string, string>, key: string): string {
  return translations[key] ?? key;
}
```

### 4.3 ホームページ用データ

ホームページ専用の静的データを追加：

- `src/data/metrics.ts`: 実績/経験値のメトリクス
- `src/data/tech-stack.ts`: 技術スタックの表示データ
- `src/data/homepage.ts`: ヒーロー/CTA などの文言

---

## 5. コンポーネント移行戦略

### 5.1 移行パターン

| 現行（Next.js） | 移行後（Astro） | 備考 |
|----------------|-----------------|------|
| `.tsx`（RSC） | `.astro` | サーバーコンポーネントは Astro に変換 |
| `.tsx`（Client） | `.tsx` + `client:*` | インタラクティブな部分は React Islands として維持 |
| `@kit/ui/*` | `src/components/ui/*` | ローカル実装に置換 |
| `motion` | `motion` | そのまま使用（React Islands 内） |
| `lucide-react` | `lucide-react` | そのまま使用 |

### 5.2 Islands Architecture

インタラクティブ要素のみを React Islands として実装：

```astro
---
// src/components/common/Header.astro
import ThemeToggle from './ThemeToggle.tsx';
import LanguageSwitcher from './LanguageSwitcher.tsx';
---

<header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
  <div class="container flex h-16 items-center">
    <a href="/" class="text-xl font-bold">Saedgewell</a>
    
    <nav class="hidden md:flex md:items-center md:space-x-4">
      <!-- 静的ナビゲーション -->
    </nav>
    
    <div class="flex items-center space-x-4">
      <ThemeToggle client:load />
      <LanguageSwitcher client:load />
    </div>
  </div>
</header>
```

### 5.3 Client Directives

| ディレクティブ | 用途 |
|--------------|------|
| `client:load` | ページ読み込み時に即時ハイドレーション（テーマ切替など） |
| `client:idle` | ブラウザがアイドル時にハイドレーション |
| `client:visible` | 要素が表示されたらハイドレーション（アニメーションなど） |

---

### 5.4 ページ単位の完全移行方針

今後は `saedgewell-v2` の各ページを **1ページずつ** Astro へ移行し、UI/スタイル/インタラクションの完全再現を行う。

- 対象ページの Next.js 実装を起点に、親コンポーネントから順に移植
- データは静的データへ置換し、必要に応じてコピーや変換を行う
- 画像/アイコン/装飾アニメーションを含めて見た目の一致を優先
- ページ完了ごとに `prd.md` を更新し、進捗を明確化

---

## 6. 実装フェーズ

### Phase 1: 基盤構築（1週間）✅ 完了

**目標:** プロジェクト初期化と基本構造の確立

| タスク | 詳細 | ステータス |
|--------|------|----------|
| プロジェクト作成 | Astro プロジェクト初期化 | ✅ 完了 |
| 設定ファイル | `astro.config.mjs`, `tsconfig.json` | ✅ 完了 |
| shadcn/ui コンポーネント | 21個のUIコンポーネントをインストール | ✅ 完了 |
| 共通コンポーネント | Container, BasicHero, SectionTitle, BackLink | ✅ 完了 |
| スタイル移行 | `global.css`（CSS変数、ダークモード対応） | ✅ 完了 |
| レイアウト | `BaseLayout.astro`, `PageLayout.astro` | ✅ 完了 |
| ヘッダー・フッター | Header, Footer, Navigation | ✅ 完了 |
| フォント設定 | Inter, Noto Sans JP | ✅ 完了 |

### Phase 2: コアページ実装（2週間）✅ 完了

**目標:** 主要ページの移植完了

| 週 | タスク |
|----|--------|
| Week 1 | トップページ UI 再現（✅） |
| Week 2 | About 系ページ UI 再現（✅） |
| Week 3 | Works 系ページ UI 再現（✅） |
| Week 4 | Services 系ページ UI 再現（✅） |

### Phase 3: 詳細・補助ページ（1週間）

**目標:** 残りページと詳細機能

| タスク | 詳細 |
|--------|------|
| 作品詳細ページ | `[slug].astro` 動的生成（✅） |
| 静的ページ | Contact, Privacy Policy, Terms（✅） |
| 404 ページ | カスタムエラーページ（✅） |

### Phase 4: 最適化・品質保証（1週間）

**目標:** パフォーマンス最適化とリリース準備

| タスク | 詳細 |
|--------|------|
| 画像最適化 | Astro Image コンポーネント適用（✅） |
| SEO 対応 | メタタグ、OGP、JSON-LD 確認 |
| パフォーマンス測定 | Lighthouse スコア確認・改善 |
| デプロイ設定 | Vercel/Netlify 設定 |
| ドキュメント | README 更新 |

---

## 7. プロジェクト立ち上げ手順

### 7.1 新規 Astro プロジェクト作成

```bash
# 1. 作業ディレクトリを作成（既存リポジトリの外に作成することを推奨）
mkdir -p ~/apps/saedgewell-portfolio
cd ~/apps/saedgewell-portfolio

# 2. Astro プロジェクト初期化（minimal テンプレート使用）
npm create astro@latest . -- --template minimal --typescript strict --install --git

# 3. 必要なインテグレーションを追加
npx astro add react tailwind sitemap

# 4. 追加の依存関係をインストール
npm install motion lucide-react tailwind-merge clsx

# 5. 開発サーバー起動
npm run dev
```

### 7.2 初期設定ファイル

#### `astro.config.mjs`

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://saedgewell.com',
  output: 'static',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      i18n: {
        defaultLocale: 'ja',
        locales: {
          ja: 'ja-JP',
          en: 'en-US',
          zh: 'zh-CN',
          ko: 'ko-KR',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en', 'zh', 'ko'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    build: {
      minify: 'esbuild',
    },
    ssr: {
      noExternal: ['motion'],
    },
  },
});
```

#### `tailwind.config.mjs`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        border: 'hsl(var(--border))',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

#### `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/layouts/*": ["src/layouts/*"],
      "@/lib/*": ["src/lib/*"],
      "@/data/*": ["src/data/*"],
      "@/types/*": ["src/types/*"]
    },
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

### 7.3 既存データの移行

```bash
# 1. 作品データをコピー
cp -r /path/to/saedgewell-v2/data/works ./src/data/

# 2. 画像をコピー
cp -r /path/to/saedgewell-v2/apps/web/public/images ./public/

# 3. 翻訳ファイルをコピー
cp -r /path/to/saedgewell-v2/apps/web/public/locales ./public/

# 4. スタイルファイルをコピー
cp /path/to/saedgewell-v2/apps/web/styles/*.css ./src/styles/
```

---

## 8. 品質基準

### 8.1 コード品質
- TypeScript strict モード使用
- ESLint + Prettier による静的解析
- コンポーネントは単一責任の原則に従う

### 8.2 アクセシビリティ
- セマンティック HTML の使用
- 適切な ARIA ラベル
- キーボードナビゲーション対応
- 色のコントラスト比 4.5:1 以上

### 8.3 SEO
- 各ページに固有のメタタグ
- Open Graph / Twitter Card 対応
- JSON-LD 構造化データ
- サイトマップ自動生成
- robots.txt 適切な設定

---

## 9. リスクと対策

| リスク | 影響度 | 対策 |
|--------|--------|------|
| コンポーネント移行の複雑さ | 中 | 段階的移行、シンプルなコンポーネントから開始 |
| `@kit/*` 依存の解消 | 中 | 必要な機能のみローカル実装、shadcn/ui 参考 |
| アニメーション互換性 | 低 | Motion ライブラリは React Islands で維持 |
| i18n の実装差異 | 低 | 静的 JSON ベースで簡素化 |
| ビルド時間増加 | 低 | 画像最適化は段階的に適用 |

---

## 10. 移行済みコンポーネント一覧

### 10.1 shadcn/ui コンポーネント（21個）

| コンポーネント | パス | 用途 |
|--------------|------|------|
| Accordion | `@/components/ui/accordion` | 折りたたみコンテンツ |
| Alert | `@/components/ui/alert` | アラート表示 |
| Avatar | `@/components/ui/avatar` | ユーザーアバター |
| Badge | `@/components/ui/badge` | ラベル・タグ |
| Button | `@/components/ui/button` | ボタン |
| Card | `@/components/ui/card` | カードレイアウト |
| Collapsible | `@/components/ui/collapsible` | 折りたたみ |
| Dialog | `@/components/ui/dialog` | モーダルダイアログ |
| DropdownMenu | `@/components/ui/dropdown-menu` | ドロップダウンメニュー |
| Input | `@/components/ui/input` | テキスト入力 |
| Label | `@/components/ui/label` | フォームラベル |
| NavigationMenu | `@/components/ui/navigation-menu` | ナビゲーション |
| Popover | `@/components/ui/popover` | ポップオーバー |
| ScrollArea | `@/components/ui/scroll-area` | スクロール領域 |
| Separator | `@/components/ui/separator` | 区切り線 |
| Sheet | `@/components/ui/sheet` | サイドパネル |
| Skeleton | `@/components/ui/skeleton` | ローディング |
| Switch | `@/components/ui/switch` | トグルスイッチ |
| Tabs | `@/components/ui/tabs` | タブ |
| Table | `@/components/ui/table` | テーブル |
| Textarea | `@/components/ui/textarea` | テキストエリア |

### 10.2 カスタム共通コンポーネント

| コンポーネント | パス | 用途 |
|--------------|------|------|
| Container | `@/components/common` | レイアウトコンテナ |
| BasicHero | `@/components/common` | ヒーローセクション |
| SectionTitle | `@/components/common` | セクションタイトル |
| BackLink | `@/components/common` | 戻るリンク |

### 10.3 レイアウトコンポーネント

| コンポーネント | パス | 用途 |
|--------------|------|------|
| BaseLayout | `@/layouts` | 基本HTMLレイアウト（SEO、フォント設定） |
| PageLayout | `@/layouts` | ページレイアウト（Header/Footer含む） |
| Header | `@/components/common` | サイトヘッダー（Astro） |
| Footer | `@/components/common` | サイトフッター（Astro） |

### 10.4 React Islands（インタラクティブコンポーネント）

| コンポーネント | パス | 用途 |
|--------------|------|------|
| ThemeToggle | `@/components/common` | ダーク/ライトモード切替 |
| LanguageSwitcher | `@/components/common` | 言語切替（4言語対応） |
| Navigation | `@/components/common` | デスクトップナビゲーション |
| MobileSidebar | `@/components/common` | モバイルサイドバーメニュー |

---

## 11. 参考リソース

- [Astro ドキュメント](https://docs.astro.build/)
- [Astro + React](https://docs.astro.build/ja/guides/integrations-guide/react/)
- [Astro + Tailwind](https://docs.astro.build/ja/guides/integrations-guide/tailwind/)
- [Astro i18n](https://docs.astro.build/ja/guides/internationalization/)
- [Next.js から Astro への移行](https://docs.astro.build/ja/guides/migrate-to-astro/from-nextjs/)
- [Islands Architecture](https://docs.astro.build/ja/concepts/islands/)

---

## 付録: チェックリスト

### プロジェクト開始前
- [x] 既存サイトのスクリーンショット保存
- [x] 全ページの URL リスト作成
- [x] 使用中のコンポーネント一覧
- [ ] 翻訳キーの確認

### Phase 1: 基盤構築
- [x] Astro プロジェクト初期化
- [x] React インテグレーション設定
- [x] Tailwind CSS v4 設定
- [x] TypeScript 設定（パスエイリアス含む）
- [x] shadcn/ui コンポーネントインストール（21個）
- [x] 共通コンポーネント移行（Container, BasicHero, SectionTitle, BackLink）
- [x] CSS変数・ダークモード設定
- [x] ビルド確認
- [x] BaseLayout.astro 作成
- [x] PageLayout.astro 作成
- [x] Header コンポーネント作成
- [x] Footer コンポーネント作成
- [x] Navigation コンポーネント作成
- [x] ThemeToggle コンポーネント作成
- [x] LanguageSwitcher コンポーネント作成
- [x] フォント設定（Inter, Noto Sans JP）
- [x] MobileSidebar コンポーネント作成
- [x] i18n 設定（4言語対応）

### Phase 2: コアページ実装
- [x] トップページ（UI 再現）
- [x] About ページ（/about, /about/story, /about/career, /about/skills, /about/interests）
- [x] Works ページ（/works, /works/company, /works/freelance, /works/personal）
- [x] Services ページ（/services, /services/process, /services/pricing, /services/faq）
- [x] 型定義（types/works.ts, types/services.ts）
- [x] データ管理（data/works.ts, data/services.ts）
- [x] FAQAccordionコンポーネント

### Phase 3: 詳細・補助ページ
- [x] 作品詳細ページ（[slug].astro）
- [x] Contact ページ
- [x] Privacy Policy ページ
- [x] Terms ページ
- [x] 404 ページ

### Phase 4: 最適化・品質保証
- [x] 画像最適化
- [x] SEO 対応（メタタグ、OGP、JSON-LD）
- [ ] パフォーマンス測定
- [ ] デプロイ設定

### 移行完了基準
- [ ] 全ページが正常に表示される
- [ ] レスポンシブデザインが機能する
- [ ] テーマ切替が動作する
- [ ] 言語切替が動作する
- [ ] 全リンクが正常に動作する
- [ ] 画像が最適化されている
- [ ] メタタグが正しく設定されている
- [ ] Lighthouse スコアが目標を達成
- [ ] 本番環境にデプロイ完了
