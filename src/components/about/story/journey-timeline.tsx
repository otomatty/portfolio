'use client';

import { Container, SectionTitle } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import {
  BookOpen,
  Code2,
  GraduationCap,
  Rocket,
  Sparkles,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';

interface JourneyEntry {
  year: string;
  title: string;
  description: string;
  icon: typeof Code2;
  highlight?: boolean;
}

const journeyEntries: JourneyEntry[] = [
  {
    year: '2016',
    title: '教育への第一歩',
    description:
      '大学入学と同時に家庭教師を始める。生徒に教えることの楽しさを知り、「伝える力」を磨く日々が始まりました。',
    icon: GraduationCap,
  },
  {
    year: '2018',
    title: 'プログラミングとの出会い',
    description:
      '教材管理や学習進捗の可視化に課題を感じ、独学でプログラミングを開始。Python と HTML/CSS から学び始めました。',
    icon: Code2,
    highlight: true,
  },
  {
    year: '2019',
    title: '最初の自作ツール',
    description:
      '学習塾の業務を効率化する簡単なツールを作成。Excel VBA や Google Apps Script を活用した自動化に成功しました。',
    icon: Sparkles,
  },
  {
    year: '2020',
    title: 'Web 開発への本格参入',
    description:
      'React と TypeScript を学び始め、本格的な Web アプリケーション開発の世界へ。フリーランスとしての活動も開始しました。',
    icon: Rocket,
    highlight: true,
  },
  {
    year: '2021-2022',
    title: '実践と成長の日々',
    description:
      '複数の業務システム開発を経験。建設会社、製造会社など様々な業界のクライアントと協働し、実践的なスキルを磨きました。',
    icon: Users,
  },
  {
    year: '2023',
    title: 'AI 駆動開発への転換',
    description:
      'GitHub Copilot の登場を機に AI ツールを積極的に活用。開発効率が飛躍的に向上し、より複雑なプロジェクトに挑戦できるようになりました。',
    icon: Sparkles,
    highlight: true,
  },
  {
    year: '2024',
    title: 'Cursor との出会い',
    description:
      'Cursor を中心とした AI 駆動開発を確立。1 週間で 35 ページの ERP システムを構築するなど、開発速度が劇的に向上しました。',
    icon: Rocket,
    highlight: true,
  },
  {
    year: '2025',
    title: '新たなステージへ',
    description:
      '株式会社アーシャルデザインにエンジニアとして参画。チーム開発の経験を積みながら、さらなる成長を目指しています。',
    icon: BookOpen,
    highlight: true,
  },
];

export const JourneyTimeline = () => {
  return (
    <section className="py-12 md:py-20 bg-secondary/5">
      <Container className="py-0">
        <SectionTitle
          title="成長の軌跡"
          subtitle="エンジニアとしての道のりを振り返ります。"
        />

        <div className="relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20" />

          <div className="space-y-6">
            {journeyEntries.map((entry, index) => (
              <motion.div
                key={entry.year}
                className="relative pl-12 md:pl-20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className={`absolute left-2 md:left-6 w-5 h-5 rounded-full border-4 ${
                    entry.highlight
                      ? 'bg-primary border-primary/30'
                      : 'bg-background border-primary/50'
                  } z-10`}
                />

                <Card
                  className={
                    entry.highlight ? 'border-primary/30 shadow-lg' : ''
                  }
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-2 rounded-lg shrink-0 ${
                          entry.highlight ? 'bg-primary/20' : 'bg-primary/10'
                        }`}
                      >
                        <entry.icon
                          className={`h-5 w-5 ${
                            entry.highlight ? 'text-primary' : 'text-primary/70'
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={`text-sm font-bold ${
                              entry.highlight
                                ? 'text-primary'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {entry.year}
                          </span>
                          <h3 className="font-bold">{entry.title}</h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {entry.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
