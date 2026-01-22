import { cn } from '@/lib/utils';

interface SeigaihaPatternProps {
  className?: string;
  color?: string;
  size?: number;
  backgroundColor?: string;
  strokeWidth?: number;
}

export function SeigaihaPattern({
  className,
  color = '#987D00',
  backgroundColor = 'hsl(var(--background))',
  size = 120,
  strokeWidth = 1,
}: SeigaihaPatternProps) {
  const start = 14;
  const lineWidth = strokeWidth;
  const gap = 1;

  const style = {
    backgroundSize: `${size}px ${size / 2}px`,
    backgroundImage: `
      radial-gradient(circle farthest-side at 100% 150%, 
        ${backgroundColor} ${start}%, 
        ${color} ${start + gap}%, 
        ${color} ${start + lineWidth}%, 
        ${backgroundColor} ${start + lineWidth + gap}%, 
        ${backgroundColor} ${start + 16}%, 
        ${color} ${start + 17}%, 
        ${color} ${start + 17 + lineWidth}%, 
        ${backgroundColor} ${start + 17 + lineWidth + gap}%, 
        ${backgroundColor} ${start + 32}%, 
        ${color} ${start + 33}%, 
        ${color} ${start + 33 + lineWidth}%, 
        transparent ${start + 33 + lineWidth + gap}%, 
        transparent
      ),
      radial-gradient(circle farthest-side at 0% 150%, 
        ${backgroundColor} ${start}%, 
        ${color} ${start + gap}%, 
        ${color} ${start + lineWidth}%, 
        ${backgroundColor} ${start + lineWidth + gap}%, 
        ${backgroundColor} ${start + 16}%, 
        ${color} ${start + 17}%, 
        ${color} ${start + 17 + lineWidth}%, 
        ${backgroundColor} ${start + 17 + lineWidth + gap}%, 
        ${backgroundColor} ${start + 32}%, 
        ${color} ${start + 33}%, 
        ${color} ${start + 33 + lineWidth}%, 
        transparent ${start + 33 + lineWidth + gap}%, 
        transparent
      ),
      radial-gradient(circle closest-corner at 50% 100%, 
        ${backgroundColor} ${start + 14}%, 
        ${color} ${start + 16}%, 
        ${color} ${start + 16 + lineWidth}%, 
        ${backgroundColor} ${start + 16 + lineWidth + gap}%, 
        ${backgroundColor} ${start + 32}%, 
        ${color} ${start + 34}%, 
        ${color} ${start + 34 + lineWidth}%, 
        ${backgroundColor} ${start + 34 + lineWidth + gap}%, 
        ${backgroundColor} ${start + 64}%, 
        ${color} ${start + 66}%, 
        ${color} ${start + 66 + lineWidth}%, 
        transparent ${start + 66 + lineWidth + gap}%, 
        transparent
      ),
      radial-gradient(circle farthest-side at 100% 50%, 
        ${backgroundColor} ${start}%, 
        ${color} ${start + gap}%, 
        ${color} ${start + lineWidth}%, 
        ${backgroundColor} ${start + lineWidth + gap}%, 
        ${backgroundColor} ${start + 16}%, 
        ${color} ${start + 17}%, 
        ${color} ${start + 17 + lineWidth}%, 
        ${backgroundColor} ${start + 17 + lineWidth + gap}%, 
        ${backgroundColor} ${start + 32}%, 
        ${color} ${start + 33}%, 
        ${color} ${start + 33 + lineWidth}%, 
        transparent ${start + 33 + lineWidth + gap}%, 
        transparent
      ),
      radial-gradient(circle farthest-side at 0% 50%, 
        ${backgroundColor} ${start}%, 
        ${color} ${start + gap}%, 
        ${color} ${start + lineWidth}%, 
        ${backgroundColor} ${start + lineWidth + gap}%, 
        ${backgroundColor} ${start + 16}%, 
        ${color} ${start + 17}%, 
        ${color} ${start + 17 + lineWidth}%, 
        ${backgroundColor} ${start + 17 + lineWidth + gap}%, 
        ${backgroundColor} ${start + 32}%, 
        ${color} ${start + 33}%, 
        ${color} ${start + 33 + lineWidth}%, 
        ${backgroundColor} ${start + 33 + lineWidth + gap}%, 
        ${backgroundColor}
      )
    `,
    backgroundRepeat: 'repeat',
  } as const;

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full opacity-90',
        className
      )}
      style={style}
    />
  );
}
