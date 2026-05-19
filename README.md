# Saedgewell Portfolio

Astro + React で構築したポートフォリオサイトです。実績、提供サービス、プロフィールを中心に、静的生成で高速に配信する構成になっています。

## 主な機能

- Astro + React（`client:load` のアイランド構成）でアニメーションや動的UIを実装
- Tailwind CSS v4 と shadcn/ui + Radix UI ベースのUIコンポーネント
- ダーク/ライト/システムのテーマ切り替え
- 多言語ルーティング（`ja` をデフォルトに `en` をサポート、Phase 1 ではトップページ・Header・Footer の翻訳適用済み）と言語スイッチャー
- 実績一覧のカテゴリ/技術フィルタ、`/works/[slug]` の詳細ページを静的生成
- 料金/プロセス/FAQ を含むサービスページ
- About ページで GitHub コントリビューションを表示（環境変数指定時）
- SEO 用メタタグ/OGP/Twitterカード、サイトマップ生成

## ページ構成

- `/` ホーム
- `/about`（`/about/career`, `/about/skills`, `/about/story`, `/about/interests`）
- `/services`（`/services/pricing`, `/services/process`, `/services/faq`）
- `/works`（`/works/company`, `/works/freelance`, `/works/personal`, `/works/[slug]`）
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
| `bun build`   | 本番ビルド（`./dist`）                       |
| `bun preview` | 本番ビルドのローカルプレビュー               |

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
