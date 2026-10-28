import type { Impact, ImpactKind } from '@/types/works';
import { getWorkBySlug, getWorksByCategory } from './works';

/**
 * 代表的な数値。実績の数値を参照し（slug と impacts の位置）、見出しと補足だけを差し替える。
 * 実績に紐づかない数値（指導人数など）は impact を直接書く。
 */
type HighlightSource = {
  /** 指標の名前（例: ベロシティ） */
  label: string;
  /** 数値の下に添える説明 */
  meta: string;
} & ({ slug: string; index: number } | { impact: Impact });

export type Highlight = {
  label: string;
  value: string;
  unit?: string;
  meta: string;
  kind: ImpactKind;
  href?: string;
};

const resolve = (source: HighlightSource): Highlight => {
  if ('impact' in source) {
    const { impact } = source;
    return { label: source.label, value: impact.value, unit: impact.unit, meta: source.meta, kind: impact.kind };
  }
  const impact = getWorkBySlug(source.slug)?.impacts?.[source.index];
  if (!impact) {
    throw new Error(`実績 ${source.slug} に impacts[${source.index}] がありません`);
  }
  return {
    label: source.label,
    value: impact.value,
    unit: impact.unit,
    meta: source.meta,
    kind: impact.kind,
    href: `/works/${source.slug}`,
  };
};

const resolveAll = (sources: HighlightSource[]): Highlight[] => sources.map(resolve);

/** 講師として指導した人数（家庭教師・塾講師・プログラミング講師の延べ） */
const teaching: HighlightSource = {
  label: '指導',
  impact: { label: '指導した人数', value: '300', unit: '名+', kind: 'measured' },
  meta: '講師として 8 年間',
};

/** トップの About に並べる数値 */
export const getHomeHighlights = (): Highlight[] =>
  resolveAll([
    { label: 'ベロシティ', slug: 'telecom-ai-dlc', index: 1, meta: 'AI-DLC 導入（タスクにより）' },
    { label: '業務量', slug: 'automotive-adas-tool', index: 1, meta: '自動運転開発ツールの CI/CD 自動化' },
    { label: '作業時間', slug: 'cram-school-system', index: 1, meta: '学習塾の勤怠集計 月20時間 → 1時間未満' },
    { label: 'インフラ費', slug: 'agora', index: 0, meta: 'Cloudflare で動かす社内ツール' },
  ]);

/** 経歴ページのキャリアハイライト */
export const getCareerHighlights = (): Highlight[] =>
  resolveAll([
    { label: 'ベロシティ', slug: 'telecom-ai-dlc', index: 1, meta: 'AI-DLC を 2 チーム 11 名に本番導入' },
    { label: '開発期間', slug: 'automotive-adas-tool', index: 0, meta: '自動運転開発ツール（計画比）' },
    { label: 'インフラ費', slug: 'agora', index: 0, meta: 'Cloudflare で動かす社内ツール' },
    teaching,
  ]);

/** About の「取り組んでいること」。軸ごとに代表的な数値を2つずつ添える */
export type FocusArea = {
  title: string;
  description: string;
  highlights: Highlight[];
};

export const getAboutFocus = (): FocusArea[] => [
  {
    title: 'AI 駆動開発を定着させる',
    description: '試験導入で終わらせず、実案件のまま本番運用に乗せる。測る仕組みと引継ぎまでを一続きで作る。',
    highlights: resolveAll([
      { label: 'ベロシティ', slug: 'telecom-ai-dlc', index: 1, meta: 'AI-DLC 導入' },
      { label: '適用範囲', slug: 'telecom-ai-dlc', index: 0, meta: '3ヶ月で' },
    ]),
  },
  {
    title: '業務ツールを内製する',
    description: '契約している SaaS や GAS の仕組みを置き換え、Cloudflare だけで動かして費用をなくす。',
    highlights: resolveAll([
      { label: 'インフラ費', slug: 'agora', index: 0, meta: '社内ツール' },
      {
        label: '社内ツール',
        impact: { label: '社内ツール', value: String(getWorksByCategory('internal').length), unit: '件', kind: 'measured' },
        meta: '仮想オフィス・要員管理ほか',
      },
    ]),
  },
  {
    title: '人を育てる',
    description: '社内 OSS・開発ラボ・研修教材・チームリーダー。実案件に近い経験を社内で積める場を作る。',
    highlights: resolveAll([{ label: '社内 OSS の PR', slug: 'internal-oss', index: 0, meta: '3.5ヶ月' }, teaching]),
  },
];
