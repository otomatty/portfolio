/**
 * About ページの「大切にしていること」と「興味関心」
 */

export type AboutItem = {
  title: string;
  description: string;
};

export const aboutValues: AboutItem[] = [
  {
    title: 'OSSカスタマイズ',
    description:
      'オープンソースをベースにカスタマイズすることで、高品質で安定したアプリケーションを効率的に構築します。',
  },
  {
    title: '企業DX推進',
    description:
      '業務プロセスのデジタル化から社内人材育成・チーム運営まで、組織全体のDX推進をサポートします。',
  },
  {
    title: '品質へのこだわり',
    description:
      'クリーンなコードと高いパフォーマンスを追求し、ユーザー体験の向上に貢献します。',
  },
  {
    title: '技術革新',
    description:
      '常に新しい技術やベストプラクティスを学び、プロジェクトに最適なソリューションを提供します。',
  },
  {
    title: 'チームワーク',
    description:
      'オープンなコミュニケーションと知識共有を大切にし、チーム全体の成長を促進します。',
  },
  {
    title: '目標達成',
    description:
      'ビジネス目標を理解し、技術で課題を解決することで、プロジェクトの成功に貢献します。',
  },
];

export const aboutInterests: AboutItem[] = [
  {
    title: 'AI ツール',
    description: 'Cursor や Devin を活用した開発効率化',
  },
  {
    title: '盆栽',
    description: '日本の伝統的な盆栽の育成',
  },
  {
    title: 'DIY',
    description: '家具や小物のものづくり',
  },
  {
    title: '美術館',
    description: 'アートや歴史的な展示物の鑑賞',
  },
];

/** 一、二、三… の漢数字。項目の番号に使う */
export const kanjiNumerals = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'] as const;
