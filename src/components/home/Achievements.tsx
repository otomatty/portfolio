'use client';

import type { Work } from '@/types/works';
import { NeonGradientCard } from '@/components/magicui/neon-gradient-card';
import { ScrollTextAnimation } from '@/components/magicui/scroll-text-animation';
import { cn } from '@/lib/utils';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react';
import { useRef, useState } from 'react';
import type { HomepageCopy } from '@/data/homepage';
import { AchievementBar } from './AchievementBar';
import { AchievementDetail } from './AchievementDetail';
import { BackgroundImages } from './BackgroundImages';
import { CloseButton } from './CloseButton';
import { OrbitBackground } from './OrbitBackground';

interface AchievementsProps {
  works: Work[];
  copy: HomepageCopy;
}

export const Achievements = ({ works, copy }: AchievementsProps) => {
  const homepageCopy = copy;
  const FADE_IN_START = 0.36;
  const FADE_IN_COMPLETE = 0.44;
  const FADE_OUT_START = 0.85;
  const FADE_OUT_COMPLETE = 0.95;
  const ANIMATION_DURATION = FADE_OUT_START - FADE_IN_COMPLETE;

  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const activeIndex = useTransform(scrollYProgress, (value) => {
    if (value < FADE_IN_COMPLETE) return -1;

    const scrollPosition = window.scrollY;
    const offsetTop = containerRef.current?.offsetTop ?? 0;
    const fadeInCompletePosition =
      (containerRef.current?.scrollHeight ?? 0) * FADE_IN_COMPLETE;
    const remainingHeight =
      (containerRef.current?.scrollHeight ?? 0) * ANIMATION_DURATION;
    const totalSections = works.length + 2;
    const sectionHeight = remainingHeight / totalSections;

    const adjustedPosition =
      scrollPosition - offsetTop - fadeInCompletePosition;
    const sectionIndex = Math.round(adjustedPosition / sectionHeight) - 1;

    return Math.min(Math.max(-1, sectionIndex), works.length);
  });

  useMotionValueEvent(activeIndex, 'change', (latest) => {
    setCurrentIndex(latest);
  });

  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
  };

  const enableScroll = () => {
    document.body.style.overflow = '';
    document.body.style.height = '';
  };

  const handleAnimationComplete = (definition: string) => {
    switch (definition) {
      case 'squareExpanded':
        setIsTitleVisible(true);
        break;
      case 'expanded':
        setTimeout(() => {
          setIsTitleVisible(true);
        }, 300);
        break;
      case 'titleVisible':
        setTimeout(() => {
          setIsFullWidth(true);
        }, 300);
        break;
      case 'fullWidth':
        setTimeout(() => {
          disableScroll();
          setIsDetailVisible(true);
        }, 200);
        break;
      default:
        break;
    }
  };

  const handleBarClick = (index: number) => {
    if (!containerRef.current) return;

    const containerHeight = containerRef.current.scrollHeight;
    const fadeInCompletePosition = containerHeight * FADE_IN_COMPLETE;
    const remainingHeight = containerHeight * ANIMATION_DURATION;
    const totalSections = works.length + 2;
    const sectionHeight = remainingHeight / totalSections;
    const targetScrollPosition =
      containerRef.current.offsetTop +
      fadeInCompletePosition +
      (index + 1) * sectionHeight;

    if (currentIndex === index) {
      setSelectedWork(works[index] ?? null);
      setIsExpanded(true);
      setIsTitleVisible(false);
      setIsFullWidth(false);
      setIsDetailVisible(false);
      return;
    }

    window.scrollTo({
      top: targetScrollPosition,
      behavior: 'smooth',
    });
  };

  const handleClose = () => {
    enableScroll();
    setIsDetailVisible(false);
    setIsTitleVisible(false);
    setIsFullWidth(false);
    setIsExpanded(false);
    setSelectedWork(null);
  };

  const containerScrollProgress = useTransform(
    scrollYProgress,
    [FADE_IN_START, FADE_IN_COMPLETE, FADE_OUT_START, FADE_OUT_COMPLETE],
    [0, 1, 1, 0]
  );

  const isVisible = useTransform(
    scrollYProgress,
    [0, FADE_IN_START, FADE_OUT_COMPLETE, 1],
    [false, true, true, false]
  );

  const [shouldRender, setShouldRender] = useState(false);

  useMotionValueEvent(isVisible, 'change', (latest) => {
    setShouldRender(latest);
  });

  const containerScale = useTransform(containerScrollProgress, [0, 1], [0.8, 1]);
  const containerOpacity = useTransform(
    containerScrollProgress,
    [0, 1],
    [0, 1]
  );
  const containerZ = useTransform(containerScrollProgress, [0, 1], [-100, 0]);

  return (
    <section ref={containerRef} className="relative h-[1500vh]">
      <div className="h-[600vh]">
        <ScrollTextAnimation
          text={homepageCopy.achievements.scrollText}
          initialFontSize={48}
        />
      </div>

      <motion.div
        className={cn('fixed inset-0 h-screen', {
          'pointer-events-none': !shouldRender,
        })}
      >
        <motion.div
          style={{
            scale: containerScale,
            opacity: containerOpacity,
            z: containerZ,
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
          className="w-full h-full"
        >
          <OrbitBackground />

          <NeonGradientCard className="relative w-[80%] h-[80%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {isDetailVisible && <CloseButton onClose={handleClose} />}

            <BackgroundImages
              works={works}
              currentIndex={currentIndex}
              isExpanded={isExpanded}
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center z-20">
              <div className="flex gap-6">
                {works.map((work, index) => (
                  <AchievementBar
                    key={work.slug}
                    work={work}
                    index={index}
                    currentIndex={currentIndex}
                    isExpanded={isExpanded}
                    isFullWidth={isFullWidth}
                    isTitleVisible={isTitleVisible}
                    onBarClick={handleBarClick}
                    onAnimationComplete={handleAnimationComplete}
                  />
                ))}
              </div>
            </div>

            {selectedWork && (
              <AchievementDetail work={selectedWork} isVisible={isDetailVisible} />
            )}
          </NeonGradientCard>
          <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs text-primary/50">
            {homepageCopy.achievements.description}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};
