import { cn } from '@/lib/utils';

interface ShippoPatternProps {
  className?: string;
  color?: string;
  size?: number;
}

export function ShippoPattern({
  className,
  color = '#987D00',
  size = 50,
}: ShippoPatternProps) {
  const style = {
    backgroundSize: `${size}px ${size}px`,
    backgroundImage: `
      radial-gradient(farthest-corner, rgba(255, 255, 255, 0) 68%, ${color} 68% 70%, rgba(255, 255, 255, 0) 70% 100%),
      radial-gradient(circle at top left, rgba(255, 255, 255, 0) 34%, ${color} 34% 35%, rgba(255, 255, 255, 0) 35% 100%),
      radial-gradient(circle at top right, rgba(255, 255, 255, 0) 34%, ${color} 34% 35%, rgba(255, 255, 255, 0) 35% 100%),
      radial-gradient(circle at bottom left, rgba(255, 255, 255, 0) 34%, ${color} 34% 35%, rgba(255, 255, 255, 0) 35% 100%),
      radial-gradient(circle at bottom right, rgba(255, 255, 255, 0) 34%, ${color} 34% 35%, rgba(255, 255, 255, 0) 35% 100%)
    `,
    backgroundRepeat: 'repeat',
  } as const;

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full',
        className
      )}
      style={style}
    />
  );
}
