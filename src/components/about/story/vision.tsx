'use client';

import { Container, SectionTitle } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Globe, Rocket, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const visions = [
  {
    icon: Sparkles,
    title: 'AI と共に進化する',
    description:
      'AI 駆動開発のエキスパートとして、テクノロジーの最前線で活躍し続けたい。人間と AI が協調する新しい開発スタイルを追求します。',
  },
  {
    icon: Globe,
    title: 'グローバルに貢献する',
    description:
      'OSS への貢献やテック記事の執筆を通じて、世界中のエンジニアコミュニティに価値を提供したいと考えています。',
  },
  {
    icon: Rocket,
    title: '次世代を育てる',
    description:
      '講師としての経験を活かし、次世代のエンジニアの成長を支援。技術と教育の両面から社会に貢献したいと思っています。',
  },
];

export const Vision = () => {
  return (
    <section className="py-12 md:py-20 bg-secondary/5">
      <Container className="py-0">
        <SectionTitle
          title="将来のビジョン"
          subtitle="これから目指していく方向性についてお話しします。"
        />

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {visions.map((vision, index) => (
            <motion.div
              key={vision.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                    <vision.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">{vision.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {vision.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            一緒にプロジェクトを進めたい方、お気軽にお問い合わせください。
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild size="lg">
              <a href="/services/estimate" className="gap-2 inline-flex items-center">
                お見積もり依頼
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/about/interests" className="gap-2 inline-flex items-center">
                興味関心を見る
              </a>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
