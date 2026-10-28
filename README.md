# Saedgewell Portfolio

Astro + React で構築したポートフォリオサイトです。実績、提供サービス、プロフィールを中心に、静的生成したページを Cloudflare Workers（静的アセット）で配信しています。

## 主な機能

- Astro + React（`client:load` のアイランド構成）でアニメーションや動的UIを実装
- Tailwind CSS v4 と shadcn/ui + Radix UI ベースのUIコンポーネント
- 深緑と金のダークテーマに固定（テーマ切り替えは廃止）
- ホームの Hero を WebGPU で描画（非対応時は Canvas 2D）。七宝・青海波は Canvas 2D、スクロール連動のパララックス付き
- 下層ページの見出しにも、ページごとの作図（七宝・黄金螺旋・正五角形・アポロニウスの窓・ヴェシカなど）を同じ仕組みで描画
- 日本語のみで提供（多言語対応は廃止）
- 実績一覧のカテゴリ/技術フィルタ、`/works/[slug]` の詳細ページを静的生成
- 料金/プロセス/FAQ を含むサービスページ
- About ページで GitHub コントリビューションを表示（環境変数指定時）
- SEO 用メタタグ/OGP/Twitterカード、サイトマップ生成

## ページ構成

- `/` ホーム
- `/about`（`/about/career`, `/about/skills`, `/about/story`, `/about/interests`）
- `/services`（`/services/pricing`, `/services/process`, `/services/faq`）
- `/works`（種別フィルタ `?kind=professional|personal`、`/works/[slug]`。旧 `/works/company`・`/works/freelance`・`/works/personal` はリダイレクト）
- `/contact`, `/privacy-policy`, `/terms`, `/404`

## コンテンツ管理

- `src/data` に実績/サービス/スキル/ホームコピーなどの静的データを集約
- `src/types` に型定義を配置
- `public/images` にOG画像や実績サムネイルなどの静的アセットを配置

## 環境変数

About ページの GitHub コントリビューション表示に使用します。未設定の場合は表示されません。

```
GITHUB_USERNAME=your_github_username
GITHUB_TOKEN=your_github_token
```

## 開発コマンド

| Command       | Action                                      |
| :------------ | :------------------------------------------ |
| `bun install` | 依存関係のインストール                       |
| `bun dev`     | 開発サーバーを起動（`localhost:4321`）       |
| `bun run build`   | 本番ビルド（`./dist/client`）                |
| `bun run preview` | 本番ビルドのローカルプレビュー（workerd 上で実行。`bunx astro preview stop` で停止） |
| `bun run deploy`  | ビルドして Cloudflare Workers へデプロイ（`wrangler deploy`、要 Cloudflare ログイン） |

## デプロイ

Cloudflare Workers（静的アセットのみ）で配信しています。設定は `wrangler.jsonc` にまとめています。

- **自動デプロイ**: Workers Builds（Cloudflare ダッシュボードの Git 連携）を使います。
  - Build command: `bun run build`
  - Deploy command: `bunx wrangler deploy`（本番ブランチ `main`）
  - Non-production branch deploy command: `bunx wrangler versions upload`（PR ごとのプレビュー URL）
- **独自ドメイン**: `saedgewell.com` を Custom Domain として割り当てています（`workers_dev: false`）。
- **ビルド時の環境変数**: `GITHUB_USERNAME` / `GITHUB_TOKEN` はビルド時に読み込むため、Workers Builds の「Build variables」に設定します。
- **404**: `not_found_handling: "404-page"` により `404.html` を返します。

## ディレクトリ構成

```text
/
├── public/
├── src/
│   ├── components/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── types/
└── package.json
```
