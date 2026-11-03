/**
 * 技術スタックのバッジに出すロゴ。
 *
 * ロゴは scripts/gen-tech-icons.mjs が public/icons/tech.svg（SVG スプライト）にまとめる。
 * 対応を足したり変えたりしたら `bun run gen:tech-icons` で作り直す。
 *
 * ここに無い技術は、文字だけのバッジにする。次のものは、あえてロゴを出さない。
 * - ロゴの利用の規定が細かいブランド: AWS・Google・Microsoft・Anthropic・OpenAI・Cursor・LINE・PayPay
 * - アイコンのライセンスが改変や商用の利用を制限しているもの: Tauri・WebGPU・Apache ECharts
 * - 公式のロゴが無いもの、概念や手法: MCP・RAG・LLM・IndexedDB・モブワーク など
 */
export type TechIconSource =
  /** Simple Icons（CC0）のスラッグ */
  | { simpleIcons: string }
  /** public/icons からのパス（Cloudflare Docs のアイコン、CC BY 4.0） */
  | { file: string };

export const TECH_ICONS: Record<string, TechIconSource> = {
  // 言語・ランタイム
  TypeScript: { simpleIcons: 'typescript' },
  JavaScript: { simpleIcons: 'javascript' },
  HTML: { simpleIcons: 'html5' },
  CSS: { simpleIcons: 'css' },
  'Node.js': { simpleIcons: 'nodedotjs' },
  Python: { simpleIcons: 'python' },
  Bun: { simpleIcons: 'bun' },
  // フロントエンド
  React: { simpleIcons: 'react' },
  'Next.js': { simpleIcons: 'nextdotjs' },
  Astro: { simpleIcons: 'astro' },
  Remix: { simpleIcons: 'remix' },
  'Solid.js': { simpleIcons: 'solid' },
  SolidJS: { simpleIcons: 'solid' },
  Vite: { simpleIcons: 'vite' },
  'Tailwind CSS': { simpleIcons: 'tailwindcss' },
  'styled-components': { simpleIcons: 'styledcomponents' },
  'vanilla-extract': { simpleIcons: 'vanillaextract' },
  Mantine: { simpleIcons: 'mantine' },
  'Base UI': { simpleIcons: 'baseui' },
  'Blueprint.js': { simpleIcons: 'blueprint' },
  'TanStack Query': { simpleIcons: 'reactquery' },
  Storybook: { simpleIcons: 'storybook' },
  Vitest: { simpleIcons: 'vitest' },
  Electron: { simpleIcons: 'electron' },
  jQuery: { simpleIcons: 'jquery' },
  WordPress: { simpleIcons: 'wordpress' },
  Figma: { simpleIcons: 'figma' },
  // バックエンド・サービス
  Hono: { simpleIcons: 'hono' },
  'Better Auth': { simpleIcons: 'betterauth' },
  Clerk: { simpleIcons: 'clerk' },
  'Drizzle ORM': { simpleIcons: 'drizzle' },
  Supabase: { simpleIcons: 'supabase' },
  Turso: { simpleIcons: 'turso' },
  Stripe: { simpleIcons: 'stripe' },
  Resend: { simpleIcons: 'resend' },
  GitHub: { simpleIcons: 'github' },
  'GitHub Actions': { simpleIcons: 'githubactions' },
  // Cloudflare
  Cloudflare: { simpleIcons: 'cloudflare' },
  'Cloudflare Workers': { simpleIcons: 'cloudflareworkers' },
  'Cloudflare Pages': { simpleIcons: 'cloudflarepages' },
  D1: { file: 'cloud/cloudflare-d1.svg' },
  R2: { file: 'cloud/cloudflare-r2.svg' },
  'Durable Objects': { file: 'cloud/cloudflare-durable-objects.svg' },
  'Cron Triggers': { file: 'cloud/cloudflare-cron.svg' },
};

/** スプライトの中のシンボルの ID */
export const techIconId = (source: TechIconSource): string =>
  'simpleIcons' in source ? `si-${source.simpleIcons}` : source.file.replace(/^.*\//, '').replace(/\.svg$/, '');

/** 技術の名前に対応するシンボルの ID。ロゴを出さない技術は undefined */
export const getTechIconId = (tech: string): string | undefined =>
  Object.hasOwn(TECH_ICONS, tech) ? techIconId(TECH_ICONS[tech]) : undefined;
