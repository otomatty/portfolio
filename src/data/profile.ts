import { calculateExperienceMonths } from '@/lib/dateUtils';

export type CareerEntryType = 'work' | 'freelance' | 'education';
export type CareerIconKey = 'building' | 'code' | 'graduation' | 'rocket';
export type CertificationIconKey = 'award' | 'trophy';

export type CareerProject = {
  title: string;
  description: string;
  slug?: string;
  technologies?: string[];
};

export type CareerEntry = {
  id: number;
  period: string;
  title: string;
  company?: string;
  description: string;
  iconKey: CareerIconKey;
  type: CareerEntryType;
  projects?: CareerProject[];
  achievements?: string[];
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

export type CareerHighlight = {
  key: 'experience' | 'projects' | 'teaching' | 'awards';
  value: string;
  label: string;
  description: string;
  iconKey: 'briefcase' | 'code' | 'users' | 'award';
};

export const profile = {
  name: {
    ja: '菅井 瑛正',
    en: 'Akimasa Sugai',
  },
  email: 'akimasa.sugai@saedgewell.com',
  role: 'AI-Driven Development Engineer',
  headline:
    'AI駆動開発の導入支援とAIを活用した開発を軸に、UI/UXからインフラまで幅広く手がけるエンジニアです。',
  bioShort:
    'フロントエンドからバックエンド、インフラまで幅広い技術スタックを活用し、ビジネスの成長に貢献するソリューションを提供しています。',
  bioLong:
    'TypeScript/React を中心としたフロントエンドから、Rust/Go/Python によるバックエンド、AWS/GCP 等のクラウドインフラまで幅広い技術領域をカバーするエンジニアです。OSSをカスタマイズして高品質なアプリケーションを構築するノウハウや、企業DX推進・チーム育成の経験を活かし、技術と組織の両面から課題解決に取り組んでいます。',
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
    title: 'Web アプリケーション開発エンジニア',
    company: '株式会社アーシャルデザイン',
    description:
      'Web アプリケーション開発エンジニアとして参画。モダンな技術スタックを活用した開発に従事。',
    iconKey: 'building',
    type: 'work',
    achievements: [
      'フロントエンド・バックエンド両面での開発',
      'AI 駆動開発手法の導入推進',
    ],
  },
  {
    id: 2,
    period: '2020年12月 - 現在',
    title: '受託開発・個人開発',
    company: 'フリーランス',
    description:
      'TypeScript と Next.js を主軸としたモダンな Web 技術を活用し、業務システムや Web アプリの開発を担当。フリーランス専業1年目(2024年度)で12案件以上を受注。',
    iconKey: 'code',
    type: 'freelance',
    projects: [
      {
        title: '印刷会社向け ERP 開発',
        description:
          'AI 駆動開発により要件定義から 1 週間で 35 ページ + CMS 機能を実装',
        slug: 'printing-erp',
        technologies: ['Next.js', 'TypeScript', 'Supabase'],
      },
      {
        title: '香典帳アプリ開発',
        description:
          '葬儀会社 2 社とギフトショップとの共同開発。満足度調査で 93% が「とても使いやすかった」と評価',
        slug: 'kouden',
        technologies: ['React Native', 'Supabase'],
      },
      {
        title: '建設会社業務システム開発',
        description:
          '案件進捗・請求管理・勤怠管理システムの構築。Excel からの脱却と業務効率化を実現',
      },
      {
        title: '菓子製造会社流通管理システム保守',
        description:
          '20 箇所の拠点間流通システムの改善。注文時間を 5 分から 1 分に短縮',
        slug: 'fresh-inventory',
        technologies: ['PHP', 'MySQL'],
      },
      {
        title: '学習塾 CMS・勤務記録システム開発',
        description: '勤怠管理の業務時間を月 20 時間から 1 時間未満に削減',
      },
    ],
    achievements: [
      '多様な業界の業務システム開発経験',
      'クライアントの業務効率を大幅に改善',
      'AI 駆動開発による高速デリバリー',
    ],
  },
  {
    id: 3,
    period: '2024年9月 - 2025年2月',
    title: 'DX 推進支援事業 ファシリテーター',
    company: '地元企業向け',
    description:
      '地元企業向けの DX 推進支援事業にファシリテーターとして参画。企業の業務改善を支援。',
    iconKey: 'rocket',
    type: 'work',
    achievements: [
      '企業内業務時間最大 70% 短縮',
      '受講満足度 4.8/5',
      '複数企業への DX 導入支援',
    ],
  },
  {
    id: 4,
    period: '2020年11月 - 2024年4月',
    title: '塾講師・プログラミング講師',
    company: '学習塾',
    description:
      '延べ 300 名以上の指導実績。小学生から高校生まで幅広い年齢層を対象に指導。',
    iconKey: 'graduation',
    type: 'education',
    achievements: [
      '小学生ロボット相撲全国大会で指導チームが 1-3 位入賞',
      '延べ 100 名以上の受験生を指導',
      '志望校合格率 80% 以上',
    ],
  },
  {
    id: 5,
    period: '2016年8月 - 2020年3月',
    title: '家庭教師',
    company: '個人',
    description:
      '小学生から高校生まで個別指導。生徒一人ひとりに合わせた指導を実施。',
    iconKey: 'graduation',
    type: 'education',
    achievements: [
      '受験生の 70% 以上が第 1 志望校合格',
      '学習習慣の定着を重視した指導',
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

export const getDevelopmentExperienceYears = () => {
  const months = calculateExperienceMonths(profile.freelanceStartDate);
  return Math.max(1, Math.floor(months / 12));
};

export const getCareerHighlights = (): CareerHighlight[] => [
  {
    key: 'experience',
    value: `${getDevelopmentExperienceYears()}年+`,
    label: '開発経験',
    description: 'Web アプリケーション開発',
    iconKey: 'briefcase',
  },
  {
    key: 'projects',
    value: '20+',
    label: 'プロジェクト',
    description: '業務システム・Web サービス',
    iconKey: 'code',
  },
  {
    key: 'teaching',
    value: '300+',
    label: '指導実績',
    description: 'プログラミング講師として',
    iconKey: 'users',
  },
  {
    key: 'awards',
    value: '全国入賞',
    label: 'ロボット大会',
    description: '指導チームが 1-3 位',
    iconKey: 'award',
  },
];
