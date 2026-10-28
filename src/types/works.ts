/**
 * 実績の区分
 * - client: 客先案件（SES で参画した案件）
 * - internal: 社内ツール（所属企業の社内向けに開発したもの）
 * - training: 人材育成（社内の育成の取り組み）
 * - contract: 受託（フリーランスとして請けた案件）
 * - personal: 個人開発
 */
export type WorkCategory = 'client' | 'internal' | 'training' | 'contract' | 'personal';

/**
 * 数値の種類。サイト上では必ずラベルを添えて表示する
 * - measured: 実際に測った値
 * - estimated: 単価や人数から計算した見込み
 * - target: 計画時に置いた目標値
 */
export type ImpactKind = 'measured' | 'estimated' | 'target';

/** 1つの数値成果 */
export interface Impact {
  /** 何の数値か（例: 1 回の注文時間） */
  label: string;
  /** 見出しにする値の数字部分（例: '1'、'≈0'、'2027.05'） */
  value: string;
  /** 値の単位（例: '分'、'円/月'） */
  unit?: string;
  /** 導入前などの比較元。単位まで含めて書く（例: '5分'） */
  before?: string;
  kind: ImpactKind;
  /** 期間や条件などの補足（例: '3ヶ月'、'タスクによる最大値'） */
  note?: string;
  /** 前後を棒で比べるときの値。before と同じ順に [前, 後] */
  bars?: [number, number];
}

/** 打ち手の1項目 */
export interface WorkApproach {
  title: string;
  detail?: string;
}

/** 数値の測り方 */
export interface WorkBasis {
  label: string;
  method: string;
}

/**
 * 実績1件。一覧・詳細・トップの展示室で共通に使う。
 */
export interface Work {
  slug: string;
  title: string;
  /** 題名の下に添える補足（例: 仮想オフィス（oVice の代替）） */
  subtitle?: string;
  /** 1 行の要約。経歴の行やメタ説明に使う */
  description: string;
  category: WorkCategory;
  status: 'published' | 'draft';
  /** 期間（YYYY-MM）。end を省くと継続中 */
  period: { start: string; end?: string };
  /** 業界（例: 情報通信） */
  industry?: string;
  /** 役割 */
  role?: string;
  /** 体制・規模（例: 2 チーム 11 名） */
  team?: string;
  /** NDA に配慮して企業名と画面を伏せている */
  masked?: boolean;
  /** 画面の画像。無いときは成果の数値を図にして見せる */
  thumbnail?: string;
  technologies: string[];
  github_url: string | null;
  website_url: string | null;
  /** トップの展示室に並べる順（1 から）。無ければ展示しない */
  featured?: number;
  /** 目指したこと */
  goal?: string;
  /** 始めたときの課題 */
  challenges?: string[];
  /** 打ち手 */
  approach?: WorkApproach[];
  /** 数値成果。先頭がカードや一覧の見出しになる */
  impacts?: Impact[];
  /** 数値の測り方 */
  basis?: WorkBasis[];
}
