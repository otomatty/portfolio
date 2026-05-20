"use client";

import { useMemo, useState } from 'react';
import type { Work } from '@/types/works';
import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/common';
import { Input } from '@/components/ui/input';
import { SectionTitle } from '@/components/common';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import type { HomepageCopy } from '@/data/homepage';
import { localePath } from '@/lib/i18n';
import { WorkCard } from './WorkCard';

type WorkCategory = Work['category'];

interface AdditionalAchievementsProps {
  works: Work[];
  copy: HomepageCopy;
  locale: string;
}

export const AdditionalAchievements = ({
  works,
  copy,
  locale,
}: AdditionalAchievementsProps) => {
  const homepageCopy = copy;
  const [selectedCategory, setSelectedCategory] = useState<
    WorkCategory | 'all'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      label: homepageCopy.additionalAchievements.categories.company,
      value: 'company',
    },
    {
      label: homepageCopy.additionalAchievements.categories.freelance,
      value: 'freelance',
    },
    {
      label: homepageCopy.additionalAchievements.categories.personal,
      value: 'personal',
    },
  ];

  const filteredWorks = useMemo(
    () =>
      works.filter((work) => {
        const matchesCategory =
          selectedCategory === 'all' || work.category === selectedCategory;
        const matchesSearch = work.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      }),
    [works, selectedCategory, searchQuery]
  );

  return (
    <section className="bg-background/50">
      <Container className="py-16">
        <SectionTitle
          title={homepageCopy.additionalAchievements.title}
          subtitle={homepageCopy.additionalAchievements.subtitle}
          align="center"
          className="mb-12"
        />

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <select
            value={selectedCategory}
            onChange={(event) =>
              setSelectedCategory(event.target.value as WorkCategory | 'all')
            }
            className={cn(
              'border-input h-9 w-full sm:w-[200px] rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none',
              'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
              'dark:bg-input/30'
            )}
          >
            <option value="all">
              {homepageCopy.additionalAchievements.all}
            </option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <Input
            placeholder={homepageCopy.additionalAchievements.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[300px]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorks.map((work, index) => (
            <motion.div
              key={work.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <WorkCard work={work} />
            </motion.div>
          ))}
        </div>

        {filteredWorks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {homepageCopy.additionalAchievements.notFound}
            </p>
          </div>
        )}

        <div className="text-center mt-12 relative z-10">
          <a
            href={localePath('/works', locale)}
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'group inline-flex items-center justify-center'
            )}
          >
            {homepageCopy.additionalAchievements.viewAll}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </Container>
    </section>
  );
};
