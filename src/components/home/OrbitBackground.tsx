import { useEffect, useRef, useState } from 'react';
import { OrbitAnimation } from '@/components/magicui/orbit-animation';

export const OrbitBackground = () => {
  const circleRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    const calculateRadius = () => {
      if (circleRef.current) {
        const width = circleRef.current.offsetWidth;
        const calculatedRadius = width / 2;
        setRadius(calculatedRadius);
      }
    };

    calculateRadius();
    window.addEventListener('resize', calculateRadius);
    return () => window.removeEventListener('resize', calculateRadius);
  }, []);

  const animationRadius = Math.max(radius - 8, 30);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute -left-1/3 top-1/2 -translate-y-1/2 w-2/3 aspect-square z-0">
        <div ref={circleRef} className="relative w-full h-full">
          <div className="absolute inset-0 border-2 border-primary/40 rounded-full animate-pulse" />
          <div className="absolute inset-0 border border-primary/20 rounded-full blur-sm" />
          {process.env.NODE_ENV === 'development' && (
            <div className="absolute inset-0 bg-red-500/10 rounded-full border-2 border-red-500/50" />
          )}
          <OrbitAnimation
            className="w-full h-full"
            radius={animationRadius}
            speed={0.01}
          />
        </div>
      </div>
      <div className="absolute -right-1/3 top-1/2 -translate-y-1/2 w-2/3 aspect-square z-0">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 border-2 border-primary/40 rounded-full animate-pulse" />
          <div className="absolute inset-0 border border-primary/20 rounded-full blur-sm" />
          {process.env.NODE_ENV === 'development' && (
            <div className="absolute inset-0 bg-blue-500/10 rounded-full border-2 border-blue-500/50" />
          )}
          <OrbitAnimation
            className="w-full h-full"
            radius={animationRadius}
            speed={-0.01}
          />
        </div>
      </div>
    </div>
  );
};
