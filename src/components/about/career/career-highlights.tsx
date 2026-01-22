'use client';

import { Container, SectionTitle } from '@/components/common';
import { Award, Briefcase, Code2, Users } from 'lucide-react';
import { motion } from 'motion/react';

const highlights = [
  {
    icon: Briefcase,
    value: '5年+',
    label: '開発経験',
    description: 'Web アプリケーション開発',
  },
  {
    icon: Code2,
    value: '20+',
    label: 'プロジェクト',
    description: '業務システム・Web サービス',
  },
  {
    icon: Users,
    value: '300+',
    label: '指導実績',
    description: 'プログラミング講師として',
  },
  {
    icon: Award,
    value: '全国入賞',
    label: 'ロボット大会',
    description: '指導チームが 1-3 位',
  },
];

export const CareerHighlights = () => {
  return (
    <section className="py-12 md:py-20">
      <Container className="py-0">
        <SectionTitle
          title="キャリアハイライト"
          subtitle="これまでの主な実績をご紹介します。"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              className="text-center p-6 rounded-xl bg-card border"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                {item.value}
              </div>
              <div className="font-semibold mb-2">{item.label}</div>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
