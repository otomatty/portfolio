/**
 * スキルシート用データ
 *
 * SES現場で重視される「案件単位の構造化情報（役割・担当工程・案件規模・
 * 使用技術・期間）」と、技術ごとの習熟度マトリクスを管理します。
 *
 * - 目指したことと成果の数値は、workSlug で紐づく実績（`src/data/works.ts`）から引きます。
 * - スキルシートは案件単位の構造化情報に責務を限定し、関心を分離します。
 *
 * 公開範囲: NDA配慮のため、客先案件の企業名は伏せ「業界＋規模＋役割」で表現します。
 */

import { skills } from '@/data/skills';
import type { WorkCategory } from '@/types/works';

/** 担当工程 */
export type ProjectPhase =
  | 'requirements' // 要件定義
  | 'design' // 設計
  | 'implementation' // 実装
  | 'testing' // テスト
  | 'operation' // 運用・保守
  | 'pm' // PM・進行管理
  | 'enablement'; // 導入支援・教育

/** 担当工程の表示メタ（順序付き） */
export const projectPhases: { id: ProjectPhase; label: string }[] = [
  { id: 'requirements', label: '要件定義' },
  { id: 'design', label: '設計' },
  { id: 'implementation', label: '実装' },
  { id: 'testing', label: 'テスト' },
  { id: 'operation', label: '運用・保守' },
  { id: 'pm', label: 'PM・進行管理' },
  { id: 'enablement', label: '導入支援・教育' },
];

/** 使用技術（カテゴリ別） */
export type ProjectTechnologies = {
  languages?: string[];
  frameworks?: string[];
  databases?: string[];
  cloud?: string[];
  tools?: string[];
};

/** 案件単位の構造化情報 */
export type SkillSheetProject = {
  id: string;
  /** 紐づく実績。目指したこと・成果の数値・NDA 配慮はここから引く */
  workSlug: string;
  /** 区分。実績と違う扱いにしたいときだけ書く（例: 個人開発になった受託案件） */
  category?: WorkCategory;
  /** 期間。実績と違う期間にしたいときだけ書く（YYYY-MM、end 未指定は「現在」） */
  period?: { start: string; end?: string };
  /** 業界（例: 情報通信） */
  industry: string;
  /** 案件規模・体制（例: 2 チーム 11 名） */
  scale?: string;
  /** 役割・ポジション */
  role: string;
  /** 担当工程 */
  phases: ProjectPhase[];
  /** 使用技術 */
  technologies: ProjectTechnologies;
};

/** スキル習熟度レベル（4段階・実務経験ベース） */
export type ProficiencyLevel = 1 | 2 | 3 | 4;

/** レベル定義（各レベルで「できること」を明記） */
export const proficiencyLevels: {
  level: ProficiencyLevel;
  label: string;
  description: string;
}[] = [
  {
    level: 1,
    label: '学習中',
    description: '基礎を学習中。サポートを受けながら簡単な実装ができる。',
  },
  {
    level: 2,
    label: '業務で使用',
    description: '業務で使用経験あり。既存方針に沿って実装・改修ができる。',
  },
  {
    level: 3,
    label: '自立して設計・実装',
    description: '自立して設計から実装まで遂行できる。技術選定の判断ができる。',
  },
  {
    level: 4,
    label: 'リード・指導可能',
    description: 'チームをリードし、設計レビューや技術指導ができる。',
  },
];

/** 技術ごとの習熟度（既存 SkillRecord.id を参照） */
export type SkillProficiency = {
  /** 既存 src/data/skills の SkillRecord.id */
  skillId: string;
  level: ProficiencyLevel;
};

/**
 * 案件一覧（新しい順）
 */
export const skillSheetProjects: SkillSheetProject[] = [
  {
    id: 'telecom-ai-dlc',
    workSlug: 'telecom-ai-dlc',
    industry: '情報通信（大手通信事業会社）',
    scale: '2 チーム 11 名／推進 1 名',
    role: 'AI-DLC 導入リード',
    phases: ['requirements', 'design', 'implementation', 'operation', 'pm', 'enablement'],
    technologies: {
      languages: ['Python', 'TypeScript'],
      cloud: ['AWS'],
      tools: ['Claude Code', 'GitHub Copilot', 'MCP（Jira / Confluence）', 'VS Code 拡張', 'GitHub Actions'],
    },
  },
  {
    id: 'agora',
    workSlug: 'agora',
    industry: '社内ツール',
    role: '設計・開発',
    phases: ['requirements', 'design', 'implementation', 'testing', 'operation'],
    technologies: {
      languages: ['TypeScript'],
      frameworks: ['React', 'Hono'],
      databases: ['Cloudflare D1'],
      cloud: ['Cloudflare Workers', 'Durable Objects'],
      tools: ['GitHub Actions'],
    },
  },
  {
    id: 'tb-force',
    workSlug: 'tb-force',
    industry: '社内ツール',
    role: '設計・開発',
    phases: ['requirements', 'design', 'implementation', 'testing'],
    technologies: {
      languages: ['TypeScript'],
      frameworks: ['React', 'Hono'],
      databases: ['Cloudflare D1'],
      cloud: ['Cloudflare Workers'],
      tools: ['Claude API', 'Gmail API', 'Google Calendar API'],
    },
  },
  {
    id: 'tb-palette',
    workSlug: 'tb-palette',
    industry: '社内ツール',
    role: '設計・開発',
    phases: ['requirements', 'design', 'implementation', 'testing', 'operation'],
    technologies: {
      languages: ['TypeScript'],
      frameworks: ['React', 'Hono', 'Drizzle ORM'],
      databases: ['Cloudflare D1', 'Firestore（移行元）'],
      cloud: ['Cloudflare Workers'],
      tools: ['Better Auth', 'MCP'],
    },
  },
  {
    id: 'sd-llm-sales-analysis',
    workSlug: 'sd-llm-sales-analysis',
    industry: '営業分析（システムダイナミクス × LLM）',
    scale: '5 名',
    role: 'システムエンジニア',
    phases: ['design', 'implementation', 'testing'],
    technologies: {
      languages: ['Python'],
      tools: ['LLM'],
    },
  },
  {
    id: 'falcon-auto-review',
    workSlug: 'falcon-auto-review',
    industry: '社内ツール（研修）',
    role: '設計・開発',
    phases: ['requirements', 'design', 'implementation', 'testing'],
    technologies: {
      languages: ['TypeScript'],
      frameworks: ['React', 'Hono'],
      databases: ['IndexedDB'],
      cloud: ['Cloudflare Workers'],
      tools: ['Claude API'],
    },
  },
  {
    id: 'automotive-adas-tool',
    workSlug: 'automotive-adas-tool',
    industry: '製造業（自動車）',
    scale: '全体 数百名／担当 約 10 名',
    role: 'システムエンジニア（フルスタック）',
    phases: ['design', 'implementation', 'testing', 'operation'],
    technologies: {
      languages: ['TypeScript', 'Python'],
      frameworks: ['Next.js', 'React', 'Electron', 'Node.js'],
      cloud: ['AWS（CDK）'],
      tools: ['GitHub Actions'],
    },
  },
  {
    id: 'printing-erp',
    workSlug: 'printing-erp',
    industry: '製造業（印刷）',
    scale: '1 名',
    role: '要件定義〜保守',
    phases: ['requirements', 'design', 'implementation', 'testing', 'operation'],
    technologies: {
      languages: ['TypeScript'],
      frameworks: ['Next.js', 'Tailwind CSS'],
      databases: ['Supabase (PostgreSQL)'],
      cloud: ['Vercel', 'GCP Translation API'],
      tools: ['RAG', 'PayPay API', 'Resend'],
    },
  },
  {
    id: 'farm-shift',
    workSlug: 'farm-shift',
    industry: '小売・サービス（農業テーマパーク）',
    scale: '1 名',
    role: '要件定義〜保守',
    phases: ['requirements', 'design', 'implementation', 'testing', 'operation'],
    technologies: {
      languages: ['TypeScript'],
      frameworks: ['Next.js', 'Tailwind CSS'],
      databases: ['Supabase (PostgreSQL)'],
      tools: ['LINE Messaging API'],
    },
  },
  {
    id: 'kouden',
    workSlug: 'kouden',
    category: 'contract',
    period: { start: '2025-01', end: '2025-06' },
    industry: '小売・サービス（葬祭・ギフト）',
    scale: '1 名（葬儀会社 2 社・ギフトショップとの共同開発）',
    role: '要件定義〜保守',
    phases: ['requirements', 'design', 'implementation', 'testing', 'operation'],
    technologies: {
      languages: ['TypeScript'],
      frameworks: ['Next.js', 'Tailwind CSS'],
      databases: ['Supabase (PostgreSQL)'],
      tools: ['Stripe'],
    },
  },
  {
    id: 'construction-progress',
    workSlug: 'construction-progress',
    industry: '建設',
    scale: '1 名',
    role: '要件定義〜保守',
    phases: ['requirements', 'design', 'implementation', 'testing', 'operation'],
    technologies: {
      languages: ['TypeScript'],
      frameworks: ['Next.js'],
      databases: ['Supabase (PostgreSQL)'],
      tools: ['Google Sheets API', 'Figma'],
    },
  },
  {
    id: 'fresh-inventory',
    workSlug: 'fresh-inventory',
    industry: '製造業（食品）',
    scale: '1 名',
    role: '要件定義〜運用',
    phases: ['requirements', 'design', 'implementation', 'operation'],
    technologies: {
      languages: ['TypeScript'],
      frameworks: ['Next.js（Pages Router）', 'Blueprint.js'],
    },
  },
  {
    id: 'materials-hp-prototype',
    workSlug: 'materials-hp-prototype',
    industry: '商社（建設資材）',
    scale: '1 名',
    role: '要件定義〜プロトタイプ',
    phases: ['requirements', 'design', 'implementation'],
    technologies: {
      languages: ['TypeScript'],
      frameworks: ['Solid.js', 'Remix', 'Tailwind CSS'],
      tools: ['microCMS', 'Newt', 'Kuroco'],
    },
  },
  {
    id: 'lms-planning',
    workSlug: 'lms-planning',
    industry: '教育',
    scale: '1 名',
    role: 'PM 兼エンジニア',
    phases: ['requirements', 'design', 'pm'],
    technologies: {
      languages: ['TypeScript'],
      frameworks: ['Next.js', 'Tailwind CSS'],
      databases: ['Supabase (PostgreSQL)'],
    },
  },
  {
    id: 'cram-school-system',
    workSlug: 'cram-school-system',
    industry: '教育（学習塾）',
    scale: '1 名',
    role: '要件定義〜実装',
    phases: ['requirements', 'design', 'implementation', 'testing'],
    technologies: {
      languages: ['TypeScript'],
      frameworks: ['React', 'Hono', 'styled-components'],
      databases: ['Firestore'],
      cloud: ['Firebase（Cloud Functions）'],
      tools: ['Google Apps Script'],
    },
  },
  {
    id: 'website-production',
    workSlug: 'website-production',
    industry: '教育、小売・サービス ほか',
    scale: '1 名',
    role: '要件定義〜運用',
    phases: ['requirements', 'design', 'implementation', 'operation'],
    technologies: {
      languages: ['TypeScript', 'JavaScript', 'HTML', 'CSS'],
      frameworks: ['jQuery'],
      tools: ['WordPress（REST API）'],
    },
  },
];

/**
 * 技術ごとの習熟度（4段階）
 *
 * `skillId` は `src/data/skills` の `SkillRecord.id` を参照します。
 * 経験年数は各スキルの `startDate` から自動算出します（selectors 側）。
 */
export const skillProficiencies: SkillProficiency[] = [
  { skillId: 'typescript', level: 4 },
  { skillId: 'javascript', level: 4 },
  { skillId: 'react', level: 4 },
  { skillId: 'nextjs', level: 4 },
  { skillId: 'html-css', level: 4 },
  { skillId: 'tailwindcss', level: 4 },
  { skillId: 'supabase', level: 3 },
  { skillId: 'postgresql', level: 3 },
  { skillId: 'nodejs', level: 3 },
  { skillId: 'hono', level: 3 },
  { skillId: 'drizzle', level: 3 },
  { skillId: 'vercel', level: 3 },
  { skillId: 'figma', level: 3 },
  { skillId: 'git', level: 3 },
  { skillId: 'github-actions', level: 3 },
  { skillId: 'astro', level: 3 },
  { skillId: 'php', level: 2 },
  { skillId: 'aws', level: 2 },
  { skillId: 'gcp', level: 2 },
  { skillId: 'docker', level: 2 },
  { skillId: 'prisma', level: 2 },
  { skillId: 'go', level: 2 },
  { skillId: 'rust', level: 1 },
  { skillId: 'python', level: 2 },
];

/** 習熟度に対応する SkillRecord が存在するもののみ返す（データ整合性ガード） */
export const getValidSkillProficiencies = (): SkillProficiency[] => {
  const validIds = new Set(skills.map((s) => s.id));
  return skillProficiencies.filter((p) => validIds.has(p.skillId));
};
