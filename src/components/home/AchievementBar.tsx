'use client';

import type { Work } from '@/types/works';
import { motion } from 'motion/react';
import { useAchievementBarAnimation } from '@/hooks/useAchievementBarAnimation';
import { AnimatedIndicator } from './AnimatedIndicator';

interface AchievementBarProps {
  work: Work;
  index: number;
  currentIndex: number;
  isExpanded: boolean;
  isFullWidth: boolean;
  isTitleVisible: boolean;
  onBarClick: (index: number) => void;
  onAnimationComplete: (definition: string) => void;
}

const FALLBACK_THUMBNAIL = '/images/works/default-thumbnail.webp';

export const AchievementBar = ({
  work,
  index,
  currentIndex,
  isExpanded,
  isFullWidth,
  isTitleVisible,
  onBarClick,
  onAnimationComplete,
}: AchievementBarProps) => {
  const {
    barVariants,
    titleVariants,
    filterVariants,
    calculateSquareSize,
  } = useAchievementBarAnimation();

  return (
    <motion.div
      className={`relative cursor-pointer group ${
        isExpanded && currentIndex !== index ? 'hidden' : ''
      }`}
      animate={
        isExpanded && currentIndex === index
          ? isFullWidth
            ? 'fullWidth'
            : isTitleVisible
              ? 'fullWidth'
              : 'expanded'
          : currentIndex === index
            ? 'active'
            : 'default'
      }
      variants={barVariants}
      onClick={() => onBarClick(index)}
      onAnimationComplete={onAnimationComplete}
      style={{
        maxWidth: isExpanded ? '100%' : 'auto',
        maxHeight:
          isExpanded && !isFullWidth
            ? `${calculateSquareSize()}px`
            : isFullWidth
              ? '200px'
              : '40vh',
        position: 'relative',
        zIndex: isFullWidth ? 30 : 20,
      }}
    >
      <motion.div
        className={`absolute w-60 -left-[100px] text-center text-xs text-primary-foreground dark:text-primary font-medium whitespace-nowrap overflow-hidden text-ellipsis ${
          isExpanded && currentIndex === index ? 'hidden' : '-top-7'
        }`}
        animate={currentIndex === index && !isExpanded ? 'visible' : 'hidden'}
        variants={titleVariants}
        initial="hidden"
      >
        {work.title}
      </motion.div>

      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <img
          src={work.thumbnail || FALLBACK_THUMBNAIL}
          alt={work.title}
          width={1920}
          height={1080}
          className={`object-cover w-full h-full transition-all duration-500 ${
            isExpanded && currentIndex === index
              ? 'object-contain'
              : 'object-cover'
          }`}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
        />
        {isExpanded && currentIndex === index && (
          <motion.div
            className="absolute inset-0 rounded-lg"
            variants={filterVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="absolute inset-0 bg-background/20" />
            <div className="absolute inset-0 bg-linear-to-t from-background/40 via-background/20 to-background/20" />
          </motion.div>
        )}
        {isExpanded && currentIndex === index && (
          <div className="absolute bottom-8 left-4 right-4 z-20">
            <motion.h3
              className="text-3xl font-bold text-primary mb-2"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              {work.title}
            </motion.h3>
            <motion.p
              className="text-sm text-primary/80"
              variants={{
                ...titleVariants,
                visible: {
                  ...titleVariants.visible,
                  transition: {
                    ...titleVariants.visible.transition,
                    delay: 0.3,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              {work.description}
            </motion.p>
          </div>
        )}
      </div>

      {!isExpanded && <AnimatedIndicator isActive={currentIndex === index} />}
    </motion.div>
  );
};
