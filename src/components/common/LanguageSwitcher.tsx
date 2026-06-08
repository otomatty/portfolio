import { Check, Globe } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { switchLocalePath } from '@/lib/i18n';

const languages = [
  { code: 'ja', label: '日本語', flag: '🇯🇵', enabled: true },
  { code: 'en', label: 'English', flag: '🇺🇸', enabled: true },
];

interface LanguageSwitcherProps {
  currentLocale?: string;
  currentPath?: string;
}

export function LanguageSwitcher({
  currentLocale = 'ja',
  currentPath = '/',
}: LanguageSwitcherProps) {
  const currentLanguage =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="text-sm">{currentLanguage?.code.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            asChild={language.enabled}
            disabled={!language.enabled}
            className="flex items-center gap-2 cursor-pointer"
          >
            {language.enabled ? (
              // Native anchor so navigation stays SPA-friendly: Astro link
              // prefetch works and a future View Transitions setup can take over.
              <a
                href={switchLocalePath(currentPath, language.code)}
                data-astro-prefetch
              >
                <span className="text-base">{language.flag}</span>
                <span className="flex-1">{language.label}</span>
                {currentLocale === language.code && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </a>
            ) : (
              <>
                <span className="text-base">{language.flag}</span>
                <span className="flex-1">{language.label}</span>
                <span className="text-xs text-muted-foreground">準備中</span>
              </>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
