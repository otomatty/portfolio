export interface TechStack {
  name: string;
  icon: string;
  color: string;
}


export const techStacks = {
  outer: [
    {
      name: 'Next.js',
      icon: `./public/icons/next-js.svg`,
      color: 'dark:invert',
    },
    {
      name: 'React',
      icon: `./public/icons/react.svg`,
      color: 'text-[#61DAFB]',
    },
    {
      name: 'TypeScript',
      icon: `./public/icons/typescript.svg`,
      color: 'text-[#3178C6]',
    },
    {
      name: 'Tailwind',
      icon: `./public/icons/tailwind-css-2.svg`,
      color: 'text-[#38BDF8]',
    },
    {
      name: 'Hono',
      icon: `./public/icons/hono.svg`,
      color: 'text-[#E36002]',
    },
    {
      name: 'Tauri',
      icon: `./public/icons/tauri.svg`,
      color: 'text-[#FFC131]',
    },
    {
      name: 'Motion',
      icon: `./public/icons/motion/motion-logo-light.svg`,
      color: 'text-[#00E5FF]',
    },
    {
      name: 'Jotai',
      icon: `./public/icons/jotai.png`,
      color: 'dark:invert',
    },
    {
      name: 'Storybook',
      icon: `./public/icons/storybook.svg`,
      color: 'dark:invert',
    },
  ],
  middle: [
    {
      name: 'Supabase',
      icon: `./public/icons/supabase/supabase-logo-icon.svg`,
      color: 'text-[#3ECF8E]',
    },
    {
      name: 'GCP',
      icon: `./public/icons/google-cloud.svg`,
      color: 'text-[#4285F4]',
    },
    {
      name: 'Vite',
        icon: `./public/icons/vite.svg`,
      color: 'text-[#646CFF]',
    },
    {
      name: 'Bun',
      icon: `./public/icons/bun/logo.svg`,
      color: 'text-[#FBF0DF]',
    },
    {
      name: 'shadcn/ui',
      icon: `./public/icons/shadcn.svg`,
      color: 'dark:invert',
    },
  ],
  inner: [
    {
      name: 'JavaScript',
      icon: `./public/icons/js/javascript-large.svg`,
      color: 'text-[#F7DF1E]',
    },
    {
      name: 'CSS',
      icon: `./public/icons/css/css.svg`,
      color: 'text-[#1572B6]',
    },
    {
      name: 'ChatGPT',
      icon: `./public/icons/chatgpt.svg`,
      color: 'text-[#00A67E]',
    },
    {
      name: 'Gemini',
      icon: `./public/icons/gemini.svg`,
      color: 'text-[#8E75B2]',
    },
    {
      name: 'Markdown',
      icon: `./public/icons/markdown.svg`,
      color: 'dark:invert',
    },
  ],
} as const;
