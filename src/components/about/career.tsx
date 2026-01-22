'use client';

import { Container, SectionTitle } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Building2, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

const careers = [
  {
    id: 1,
    year: '2025年7月 - 現在',
    title: '株式会社アーシャルデザイン エンジニア',
    description: 'Webアプリケーション開発エンジニアとして参画。',
    icon: Building2,
    children: [],
  },
  {
    id: 2,
    year: '2020年12月 - 現在',
    title: '受託開発・個人開発',
    description:
      'TypeScriptとNext.jsを主軸としたモダンなWeb技術を活用し、業務システムやWebアプリの開発を担当。',
    icon: Building2,
    children: [
      {
        year: '2025年3月',
        title: '印刷会社向けERP開発',
        description:
          'AI駆動開発により要件定義から1週間で35ページ+CMS機能を実装',
        slug: 'erp-system',
      },
      {
        year: '2025年1月',
        title: '香典帳アプリ開発',
        description:
          '葬儀会社2社とギフトショップとの共同開発。満足度調査で93%が「とても使いやすかった」と評価',
        slug: 'condolence-app',
      },
      {
        year: '2024年11月',
        title: '建設会社業務システム開発',
        description:
          '案件進捗・請求管理・勤怠管理システムの構築。Excelからの脱却と業務効率化を実現',
        slug: 'construction-management',
      },
      {
        year: '2024年9月',
        title: '菓子製造会社流通管理システム保守',
        description:
          '20箇所の拠点間流通システムの改善。注文時間を5分から1分に短縮',
        slug: 'confectionery-distribution',
      },
      {
        year: '2023年4月',
        title: '学習塾CMS・勤務記録システム開発',
        description: '勤怠管理の業務時間を月20時間から1時間未満に削減',
        slug: 'school-cms',
      },
    ],
  },
  {
    id: 3,
    year: '2020年11月 - 2024年4月',
    title: '塾講師・プログラミング講師',
    description:
      '延べ300名以上の指導実績。小学生ロボット相撲全国大会で指導チームが1-3位入賞。',
    icon: GraduationCap,
  },
  {
    id: 4,
    year: '2016年8月 - 2020年3月',
    title: '家庭教師',
    description:
      '小学生から高校生まで個別指導。受験生の70%以上が第1志望校合格。',
    icon: GraduationCap,
  },
];

export const Career = () => {
  return (
    <section className="py-12 md:py-20">
      <Container className="py-0">
        <div className="max-w-3xl mx-auto">
          <SectionTitle
            title="経歴"
            subtitle="プロダクトエンジニアとしての経歴を表示します。"
          />
          <div className="space-y-8">
            {careers.map((career, index) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="shrink-0">
                        <career.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="w-full">
                        <div className="text-sm text-muted-foreground mb-1">
                          {career.year}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          {career.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {career.description}
                        </p>
                        {career.children && career.children.length > 0 && (
                          <div className="mt-4 space-y-3 border-l-2 border-primary/20 ml-2">
                            {career.children.map((child, childIndex) => (
                              <div
                                key={`${career.id}-${childIndex}`}
                                className="pl-4"
                              >
                                <div className="text-xs text-muted-foreground">
                                  {child.year}
                                </div>
                                {child.slug ? (
                                  <a
                                    href={`/works/${child.slug}`}
                                    className="text-sm font-semibold mb-1 text-primary hover:text-primary/80 transition-colors block"
                                  >
                                    {child.title}
                                  </a>
                                ) : (
                                  <h4 className="text-sm font-semibold mb-1">
                                    {child.title}
                                  </h4>
                                )}
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {child.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button asChild variant="outline" size="lg">
              <a href="/about/career" className="gap-2 inline-flex items-center">
                経歴の詳細を見る
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
