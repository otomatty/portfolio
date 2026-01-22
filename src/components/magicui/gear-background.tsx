'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Gear1, Gear2, Gear3, Gear4, Gear5, Gear6, Gear7 } from './gears';

interface GearProps {
  size: number;
  speed: number;
  clockwise: boolean;
  x: number;
  y: number;
  gearNumber: number;
  className?: string;
  opacity?: number;
}

const Gear = ({
  size,
  speed,
  clockwise,
  x,
  y,
  gearNumber,
  className,
  opacity = 1,
}: GearProps) => {
  const actualGearNumber = gearNumber > 6 ? 1 : gearNumber;

  const getGearComponent = (number: number) => {
    switch (number) {
      case 1:
        return <Gear1 />;
      case 2:
        return <Gear2 />;
      case 3:
        return <Gear3 />;
      case 4:
        return <Gear4 />;
      case 5:
        return <Gear5 />;
      case 6:
        return <Gear6 />;
      case 7:
        return <Gear7 />;
      default:
        return <Gear1 />;
    }
  };

  return (
    <div
      className={cn(
        'absolute',
        clockwise ? 'animate-spin-clockwise' : 'animate-spin-counterclockwise',
        '[&>svg]:opacity-10 dark:[&>svg]:opacity-0',
        className
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
        animationDuration: `${speed}s`,
        opacity: opacity,
      }}
    >
      {getGearComponent(actualGearNumber)}
    </div>
  );
};

export const GearBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      // Placeholder for responsive adjustments.
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
    >
      <Gear size={120} speed={25} clockwise={false} x={10} y={15} gearNumber={1} />
      <Gear size={90} speed={20} clockwise={true} x={18} y={10} gearNumber={2} />

      <Gear size={100} speed={22} clockwise={true} x={85} y={10} gearNumber={3} />
      <Gear size={80} speed={18} clockwise={false} x={92} y={15} gearNumber={4} />

      <Gear size={200} speed={35} clockwise={true} x={15} y={65} gearNumber={5} />
      <Gear
        size={160}
        speed={30}
        clockwise={false}
        x={25}
        y={75}
        gearNumber={6}
      />
      <Gear size={140} speed={28} clockwise={true} x={1} y={80} gearNumber={1} />
      <Gear
        size={120}
        speed={25}
        clockwise={false}
        x={30}
        y={85}
        gearNumber={2}
      />
      <Gear size={90} speed={20} clockwise={true} x={20} y={90} gearNumber={3} />

      <Gear size={180} speed={32} clockwise={false} x={70} y={60} gearNumber={4} />
      <Gear size={150} speed={28} clockwise={true} x={85} y={70} gearNumber={5} />
      <Gear
        size={130}
        speed={26}
        clockwise={false}
        x={75}
        y={80}
        gearNumber={6}
      />
      <Gear
        size={110}
        speed={24}
        clockwise={true}
        x={90}
        y={85}
        gearNumber={1}
      />
      <Gear
        size={100}
        speed={22}
        clockwise={false}
        x={65}
        y={75}
        gearNumber={2}
      />

      <Gear size={120} speed={25} clockwise={true} x={45} y={70} gearNumber={3} />
      <Gear
        size={100}
        speed={22}
        clockwise={false}
        x={52}
        y={80}
        gearNumber={4}
      />
      <Gear size={80} speed={18} clockwise={true} x={40} y={85} gearNumber={5} />
      <Gear
        size={70}
        speed={15}
        clockwise={false}
        x={55}
        y={90}
        gearNumber={6}
      />
    </div>
  );
};
