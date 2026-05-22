import type { Work } from '@/types/works';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { motion } from 'motion/react';

interface WorkCardProps {
  work: Work;
}

const FALLBACK_THUMBNAIL = '/images/works/default-thumbnail.webp';

export const WorkCard = ({ work }: WorkCardProps) => {
  const technologies = work.technologies ?? [];

  return (
    <a href={`/works/${work.slug}`} className="block h-full">
      <div className="h-full space-y-3">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="overflow-hidden group cursor-pointer">
            <div className="relative aspect-video w-full">
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              <img
                src={work.thumbnail || FALLBACK_THUMBNAIL}
                alt={work.title}
                width={1200}
                height={675}
                className="object-cover transition-transform duration-300 group-hover:scale-110 w-full h-full"
                loading="lazy"
                decoding="async"
              />
            </div>
          </Card>
        </motion.div>

        <div className="space-y-2">
          <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-1">
            {work.title}
          </h3>
          <div className="flex flex-wrap gap-1">
            {technologies.slice(0, 3).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-xs bg-primary hover:bg-primary text-primary-foreground hover:text-primary-foreground border-primary"
              >
                {tech}
              </Badge>
            ))}
            {technologies.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs bg-primary hover:bg-primary text-primary-foreground hover:text-primary-foreground border-primary"
              >
                +{technologies.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};
