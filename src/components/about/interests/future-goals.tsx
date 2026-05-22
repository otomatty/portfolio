import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'motion/react';

type FutureGoal = {
  period: string;
  title: string;
  description: string;
};

const futureGoals: FutureGoal[] = [
  {
    period: '短期目標',
    title: 'AI 駆動開発のエキスパート',
    description:
      'Cursor や Devin などの AI ツールを活用した効率的な開発手法を確立し、チームに展開していきます。',
  },
  {
    period: '中期目標',
    title: 'テックリード・技術顧問',
    description:
      '技術選定や設計レビューをリードし、チーム全体の技術力向上に貢献できる立場を目指します。',
  },
  {
    period: '長期目標',
    title: 'OSS への貢献・起業',
    description:
      'オープンソースプロジェクトへの積極的な貢献と、将来的には自身の技術を活かした事業立ち上げを視野に入れています。',
  },
];

const FutureGoals = () => {
  return (
    <div>
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="h-1 w-8 bg-primary rounded-full" />
        <h3 className="text-2xl font-bold">これからの目標</h3>
      </motion.div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

        <div className="space-y-6">
          {futureGoals.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative md:pl-12"
            >
              <div className="absolute left-2.5 top-6 h-3 w-3 rounded-full bg-primary hidden md:block" />

              <Card className="group hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                    {item.period}
                  </span>
                  <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FutureGoals;
