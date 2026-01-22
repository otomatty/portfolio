'use client';

import { SectionTitle, Container } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

const certifications = [
  {
    category: '資格',
    icon: Award,
    items: [
      {
        title: '基本情報技術者試験',
        date: '2022年10月',
        description: 'ITエンジニアの登竜門資格',
      },
      {
        title: '実用英語技能検定 準1級',
        date: '2021年4月',
        description: '英語コミュニケーション能力の証明',
      },
      {
        title: '実用数学技能検定 準1級',
        date: '2021年8月',
        description: '数学的思考力の証明',
      },
      {
        title: 'TOEIC 780点',
        date: '2019年',
        description: 'ビジネス英語コミュニケーション能力',
      },
      {
        title: 'タイピング技能検定イータイピング・マスター1級',
        date: '取得年不明',
        description: '高速・正確なタイピング技能',
      },
      {
        title: '普通自動車第一種免許',
        date: '取得年不明',
        description: '自動車運転免許',
      },
    ],
  },
  {
    category: '受賞歴・指導実績',
    icon: Trophy,
    items: [
      {
        title: '小学生proroロボット相撲全国大会 指導実績',
        date: '2024年',
        description: '指導した4チーム中3チームが1〜3位入賞',
      },
      {
        title: '地元企業向けDX推進支援事業 ファシリテーター',
        date: '2024年9月 - 2025年2月',
        description: '企業内業務時間最大70%短縮、受講満足度4.8/5',
      },
      {
        title: '塾講師としての指導実績',
        date: '2020年11月 - 2024年4月',
        description: '延べ100名以上を担当し、志望校合格率80%以上を達成',
      },
    ],
  },
];

export const Certifications = () => {
  return (
    <section className="py-12 md:py-20 bg-secondary/5">
      <Container className="py-0">
        <div className="text-center mb-12">
          <SectionTitle
            title="資格・受賞歴"
            subtitle="取得資格と受賞実績を表示します。"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
          {certifications.map((cert, certIndex) => (
            <motion.div
              key={cert.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: certIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <cert.icon className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold">{cert.category}</h3>
                  </div>
                  <div className="space-y-6">
                    {cert.items.map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: certIndex * 0.1 + index * 0.1,
                        }}
                        viewport={{ once: true }}
                      >
                        <div className="border-l-2 border-primary/20 pl-4">
                          <div className="text-sm text-muted-foreground mb-1">
                            {item.date}
                          </div>
                          <h4 className="font-semibold mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
