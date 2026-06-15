import type { Work } from '@/types/works';

/**
 * Works data (静的データ)
 * Note: In production, this would be imported from a JSON file
 */
export const works: Work[] = [
  {
    slug: 'skill-quest-ai',
    title: 'Skill Quest Ai',
    description: 'SES企業に所属するエンジニアのためのLXP (Learning Experience Platform)のプロトタイプです。',
    category: 'personal',
    status: 'published',
    thumbnail: '/images/works/skill-quest-ai-thumbnail.webp',
    technologies: ['TypeScript', 'CSS', 'HTML', 'JavaScript', 'Lovable'],
    github_url: 'https://github.com/otomatty/skill-quest-ai',
    website_url: 'https://growthquest-hub.lovable.app',
    created_at: '2026-01-02T12:01:12Z',
    updated_at: '2026-01-02T12:01:21Z',
    isPinned: true,
  },
  {
    slug: 'zedi',
    title: 'Zedi',
    description: 'AI時代のメモアプリ。気になることをリンクにし、新たな知識をAIを活用して身につけていくことができます。',
    category: 'personal',
    status: 'published',
    thumbnail: '/images/works/zedi-thumbnail.webp',
    technologies: ['TypeScript', 'CSS', 'HTML', 'JavaScript'],
    github_url: 'https://github.com/otomatty/zedi',
    website_url: 'https://zedi-note.app',
    created_at: '2025-12-31T03:50:39Z',
    updated_at: '2026-01-03T05:04:35Z',
    isPinned: true,
  },
  {
    slug: 'typeflow',
    title: 'Typeflow',
    description: '効率的にタイピングが上手くなるためのタイピング練習アプリです。',
    category: 'personal',
    status: 'published',
    thumbnail: '/images/works/typeflow.webp',
    technologies: ['TypeScript', 'CSS', 'JavaScript', 'Shell', 'HTML'],
    github_url: 'https://github.com/otomatty/typeflow',
    website_url: 'https://type-flow.app',
    created_at: '2025-12-11T08:20:01Z',
    updated_at: '2025-12-25T23:06:31Z',
    isPinned: true,
  },
  {
    slug: 'kouden',
    title: '香典帳アプリ',
    description: '香典帳を簡単に管理することができるアプリです。',
    category: 'personal',
    status: 'published',
    thumbnail: '/images/works/kouden-thumbnail.webp',
    technologies: ['TypeScript', 'PLpgSQL', 'MDX', 'JavaScript', 'CSS'],
    github_url: 'https://github.com/otomatty/kouden',
    website_url: 'https://kouden-app.com',
    created_at: '2025-01-10T04:33:36Z',
    updated_at: '2025-11-25T06:07:06Z',
    isPinned: true,
  },
  {
    slug: 'robbozle-game',
    title: 'Robbozle Game',
    description: 'RobbozleをWebアプリとして再現したものです。',
    category: 'personal',
    status: 'published',
    thumbnail: '/images/works/robbozle-game.webp',
    technologies: ['TypeScript', 'CSS', 'JavaScript'],
    github_url: 'https://github.com/otomatty/logic-lab.git',
    website_url: 'https://code-blossom-bot.lovable.app',
    created_at: '2026-01-04T08:21:03Z',
    updated_at: '2026-01-04T08:21:03Z',
    isPinned: true,
  },
  {
    slug: 'fresh-inventory',
    title: '菓子製造会社向け流通管理システム',
    description: '菓子製造会社向け流通管理システムのプロトタイプです。',
    category: 'freelance',
    status: 'published',
    thumbnail: '/images/works/fresh-inventory.webp',
    technologies: ['TypeScript', 'CSS', 'HTML', 'JavaScript', 'Lovable'],
    github_url: 'https://github.com/otomatty/fresh-inventory',
    website_url: 'https://sweet-stock-guard.lovable.app',
    created_at: '2026-01-02T07:11:01Z',
    updated_at: '2026-01-02T07:11:10Z',
  },
  {
    slug: 'printing-erp',
    title: 'Printing Erp',
    description: '印刷会社向けのERPシステムのプロトタイプです。',
    category: 'freelance',
    status: 'published',
    thumbnail: '/images/works/printing-erp.webp',
    technologies: ['TypeScript', 'MDX', 'CSS', 'Go', 'Shell'],
    github_url: 'https://github.com/otomatty/printing-erp',
    website_url: 'https://printing-erp-system.vercel.app',
    created_at: '2025-05-15T05:52:59Z',
    updated_at: '2025-05-15T15:43:21Z',
  },
  {
    slug: 'saedgewell',
    title: 'ポートフォリオサイト',
    description: '菅井 瑛正のポートフォリオサイト',
    category: 'personal',
    status: 'published',
    thumbnail: '/images/works/saedgewell.webp',
    technologies: ['TypeScript', 'MDX', 'PLpgSQL', 'Go', 'CSS'],
    github_url: 'https://github.com/otomatty/saedgewell-v2',
    website_url: 'https://saedgewell.com',
    created_at: '2025-11-24T12:31:34Z',
    updated_at: '2026-01-01T16:02:50Z',
  },
  {
    slug: 'career-gems',
    title: 'Career Gems',
    description: 'SES企業のエンジニアのスキル管理ツールのプロトタイプです。',
    category: 'personal',
    status: 'published',
    thumbnail: '/images/works/career-gems-thumbnail.webp',
    technologies: ['TypeScript', 'CSS', 'HTML', 'JavaScript', 'Lovable'],
    github_url: 'https://github.com/otomatty/career-gems',
    website_url: 'https://gemini-gems-notes.lovable.app',
    created_at: '2025-12-21T16:19:11Z',
    updated_at: '2025-12-21T16:19:19Z',
  },
  {
    slug: 'kaki-map-hero',
    title: 'Kaki Map Hero',
    description: 'Snanoハッカソンで開発した柿取りマッチングアプリ',
    category: 'personal',
    status: 'published',
    thumbnail: '/images/works/kaki-map-hero-thumbnail.webp',
    technologies: ['TypeScript', 'CSS', 'HTML', 'JavaScript', 'Lovable'],
    github_url: 'https://github.com/otomatty/kaki-map-hero',
    website_url: 'https://kaki-map-hero.lovable.app',
    created_at: '2025-12-21T08:44:38Z',
    updated_at: '2025-12-21T08:44:46Z',
  },
  {
    slug: 'ofunato-mokumoku',
    title: 'Ofunato Mokumoku',
    description: '菅井が主催していた大船渡もくもく会の公式サイト',
    category: 'personal',
    status: 'published',
    thumbnail: '/images/works/ofunato-mokumoku.webp',
    technologies: ['TypeScript', 'CSS', 'HTML'],
    github_url: 'https://github.com/otomatty/ofunato-mokumoku',
    website_url: 'https://ofunato-mokumoku.pages.dev/',
    created_at: '2024-09-11T09:39:09Z',
    updated_at: '2024-09-22T02:02:57Z',
  },
  {
    slug: 'paper-ocr-tool',
    title: 'Paper OCR Tool',
    description: '簡単・効率的に紙を文字起こししてさまざまなシステムに貼り付けるためのアプリです。',
    category: 'personal',
    status: 'published',
    thumbnail: '/images/works/paper-ocr-tool.webp',
    technologies: ['HTML', 'TypeScript', 'CSS', 'JavaScript'],
    github_url: 'https://github.com/otomatty/paper-ocr-tool',
    website_url: 'https://paper-ocr-tool.pages.dev/',
    created_at: '2025-11-02T09:06:42Z',
    updated_at: '2025-11-05T06:36:45Z',
  },
];

/**
 * Get all published works
 */
export function getAllWorks(): Work[] {
  return works.filter((w) => w.status === 'published');
}

/**
 * Get work by slug
 */
export function getWorkBySlug(slug: string): Work | undefined {
  return getAllWorks().find((w) => w.slug === slug);
}

/**
 * Get works by category
 */
export function getWorksByCategory(
  category: 'company' | 'freelance' | 'personal'
): Work[] {
  return getAllWorks().filter((w) => w.category === category);
}

/**
 * Get featured/pinned works
 */
export function getFeaturedWorks(): Work[] {
  return getAllWorks().filter((w) => w.isPinned);
}

/**
 * Get unique technologies from all works
 */
export function getAllTechnologies(): string[] {
  const techSet = new Set<string>();
  getAllWorks().forEach((work) => {
    work.technologies.forEach((tech) => techSet.add(tech));
  });
  return Array.from(techSet).sort();
}
