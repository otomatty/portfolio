'use client';

import type { Work } from '@/types/works';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface AchievementDetailProps {
  work: Work;
  isVisible: boolean;
}

export const AchievementDetail = ({
  work,
  isVisible,
}: AchievementDetailProps) => {
  const easing = [0.32, 0.72, 0, 1] as const;
  const transition = {
    duration: 0.5,
    ease: easing,
  };

  const detailVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      transition,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...transition,
        delay: 0.5,
      },
    },
  };

  if (!isVisible) return null;

  const technologies = work.technologies ?? [];

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/30"
      variants={detailVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-center min-h-full">
        <div className="w-full max-w-3xl mt-60 mb-20">
          <div className="px-6 py-4">
            <div className="prose prose-sm dark:prose-invert text-primary-foreground dark:text-primary">
              <h3 className="text-2xl font-bold mb-4">{work.title}</h3>
              <p className="text-lg mb-6">{work.description}</p>

              {technologies.length > 0 && (
                <section className="mb-6">
                  <h4 className="text-xl font-semibold mb-2">使用技術</h4>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </section>
              )}

              <Separator className="my-6" />

              <section className="flex flex-wrap gap-4">
                <Button asChild variant="default">
                  <a href={`/works/${work.slug}`} className="inline-flex items-center">
                    詳細ページを見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                {work.github_url && (
                  <a
                    href={work.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHubを見る
                  </a>
                )}
                {work.website_url && (
                  <a
                    href={work.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Webサイトを見る
                  </a>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
