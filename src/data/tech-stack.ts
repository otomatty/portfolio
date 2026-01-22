export interface TechStack {
  name: string;
  icon: string;
  color: string;
}

const ICON_BASE = 'https://saedgewell.net/icons';

export const techStacks = {
  outer: [
    {
      name: 'Next.js',
      icon: `${ICON_BASE}/next-js.svg`,
      color: 'dark:invert',
    },
    {
      name: 'React',
      icon: `${ICON_BASE}/react.svg`,
      color: 'text-[#61DAFB]',
    },
    {
      name: 'TypeScript',
      icon: `${ICON_BASE}/typescript.svg`,
      color: 'text-[#3178C6]',
    },
    {
      name: 'Tailwind',
      icon: `${ICON_BASE}/tailwind-css-2.svg`,
      color: 'text-[#38BDF8]',
    },
    {
      name: 'Hono',
      icon: `${ICON_BASE}/hono.svg`,
      color: 'text-[#E36002]',
    },
    {
      name: 'Tauri',
      icon: `${ICON_BASE}/tauri.svg`,
      color: 'text-[#FFC131]',
    },
    {
      name: 'Motion',
      icon: `${ICON_BASE}/motion/motion-logo-light.svg`,
      color: 'text-[#00E5FF]',
    },
    {
      name: 'Jotai',
      icon: `${ICON_BASE}/jotai.png`,
      color: 'dark:invert',
    },
    {
      name: 'Storybook',
      icon: `${ICON_BASE}/storybook.svg`,
      color: 'dark:invert',
    },
  ],
  middle: [
    {
      name: 'Supabase',
      icon: `${ICON_BASE}/supabase/supabase-logo-icon.svg`,
      color: 'text-[#3ECF8E]',
    },
    {
      name: 'GCP',
      icon: `${ICON_BASE}/google-cloud.svg`,
      color: 'text-[#4285F4]',
    },
    {
      name: 'Vite',
      icon: `${ICON_BASE}/vite.svg`,
      color: 'text-[#646CFF]',
    },
    {
      name: 'Bun',
      icon: `${ICON_BASE}/bun/logo.svg`,
      color: 'text-[#FBF0DF]',
    },
    {
      name: 'shadcn/ui',
      icon: `${ICON_BASE}/shadcn.svg`,
      color: 'dark:invert',
    },
  ],
  inner: [
    {
      name: 'JavaScript',
      icon: `${ICON_BASE}/js/javascript-large.svg`,
      color: 'text-[#F7DF1E]',
    },
    {
      name: 'CSS',
      icon: `${ICON_BASE}/css/css.svg`,
      color: 'text-[#1572B6]',
    },
    {
      name: 'ChatGPT',
      icon: `${ICON_BASE}/chatgpt.svg`,
      color: 'text-[#00A67E]',
    },
    {
      name: 'Gemini',
      icon: `${ICON_BASE}/gemini.svg`,
      color: 'text-[#8E75B2]',
    },
    {
      name: 'Markdown',
      icon: `${ICON_BASE}/markdown.svg`,
      color: 'dark:invert',
    },
  ],
} as const;
