/**
 * サイト共通の UI 文言（ヘッダー・フッター・ページメタ）
 */
export const commonCopy = {
  header: {
    contactCta: 'お問い合わせ',
    openMenu: 'メニューを開く',
    menuTitle: 'メニュー',
  },
  footer: {
    sections: {
      about: {
        title: 'About',
        items: {
          intro: '自己紹介',
          career: 'キャリア',
          skills: 'スキル',
          skillSheet: 'スキルシート',
        },
      },
      works: {
        title: 'Works',
        items: {
          all: 'すべて',
          professional: '実務',
          personal: '個人開発',
        },
      },
      contact: {
        title: 'Contact',
        items: {
          contact: 'お問い合わせ',
        },
      },
    },
    legal: {
      privacy: 'プライバシーポリシー',
      terms: '利用規約',
    },
    copyright: 'All rights reserved.',
  },
  home: {
    meta: {
      title: 'Saedgewell | 菅井 瑛正',
      description: '菅井 瑛正 / ポートフォリオ',
    },
  },
} as const;
