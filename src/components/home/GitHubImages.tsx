'use client';

import { cn } from '@/lib/utils';

const IMAGE_BASE = '/images';

export const GitHubImages = () => {
  const lightImages = [
    `${IMAGE_BASE}/github-light-3.webp`,
    `${IMAGE_BASE}/github-light-2.webp`,
    `${IMAGE_BASE}/github-light-1.webp`,
  ];
  const darkImages = [
    `${IMAGE_BASE}/github-dark-3.webp`,
    `${IMAGE_BASE}/github-dark-2.webp`,
    `${IMAGE_BASE}/github-dark-1.webp`,
  ];

  return (
    <>
      {lightImages.map((src, index) => (
        <img
          key={`light-${index}`}
          src={src}
          alt={`GitHub Profile ${index + 1}`}
          width={640}
          height={400}
          className={cn(
            'object-contain transition-all absolute scale-90 block dark:hidden',
            'transform-gpu perspective-[2000px]',
            index === 2 &&
              'z-30 translate-y-[10%] translate-x-[3%] group-hover:translate-y-[8%] duration-500 delay-200',
            index === 1 &&
              'z-20 translate-y-[5%] translate-x-[0%] group-hover:translate-y-[2%] duration-500 delay-100',
            index === 0 &&
              'z-10 translate-y-0 translate-x-[-3%] group-hover:translate-y-[-3%] duration-500',
            'transform-3d',
            'backface-hidden',
            'origin-center',
            'rotate-y-20 rotate-x-[-14deg] skew-y-[-4deg]',
            'group-hover:rotate-y-15 group-hover:rotate-x-[-10deg]',
            'ease-out'
          )}
          style={{
            filter: `brightness(${1 - (2 - index) * 0.1})`,
            transitionProperty: 'transform, filter',
          }}
          loading="lazy"
          decoding="async"
        />
      ))}
      {darkImages.map((src, index) => (
        <img
          key={`dark-${index}`}
          src={src}
          alt={`GitHub Profile ${index + 1}`}
          width={640}
          height={400}
          className={cn(
            'object-contain transition-all absolute scale-90 hidden dark:block',
            'transform-gpu perspective-[2000px]',
            index === 2 &&
              'z-30 translate-y-[10%] translate-x-[3%] group-hover:translate-y-[8%] duration-500 delay-200',
            index === 1 &&
              'z-20 translate-y-[5%] translate-x-[0%] group-hover:translate-y-[2%] duration-500 delay-100',
            index === 0 &&
              'z-10 translate-y-0 translate-x-[-3%] group-hover:translate-y-[-3%] duration-500',
            'transform-3d',
            'backface-hidden',
            'origin-center',
            'rotate-y-20 rotate-x-[-14deg] skew-y-[-4deg]',
            'group-hover:rotate-y-15 group-hover:rotate-x-[-10deg]',
            'ease-out'
          )}
          style={{
            filter: `brightness(${1 - (2 - index) * 0.1})`,
            transitionProperty: 'transform, filter',
          }}
          loading="lazy"
          decoding="async"
        />
      ))}
    </>
  );
};
