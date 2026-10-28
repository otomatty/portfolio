export const homepageCopy = {
  hero: {
    title: {
      part1: 'AI駆動開発を、',
      highlight: 'チームの当たり前',
      part2: 'に。',
    },
    subtitle:
      'AI-DLCの導入・定着支援から、社内ツールの内製、人材育成まで。作ったものではなく、変えた数字で仕事を語ります。',
    ctaPrimary: '実績を見る',
    ctaSecondary: 'プロフィール',
  },
  about: {
    label: 'About',
    // 1行ごとの文節。文節の途中で改行しないように分けて持つ
    title: [
      ['作ったものより、'],
      ['変えた数字で', '語る。'],
    ],
    lead: 'AI 駆動開発の組織導入、Cloudflare で動かす社内ツール、エンジニアの育成。どの仕事も「何を目指したか」と「どれだけ変わったか」をそろえて載せています。',
  },
  works: {
    label: 'Works',
    title: 'これまでの実績',
    indexLabel: '展示の目次',
    goal: '目指したこと',
    others: 'その他の実績',
    othersIndex: 'その他',
    viewDetail: '詳細を見る',
    website: 'サイト',
    viewAll: 'すべての実績を見る',
  },
  profile: {
    label: 'Profile',
    photoAlt: '松の手入れをする菅井 瑛正',
    stack: ['TypeScript', 'React', 'Hono', 'Cloudflare', 'Supabase', 'Python', 'AWS', 'Claude Code', 'MCP'],
    stackLabel: '主な技術',
    cta: '詳細プロフィール',
  },
  contact: {
    label: 'Contact',
    title: 'お問い合わせ',
    description: 'AI 駆動開発の導入、社内ツールの内製、プロダクト開発のご相談など、お気軽にお問い合わせください。',
    form: 'お問い合わせはこちら',
    copy: 'コピー',
    copied: 'コピーしました',
    selected: '選択しました',
  },
};

export type HomepageCopy = typeof homepageCopy;
