import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

/**
 * セクションタイトルを表示するコンポーネント
 * アニメーション付きでタイトルとサブタイトルを表示する
 */
export const SectionTitle = ({
  title,
  subtitle,
  className,
  align = 'left',
}: SectionTitleProps) => {
  const easing = [0.32, 0.72, 0, 1] as const;
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easing,
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easing,
      },
    },
  };

  return (
    <motion.div
      className={cn(
        'mb-12',
        {
          'text-left': align === 'left',
          'text-center': align === 'center',
          'text-right': align === 'right',
        },
        className
      )}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <motion.h2
        className="text-4xl md:text-5xl lg:text-6xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent"
        variants={childVariants}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="mt-4 text-muted-foreground text-base md:text-lg lg:text-xl"
          variants={childVariants}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};
