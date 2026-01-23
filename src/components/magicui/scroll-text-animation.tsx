'use client';

import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface ScrollTextAnimationProps {
  text: string;
  className?: string;
  initialFontSize?: number;
  onAnimationComplete?: () => void;
}

const easeInExpo = (x: number): number => {
  return x === 0 ? 0 : 2 ** (10 * x - 10);
};

const flipVariants = {
  hidden: { rotateX: 90, opacity: 0 },
  visible: { rotateX: 0, opacity: 1 },
  exit: { rotateX: -90, opacity: 0 },
};

const isJapanese = (char: string): boolean => {
  return /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/.test(
    char
  );
};

export const ScrollTextAnimation = ({
  text,
  className,
  initialFontSize = 48,
  onAnimationComplete,
}: ScrollTextAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const target = containerRef.current;
    if (!target) {
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !shouldAnimate) {
          setShouldAnimate(true);
        }
        setIsInView(entry?.isIntersecting || false);
      },
      {
        threshold: [0, 0.1, 0.9, 1],
      }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [shouldAnimate]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const phase = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.95],
    [0, 1, 1, 2, 3]
  );

  const scale = useTransform(scrollYProgress, [0.3, 0.7, 0.9], [1, 1.2, 1.2], {
    ease: easeInExpo,
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.5, 0.7, 0.8],
    [0, 0.5, 1, 1, 0.5, 0],
    {
      ease: easeInExpo,
    }
  );

  const finalScale = useTransform(phase, (currentPhase) => {
    return currentPhase >= 2 ? scale.get() : 1;
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest >= 1 && onAnimationComplete) {
        onAnimationComplete();
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, onAnimationComplete]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
    >
      {isInView && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            className="w-full max-w-4xl px-4"
            style={{
              scale: finalScale,
              opacity,
            }}
          >
            <svg
              className={`w-full h-auto ${className ?? ''}`}
              viewBox="-50 -20 600 140"
              preserveAspectRatio="xMidYMid meet"
              aria-label={`Animated text: ${text}`}
              role="img"
            >
              <AnimatePresence mode="wait">
                <motion.text
                  key={`text-${shouldAnimate}`}
                  x="250"
                  y="50"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill="currentColor"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: `${initialFontSize}px`,
                    fontWeight: 'bold',
                  }}
                >
                  {text.split('').map((char, i) => (
                    <motion.tspan
                      key={`${char}-${i}-${shouldAnimate}`}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={flipVariants}
                      transition={{
                        duration: 0.5,
                        delay: shouldAnimate ? i * 0.08 : 0,
                      }}
                      dx={i === 0 ? 0 : isJapanese(char) ? '-0.05em' : '0em'}
                      style={{
                        transformOrigin: 'center center',
                      }}
                    >
                      {char}
                    </motion.tspan>
                  ))}
                </motion.text>
              </AnimatePresence>
            </svg>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ScrollTextAnimation;
