import { Card, CardContent } from '@/components/ui/card';
import { type LucideIcon, Rocket, Sparkles, Zap } from 'lucide-react';
import { motion } from 'motion/react';

type TechnicalChallenge = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const technicalChallenges: TechnicalChallenge[] = [
  {
    title: 'Rust × WebAssembly',
    description:
      'Rust と WebAssembly を活用して、Web アプリケーションのパフォーマンスを大幅に向上させるソリューションに挑戦しています。',
    icon: Zap,
  },
  {
    title: 'AI 駆動開発の実践',
    description:
      'Cursor や Devin などの AI ツールを活用し、開発効率を最大化する新しいワークフローの確立を目指しています。',
    icon: Sparkles,
  },
  {
    title: 'エッジコンピューティング',
    description:
      'Turso や Cloudflare Workers を活用した、低レイテンシで高可用性なアプリケーションアーキテクチャの構築に取り組んでいます。',
    icon: Rocket,
  },
];

const TechnicalChallenges = () => {
  return (
    <div>
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="h-px w-8 bg-gold" />
        <h3 className="text-2xl font-light">技術的な挑戦</h3>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {technicalChallenges.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group hover:border-gold/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full border border-gold/30 group-hover:border-gold/70 transition-colors">
                      <Icon className="h-5 w-5 text-gold" />
                    </div>
                    <h4 className="font-normal text-lg">{item.title}</h4>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TechnicalChallenges;
