'use client';

import type { Work } from '@/types/works';
import { motion } from 'motion/react';

interface BackgroundImagesProps {
  works: Work[];
  currentIndex: number;
  isExpanded: boolean;
}

const FALLBACK_THUMBNAIL = '/images/works/default-thumbnail.webp';

export const BackgroundImages = ({
  works,
  currentIndex,
  isExpanded,
}: BackgroundImagesProps) => {
  const transition = {
    duration: 0.5,
    ease: [0.32, 0.72, 0, 1],
  };

  return (
    <div className="absolute inset-0 w-full h-full rounded-lg">
      {works.map((work, index) => (
        <motion.div
          key={work.slug}
          className="absolute inset-0 w-full h-full rounded-lg"
          animate={currentIndex === index ? 'active' : 'inactive'}
          variants={{
            active: {
              opacity: 1,
              scale: 1,
              filter: isExpanded ? 'blur(4px)' : 'blur(0px)',
              transition: {
                ...transition,
                filter: {
                  duration: 0.8,
                },
              },
            },
            inactive: {
              opacity: 0,
              scale: 0.95,
              filter: 'blur(0px)',
              transition,
            },
          }}
        >
          <div className="relative w-full h-full">
            <img
              src={work.thumbnail || FALLBACK_THUMBNAIL}
              alt={work.title}
              width={1920}
              height={1080}
              className="object-cover rounded-lg w-full h-full"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
            <motion.div
              className="absolute inset-0 bg-black/70 dark:bg-black/80 rounded-lg z-10"
              animate={{
                opacity: isExpanded ? 0.8 : 0.5,
              }}
              transition={{
                duration: 0.8,
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
