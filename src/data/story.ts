/**
 * 「エンジニアへの道のり」ページの文章
 */

export type StoryItem = {
  title: string;
  description: string;
};

export type JourneyEntry = {
  year: string;
  title: string;
  description: string;
  /** 転機になった出来事。年表の円を金で塗る */
  highlight?: boolean;
};

export type InfluenceGroup = {
  category: string;
  items: { name: string; description: string }[];
};

export const storyMotivations: StoryItem[] = [
  {
    title: 'きっかけ',
    description:
      '2020年ごろにプログラミングと出会い、独学で学び始めました。2021年ごろには GAS で勤務記録の自動集計ツールを初めて作り、それをきっかけにエンジニアとしてのキャリアを考え始め、Web 系言語の学習に本格的に取り組みました。',
  },
  {
    title: '情熱',
    description:
      'コードを書くことで、頭の中のアイデアが形になる瞬間が好きです。特に、ユーザーから「使いやすい」「業務が楽になった」というフィードバックをもらえた時に、エンジニアとしてのやりがいを感じます。',
  },
  {
    title: '目指すもの',
    description:
      '技術の力で人々の生活をより良くすること。AI や最新技術を活用しながら、誰もが使いやすいプロダクトを作り続けたいと考えています。',
  },
];

export const journeyEntries: JourneyEntry[] = [
  {
    year: '2016',
    title: '教育への第一歩',
    description:
      '大学入学と同時に家庭教師を始める。生徒に教えることの楽しさを知り、「伝える力」を磨く日々が始まりました。',
  },
  {
    year: '2020',
    title: 'プログラミングとの出会い',
    description:
      '独学でプログラミングを学び始めました。効率化や自動化への関心が、その後のエンジニアとしての道のりにつながっていきます。',
    highlight: true,
  },
  {
    year: '2021',
    title: '初めての自作ツール',
    description:
      'Google Apps Script（GAS）を使い、Google スプレッドシートの勤務記録を自動集計するツールを初めて作成しました。',
  },
  {
    year: '2021',
    title: 'エンジニアとしてのキャリアを志す',
    description:
      '塾講師ではなくエンジニアとしてのキャリアを考え始め、改めて Web 系言語の学習に取り組みました。',
    highlight: true,
  },
  {
    year: '2021-2022',
    title: '実践と成長の日々',
    description:
      '複数の業務システム開発を経験。建設会社、製造会社など様々な業界のクライアントと協働し、実践的なスキルを磨きました。',
  },
  {
    year: '2023',
    title: 'AI 駆動開発との出会い（Cursor）',
    description:
      'Cursor がリリースされた日から使い始め、AI 駆動開発の世界に足を踏み入れました。その後 GitHub Copilot なども活用するようになりました。',
    highlight: true,
  },
  {
    year: '2024',
    title: 'AI 駆動開発の確立',
    description:
      'Cursor を中心とした AI 駆動開発を確立。1 週間で 35 ページの ERP システムを構築するなど、開発速度が劇的に向上しました。',
    highlight: true,
  },
  {
    year: '2025',
    title: '新たなステージへ',
    description:
      '株式会社アーシャルデザインにエンジニアとして参画。チーム開発の経験を積みながら、さらなる成長を目指しています。',
    highlight: true,
  },
];

export const influenceGroups: InfluenceGroup[] = [
  {
    category: '技術・ツール',
    items: [
      { name: 'React / Next.js', description: 'コンポーネント思考と宣言的 UI の美しさに魅了されました' },
      { name: 'TypeScript', description: '型安全性がもたらす開発体験の向上を実感' },
      { name: 'Cursor', description: 'AI 駆動開発の可能性を広げてくれた革新的ツール' },
    ],
  },
  {
    category: '書籍・学習リソース',
    items: [
      { name: 'リーダブルコード', description: '読みやすいコードを書くことの重要性を学びました' },
      { name: 'Clean Architecture', description: 'ソフトウェア設計の原則を深く理解するきっかけに' },
      { name: 'Zenn / Qiita', description: '日本のエンジニアコミュニティから多くを学んでいます' },
    ],
  },
  {
    category: 'コミュニティ・人',
    items: [
      { name: 'OSS コミュニティ', description: 'オープンソースの精神と協調の大切さを学びました' },
      { name: '教育現場での生徒たち', description: '「伝わる」ことの難しさと喜びを教えてくれました' },
      { name: 'クライアントの皆様', description: '実際の課題解決を通じて成長させていただきました' },
    ],
  },
  {
    category: '考え方・哲学',
    items: [
      { name: 'ユーザーファースト', description: '使う人の視点を常に意識した開発を心がけています' },
      { name: '継続的改善', description: '小さな改善を積み重ねることの力を信じています' },
      { name: 'シンプルさ', description: '複雑さを避け、本質的な解決を目指します' },
    ],
  },
];

export const storyVisions: StoryItem[] = [
  {
    title: 'AI と共に進化する',
    description:
      'AI 駆動開発のエキスパートとして、テクノロジーの最前線で活躍し続けたい。人間と AI が協調する新しい開発スタイルを追求します。',
  },
  {
    title: 'グローバルに貢献する',
    description:
      'OSS への貢献やテック記事の執筆を通じて、世界中のエンジニアコミュニティに価値を提供したいと考えています。',
  },
  {
    title: '次世代を育てる',
    description:
      '講師としての経験を活かし、次世代のエンジニアの成長を支援。技術と教育の両面から社会に貢献したいと思っています。',
  },
];
