import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Container } from './container';

interface BasicHeroProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  pattern?: 'dots' | 'grid' | 'waves' | 'none';
  align?: 'left' | 'center';
  size?: 'sm' | 'md' | 'lg';
}

export const BasicHero = ({
  title,
  description,
  children,
  className,
  pattern = 'dots',
  align = 'center',
  size = 'md',
}: BasicHeroProps) => {
  const patterns = {
    dots: 'radial-gradient(circle, var(--primary) 1px, transparent 1px)',
    grid: 'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
    waves:
      'repeating-linear-gradient(-45deg, var(--primary) 0 1px, #0000 0 10px)',
    none: 'none',
  };

  const sizes = {
    sm: 'min-h-[300px]',
    md: 'min-h-[400px]',
    lg: 'min-h-[500px]',
  };

  const alignments = {
    left: 'text-left items-start',
    center: 'text-center items-center',
  };

  return (
    <section
      className={cn(
        'relative isolate flex justify-center overflow-hidden border-b border-primary/10 bg-linear-to-br from-primary/10 via-background to-background',
        sizes[size],
        className
      )}
    >
      {/* メインコンテンツ */}
      <Container className="px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={cn(
            'relative z-10 flex flex-col justify-center',
            alignments[align]
          )}
        >
          <h1
            className={cn(
              'font-bold tracking-tight',
              size === 'lg'
                ? 'text-5xl md:text-6xl lg:text-7xl'
                : 'text-4xl md:text-5xl lg:text-6xl'
            )}
          >
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                'mt-6 max-w-2xl text-muted-foreground',
                size === 'lg' ? 'text-xl md:text-2xl' : 'text-lg md:text-xl',
                align === 'center' && 'mx-auto'
              )}
            >
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </motion.div>

        {/* 装飾的な背景要素 */}
        <div className="absolute inset-0 z-0">
          {/* パターン */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: patterns[pattern],
              backgroundSize: pattern === 'grid' ? '40px 40px' : '20px 20px',
            }}
          />

          {/* グラデーションブロブ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-secondary/10 blur-3xl"
          />
        </div>
      </Container>
    </section>
  );
};
