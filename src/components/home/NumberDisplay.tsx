'use client';

import { useEffect, useState } from 'react';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { cn } from '@/lib/utils';

interface NumberDisplayProps {
  value: number;
  unit: string;
}

export const NumberDisplay = ({ value, unit }: NumberDisplayProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute top-6 left-6 flex items-end justify-center z-20">
      <div
        className={cn('text-6xl font-bold transition-colors duration-200', {
          'text-primary': mounted,
          'opacity-0': !mounted,
          'opacity-100': mounted,
        })}
      >
        <NumberTicker value={value} className="text-inherit tracking-tighter" />
      </div>
      <span className="text-lg text-muted-foreground font-bold">{unit}</span>
    </div>
  );
};
