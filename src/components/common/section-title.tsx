import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  /** 見出しの上に置く英字ラベル。省略したときは印だけを置く */
  label?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

/**
 * セクションタイトルを表示するコンポーネント
 * 金のラベル（重なる2つの円の印）と細い見出しを、スクロールで現れるように表示する
 */
export const SectionTitle = ({
  title,
  subtitle,
  label,
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
        staggerChildren: 0.12,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 12 },
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
        'mb-12 grid gap-5 md:mb-16',
        {
          'justify-items-start text-left': align === 'left',
          'justify-items-center text-center': align === 'center',
          'justify-items-end text-right': align === 'right',
        },
        className
      )}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <motion.p className="section-label" variants={childVariants} aria-hidden={label ? undefined : true}>
        <span className="vesica" aria-hidden="true" />
        {label}
      </motion.p>
      <motion.h2
        className="heading-thin text-[clamp(1.6rem,2.8vw,2.3rem)]"
        variants={childVariants}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-flow max-w-[40em] text-muted-foreground"
          variants={childVariants}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};
