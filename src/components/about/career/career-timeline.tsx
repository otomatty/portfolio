'use client';

import { Container, SectionTitle } from '@/components/common';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Code2, GraduationCap, Rocket } from 'lucide-react';
import { motion } from 'motion/react';

interface CareerProject {
  title: string;
  description: string;
  slug?: string;
  technologies?: string[];
}

interface CareerEntry {
  id: number;
  period: string;
  title: string;
  company?: string;
  description: string;
  icon: typeof Building2;
  type: 'work' | 'freelance' | 'education';
  projects?: CareerProject[];
  achievements?: string[];
}

const careerEntries: CareerEntry[] = [
  {
    id: 1,
    period: '2025年7月 - 現在',
    title: 'Web アプリケーション開発エンジニア',
    company: '株式会社アーシャルデザイン',
    description:
      'Web アプリケーション開発エンジニアとして参画。モダンな技術スタックを活用した開発に従事。',
    icon: Building2,
    type: 'work',
    achievements: [
      'フロントエンド・バックエンド両面での開発',
      'AI 駆動開発手法の導入推進',
    ],
  },
  {
    id: 2,
    period: '2020年12月 - 現在',
    title: '受託開発・個人開発',
    company: 'フリーランス',
    description:
      'TypeScript と Next.js を主軸としたモダンな Web 技術を活用し、業務システムや Web アプリの開発を担当。',
    icon: Code2,
    type: 'freelance',
    projects: [
      {
        title: '印刷会社向け ERP 開発',
        description:
          'AI 駆動開発により要件定義から 1 週間で 35 ページ + CMS 機能を実装',
        slug: 'erp-system',
        technologies: ['Next.js', 'TypeScript', 'Supabase'],
      },
      {
        title: '香典帳アプリ開発',
        description:
          '葬儀会社 2 社とギフトショップとの共同開発。満足度調査で 93% が「とても使いやすかった」と評価',
        slug: 'condolence-app',
        technologies: ['React Native', 'Supabase'],
      },
      {
        title: '建設会社業務システム開発',
        description:
          '案件進捗・請求管理・勤怠管理システムの構築。Excel からの脱却と業務効率化を実現',
        slug: 'construction-management',
        technologies: ['Next.js', 'PostgreSQL'],
      },
      {
        title: '菓子製造会社流通管理システム保守',
        description:
          '20 箇所の拠点間流通システムの改善。注文時間を 5 分から 1 分に短縮',
        slug: 'confectionery-distribution',
        technologies: ['PHP', 'MySQL'],
      },
      {
        title: '学習塾 CMS・勤務記録システム開発',
        description: '勤怠管理の業務時間を月 20 時間から 1 時間未満に削減',
        slug: 'school-cms',
        technologies: ['Next.js', 'Supabase'],
      },
    ],
    achievements: [
      '多様な業界の業務システム開発経験',
      'クライアントの業務効率を大幅に改善',
      'AI 駆動開発による高速デリバリー',
    ],
  },
  {
    id: 3,
    period: '2024年9月 - 2025年2月',
    title: 'DX 推進支援事業 ファシリテーター',
    company: '地元企業向け',
    description:
      '地元企業向けの DX 推進支援事業にファシリテーターとして参画。企業の業務改善を支援。',
    icon: Rocket,
    type: 'work',
    achievements: [
      '企業内業務時間最大 70% 短縮',
      '受講満足度 4.8/5',
      '複数企業への DX 導入支援',
    ],
  },
  {
    id: 4,
    period: '2020年11月 - 2024年4月',
    title: '塾講師・プログラミング講師',
    company: '学習塾',
    description:
      '延べ 300 名以上の指導実績。小学生から高校生まで幅広い年齢層を対象に指導。',
    icon: GraduationCap,
    type: 'education',
    achievements: [
      '小学生ロボット相撲全国大会で指導チームが 1-3 位入賞',
      '延べ 100 名以上の受験生を指導',
      '志望校合格率 80% 以上',
    ],
  },
  {
    id: 5,
    period: '2016年8月 - 2020年3月',
    title: '家庭教師',
    company: '個人',
    description:
      '小学生から高校生まで個別指導。生徒一人ひとりに合わせた指導を実施。',
    icon: GraduationCap,
    type: 'education',
    achievements: [
      '受験生の 70% 以上が第 1 志望校合格',
      '学習習慣の定着を重視した指導',
    ],
  },
];

const getTypeColor = (type: CareerEntry['type']) => {
  switch (type) {
    case 'work':
      return 'bg-blue-500';
    case 'freelance':
      return 'bg-green-500';
    case 'education':
      return 'bg-purple-500';
    default:
      return 'bg-primary';
  }
};

export const CareerTimeline = () => {
  return (
    <section className="py-12 md:py-20 bg-secondary/5">
      <Container className="py-0">
        <SectionTitle
          title="職歴・経歴"
          subtitle="これまでのキャリアを時系列でご紹介します。"
        />

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

          <div className="space-y-8">
            {careerEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className={`absolute left-4 md:left-1/2 w-3 h-3 rounded-full ${getTypeColor(
                    entry.type
                  )} -translate-x-1/2 mt-6 z-10`}
                />

                <div className="md:w-1/2 pl-10 md:pl-0">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                          <entry.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground mb-1">
                            {entry.period}
                          </div>
                          <h3 className="text-lg font-bold mb-1">
                            {entry.title}
                          </h3>
                          {entry.company && (
                            <p className="text-sm text-primary mb-2">
                              {entry.company}
                            </p>
                          )}
                          <p className="text-muted-foreground mb-4">
                            {entry.description}
                          </p>

                          {entry.achievements && (
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold mb-2">
                                主な実績
                              </h4>
                              <ul className="space-y-1">
                                {entry.achievements.map((achievement) => (
                                  <li
                                    key={achievement}
                                    className="text-sm text-muted-foreground flex items-start gap-2"
                                  >
                                    <span className="text-primary mt-1">•</span>
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {entry.projects && (
                            <div>
                              <h4 className="text-sm font-semibold mb-3">
                                プロジェクト
                              </h4>
                              <div className="space-y-3">
                                {entry.projects.map((project) => (
                                  <div
                                    key={project.title}
                                    className="p-3 rounded-lg bg-secondary/50"
                                  >
                                    {project.slug ? (
                                      <a
                                        href={`/works/${project.slug}`}
                                        className="font-medium text-primary hover:underline"
                                      >
                                        {project.title}
                                      </a>
                                    ) : (
                                      <span className="font-medium">
                                        {project.title}
                                      </span>
                                    )}
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {project.description}
                                    </p>
                                    {project.technologies && (
                                      <div className="flex flex-wrap gap-1 mt-2">
                                        {project.technologies.map((tech) => (
                                          <Badge
                                            key={tech}
                                            variant="outline"
                                            className="text-xs"
                                          >
                                            {tech}
                                          </Badge>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
