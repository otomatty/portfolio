import { BasicHero } from '@/components/common';
import { profile } from '@/data/profile';
import { Button } from '@/components/ui/button';
import { SiGithub } from '@icons-pack/react-simple-icons';

export const AboutHero = () => {
  return (
    <BasicHero
      title="About Me"
      description={profile.headline}
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
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGithub color="currentColor" className="h-4 w-4" />
              <span className="sr-only">GitHubプロフィール</span>
            </a>
          </Button>
        </div>
      </div>
    </BasicHero>
  );
};
