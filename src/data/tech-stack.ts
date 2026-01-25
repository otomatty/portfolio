export interface TechStack {
  name: string;
  icon: string;
  color: string;
}


export const techStacks = {
  outer: [
    {
      name: 'Next.js',
      icon: `/icons/next-js.svg`,
      color: 'dark:invert',
    },
    {
      name: 'React',
      icon: `/icons/react.svg`,
      color: 'text-[#61DAFB]',
    },
    {
      name: 'TypeScript',
      icon: `/icons/typescript.svg`,
      color: 'text-[#3178C6]',
    },
    {
      name: 'Tailwind',
      icon: `/icons/tailwind-css-2.svg`,
      color: 'text-[#38BDF8]',
    },
    {
      name: 'Hono',
      icon: `/icons/hono.svg`,
      color: 'text-[#E36002]',
    },
    {
      name: 'Tauri',
      icon: `/icons/tauri.svg`,
      color: 'text-[#FFC131]',
    },
    {
      name: 'Motion',
      icon: `/icons/motion/motion-logo-light.svg`,
      color: 'text-[#00E5FF]',
    },
    {
      name: 'Jotai',
      icon: `/icons/jotai.png`,
      color: 'dark:invert',
    },
    {
      name: 'Storybook',
      icon: `/icons/storybook.svg`,
      color: 'dark:invert',
    },
  ],
  middle: [
    {
      name: 'Supabase',
      icon: `/icons/supabase/supabase-logo-icon.svg`,
      color: 'text-[#3ECF8E]',
    },
    {
      name: 'GCP',
      icon: `/icons/google-cloud.svg`,
      color: 'text-[#4285F4]',
    },
    {
      name: 'Vite',
        icon: `/icons/vite.svg`,
      color: 'text-[#646CFF]',
    },
    {
      name: 'Bun',
      icon: `/icons/bun/logo.svg`,
      color: 'text-[#FBF0DF]',
    },
    {
      name: 'shadcn/ui',
      icon: `/icons/shadcn.svg`,
      color: 'dark:invert',
    },
  ],
  inner: [
    {
      name: 'JavaScript',
      icon: `/icons/js/javascript-large.svg`,
      color: 'text-[#F7DF1E]',
    },
    {
      name: 'CSS',
      icon: `/icons/css/css.svg`,
      color: 'text-[#1572B6]',
    },
    {
      name: 'ChatGPT',
      icon: `/icons/chatgpt.svg`,
      color: 'text-[#00A67E]',
    },
    {
      name: 'Gemini',
      icon: `/icons/gemini.svg`,
      color: 'text-[#8E75B2]',
    },
    {
      name: 'Markdown',
      icon: `/icons/markdown.svg`,
      color: 'dark:invert',
    },
  ],
} as const;
