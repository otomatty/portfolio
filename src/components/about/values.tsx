import { SectionTitle, Container } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Building2,
  Heart,
  Lightbulb,
  Package,
  Target,
  Users2,
} from 'lucide-react';
import { motion } from 'motion/react';

const values = [
  {
    icon: Package,
    title: 'OSSカスタマイズ',
    description:
      'オープンソースをベースにカスタマイズすることで、高品質で安定したアプリケーションを効率的に構築します。',
  },
  {
    icon: Building2,
    title: '企業DX推進',
    description:
      '業務プロセスのデジタル化から社内人材育成・チーム運営まで、組織全体のDX推進をサポートします。',
  },
  {
    icon: Heart,
    title: '品質へのこだわり',
    description:
      'クリーンなコードと高いパフォーマンスを追求し、ユーザー体験の向上に貢献します。',
  },
  {
    icon: Lightbulb,
    title: '技術革新',
    description:
      '常に新しい技術やベストプラクティスを学び、プロジェクトに最適なソリューションを提供します。',
  },
  {
    icon: Users2,
    title: 'チームワーク',
    description:
      'オープンなコミュニケーションと知識共有を大切にし、チーム全体の成長を促進します。',
  },
  {
    icon: Target,
    title: '目標達成',
    description:
      'ビジネス目標を理解し、技術で課題を解決することで、プロジェクトの成功に貢献します。',
  },
];

export const Values = () => {
  return (
    <section className="py-12 md:py-20 bg-secondary/5">
      <Container className="py-0">
        <SectionTitle
          title="価値観"
          subtitle="エンジニアとしての信念と大切にしている価値観を表示します。"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group relative h-full overflow-hidden border-border/60 bg-card/80 transition-all duration-300 hover:border-primary/40 hover:shadow-xl">
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-linear-to-br from-primary/15 via-transparent to-transparent" />
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/20 blur-2xl" />
                </div>
                <CardHeader className="relative z-10 pb-2">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 transition duration-300 group-hover:scale-105 group-hover:bg-primary/20">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 pt-0">
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
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
