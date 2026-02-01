import { cn } from '@/lib/utils';

type TimelineVariant = 'left' | 'center';

interface TimelineRootProps {
  children: React.ReactNode;
  variant?: TimelineVariant;
  className?: string;
}

/**
 * 縦線が途切れないタイムラインの土台。
 * 線はドットの中心を通り、ドットはリング状なので線が貫いて見える。
 */
export function TimelineRoot({
  children,
  variant = 'left',
  className,
}: TimelineRootProps) {
  return (
    <div className={cn('relative', className)}>
      {/* 線は top-0 bottom-0 でコンテンツ全体の高さに引き、ドットはリングのため線が途切れない */}
      <div
        className={cn(
          'absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20',
          variant === 'left' && 'left-4 md:left-8',
          variant === 'center' && 'left-4 md:left-1/2 md:-translate-x-1/2'
        )}
        aria-hidden
      />
      <div className="relative">{children}</div>
    </div>
  );
}

interface TimelineItemProps {
  children: React.ReactNode;
  /** ドットを中央に揃えるためのオフセット。線の中心に合わせる: left は 17px, center は 23px (md) */
  className?: string;
}

/**
 * タイムラインの1項目。左にリング状のドットを表示（線が貫通して見える）。
 */
export function TimelineItem({ children, className }: TimelineItemProps) {
  return (
    <div className={cn('relative pl-12 md:pl-20', className)}>{children}</div>
  );
}

interface TimelineDotProps {
  highlight?: boolean;
  /** career 用のタイプ別色 */
  variant?: 'default' | 'work' | 'freelance' | 'education';
  /** ドットの位置。left=線の左側に寄せる（ストーリー用）、center=中央（キャリア用） */
  align?: 'left' | 'center';
  className?: string;
}

const variantBorderColors: Record<
  NonNullable<TimelineDotProps['variant']>,
  string
> = {
  default: 'border-primary/50',
  work: 'border-blue-500',
  freelance: 'border-green-500',
  education: 'border-purple-500',
};

const variantFillColors: Record<
  NonNullable<TimelineDotProps['variant']>,
  string
> = {
  default: 'bg-primary/50',
  work: 'bg-blue-500',
  freelance: 'bg-green-500',
  education: 'bg-purple-500',
};

/**
 * ライン上に表示するドット。リング＋中心の点で線が途切れず、点がはっきり見える。
 */
export function TimelineDot({
  highlight = false,
  variant = 'default',
  align = 'left',
  className,
}: TimelineDotProps) {
  const isColoredVariant = variant !== 'default';
  const fillColor =
    variant === 'default'
      ? highlight
        ? 'bg-primary'
        : 'bg-primary'
      : variantFillColors[variant];
  return (
    <div
      className={cn(
        'absolute w-5 h-5 rounded-full border-4 z-10 bg-transparent flex items-center justify-center',
        align === 'left' &&
          'left-[7px] md:left-[23px]', // 線の中心に合わせる
        align === 'center' &&
          'left-[7px] md:left-1/2 md:-translate-x-1/2 mt-6', // モバイルは線と揃える
        highlight && !isColoredVariant && 'border-primary',
        !highlight && !isColoredVariant && 'border-primary/50',
        isColoredVariant && variantBorderColors[variant],
        className
      )}
      aria-hidden
    >
      {/* ライン上にはっきり見える点 */}
      <span
        className={cn(
          'w-4 h-4 rounded-full shrink-0',
          fillColor
        )}
      />
    </div>
  );
}
