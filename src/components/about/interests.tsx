'use client';

import { SectionTitle, Container } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Bot, Hammer, Landmark, TreeDeciduous } from 'lucide-react';
import { motion } from 'motion/react';

const interestHighlights = [
  {
    icon: Bot,
    title: 'AI ツール',
    description: 'Cursor や Devin を活用した開発効率化',
  },
  {
    icon: TreeDeciduous,
    title: '盆栽',
    description: '日本の伝統的な盆栽の育成',
  },
  {
    icon: Hammer,
    title: 'DIY',
    description: '家具や小物のものづくり',
  },
  {
    icon: Landmark,
    title: '美術館',
    description: 'アートや歴史的な展示物の鑑賞',
  },
];

export const Interests = () => {
  return (
    <section className="py-20">
      <Container className="py-0">
        <SectionTitle
          title="興味関心"
          subtitle="技術的な関心事とプライベートでの趣味についてご紹介します。"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto mb-8">
          {interestHighlights.map((interest, index) => (
            <motion.div
              key={interest.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <interest.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">{interest.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {interest.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button asChild variant="outline" size="lg">
            <a href="/about/interests" className="gap-2 inline-flex items-center">
              すべての興味関心を見る
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};
