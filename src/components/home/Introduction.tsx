'use client';

import {
  Code,
  Github,
  Layers,
  Telescope,
  Type,
  User,
} from 'lucide-react';
import { motion } from 'motion/react';
import { BentoGrid, MagicBentoCard } from '@/components/magicui/bento-grid';
import { Container, SectionTitle } from '@/components/common';
import { DotPattern } from '@/components/magicui/dot-pattern';
import { FlickeringGrid } from '@/components/magicui/flickering-grid';
import { GridPattern } from '@/components/magicui/grid-pattern';
import { Particles } from '@/components/magicui/particles';
import { Ripple } from '@/components/magicui/ripple';
import { SeigaihaPattern } from '@/components/magicui/seigaiha-pattern';
import { ShippoPattern } from '@/components/magicui/shippo-pattern';
import { cn } from '@/lib/utils';
import type { Metric } from '@/types/metrics';
import { homepageCopy } from '@/data/homepage';
import { GitHubImages } from './GitHubImages';
import { NumberDisplay } from './NumberDisplay';
import { TechStackGrid } from './TechStackGrid';

interface IntroductionProps {
  metrics: Metric[];
}

const PROFILE_IMAGE = '/images/profile.webp';

export const Introduction: React.FC<IntroductionProps> = ({ metrics }) => {
  const developmentExperience =
    metrics.find((m) => m.type === 'development_experience')?.value ?? 0;
  const projectCount =
    metrics.find((m) => m.type === 'project_count')?.value ?? 0;
  const personalProjectCount =
    metrics.find((m) => m.type === 'personal_project_count')?.value ?? 0;

  const cards = [
    {
      name: homepageCopy.introduction.profile.name,
      className: 'col-span-12 row-span-2 lg:col-span-8',
      background: (
        <div className="relative w-full h-full min-h-[300px] md:min-h-[400px]">
          <img
            src={PROFILE_IMAGE}
            alt="Profile"
            width={900}
            height={1200}
            className="object-contain object-bottom-right grayscale transition-all duration-300 group-hover:scale-105 absolute z-30 w-full h-full"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-background/80 to-transparent" />
          <FlickeringGrid
            className="relative inset-0 z-0 mask-[radial-gradient(450px_circle_at_center,white,transparent)]"
            squareSize={4}
            gridGap={6}
            color="#D0A900"
            maxOpacity={0.5}
            flickerChance={0.1}
            height={800}
            width={800}
          />
          <p className="absolute top-1/4 line-height-tight left-8 -translate-y-1/2 text-6xl md:text-9xl text-primary font-bold font-[inter]">
            Sugai
          </p>
          <p className="absolute top-2/3 line-height-tight left-8 -translate-y-1/2 text-6xl md:text-9xl text-primary font-bold font-[inter] z-40">
            Akimasa
          </p>
        </div>
      ),
      Icon: User,
      description: homepageCopy.introduction.profile.description,
      href: '/about',
      cta: homepageCopy.introduction.profile.cta,
    },
    {
      name: homepageCopy.introduction.metrics.developmentExperience.title,
      className:
        'col-span-6 md:col-start-1 md:col-span-3 lg:col-start-9 lg:col-span-2',
      background: (
        <div className="relative w-full h-full min-h-[150px]">
          <NumberDisplay
            value={developmentExperience}
            unit={homepageCopy.introduction.metrics.developmentExperience.unit}
          />
          <GridPattern
            width={30}
            height={30}
            x={-1}
            y={-1}
            className="mask-[radial-gradient(150px_circle_at_center,white,transparent)] z-10"
          />
        </div>
      ),
      Icon: Code,
      href: '/about#career',
      cta: homepageCopy.introduction.metrics.developmentExperience.cta,
    },
    {
      name: homepageCopy.introduction.metrics.projectCount.title,
      className:
        'col-span-6 md:col-start-4 md:col-span-3 lg:col-start-11 lg:col-span-2',
      background: (
        <div className="relative w-full h-full min-h-[150px]">
          <NumberDisplay
            value={projectCount}
            unit={homepageCopy.introduction.metrics.projectCount.unit}
          />
          <ShippoPattern
            className={cn(
              'mask-[radial-gradient(150px_circle_at_center,white,transparent)]'
            )}
          />
        </div>
      ),
      Icon: Type,
      href: '/works',
      cta: homepageCopy.introduction.metrics.projectCount.cta,
    },
    {
      name: homepageCopy.introduction.cards.interests.title,
      className: 'col-span-6 md:col-span-3 lg:col-start-9 lg:col-span-2',
      background: (
        <div className="relative w-full h-full min-h-[150px]">
          <SeigaihaPattern
            color="#987D00"
            backgroundColor="hsl(var(--background))"
            className={cn(
              'mask-[radial-gradient(150px_circle_at_center,white,transparent)] opacity-90'
            )}
          />
        </div>
      ),
      Icon: Telescope,
      href: '/about/interests',
      cta: homepageCopy.introduction.cards.interests.cta,
    },
    {
      name: homepageCopy.introduction.metrics.personalProjectCount.title,
      className:
        'col-span-6 md:col-start-10 md:col-span-3 lg:col-start-11 lg:col-span-2',
      background: (
        <div className="relative w-full h-full min-h-[150px]">
          <NumberDisplay
            value={personalProjectCount}
            unit={homepageCopy.introduction.metrics.personalProjectCount.unit}
          />
          <DotPattern
            className={cn(
              'mask-[radial-gradient(150px_circle_at_center,white,transparent)]'
            )}
          />
        </div>
      ),
      Icon: Code,
      href: '/works/personal',
      cta: homepageCopy.introduction.metrics.personalProjectCount.cta,
    },
    {
      name: homepageCopy.introduction.cards.github.title,
      className:
        'col-span-12 row-span-2 md:col-start-1 md:col-span-6 md:row-span-2 lg:col-span-6 lg:row-span-2',
      background: (
        <div className="relative w-full h-full min-h-[300px] group">
          <div className="absolute inset-0 flex items-center justify-center">
            <GitHubImages />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/50 to-transparent z-40 transition-opacity duration-500 group-hover:opacity-0" />
          <Ripple className="absolute inset-0 z-0 mask-[radial-gradient(450px_circle_at_center,white,transparent)]" />
        </div>
      ),
      Icon: Github,
      href: 'https://github.com/otomatty',
      cta: homepageCopy.introduction.cards.github.cta,
    },
    {
      name: homepageCopy.introduction.cards.techStack.title,
      className:
        'col-span-12 row-span-2 md:col-start-7 md:row-start-4 md:col-span-6 md:row-span-2 lg:row-start-3',
      background: (
        <div className="relative w-full h-full min-h-[300px]">
          <TechStackGrid />
          <Particles />
        </div>
      ),
      Icon: Layers,
      description: homepageCopy.introduction.cards.techStack.description,
      href: '/about/skills',
      cta: homepageCopy.introduction.cards.techStack.cta,
    },
  ] as const;

  return (
    <section className="relative w-full">
      <div className="py-10 md:py-20">
        <Container className="py-0 px-4">
          <SectionTitle
            title={homepageCopy.introduction.title}
            subtitle={homepageCopy.introduction.subtitle}
            className="mb-8 md:mb-16"
            client:load
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <BentoGrid>
              {cards.map((card) => (
                <MagicBentoCard key={card.name} {...card} />
              ))}
            </BentoGrid>
          </motion.div>
        </Container>
      </div>
    </section>
  );
};
