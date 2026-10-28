import { useEffect, useMemo, useState } from 'react';
import type { Work, WorkCategory } from '@/types/works';
import { WORK_CATEGORIES, WORK_CATEGORY_LABELS, hasMeasuredImpact } from '@/data/works';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ImpactLegend } from './Impact';
import { WorkCard } from './WorkCard';

type CategoryFilter = 'all' | WorkCategory;

interface WorksFilterProps {
  works: Work[];
  /** 開始月順の通し番号（slug → No.） */
  numbers?: Record<string, number>;
}

const filters: Array<{ value: CategoryFilter; label: string }> = [
  { value: 'all', label: 'すべて' },
  ...WORK_CATEGORIES.map((category) => ({ value: category, label: WORK_CATEGORY_LABELS[category] })),
];

const isCategoryFilter = (value: string | null): value is CategoryFilter =>
  value !== null && filters.some((filter) => filter.value === value);

/** 以前の ?kind= の値。実務は、会社の仕事を引き継いだ客先案件として受け取る */
const legacyKinds = new Map<string, CategoryFilter>([
  ['professional', 'client'],
  ['personal', 'personal'],
]);

/** URL の ?category= を読む。以前の ?kind= も受け取る */
const readCategoryParam = (): CategoryFilter | null => {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  if (isCategoryFilter(category)) return category;
  return legacyKinds.get(params.get('kind') ?? '') ?? null;
};

export const WorksFilter = ({ works, numbers = {} }: WorksFilterProps) => {
  // 動きを減らす設定では、絞り込み時の並び替えと出入りのアニメーションを止める
  const reduceMotion = useReducedMotion() ?? false;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [onlyMeasured, setOnlyMeasured] = useState(false);

  useEffect(() => {
    const category = readCategoryParam();
    if (category) setSelectedCategory(category);
  }, []);

  const filteredWorks = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return works.filter((work) => {
      const searchable = [work.title, work.subtitle, work.description, work.goal, ...work.technologies]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      const matchesSearch = normalizedQuery.length === 0 || searchable.includes(normalizedQuery);
      const matchesCategory = selectedCategory === 'all' || work.category === selectedCategory;
      const matchesMeasured = !onlyMeasured || hasMeasuredImpact(work);

      return matchesSearch && matchesCategory && matchesMeasured;
    });
  }, [works, searchQuery, selectedCategory, onlyMeasured]);

  const countOf = (category: CategoryFilter) =>
    category === 'all' ? works.length : works.filter((work) => work.category === category).length;

  return (
    <div className="grid gap-14">
      <div className="grid gap-8">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <Tabs
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as CategoryFilter)}
            className="max-w-full"
          >
            <TabsList className="max-w-full flex-wrap justify-start gap-x-6 gap-y-1">
              {filters.map((filter) => (
                <TabsTrigger key={filter.value} value={filter.value} className="flex-none">
                  {filter.label}
                  <span className="text-[11px] text-muted-foreground tabular-nums">
                    {countOf(filter.value)}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <Input
            type="search"
            placeholder="名前・目指したこと・技術で探す"
            aria-label="実績を検索"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="max-w-xs"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4">
          <label className="inline-flex min-h-11 cursor-pointer items-center gap-3 text-[13px] tracking-[0.04em] text-muted-foreground">
            <input
              type="checkbox"
              checked={onlyMeasured}
              onChange={(event) => setOnlyMeasured(event.target.checked)}
              className="size-4 accent-[var(--gold)]"
            />
            実測の数値がある実績だけ
          </label>
          <ImpactLegend />
        </div>

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
            条件に一致する実績が見つかりませんでした。
          </p>
        </motion.div>
      )}
    </div>
  );
};
