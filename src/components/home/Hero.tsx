import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { LinearRotate } from '@/components/magicui/linear-rotate';
import { ThemeToggle } from '@/components/common';
import type { HomepageCopy } from '@/data/homepage';

interface HeroProps {
  copy: HomepageCopy;
}

export const Hero = ({ copy }: HeroProps) => {
  const homepageCopy = copy;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <LinearRotate />
      </motion.div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center gap-8 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">
            {homepageCopy.hero.title.part1}
            <br />
            <span className="aurora-gradient-static">
              {homepageCopy.hero.title.highlight}
            </span>
            {homepageCopy.hero.title.part2}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-foreground/80">
            {homepageCopy.hero.subtitle}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <ThemeToggle />
        </motion.div>
      </div>
    </section>
  );
};
