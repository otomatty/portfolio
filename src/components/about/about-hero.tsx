'use client';

import { BasicHero } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Github, Twitter } from 'lucide-react';

export const AboutHero = () => {
  return (
    <BasicHero
      title="About Me"
      description="プロダクトエンジニアとして、モダンな技術を活用したWeb開発に携わっています。"
      pattern="dots"
      size="lg"
      align="left"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <a href="/contact">お問い合わせ</a>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" asChild>
            <a
              href="https://github.com/saedgewell"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHubプロフィール</span>
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a
              href="https://twitter.com/saedgewell"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Xプロフィール</span>
            </a>
          </Button>
        </div>
      </div>
    </BasicHero>
  );
};
