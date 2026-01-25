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
import { navigationItems } from '@/data/navigation';
import { cn } from '@/lib/utils';

const iconClassName = 'h-4 w-4';

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
                    {item.items.map((subItem) => {
                      const Icon = subItem.icon;
                      return (
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
                                <Icon className={iconClassName} />
                                {subItem.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                                {subItem.description}
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      );
                    })}
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
