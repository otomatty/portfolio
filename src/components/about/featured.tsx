'use client';

import type { Work } from '@/types/works';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SectionTitle } from '@/components/common';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { animate, motion } from 'motion/react';
import React, { useEffect, useState } from 'react';

const getCategoryLabel = (category: Work['category']): string => {
  const categoryMap: Record<Work['category'], string> = {
    company: '企業案件',
    freelance: 'フリーランス',
    personal: '個人開発',
  };
  return categoryMap[category] ?? category;
};

const defaultThumbnail = '/images/works/default-thumbnail.webp';

interface FeaturedProps {
  works: Work[];
}

const Slider = ({
  children,
  itemsToShow,
  cardWidth,
}: {
  children: React.ReactNode;
  itemsToShow: number;
  cardWidth: string;
}) => {
  const [current, setCurrent] = useState(0);
  const validChildren = React.Children.toArray(children);
  const maxIndex = Math.max(validChildren.length - itemsToShow, 0);

  const handlePrev = () => {
    const newCurrent = current === 0 ? maxIndex : current - 1;

    animate(current, newCurrent, {
      duration: 0.5,
      ease: 'easeInOut',
      onUpdate: (value) => {
        setCurrent(value);
      },
    });
  };

  const handleNext = () => {
    const newCurrent = current >= maxIndex ? 0 : current + 1;

    animate(current, newCurrent, {
      duration: 0.5,
      ease: 'easeInOut',
      onUpdate: (value) => {
        setCurrent(value);
      },
    });
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          style={{
            width: `calc(100% * ${validChildren.length / itemsToShow || 1})`,
            transform: `translateX(-${
              (current / (validChildren.length / itemsToShow || 1)) * 100
            }%)`,
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {validChildren.length > 0 ? (
            validChildren.map((child, index) => (
              <div
                key={index}
                className="w-full shrink-0 px-2"
                style={{ width: cardWidth }}
              >
                {child}
              </div>
            ))
          ) : (
            <div>No items to display</div>
          )}
        </motion.div>
      </div>
      <div className="flex mt-4 gap-2">
        <button
          onClick={handlePrev}
          type="button"
          className="p-2 border rounded-full"
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="p-2 border rounded-full"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export const Featured = ({ works }: FeaturedProps) => {
  const [workItemsToShow, setWorkItemsToShow] = useState(2);
  const [cardWidth, setCardWidth] = useState('200px');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setWorkItemsToShow(2);
        setCardWidth('200px');
      } else if (window.innerWidth >= 1024) {
        setWorkItemsToShow(4);
        setCardWidth('400px');
      } else {
        setWorkItemsToShow(2);
        setCardWidth('300px');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div>
          <div className="flex justify-between items-center mb-8">
            <SectionTitle
              title="注目の制作実績"
              subtitle="注目の制作実績を表示します。"
            />
            <Button variant="ghost" asChild>
              <a href="/works" className="inline-flex items-center">
                もっと見る
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
          <Slider itemsToShow={workItemsToShow} cardWidth={cardWidth}>
            {works.map((work) => (
              <a key={work.slug} href={`/works/${work.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="relative h-48 w-full">
                    <img
                      src={work.thumbnail || defaultThumbnail}
                      alt={work.title}
                      width={1200}
                      height={675}
                      className="object-cover rounded-t-lg h-full w-full"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="text-sm text-primary font-medium mb-2">
                      {getCategoryLabel(work.category)}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{work.title}</h3>
                    <p className="text-muted-foreground">{work.description}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};
