import type { Work } from '@/types/works';
import { WORK_KIND_LABELS, formatWorkNumber } from '@/data/works';
import { cn } from '@/lib/utils';

interface WorkCardProps {
  work: Work;
  /** 作成日順の通し番号 */
  number?: number;
}

const FALLBACK_THUMBNAIL = '/images/works/default-thumbnail.webp';

const yearMonth = (iso: string) => iso.slice(0, 7).replace('-', '.');

/**
 * 実績一覧の1件。カードの枠は置かず、カラーの画面・通し番号・題名を縦に並べる。
 * 画面と題名は詳細ページへのリンク、サイトとソースコードは別のリンクにする。
 */
export const WorkCard = ({ work, number }: WorkCardProps) => {
  return (
    <article className="group grid gap-4">
      <a href={`/works/${work.slug}`} className="grid gap-5">
        <div className="relative aspect-[3360/1856] overflow-hidden border border-border bg-card">
          <img
            src={work.thumbnail || FALLBACK_THUMBNAIL}
            alt={`${work.title} の画面`}
            width={1200}
            height={663}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
        </div>
        <p className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[11.5px] tracking-[0.14em] text-muted-foreground tabular-nums">
          <span className="text-gold">{formatWorkNumber(number)}</span>
          <span className="inline-flex items-center gap-2">
            <i
              className={cn(
                'inline-block size-2 rounded-full',
                work.kind === 'personal' ? 'bg-gold' : 'border border-foreground'
              )}
              aria-hidden="true"
            />
            {WORK_KIND_LABELS[work.kind]}
          </span>
          <span>{yearMonth(work.created_at)}</span>
        </p>
        <div className="grid gap-2.5">
          <h3 className="text-[1.3rem] font-light leading-snug tracking-[0.08em] transition-colors group-hover:text-gold">
            {work.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {work.description}
          </p>
        </div>
      </a>
      <p className="text-xs tracking-[0.08em] text-muted-foreground">
        {work.technologies.join(' · ')}
      </p>
      {(work.website_url || work.github_url) && (
        <p className="flex flex-wrap gap-x-6 gap-y-1 text-[13px] tracking-[0.06em]">
          {work.website_url && (
            <a
              href={work.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold"
            >
              サイト ↗
            </a>
          )}
          {work.github_url && (
            <a
              href={work.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold"
            >
              GitHub ↗
            </a>
          )}
        </p>
      )}
    </article>
  );
};
