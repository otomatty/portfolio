import type { Impact, ImpactKind, Work } from '@/types/works';
import { IMPACT_KIND_LABELS, getHeadlineImpact } from '@/data/works';
import { cn } from '@/lib/utils';

/**
 * 数値の種類の印。実測は塗った円、試算は輪、目標は破線の輪。
 * Astro のページからも静的に描けるよう、状態を持たない部品にしている。
 */
export const KindMark = ({ kind, className }: { kind: ImpactKind; className?: string }) => (
  <span className={cn('inline-flex items-center gap-1.5 text-[11.5px] tracking-[0.12em] text-muted-foreground', className)}>
    <i
      className={cn(
        'inline-block size-[7px] flex-none rounded-full',
        kind === 'measured' && 'bg-gold',
        kind === 'estimated' && 'border border-gold',
        kind === 'target' && 'size-2 border border-dashed border-gold'
      )}
      aria-hidden="true"
    />
    {IMPACT_KIND_LABELS[kind].label}
  </span>
);

const valueSizes = {
  lg: { num: 'text-[clamp(2.4rem,4.6vw,3.6rem)] font-extralight', unit: 'text-[15px]', before: 'text-[17px]' },
  md: { num: 'text-[2.15rem] font-extralight', unit: 'text-[14px]', before: 'text-[15px]' },
  sm: { num: 'text-[15px]', unit: 'text-[15px]', before: 'text-[14px]' },
} as const;

/**
 * 数値。比較元があれば「前 → 後」で並べ、後の値を大きく置く。
 */
export const ImpactValue = ({ impact, size = 'md' }: { impact: Impact; size?: keyof typeof valueSizes }) => {
  const s = valueSizes[size];
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-2.5 leading-[1.15] tabular-nums">
      {impact.before && (
        <>
          <span className={cn('font-light text-muted-foreground', s.before)}>{impact.before}</span>
          <span className="text-gold-dim" aria-hidden="true">→</span>
          <span className="sr-only">から</span>
        </>
      )}
      <span className="whitespace-nowrap">
        <span className={cn('tracking-[0.02em]', s.num)}>{impact.value}</span>
        {impact.unit && <span className={cn('ml-1', s.unit)}>{impact.unit}</span>}
      </span>
    </span>
  );
};

/**
 * 数値の説明（何の数値か・補足・種類）を1行で添える。
 */
export const ImpactCaption = ({ impact, className }: { impact: Impact; className?: string }) => (
  <span className={cn('flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12.5px] leading-relaxed text-muted-foreground', className)}>
    <span>
      {impact.label}
      {impact.note && <span>（{impact.note}）</span>}
    </span>
    <KindMark kind={impact.kind} />
  </span>
);

/**
 * 数値と説明をまとめた1件。
 */
export const ImpactBlock = ({ impact, size = 'md' }: { impact: Impact; size?: keyof typeof valueSizes }) => (
  <div className="grid content-start gap-1.5">
    <ImpactValue impact={impact} size={size} />
    <ImpactCaption impact={impact} />
  </div>
);

/**
 * 数値の種類の凡例。
 */
export const ImpactLegend = ({ className }: { className?: string }) => (
  <p className={cn('flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-muted-foreground', className)}>
    {(Object.keys(IMPACT_KIND_LABELS) as ImpactKind[]).map((kind) => (
      <span key={kind} className="inline-flex items-center gap-2">
        <KindMark kind={kind} />
        <span>— {IMPACT_KIND_LABELS[kind].description}</span>
      </span>
    ))}
  </p>
);

/**
 * 画面の画像が無い実績の図。背面に細い円を重ねる。
 * NDA に配慮した客先案件は画面の代わりに成果の数値を大きく置き、それ以外は題名を置いて数値を小さく添える。
 */
export const WorkFigure = ({ work, className }: { work: Work; className?: string }) => {
  const impact = getHeadlineImpact(work);
  return (
    <div className={cn('relative flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden bg-card px-6 text-center', className)}>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <circle cx="200" cy="120" r="104" fill="none" stroke="var(--gold-dim)" strokeOpacity="0.55" />
        <circle cx="200" cy="120" r="84" fill="none" stroke="var(--gold-dim)" strokeOpacity="0.3" strokeDasharray="2 6" />
        <circle cx="304" cy="120" r="2.5" fill="var(--gold)" />
        <circle cx="96" cy="120" r="2.5" fill="var(--gold)" />
        <line x1="0" y1="120" x2="400" y2="120" stroke="var(--gold-dim)" strokeOpacity="0.2" strokeDasharray="3 6" />
      </svg>
      {work.masked && impact ? (
        <>
          <span className="relative">
            <ImpactValue impact={impact} size="lg" />
          </span>
          <span className="relative max-w-[22em] text-[12px] leading-relaxed text-muted-foreground">{impact.label}</span>
        </>
      ) : (
        <>
          <span className="relative text-[clamp(1.3rem,2.4vw,1.8rem)] font-light tracking-[0.08em]">{work.title}</span>
          {work.subtitle && <span className="relative text-[12px] tracking-[0.08em] text-muted-foreground">{work.subtitle}</span>}
        </>
      )}
      {work.masked && (
        <span className="absolute bottom-2.5 left-4 text-[10.5px] tracking-[0.1em] text-muted-foreground">
          NDA に配慮し、画面の代わりに成果を図で示しています
        </span>
      )}
    </div>
  );
};
