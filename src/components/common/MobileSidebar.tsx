'use client';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { ChevronDown, Menu } from 'lucide-react';
import { useState } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

const navigationItems = [
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Works',
    href: '/works',
  },
  {
    title: 'Services',
    items: [
      {
        title: 'サービス一覧',
        href: '/services',
      },
      {
        title: '開発プロセス',
        href: '/services/process',
      },
      {
        title: '料金',
        href: '/services/pricing',
      },
      {
        title: 'FAQ',
        href: '/services/faq',
      },
    ],
  },
  {
    title: 'Contact',
    href: '/contact',
  },
] as const;

interface MobileSidebarProps {
  currentPath?: string;
  currentLocale?: string;
}

export function MobileSidebar({ currentPath = '/', currentLocale = 'ja' }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">メニューを開く</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>メニュー</SheetTitle>

        <nav className="flex flex-col gap-1 p-4">
          {navigationItems.map((item) => {
            if ('items' in item) {
              const isActive = item.items.some(
                (subItem) => subItem.href === currentPath
              );
              return (
                <Collapsible
                  key={item.title}
                  open={servicesOpen}
                  onOpenChange={setServicesOpen}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        'w-full justify-between px-4 py-2 text-sm font-medium',
                        {
                          'bg-accent': isActive,
                        }
                      )}
                    >
                      {item.title}
                      <ChevronDown
                        className={cn('h-4 w-4 transition-transform', {
                          'rotate-180': servicesOpen,
                        })}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 px-4">
                    {item.items.map((subItem) => (
                      <a
                        key={subItem.title}
                        href={subItem.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'block px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors',
                          {
                            'bg-accent': currentPath === subItem.href,
                          }
                        )}
                      >
                        {subItem.title}
                      </a>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              );
            }
            return (
              <a
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors',
                  {
                    'bg-accent': currentPath === item.href,
                  }
                )}
              >
                {item.title}
              </a>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-4">
          <div className="flex items-center justify-center gap-4">
            <ThemeToggle />
            <LanguageSwitcher currentLocale={currentLocale} />
          </div>
          <Separator />
          <div className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Saedgewell
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
