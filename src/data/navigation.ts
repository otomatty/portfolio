import {
  Briefcase,
  Code2,
  GraduationCap,
  Heart,
  Lightbulb,
  Rocket,
  Sparkles,
  User,
} from 'lucide-react';

export type NavigationSubItem = {
  title: string;
  href: string;
  description: string;
  icon: typeof User;
};

export type NavigationItem = {
  title: string;
  href: string;
  items?: NavigationSubItem[];
};

export const navigationItems: NavigationItem[] = [
  {
    title: 'About',
    href: '/about',
    items: [
      {
        title: 'About',
        href: '/about',
        description: '私について',
        icon: User,
      },
      {
        title: 'Story',
        href: '/about/story',
        description: 'エンジニアとしての歩みとビジョン',
        icon: Lightbulb,
      },
      {
        title: 'Career',
        href: '/about/career',
        description: 'これまでのキャリアと実績',
        icon: GraduationCap,
      },
      {
        title: 'Skills',
        href: '/about/skills',
        description: '技術スキルと専門分野',
        icon: Code2,
      },
      {
        title: 'Interests',
        href: '/about/interests',
        description: '興味・関心のある技術や分野',
        icon: Heart,
      },
    ],
  },
  {
    title: 'Works',
    href: '/works',
    items: [
      {
        title: 'Works',
        href: '/works',
        description: 'すべての実績',
        icon: Sparkles,
      },
      {
        title: '実務',
        href: '/works?kind=professional',
        description: '企業案件・フリーランスとして携わったプロジェクト',
        icon: Briefcase,
      },
      {
        title: '個人開発',
        href: '/works?kind=personal',
        description: '個人で開発したプロジェクト',
        icon: Rocket,
      },
    ],
  },
];
