'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import {
  Briefcase,
  Building2,
  Code2,
  GraduationCap,
  Heart,
  Lightbulb,
  Rocket,
  Sparkles,
  User,
} from 'lucide-react';

type NavigationSubItem = {
  title: string;
  href: string;
  description: string;
  icon?: React.ReactNode;
};

type NavigationItem = {
  title: string;
  href: string;
  items?: NavigationSubItem[];
};

const iconClassName = 'h-4 w-4';

const navigationItems: NavigationItem[] = [
  {
    title: 'About',
    href: '/about',
    items: [
      {
        title: 'About',
        href: '/about',
        description: '私について',
        icon: <User className={iconClassName} />,
      },
      {
        title: 'Story',
        href: '/about/story',
        description: 'エンジニアとしての歩みとビジョン',
        icon: <Lightbulb className={iconClassName} />,
      },
      {
        title: 'Career',
        href: '/about/career',
        description: 'これまでのキャリアと実績',
        icon: <GraduationCap className={iconClassName} />,
      },
      {
        title: 'Skills',
        href: '/about/skills',
        description: '技術スキルと専門分野',
        icon: <Code2 className={iconClassName} />,
      },
      {
        title: 'Interests',
        href: '/about/interests',
        description: '興味・関心のある技術や分野',
        icon: <Heart className={iconClassName} />,
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
        icon: <Sparkles className={iconClassName} />,
      },
      {
        title: 'Company',
        href: '/works/company',
        description: '会社員として携わったプロジェクト',
        icon: <Building2 className={iconClassName} />,
      },
      {
        title: 'Freelance',
        href: '/works/freelance',
        description: 'フリーランスとして請け負った案件',
        icon: <Briefcase className={iconClassName} />,
      },
      {
        title: 'Personal',
        href: '/works/personal',
        description: '個人で開発したプロジェクト',
        icon: <Rocket className={iconClassName} />,
      },
    ],
  },
];

interface NavigationProps {
  currentPath?: string;
}

export function Navigation({ currentPath = '/' }: NavigationProps) {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {navigationItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            {item.items ? (
              <>
                <NavigationMenuTrigger
                  className={cn({
                    'bg-accent': currentPath.startsWith(item.href),
                  })}
                >
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-sm grid-cols-2 gap-2">
                    {item.items.map((subItem) => (
                      <li key={subItem.href}>
                        <NavigationMenuLink asChild>
                          <a
                            href={subItem.href}
                            className={cn(
                              'block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                              {
                                'bg-accent': currentPath === subItem.href,
                              }
                            )}
                          >
                            <div className="flex items-center gap-2 text-sm font-medium leading-none">
                              {subItem.icon}
                              {subItem.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                              {subItem.description}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <a
                  href={item.href}
                  className={cn(navigationMenuTriggerStyle(), 'h-9', {
                    'bg-accent': currentPath === item.href,
                  })}
                >
                  {item.title}
                </a>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
