'use client';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent,SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { navigationItems } from '@/data/navigation';
import { cn } from '@/lib/utils';
import { ChevronDown, Menu } from 'lucide-react';
import { useState } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

interface MobileSidebarProps {
  currentPath?: string;
  currentLocale?: string;
  openMenuLabel?: string;
  menuTitleLabel?: string;
}

export function MobileSidebar({
  currentPath = '/',
  currentLocale = 'ja',
  openMenuLabel = 'メニューを開く',
  menuTitleLabel = 'メニュー',
}: MobileSidebarProps) {
  const [open, setOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">{openMenuLabel}</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{menuTitleLabel}</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1 p-4">
          {navigationItems.map((item) => {
            if (item.items) {
              const isActive = item.items.some(
                (subItem) => subItem.href === currentPath
              );
              const isExpanded = expandedItems[item.title] ?? false;

              return (
                <Collapsible
                  key={item.title}
                  open={isExpanded}
                  onOpenChange={() => toggleExpanded(item.title)}
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
                          'rotate-180': isExpanded,
                        })}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 px-4">
                    {item.items.map((subItem) => {
                      const Icon = subItem.icon;
                      return (
                        <a
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors',
                            {
                              'bg-accent': currentPath === subItem.href,
                            }
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{subItem.title}</span>
                        </a>
                      );
                    })}
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
