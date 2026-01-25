import { ArrowRight } from 'lucide-react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MagicCard } from './magic-card';

interface BentoGridProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<'div'> {
  name: ReactNode;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description?: string;
  href: string;
  cta: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        'grid w-full auto-rows-[16rem] grid-cols-12 gap-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <Card
    className={cn(
      'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl',
      className
    )}
    {...props}
  >
    <div>{background}</div>
    <div className="pointer-events-none flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10 z-20">
      <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75 dark:text-neutral-300" />
      <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
        {name}
      </h3>
      <p className="max-w-lg text-neutral-400">{description}</p>
    </div>

    <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-20">
      <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
        <a href={href}>
          {cta}
          <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
        </a>
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/3 group-hover:backdrop-blur-xs dark:group-hover:bg-neutral-800/10 z-10" />
    <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/95 to-transparent z-5" />
  </Card>
);

const MagicBentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => {
  return (
    <MagicCard
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl shadow-2xl cursor-pointer',
        'transition-all duration-300 ease-in-out',
        className
      )}
      gradientColor="hsl(var(--border))"
      gradientOpacity={0.5}
      {...props}
    >
      <div className="absolute inset-0 z-0">{background}</div>
      <div className="pointer-events-none flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10 z-20">
        <Icon className="h-12 w-12 origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75 text-foreground" />
        <h3 className="text-2xl font-semibold text-foreground">{name}</h3>
        {description && <p className="max-w-lg text-foreground/70">{description}</p>}
      </div>

      <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-20">
        <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
          <a href={href}>
            {cta}
            <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
          </a>
        </Button>
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-background/60 via-background/10 to-transparent z-5" />
    </MagicCard>
  );
};

export { BentoCard, BentoGrid, MagicBentoCard };
