import type { Work } from '@/types/works';
import { WORK_CATEGORY_LABELS, formatWorkNumber, formatWorkPeriod } from '@/data/works';
import { ImpactBlock, ImpactValue, KindMark, WorkFigure } from './Impact';

interface WorkCardProps {
  work: Work;
  /** 開始月順の通し番号 */
  number?: number;
}

/**
 * 実績一覧の1件。カードの枠は置かず、画面・通し番号・題名・目指したこと・数値を縦に並べる。
 * 画面が無い実績は、成果の数値を図にして置く。
 */
export const WorkCard = ({ work, number }: WorkCardProps) => {
  const [headline, second] = work.impacts ?? [];

  return (
    <article className="group grid gap-4">
      <a href={`/works/${work.slug}`} className="grid gap-5">
        <div className="relative aspect-[3360/1856] overflow-hidden border border-border bg-card">
          {work.thumbnail ? (
            <img
              src={work.thumbnail}
              alt={`${work.title} の画面`}
              width={1200}
              height={663}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <WorkFigure work={work} />
          )}
        </div>
        <p className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[11.5px] tracking-[0.14em] text-muted-foreground tabular-nums">
          <span>{formatWorkNumber(number)}</span>
          <span className="text-gold">{WORK_CATEGORY_LABELS[work.category]}</span>
          <span>{formatWorkPeriod(work.period)}</span>
        </p>
        <div className="grid gap-2.5">
          <h3 className="text-[1.3rem] font-light leading-snug tracking-[0.08em] transition-colors group-hover:text-gold">
            {work.title}
            {work.subtitle && <span className="mt-1 block text-[13.5px] tracking-[0.06em] text-muted-foreground">{work.subtitle}</span>}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {work.goal ? (
              <>
                <span className="mr-2 text-[11.5px] tracking-[0.14em] text-gold">目指したこと</span>
                {work.goal}
              </>
            ) : (
              work.description
            )}
          </p>
        </div>
      </a>
      {headline && (
        <div className="grid gap-2 border-t border-border pt-4">
          <ImpactBlock impact={headline} />
          {second && (
            <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12.5px] text-muted-foreground">
              <span>{second.label}</span>
              <span className="text-foreground">
                <ImpactValue impact={second} size="sm" />
              </span>
              <KindMark kind={second.kind} />
            </p>
          )}
        </div>
      )}
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
