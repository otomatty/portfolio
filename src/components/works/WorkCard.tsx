import type { Work } from '@/types/works';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { WORK_KIND_LABELS } from '@/data/works';

interface WorkCardProps {
  work: Work;
}

const FALLBACK_THUMBNAIL = '/images/works/default-thumbnail.webp';

export const WorkCard = ({ work }: WorkCardProps) => {
  const technologies = work.technologies ?? [];

  return (
    <Card className="h-full overflow-hidden pt-0">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={work.thumbnail || FALLBACK_THUMBNAIL}
          alt={work.title}
          width={1200}
          height={675}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <Badge
          variant={work.kind === 'personal' ? 'default' : 'secondary'}
          className="absolute left-3 top-3 shadow-sm"
        >
          {WORK_KIND_LABELS[work.kind]}
        </Badge>
      </div>
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-xl font-bold line-clamp-1" title={work.title}>
              {work.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
              {work.description}
            </p>
          </div>
          <div className="flex gap-2">
            {work.github_url && (
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={work.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${work.title} のGitHub`}
                >
                  <SiGithub color="currentColor" className="h-4 w-4" />
                </a>
              </Button>
            )}
            {work.website_url && (
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={work.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${work.title} のサイト`}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col space-y-4">
        <div className="flex flex-wrap gap-2">
          {technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {technologies.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{technologies.length - 4}
            </Badge>
          )}
        </div>
        <Button asChild className="mt-auto w-full">
          <a href={`/works/${work.slug}`}>詳細を見る</a>
        </Button>
      </CardContent>
    </Card>
  );
};
