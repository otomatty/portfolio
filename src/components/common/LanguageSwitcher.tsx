'use client';

import { Check, Globe } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = [
  { code: 'ja', label: '日本語', flag: '🇯🇵', enabled: true },
  { code: 'en', label: 'English', flag: '🇺🇸', enabled: true },
];

interface LanguageSwitcherProps {
  currentLocale?: string;
}

export function LanguageSwitcher({ currentLocale = 'ja' }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    // For Astro's i18n, we navigate to the new locale path
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(Boolean);
    
    // Check if current path starts with a locale
    const currentLocaleFromPath = languages.find(
      (lang) => pathParts[0] === lang.code
    );
    
    let newPath: string;
    if (currentLocaleFromPath) {
      // Replace the locale in the path
      pathParts[0] = languageCode;
      newPath = '/' + pathParts.join('/');
    } else {
      // Default locale (ja) doesn't have prefix
      if (languageCode === 'ja') {
        newPath = currentPath;
      } else {
        newPath = '/' + languageCode + currentPath;
      }
    }
    
    // Handle default locale (ja) - no prefix
    if (languageCode === 'ja') {
      if (currentLocaleFromPath) {
        pathParts.shift();
        newPath = '/' + (pathParts.join('/') || '');
      }
    }
    
    window.location.href = newPath;
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
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
            onClick={() => language.enabled && handleLanguageChange(language.code)}
            disabled={!language.enabled}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-base">{language.flag}</span>
            <span className="flex-1">{language.label}</span>
            {!language.enabled && (
              <span className="text-xs text-muted-foreground">準備中</span>
            )}
            {currentLocale === language.code && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
