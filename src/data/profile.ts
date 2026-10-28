export type CertificationIconKey = 'award' | 'trophy';

/** 経歴の行。実績に紐づかないもの（講師の仕事など）に使う */
export type CareerRow = {
  title: string;
  /** 題名の下に置く補足（期間など） */
  meta?: string;
  /** 右に置く成果 */
  result?: string;
  href?: string;
};

/**
 * 経歴の中のまとまり（客先案件・社内ツールなど）。
 * works は実績の slug で、題名・期間・要約・見出しの数値を実績から引く。
 */
export type CareerGroup = {
  label?: string;
  works?: string[];
  rows?: CareerRow[];
};

export type CareerEntry = {
  id: number;
  period: string;
  title: string;
  company?: string;
  description: string;
  /** About の経歴で題名の下に置く1行の要約 */
  summary: string;
  /** About の経歴で添える代表的な成果 */
  highlights: string[];
  groups: CareerGroup[];
  /** 在籍中 */
  current?: boolean;
};

export type CertificationItem = {
  title: string;
  date: string;
  description: string;
};

export type CertificationGroup = {
  id: 'certifications' | 'awards';
  title: string;
  iconKey: CertificationIconKey;
  items: CertificationItem[];
};

export const profile = {
  name: {
    ja: '菅井 瑛正',
    en: 'Akimasa Sugai',
  },
  email: 'akimasa.sugai@saedgewell.com',
  role: 'AI-Driven Development Engineer',
  headline:
    'AI 駆動開発の定着、業務ツールの内製、人材の育成。3 つの軸で、チームの生産性とコストを数字で変えるエンジニアです。',
  bioLong:
    'システムエンジニア・AI 駆動開発リード。2020 年にフリーランスとして開発を始め、2025 年からアーシャルデザインで客先の開発支援に携わっています。直近では大手通信事業会社の 2 チームに AI-DLC を本番導入しました。社内ではチームリーダーとして育成を担い、仮想オフィスや要員管理などの社内ツールを Cloudflare でほぼ 0 円で動かしています。講師として 8 年間で延べ 300 名以上を指導した経験から、技術を噛み砕いて伝えることを得意としています。',
  images: {
    profile: '/images/profile.webp',
    avatar: '/images/akimasapf.webp',
  },
  socials: {
    github: 'https://github.com/otomatty',
  },
  freelanceStartDate: '2020-12-01',
} as const;

export const careerEntries: CareerEntry[] = [
  {
    id: 1,
    period: '2025年7月 - 現在',
    title: 'システムエンジニア・AI 駆動開発リード',
    company: '株式会社アーシャルデザイン',
    description:
      'SES として大手企業の開発現場に参画。AI 駆動開発の組織導入、AI エージェント機能の実装、大規模プロジェクトの CI/CD 設計を担当。社内ではチームリーダーとして育成と社内ツールの内製を担う。',
    summary: '客先案件 3 件・社内ツール 4 件・人材育成',
    highlights: ['ベロシティ 最大 2 倍', '計画の半分の期間で達成', 'インフラ費 ≈0円/月'],
    groups: [
      { label: '客先案件', works: ['telecom-ai-dlc', 'sd-llm-sales-analysis', 'automotive-adas-tool'] },
      { label: '社内ツール', works: ['agora', 'tb-palette', 'tb-force', 'falcon-auto-review'] },
      {
        label: '人材育成',
        works: ['internal-oss', 'development-lab'],
        rows: [
          { title: 'チームリーダー', meta: 'メンバーとの月 1 回の面談、目標設定のレビュー' },
          { title: '研修教材の作成・レビュー', meta: 'Claude Code の研修資料、FALCON v4（JavaScript / TypeScript）' },
        ],
      },
    ],
    current: true,
  },
  {
    id: 2,
    period: '2020年12月 - 2025年6月',
    title: '受託開発（要件定義〜保守運用）',
    company: 'フリーランス',
    description:
      'クライアント折衝から設計・実装・保守運用まで 1 人で完結する案件を中心に、7 業界で業務システムを開発。プロトタイプで合意を取り、要件を早く固める進め方を得意とする。2024 年度は 12 案件以上を受注。',
    summary: '7 業界の業務システム・Web アプリ',
    highlights: ['作業時間 95% 以上削減', '注文時間 5分 → 1分', '1 週間で 35 ページ公開'],
    groups: [
      {
        works: [
          'printing-erp',
          'farm-shift',
          'kouden',
          'construction-progress',
          'fresh-inventory',
          'materials-hp-prototype',
          'lms-planning',
          'cram-school-system',
          'website-production',
        ],
      },
    ],
  },
  {
    id: 3,
    period: '2016年8月 - 2025年2月',
    title: '講師・ファシリテーター',
    company: '学習塾・プログラミング教室・家庭教師',
    description: '小学生から高校生、地元企業の社員まで、8 年間で延べ 300 名以上を指導。',
    summary: '8 年間で延べ 300 名以上を指導',
    highlights: ['ロボット相撲 全国 1〜3 位', '「また来たい」95%', '業務時間 最大 70% 短縮'],
    groups: [
      {
        rows: [
          { title: '地元企業向け DX 推進支援 ファシリテーター', meta: '2024.09 – 2025.02', result: '業務時間 最大 70% 短縮・受講満足度 4.8/5' },
          { title: '子ども向けプログラミング教室', meta: '2024.08 – 2025.02', result: '全国大会で 4 チーム中 3 チームが 1〜3 位・参加者の 95% が「また来たい」' },
          { title: '学習塾 講師', meta: '2020.11 – 2024.04', result: '延べ 100 名以上・志望校合格率 80% 以上' },
          { title: '家庭教師', meta: '2016.08 – 2020.03', result: '担当受験生の 70% 以上が第 1 志望合格' },
        ],
      },
    ],
  },
];

export const certificationGroups: CertificationGroup[] = [
  {
    id: 'certifications',
    title: '資格',
    iconKey: 'award',
    items: [
      {
        title: '基本情報技術者試験',
        date: '2022年10月',
        description: 'ITエンジニアの登竜門資格',
      },
      {
        title: '実用英語技能検定 準1級',
        date: '2021年4月',
        description: '英語コミュニケーション能力の証明',
      },
      {
        title: '実用数学技能検定 準1級',
        date: '2021年8月',
        description: '数学的思考力の証明',
      },
      {
        title: 'TOEIC 780点',
        date: '2019年',
        description: 'ビジネス英語コミュニケーション能力',
      },
      {
        title: 'タイピング技能検定イータイピング・マスター1級',
        date: '取得年不明',
        description: '高速・正確なタイピング技能',
      },
      {
        title: '普通自動車第一種免許',
        date: '取得年不明',
        description: '自動車運転免許',
      },
    ],
  },
  {
    id: 'awards',
    title: '受賞歴・指導実績',
    iconKey: 'trophy',
    items: [
      {
        title: '小学生proroロボット相撲全国大会 指導実績',
        date: '2024年',
        description: '指導した4チーム中3チームが1〜3位入賞',
      },
      {
        title: '地元企業向けDX推進支援事業 ファシリテーター',
        date: '2024年9月 - 2025年2月',
        description: '企業内業務時間最大70%短縮、受講満足度4.8/5',
      },
      {
        title: '塾講師としての指導実績',
        date: '2020年11月 - 2024年4月',
        description: '延べ100名以上を担当し、志望校合格率80%以上を達成',
      },
    ],
  },
];
