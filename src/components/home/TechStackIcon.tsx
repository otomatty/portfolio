import { cn } from '@/lib/utils';
import type { TechStack } from '@/data/tech-stack';

export const TechStackIcon = ({ tech }: { tech: TechStack }) => (
  <div className="flex items-center justify-center">
    <img
      src={tech.icon}
      alt={tech.name}
      width={35}
      height={35}
      className={cn('w-10 h-10', tech.color)}
      loading="lazy"
      decoding="async"
    />
  </div>
);
