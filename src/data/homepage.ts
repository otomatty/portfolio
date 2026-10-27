export const homepageCopy = {
  hero: {
    title: {
      part1: 'AI駆動開発を、',
      highlight: 'チームの当たり前',
      part2: 'に。',
    },
    subtitle:
      'AI-DLCの導入・定着支援から、UI/UX設計を含むフルスタック開発まで。AIを“安定して動かす”ことにこだわるエンジニアです。',
    ctaPrimary: '実績を見る',
    ctaSecondary: 'プロフィール',
  },
  about: {
    label: 'About',
    // 1行ごとの文節。文節の途中で改行しないように分けて持つ
    title: [
      ['UI/UXから', 'インフラまで、'],
      ['AIを軸に', '手がける。'],
    ],
    metrics: {
      developmentExperience: { title: '開発経験', unit: '年' },
      projectCount: { title: '実績', unit: '件' },
      personalProjectCount: { title: '個人開発', unit: '個' },
    },
    untilNow: '現在',
  },
  works: {
    label: 'Works',
    title: 'これまでの実績',
    indexLabel: '展示の目次',
    others: 'その他の実績',
    othersIndex: 'その他',
    viewDetail: '詳細を見る',
    website: 'サイト',
    viewAll: 'すべての実績を見る',
  },
  profile: {
    label: 'Profile',
    photoAlt: '松の手入れをする菅井 瑛正',
    stack: ['TypeScript', 'React', 'Next.js', 'Astro', 'Hono', 'Tauri', 'Supabase', 'Rust', 'Go', 'Python', 'AWS', 'GCP'],
    stackLabel: '主な技術',
    cta: '詳細プロフィール',
  },
  contact: {
    label: 'Contact',
    title: 'お問い合わせ',
    description: 'プロダクト開発や技術に関するご質問・ご相談など、お気軽にお問い合わせください。',
    form: 'お問い合わせはこちら',
    copy: 'コピー',
    copied: 'コピーしました',
    selected: '選択しました',
  },
};

export type HomepageCopy = typeof homepageCopy;
