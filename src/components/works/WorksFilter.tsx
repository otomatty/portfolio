"use client";

import { useMemo, useState } from 'react';
import type { Work } from '@/types/works';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatePresence, motion } from 'motion/react';
import { WorkCard } from './WorkCard';

type WorkCategory = 'all' | 'company' | 'freelance' | 'personal';

interface WorksFilterProps {
  works: Work[];
  technologies: string[];
  initialCategory?: WorkCategory;
}

const categories: Array<{ value: WorkCategory; label: string }> = [
  { value: 'all', label: 'すべて' },
  { value: 'company', label: '企業案件' },
  { value: 'freelance', label: 'フリーランス' },
  { value: 'personal', label: '個人開発' },
];

export const WorksFilter = ({
  works,
  technologies = [],
  initialCategory = 'all',
}: WorksFilterProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<WorkCategory>(initialCategory);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const filteredWorks = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return works.filter((work) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        work.title.toLowerCase().includes(normalizedQuery) ||
        work.description.toLowerCase().includes(normalizedQuery);

      const matchesCategory =
        selectedCategory === 'all' || work.category === selectedCategory;

      const matchesTech =
        !selectedTech || work.technologies.includes(selectedTech);

      return matchesSearch && matchesCategory && matchesTech;
    });
  }, [works, searchQuery, selectedCategory, selectedTech]);

  const selectedCount =
    selectedCategory === 'all'
      ? works.length
      : works.filter((work) => work.category === selectedCategory).length;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Input
          type="search"
          placeholder="プロジェクトを検索..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="max-w-md"
        />

        <div className="flex flex-col items-center space-y-4">
          <Tabs
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as WorkCategory)}
            className="w-full max-w-[600px]"
          >
            <TabsList className="grid w-full grid-cols-4">
              {categories.map((category) => (
                <TabsTrigger key={category.value} value={category.value}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <p className="text-sm text-muted-foreground">
            {selectedCategory === 'all'
              ? `全${works.length}件の実績`
              : `${selectedCount}件の実績`}
          </p>
        </div>

        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Badge
                key={tech}
                asChild
                variant={selectedTech === tech ? 'default' : 'outline'}
                className="cursor-pointer"
              >
                <button
                  type="button"
                  aria-pressed={selectedTech === tech}
                  onClick={() =>
                    setSelectedTech(selectedTech === tech ? null : tech)
                  }
                >
                  {tech}
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredWorks.map((work) => (
            <motion.div
              key={work.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <WorkCard work={work} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredWorks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center"
        >
          <p className="text-lg text-muted-foreground">
            条件に一致するプロジェクトが見つかりませんでした。
          </p>
        </motion.div>
      )}
    </div>
  );
};
