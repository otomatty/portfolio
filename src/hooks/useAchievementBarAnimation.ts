'use client';

import { useWindowSize } from './useWindowSize';

export const useAchievementBarAnimation = () => {
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const transition = {
    duration: 0.5,
    ease: [0.32, 0.72, 0, 1],
  };

  const calculateSquareSize = () => {
    const size = Math.min(windowWidth, windowHeight) * 0.6;
    return Math.max(300, Math.min(size, 600));
  };

  const barVariants = {
    default: {
      y: 0,
      opacity: 0.3,
      width: '2.5rem',
      height: '40vh',
      transition,
    },
    active: {
      y: -20,
      opacity: 1,
      width: '2.5rem',
      height: '40vh',
      transition,
    },
    expanded: {
      y: 0,
      opacity: 1,
      width: `${calculateSquareSize()}px`,
      height: `${calculateSquareSize()}px`,
      transition: {
        ...transition,
        duration: 0.8,
      },
    },
    fullWidth: {
      y: 'calc(-30vh + 0.6rem)',
      opacity: 1,
      width: 'calc(80vw - 1rem)',
      height: '200px',
      transition: {
        ...transition,
        duration: 0.8,
        y: { type: 'spring', stiffness: 100, damping: 15 },
        height: { type: 'spring', stiffness: 100, damping: 15 },
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      transition,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...transition,
        delay: 0.1,
      },
    },
    expanded: {
      opacity: 1,
      y: 0,
      transition: {
        ...transition,
        delay: 0.3,
      },
    },
  };

  const filterVariants = {
    hidden: {
      opacity: 0,
      transition,
    },
    visible: {
      opacity: 1,
      transition: {
        ...transition,
        delay: 0.2,
      },
    },
  };

  return {
    barVariants,
    titleVariants,
    filterVariants,
    calculateSquareSize,
    transition,
  };
};
