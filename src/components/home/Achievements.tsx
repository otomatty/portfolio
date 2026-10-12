import type { Work, WorkKind } from '@/types/works';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, ExternalLink, X } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  type Transition,
} from 'motion/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { homepageCopy } from '@/data/homepage';
import { WORK_KIND_LABELS } from '@/data/works';

interface AchievementsProps {
  works: Work[];
}

/** list: 帯の一覧 / card: 中央のカード / detail: 上部バナー + 概要 */
type Phase = 'list' | 'card' | 'detail';

const FALLBACK_THUMBNAIL = '/images/works/default-thumbnail.webp';
const KIND_ORDER: WorkKind[] = ['professional', 'personal'];
const MORPH: Transition = { type: 'spring', stiffness: 170, damping: 26 };
const FADE: Transition = { duration: 0.4, ease: [0.32, 0.72, 0, 1] };
/** カードの変形完了後、バナーへ移るまでの間 */
const CARD_HOLD_MS = 600;

const copy = homepageCopy.achievements;
const thumbnailOf = (work: Work) => work.thumbnail || FALLBACK_THUMBNAIL;
const yearOf = (work: Work) => work.created_at.slice(0, 4);

export const Achievements = ({ works }: AchievementsProps) => {
  const collections = useMemo(
    () =>
      KIND_ORDER.map((kind) => ({
        kind,
        works: works.filter((work) => work.kind === kind),
      })).filter((collection) => collection.works.length > 0),
    [works]
  );

  const sectionRef = useRef<HTMLElement>(null);
  const [collectionIndex, setCollectionIndex] = useState(0);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>('list');

  const collection = collections[collectionIndex];
  const selectedWork =
    collection?.works.find((work) => work.slug === selectedSlug) ?? null;
  const isOpen = phase !== 'list';
  const backgroundWork =
    (isOpen ? selectedWork : null) ??
    collection?.works.find((work) => work.slug === hoveredSlug) ??
    null;

  const open = (slug: string) => {
    setSelectedSlug(slug);
    setHoveredSlug(null);
    setPhase('card');
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const cardTimerRef = useRef<number | undefined>(undefined);

  const close = useCallback(() => {
    window.clearTimeout(cardTimerRef.current);
    setPhase('list');
  }, []);

  // カードへの変形が終わったら、少し見せてからバナー + 概要へ
  const handleMorphComplete = () => {
    if (phase !== 'card') return;
    window.clearTimeout(cardTimerRef.current);
    cardTimerRef.current = window.setTimeout(
      () => setPhase('detail'),
      CARD_HOLD_MS
    );
  };

  // 変形完了が通知されない場合の保険
  useEffect(() => {
    if (phase !== 'card') return undefined;
    cardTimerRef.current = window.setTimeout(() => setPhase('detail'), 1600);
    return () => window.clearTimeout(cardTimerRef.current);
  }, [phase]);

  // タッチ操作: 1回目のタップで選択（背景を切り替え）、2回目で開く。
  // タップ時は click の前に focus が走るため、pointerdown 時点の選択状態で判定する。
  const tapRef = useRef<{ isTouch: boolean; wasActive: boolean } | null>(null);

  const handleStripPointerDown = (
    event: React.PointerEvent,
    slug: string
  ) => {
    tapRef.current = {
      isTouch: event.pointerType !== 'mouse',
      wasActive: hoveredSlug === slug,
    };
  };

  const handleStripClick = (slug: string) => {
    const tap = tapRef.current;
    tapRef.current = null;
    if (tap?.isTouch && !tap.wasActive) {
      setHoveredSlug(slug);
      return;
    }
    open(slug);
  };

  const switchCollection = (step: number) => {
    setHoveredSlug(null);
    setCollectionIndex(
      (current) => (current + step + collections.length) % collections.length
    );
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  if (!collection) return null;

  return (
    <section
      ref={sectionRef}
      aria-label={copy.label}
      className="relative h-[calc(100svh-4rem)] min-h-[560px] scroll-mt-16 overflow-hidden bg-neutral-950 text-white"
    >
      {/* 背景: 選択中の作品画像をクロスフェード */}
      <AnimatePresence initial={false}>
        {backgroundWork && (
          <motion.img
            key={backgroundWork.slug}
            src={thumbnailOf(backgroundWork)}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, filter: isOpen ? 'blur(12px)' : 'blur(0px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>
      <div className="absolute inset-0 bg-neutral-950/70" />

      <LayoutGroup>
        {/* 一覧: 帯 + 種別ラベル */}
        <motion.div
          className="relative flex h-full flex-col items-center justify-center gap-12 px-4"
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={FADE}
          style={{ pointerEvents: isOpen ? 'none' : 'auto' }}
        >
          <div
            className="flex items-end gap-3 md:gap-4"
            onPointerLeave={(event) => {
              if (event.pointerType === 'mouse') setHoveredSlug(null);
            }}
          >
            {collection.works.map((work) => {
              const isActive = hoveredSlug === work.slug;
              const isMorphing = isOpen && selectedSlug === work.slug;
              return (
                <motion.button
                  key={work.slug}
                  type="button"
                  aria-label={`${work.title} の概要を開く`}
                  className="group relative h-[40vh] max-h-80 w-8 md:w-10 focus-visible:outline-none"
                  animate={{ y: isActive ? -24 : 0 }}
                  transition={FADE}
                  onPointerEnter={(event) => {
                    if (event.pointerType === 'mouse') setHoveredSlug(work.slug);
                  }}
                  onPointerDown={(event) =>
                    handleStripPointerDown(event, work.slug)
                  }
                  onFocus={() => setHoveredSlug(work.slug)}
                  onClick={() => handleStripClick(work.slug)}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs italic text-white/90"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={FADE}
                      >
                        {work.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {!isMorphing && (
                    <motion.div
                      layoutId={`work-${work.slug}`}
                      transition={MORPH}
                      className="h-full w-full overflow-hidden ring-white/70 group-focus-visible:ring-2"
                      style={{ borderRadius: 8 }}
                    >
                      <img
                        src={thumbnailOf(work)}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </motion.div>
                  )}
                  <motion.span
                    className="absolute -bottom-5 left-1/2 size-2 -translate-x-1/2 rounded-full border border-white"
                    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5 }}
                    transition={FADE}
                  />
                </motion.button>
              );
            })}
          </div>

          <div className="flex items-center gap-6 md:gap-10">
            {collections.length > 1 && (
              <CollectionButton
                label={copy.prevCollection}
                onClick={() => switchCollection(-1)}
              >
                <ArrowLeft className="size-4" />
              </CollectionButton>
            )}
            <div className="min-w-40 text-center">
              <p className="text-lg italic">
                {WORK_KIND_LABELS[collection.kind]}
              </p>
              <p className="text-xs text-white/60">
                {copy.collectionSubtitle} • {collection.works.length}
                {copy.countUnit}
              </p>
            </div>
            {collections.length > 1 && (
              <CollectionButton
                label={copy.nextCollection}
                onClick={() => switchCollection(1)}
              >
                <ArrowRight className="size-4" />
              </CollectionButton>
            )}
          </div>

          <p className="absolute bottom-6 text-xs text-white/50">{copy.hint}</p>
        </motion.div>

        {/* カード / バナー: 帯と同じ layoutId で変形 */}
        {isOpen && selectedWork && (
          <div
            className={
              phase === 'card'
                ? 'absolute inset-0 grid place-items-center p-4'
                : 'absolute inset-x-0 top-0 p-3 md:p-4'
            }
          >
            <motion.div
              layoutId={`work-${selectedWork.slug}`}
              transition={MORPH}
              onLayoutAnimationComplete={handleMorphComplete}
              className={
                phase === 'card'
                  ? 'relative aspect-[4/5] w-[min(80vw,26rem)] overflow-hidden'
                  : 'relative h-[34svh] w-full overflow-hidden'
              }
              style={{ borderRadius: 24 }}
            >
              <img
                src={thumbnailOf(selectedWork)}
                alt={selectedWork.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
              <motion.div
                layout="position"
                transition={MORPH}
                className={
                  phase === 'card'
                    ? 'absolute inset-x-6 bottom-8'
                    : 'absolute inset-x-6 bottom-6 mx-auto max-w-3xl md:inset-x-10'
                }
              >
                <p className="text-xs text-white/70">{yearOf(selectedWork)}</p>
                <h3 className="text-3xl font-semibold md:text-4xl">
                  {selectedWork.title}
                </h3>
                <p className="text-sm text-white/70">
                  {WORK_KIND_LABELS[selectedWork.kind]}
                </p>
              </motion.div>
            </motion.div>
          </div>
        )}
      </LayoutGroup>

      {/* 概要（バナーの下） */}
      <AnimatePresence>
        {phase === 'detail' && selectedWork && (
          <motion.div
            key={selectedWork.slug}
            className="absolute inset-x-0 bottom-0 top-[calc(34svh+1.5rem)] overflow-y-auto px-6 pb-12 pt-6 md:px-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { ...FADE, delay: 0.25 } }}
            exit={{ opacity: 0, y: 40, transition: FADE }}
          >
            <div className="mx-auto max-w-3xl space-y-8">
              <p className="leading-relaxed text-white/85">
                {selectedWork.description}
              </p>

              {selectedWork.technologies.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-white/70">
                    {copy.technologies}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedWork.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="border-white/30 text-white"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={`/works/${selectedWork.slug}`}
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-neutral-950 transition-colors hover:bg-white/85"
                >
                  {copy.viewDetail}
                  <ArrowRight className="size-4" />
                </a>
                {selectedWork.github_url && (
                  <a
                    href={selectedWork.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
                  >
                    <SiGithub color="currentColor" className="size-4" />
                    GitHub
                  </a>
                )}
                {selectedWork.website_url && (
                  <a
                    href={selectedWork.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
                  >
                    <ExternalLink className="size-4" />
                    {copy.website}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'detail' && (
          <motion.button
            type="button"
            onClick={close}
            className="absolute right-6 top-6 z-10 inline-flex items-center gap-1.5 rounded-full bg-neutral-950/60 px-3 py-1.5 text-sm backdrop-blur-sm transition-colors hover:bg-neutral-950/80 md:right-8 md:top-8"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={FADE}
          >
            <X className="size-4" aria-hidden="true" />
            {copy.close}
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
};

interface CollectionButtonProps {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}

const CollectionButton = ({ label, onClick, children }: CollectionButtonProps) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className="inline-flex h-9 w-14 items-center justify-center rounded-full border border-white/30 text-white/80 transition-colors hover:border-white/60 hover:text-white"
  >
    {children}
  </button>
);
