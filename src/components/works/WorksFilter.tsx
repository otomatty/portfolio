import { useEffect, useMemo, useState } from 'react';
import type { Work, WorkKind } from '@/types/works';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatePresence, motion } from 'motion/react';
import { WorkCard } from './WorkCard';

type KindFilter = 'all' | WorkKind;

interface WorksFilterProps {
  works: Work[];
  technologies: string[];
  initialKind?: KindFilter;
}

const kinds: Array<{ value: KindFilter; label: string }> = [
  { value: 'all', label: 'すべて' },
  { value: 'professional', label: '実務' },
  { value: 'personal', label: '個人開発' },
];

const isKindFilter = (value: string | null): value is KindFilter =>
  value === 'all' || value === 'professional' || value === 'personal';

export const WorksFilter = ({
  works,
  technologies = [],
  initialKind = 'all',
}: WorksFilterProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKind, setSelectedKind] = useState<KindFilter>(initialKind);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Allow deep-linking / redirects via `?kind=professional|personal`.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const kindParam = new URLSearchParams(window.location.search).get('kind');
    if (isKindFilter(kindParam)) {
      setSelectedKind(kindParam);
    }
  }, []);

  const filteredWorks = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return works.filter((work) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        work.title.toLowerCase().includes(normalizedQuery) ||
        work.description.toLowerCase().includes(normalizedQuery);

      const matchesKind =
        selectedKind === 'all' || work.kind === selectedKind;

      const matchesTech =
        !selectedTech || work.technologies.includes(selectedTech);

      return matchesSearch && matchesKind && matchesTech;
    });
  }, [works, searchQuery, selectedKind, selectedTech]);

  const selectedCount =
    selectedKind === 'all'
      ? works.length
      : works.filter((work) => work.kind === selectedKind).length;

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
            value={selectedKind}
            onValueChange={(value) => setSelectedKind(value as KindFilter)}
            className="w-full max-w-[600px]"
          >
            <TabsList className="grid w-full grid-cols-3">
              {kinds.map((kind) => (
                <TabsTrigger key={kind.value} value={kind.value}>
                  {kind.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <p className="text-sm text-muted-foreground">
            {selectedKind === 'all'
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
