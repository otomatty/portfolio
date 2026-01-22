export const homepageCopy = {
  hero: {
    title: {
      part1: '最小のリソースから',
      highlight: '最大の価値',
      part2: 'を生み出す',
    },
    subtitle: 'プロダクトエンジニアとして、あなたのビジョンを現実に',
  },
  introduction: {
    title: 'About Me',
    subtitle: '私のプロフィールと実績',
    profile: {
      name: 'Akimasa Sugai',
      description:
        'フロントエンドからバックエンド、インフラまで幅広い技術スタックを活用し、ビジネスの成長に貢献するソリューションを提供しています。',
      cta: '詳細プロフィール',
    },
    metrics: {
      developmentExperience: {
        title: '開発経験',
        unit: '年',
        cta: '経験を見る',
      },
      projectCount: {
        title: '実績',
        unit: '件',
        cta: '実績を見る',
      },
      personalProjectCount: {
        title: '個人開発',
        unit: '個',
        cta: '実績を見る',
      },
    },
    cards: {
      github: {
        title: 'GitHub',
        cta: 'リポジトリを見る',
      },
      interests: {
        title: '興味・価値観',
        description: '興味と価値観',
        cta: '詳しく見る',
      },
      techStack: {
        title: '技術スタック',
        description: 'モダンな技術スタックを活用した開発経験',
        cta: 'スキル詳細',
      },
    },
  },
  achievements: {
    scrollText: '実績の一部をご紹介します',
    description: '表示されている実績をクリックすると詳細を見ることができます',
  },
  additionalAchievements: {
    title: 'Works',
    subtitle: 'これまでの成果物をご紹介します。',
    categories: {
      company: '企業案件',
      freelance: 'フリーランス',
      personal: '個人開発',
    },
    categoryPlaceholder: 'カテゴリー',
    all: 'すべて',
    searchPlaceholder: 'プロジェクトを検索...',
    notFound: '条件に一致する実績が見つかりませんでした',
    viewAll: 'すべての実績を見る',
  },
  cta: {
    title: 'Contact',
    subtitle: 'お問い合わせ・お見積り',
    contact: {
      title: 'チャットでのお問い合わせ',
      description:
        'ご質問・ご相談などお気軽にお問い合わせください。\nリアルタイムでご対応いたします。',
      buttonText: 'お問い合わせはこちら',
    },
    estimate: {
      title: 'お見積り',
      description:
        'AIによる自動見積もりシステムで、\n素早く正確なお見積りを提供いたします。',
      buttonText: 'お見積りはこちら',
    },
    availability: {
      title: '対応可能時間',
      timeSlot: '時間帯',
      email: 'メールアドレス',
      phone: '電話番号',
      meetingSchedule: 'ミーティングを予約する',
      status: {
        available: '対応可能',
        consultation: '要相談',
        unavailable: '対応不可',
      },
      days: {
        monday: '月',
        tuesday: '火',
        wednesday: '水',
        thursday: '木',
        friday: '金',
        saturday: '土',
        sunday: '日',
        holiday: '祝',
      },
    },
  },
} as const;
