import { useEffect, useMemo, useState } from 'react';
import type { Work, WorkKind } from '@/types/works';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { WorkCard } from './WorkCard';

type KindFilter = 'all' | WorkKind;

interface WorksFilterProps {
  works: Work[];
  technologies: string[];
  /** 作成日順の通し番号（slug → No.） */
  numbers?: Record<string, number>;
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
  numbers = {},
  initialKind = 'all',
}: WorksFilterProps) => {
  // 動きを減らす設定では、絞り込み時の並び替えと出入りのアニメーションを止める
  const reduceMotion = useReducedMotion() ?? false;
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

  const countOf = (kind: KindFilter) =>
    kind === 'all' ? works.length : works.filter((work) => work.kind === kind).length;

  return (
    <div className="grid gap-14">
      <div className="grid gap-8">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <Tabs
            value={selectedKind}
            onValueChange={(value) => setSelectedKind(value as KindFilter)}
          >
            <TabsList>
              {kinds.map((kind) => (
                <TabsTrigger key={kind.value} value={kind.value} className="flex-none">
                  {kind.label}
                  <span className="text-[11px] text-muted-foreground tabular-nums">
                    {countOf(kind.value)}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <Input
            type="search"
            placeholder="名前や説明で探す"
            aria-label="実績を検索"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="max-w-xs"
          />
        </div>

        {technologies.length > 0 && (
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="使用技術で絞り込む">
            {technologies.map((tech) => (
              <button
                key={tech}
                type="button"
                aria-pressed={selectedTech === tech}
                onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
                className={
                  selectedTech === tech
                    ? 'rounded-full border border-gold px-3 py-1 text-xs tracking-[0.04em] text-gold transition-colors'
                    : 'rounded-full border border-foreground/15 px-3 py-1 text-xs tracking-[0.04em] text-muted-foreground transition-colors hover:border-gold/60 hover:text-foreground'
                }
              >
                {tech}
              </button>
            ))}
          </div>
        )}

        <p className="text-xs tracking-[0.14em] text-muted-foreground tabular-nums" aria-live="polite">
          {filteredWorks.length}件
        </p>
      </div>

      {/* 右の列を少し下げ、展示室のように互い違いに並べる */}
      <motion.div layout={!reduceMotion} className="grid grid-cols-[minmax(0,1fr)] gap-x-12 gap-y-16 md:grid-cols-2 md:pb-28">
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredWorks.map((work, index) => (
            <motion.div
              key={work.slug}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.4 }}
            >
              <div className={index % 2 === 1 ? 'md:translate-y-28' : undefined}>
                <WorkCard work={work} number={numbers[work.slug]} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredWorks.length === 0 && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center"
        >
          <p className="text-muted-foreground">
            条件に一致するプロジェクトが見つかりませんでした。
          </p>
        </motion.div>
      )}
    </div>
  );
};
