'use client';

import { motion, useAnimationFrame } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface OrbitAnimationProps {
  className?: string;
  radius?: number;
  speed?: number;
}

export const OrbitAnimation = ({
  className,
  radius = 100,
  speed = 1,
}: OrbitAnimationProps) => {
  const [angle, setAngle] = useState(0);
  const [actualRadius, setActualRadius] = useState(0);

  const POINT_COUNT = 6;
  const ANGLE_STEP = (2 * Math.PI) / POINT_COUNT;
  const POINT_SIZE = 12;

  useEffect(() => {
    const updateSize = () => {
      const container = document.querySelector('.orbit-container');
      if (container) {
        const { width, height } = container.getBoundingClientRect();
        if (radius) {
          setActualRadius(radius);
        } else {
          setActualRadius(Math.min(width, height) / 2 - POINT_SIZE / 2);
        }
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [radius]);

  const calculatePosition = useCallback(
    (startAngle: number) => {
      const x = Math.cos(startAngle) * actualRadius;
      const y = Math.sin(startAngle) * actualRadius;
      return { x, y };
    },
    [actualRadius]
  );

  useAnimationFrame(() => {
    setAngle((prev) => (prev + speed) % (2 * Math.PI));
  });

  const points = Array.from({ length: POINT_COUNT }, (_, index) => {
    const pointAngle = angle + index * ANGLE_STEP;
    return calculatePosition(pointAngle);
  });

  return (
    <div className={cn('relative w-full h-full orbit-container p-2', className)}>
      {points.map((pos, index) => (
        <motion.div
          key={index}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`,
          }}
        >
          <motion.div
            className="w-3 h-3 rounded-full border-2 border-primary/80 bg-primary/30 shadow-lg shadow-primary/50"
            initial={{ opacity: 0.5 }}
            animate={{
              opacity: [0.5, 0.9, 0.5],
              scale: [1, 1.2, 1],
              transition: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
                delay: (index * 2) / POINT_COUNT,
              },
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};
