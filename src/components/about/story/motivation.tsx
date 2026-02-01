'use client';

import { Container, SectionTitle } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Lightbulb, Target } from 'lucide-react';
import { motion } from 'motion/react';

const motivations = [
  {
    icon: Lightbulb,
    title: 'きっかけ',
    description:
      '2020年ごろにプログラミングと出会い、独学で学び始めました。2021年ごろには GAS で勤務記録の自動集計ツールを初めて作り、それをきっかけにエンジニアとしてのキャリアを考え始め、Web 系言語の学習に本格的に取り組みました。',
  },
  {
    icon: Heart,
    title: '情熱',
    description:
      'コードを書くことで、頭の中のアイデアが形になる瞬間が好きです。特に、ユーザーから「使いやすい」「業務が楽になった」というフィードバックをもらえた時に、エンジニアとしてのやりがいを感じます。',
  },
  {
    icon: Target,
    title: '目指すもの',
    description:
      '技術の力で人々の生活をより良くすること。AI や最新技術を活用しながら、誰もが使いやすいプロダクトを作り続けたいと考えています。',
  },
];

export const Motivation = () => {
  return (
    <section className="py-12 md:py-20">
      <Container className="py-0">
        <SectionTitle
          title="プログラミングを始めたきっかけ"
          subtitle="エンジニアを目指すようになった原点をお話しします。"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {motivations.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
