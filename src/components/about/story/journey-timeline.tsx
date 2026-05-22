import { Container, SectionTitle } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { TimelineRoot, TimelineItem, TimelineDot } from '@/components/ui/timeline';
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
    year: '2020',
    title: 'プログラミングとの出会い',
    description:
      '独学でプログラミングを学び始めました。効率化や自動化への関心が、その後のエンジニアとしての道のりにつながっていきます。',
    icon: Code2,
    highlight: true,
  },
  {
    year: '2021',
    title: '初めての自作ツール',
    description:
      'Google Apps Script（GAS）を使い、Google スプレッドシートの勤務記録を自動集計するツールを初めて作成しました。',
    icon: Sparkles,
  },
  {
    year: '2021',
    title: 'エンジニアとしてのキャリアを志す',
    description:
      '塾講師ではなくエンジニアとしてのキャリアを考え始め、改めて Web 系言語の学習に取り組みました。',
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
    title: 'AI 駆動開発との出会い（Cursor）',
    description:
      'Cursor がリリースされた日から使い始め、AI 駆動開発の世界に足を踏み入れました。その後 GitHub Copilot なども活用するようになりました。',
    icon: Sparkles,
    highlight: true,
  },
  {
    year: '2024',
    title: 'AI 駆動開発の確立',
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

        <TimelineRoot variant="left">
          <div className="space-y-6">
            {journeyEntries.map((entry, index) => (
              <motion.div
                key={`${entry.year}-${entry.title}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TimelineItem>
                  <TimelineDot highlight={entry.highlight} />

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
                </TimelineItem>
              </motion.div>
            ))}
          </div>
        </TimelineRoot>
      </Container>
    </section>
  );
};
