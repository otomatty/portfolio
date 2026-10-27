import { cn } from '@/lib/utils';

type TimelineVariant = 'left' | 'center';

interface TimelineRootProps {
  children: React.ReactNode;
  variant?: TimelineVariant;
  className?: string;
}

/**
 * 縦線が途切れないタイムラインの土台。
 * 1px の線を縦に引き、各項目の頭に小さな円を置く。
 */
export function TimelineRoot({
  children,
  variant = 'left',
  className,
}: TimelineRootProps) {
  return (
    <div className={cn('relative', className)}>
      {/* 線は top-0 bottom-0 でコンテンツ全体の高さに引く */}
      <div
        className={cn(
          'absolute top-0 bottom-0 w-px bg-border',
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

/** 種別は金の濃さで分ける。実務は塗り、受託・個人はリング、教育は淡いリング */
const variantClasses: Record<NonNullable<TimelineDotProps['variant']>, string> = {
  default: 'border-gold/60',
  work: 'border-gold bg-gold',
  freelance: 'border-gold',
  education: 'border-gold-dim',
};

/**
 * ライン上に表示する小さな円。背景色で塗るので、線はドットの手前で途切れて見える。
 */
export function TimelineDot({
  highlight = false,
  variant = 'default',
  align = 'left',
  className,
}: TimelineDotProps) {
  return (
    <div
      className={cn(
        'absolute z-10 h-3 w-3 rounded-full border bg-background',
        // 線（1px）の中心に合わせる
        align === 'left' && 'left-[10.5px] top-7 md:left-[26.5px]',
        align === 'center' && 'left-[10.5px] mt-7 md:left-1/2 md:-translate-x-1/2',
        variantClasses[variant],
        highlight && variant === 'default' && 'border-gold bg-gold',
        className
      )}
      aria-hidden
    />
  );
}
