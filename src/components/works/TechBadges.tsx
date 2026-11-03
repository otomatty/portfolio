import { getTechIconId } from '@/data/tech-icons';
import { cn } from '@/lib/utils';

const sizes = {
  sm: { item: 'gap-1.5 px-2.5 py-0.5 text-[11.5px]', icon: 'size-3' },
  md: { item: 'gap-2 px-3 py-1 text-[13px]', icon: 'size-3.5' },
} as const;

interface TechBadgesProps {
  technologies: string[];
  size?: keyof typeof sizes;
  className?: string;
}

/**
 * 技術スタックのバッジ。ロゴは公式の色のまま小さく置き、枠と文字はサイトの色にそろえる。
 * ロゴは public/icons/tech.svg のシンボルを参照するので、JavaScript の束には入らない。
 * ロゴの無い技術は、文字だけのバッジにする。
 */
export const TechBadges = ({ technologies, size = 'sm', className }: TechBadgesProps) => {
  const s = sizes[size];
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)} aria-label="使った技術">
      {technologies.map((tech) => {
        const iconId = getTechIconId(tech);
        return (
          <li
            key={tech}
            className={cn(
              'inline-flex items-center rounded-full border border-foreground/20 tracking-[0.04em] text-muted-foreground',
              s.item
            )}
          >
            {iconId && (
              <svg className={cn('flex-none', s.icon)} aria-hidden="true" focusable="false">
                <use href={`/icons/tech.svg#${iconId}`} />
              </svg>
            )}
            {tech}
          </li>
        );
      })}
    </ul>
  );
};
