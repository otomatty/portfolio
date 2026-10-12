/**
 * スキルシート用データ
 *
 * SES現場で重視される「案件単位の構造化情報（役割・担当工程・案件規模・
 * 使用技術・期間）」と、技術ごとの習熟度マトリクスを管理します。
 *
 * - 時系列の経歴は `src/data/profile.ts` の `careerEntries` を引き続き利用します。
 * - スキルシートは案件単位の構造化情報に責務を限定し、関心を分離します。
 *
 * 公開範囲: NDA配慮のため、企業名・案件名は伏せ「業界＋規模＋役割」で
 * 表現します（`masked: true`）。公開許可済みの案件のみ実名・`workSlug` を
 * 設定します。
 */

import { skills } from '@/data/skills';

/** 担当工程 */
export type ProjectPhase =
  | 'requirements' // 要件定義
  | 'design' // 設計
  | 'implementation' // 実装
  | 'testing' // テスト
  | 'operation' // 運用・保守
  | 'pm'; // PM・進行管理

/** 担当工程の表示メタ（順序付き） */
export const projectPhases: { id: ProjectPhase; label: string }[] = [
  { id: 'requirements', label: '要件定義' },
  { id: 'design', label: '設計' },
  { id: 'implementation', label: '実装' },
  { id: 'testing', label: 'テスト' },
  { id: 'operation', label: '運用・保守' },
  { id: 'pm', label: 'PM・進行管理' },
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
  /** 期間。end 未指定は「現在」を表す。YYYY-MM 形式 */
  period: { start: string; end?: string };
  /** 業界（例: 物流 / 印刷 / 葬祭） */
  industry: string;
  /** 案件規模・概況（例: 5名 / 3ヶ月） */
  scale?: string;
  /** 役割・ポジション */
  role: string;
  /** 担当工程 */
  phases: ProjectPhase[];
  /** チーム規模（人数） */
  teamSize?: number;
  /** 使用技術 */
  technologies: ProjectTechnologies;
  /** 業務概要 */
  summary: string;
  /** 成果 */
  achievements?: string[];
  /** works 実績との関連付け（任意） */
  workSlug?: string;
  /** 現職フラグ */
  isCurrent?: boolean;
  /** マスキング有無（企業名・案件名を伏せている場合 true） */
  masked?: boolean;
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
 *
 * ⚠️ 現職（アーシャルデザイン / SES）の案件は、公開可能な範囲の
 * マスキング済みプレースホルダです。実データはヒアリング後に確定します
 * （issue #49 タスク3）。
 */
export const skillSheetProjects: SkillSheetProject[] = [
  {
    id: 'asial-current',
    period: { start: '2025-07' },
    industry: 'SES（受託・自社開発支援）',
    scale: '継続中',
    role: 'Web アプリケーション開発エンジニア',
    phases: ['requirements', 'design', 'implementation', 'testing'],
    technologies: {
      languages: ['TypeScript'],
      frameworks: ['React', 'Next.js'],
      databases: ['PostgreSQL'],
      cloud: ['AWS'],
      tools: ['Git', 'GitHub Actions'],
    },
    summary: '株式会社アーシャルデザインに所属し、モダンな技術スタックを用いた Web アプリケーション開発に従事。AI 駆動開発手法の導入を推進。',
    achievements: [
      'フロントエンド・バックエンド両面での開発',
      'AI 駆動開発手法の導入推進',
    ],
    isCurrent: true,
    masked: true,
  },
  {
    id: 'printing-erp',
    period: { start: '2024-01', end: '2024-12' },
    industry: '印刷',
    role: '個人開発（要件定義〜実装）',
    phases: ['requirements', 'design', 'implementation', 'testing', 'operation'],
    teamSize: 1,
    technologies: {
      languages: ['TypeScript'],
      frameworks: ['Next.js'],
      databases: ['Supabase (PostgreSQL)'],
      cloud: ['Vercel'],
    },
    summary: '印刷会社向けの ERP を開発。AI 駆動開発により要件定義から 1 週間で 35 ページ + CMS 機能を実装。',
    achievements: [
      '要件定義から 1 週間で初期リリース',
    ],
    workSlug: 'printing-erp',
  },
  {
    id: 'kouden',
    period: { start: '2023-06', end: '2024-06' },
    industry: '葬祭・ギフト',
    role: '共同開発（設計・実装）',
    phases: ['requirements', 'design', 'implementation', 'testing'],
    technologies: {
      languages: ['TypeScript'],
      frameworks: ['React Native'],
      databases: ['Supabase (PostgreSQL)'],
    },
    summary: '葬儀会社 2 社とギフトショップとの共同開発による香典帳アプリ。満足度調査で 93% が「とても使いやすかった」と評価。',
    achievements: [
      '満足度調査で 93% が高評価',
    ],
    workSlug: 'kouden',
  },
  {
    id: 'construction-system',
    period: { start: '2023-01', end: '2023-12' },
    industry: '建設',
    role: '個人開発（要件定義〜運用）',
    phases: ['requirements', 'design', 'implementation', 'testing', 'operation'],
    teamSize: 1,
    technologies: {
      languages: ['TypeScript'],
      frameworks: ['Next.js'],
      databases: ['PostgreSQL'],
    },
    summary: '建設会社向けに案件進捗・請求管理・勤怠管理システムを構築。Excel からの脱却と業務効率化を実現。',
    achievements: [
      'Excel 運用からの脱却と業務効率化',
    ],
    masked: true,
  },
  {
    id: 'fresh-inventory',
    period: { start: '2022-04', end: '2023-03' },
    industry: '菓子製造・流通',
    role: '保守・改善',
    phases: ['implementation', 'testing', 'operation'],
    technologies: {
      languages: ['PHP'],
      databases: ['MySQL'],
    },
    summary: '20 箇所の拠点間流通システムの改善・保守。注文時間を 5 分から 1 分に短縮。',
    achievements: [
      '注文時間を 5 分 → 1 分に短縮',
    ],
    workSlug: 'fresh-inventory',
  },
  {
    id: 'cram-school-cms',
    period: { start: '2022-01', end: '2022-12' },
    industry: '教育（学習塾）',
    role: '個人開発（要件定義〜実装）',
    phases: ['requirements', 'design', 'implementation', 'testing'],
    teamSize: 1,
    technologies: {
      languages: ['TypeScript'],
      frameworks: ['Next.js'],
    },
    summary: '学習塾向けの CMS・勤務記録システムを開発。勤怠管理の業務時間を月 20 時間から 1 時間未満に削減。',
    achievements: [
      '勤怠管理の業務時間を月 20h → 1h 未満に削減',
    ],
    masked: true,
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
