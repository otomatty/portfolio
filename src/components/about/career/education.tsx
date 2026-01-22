'use client';

import { Container, SectionTitle } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'motion/react';

const certifications = [
  {
    year: '2022年10月',
    name: '基本情報技術者試験',
    description: 'IT エンジニアの登竜門資格',
  },
  {
    year: '2021年4月',
    name: '実用英語技能検定 準1級',
    description: '英語コミュニケーション能力の証明',
  },
  {
    year: '2021年8月',
    name: '実用数学技能検定 準1級',
    description: '数学的思考力の証明',
  },
  {
    year: '2019年',
    name: 'TOEIC 780点',
    description: 'ビジネス英語コミュニケーション能力',
  },
];

export const Education = () => {
  return (
    <section className="py-12 md:py-20">
      <Container className="py-0">
        <div className="grid grid-cols-1 gap-8">
          <div>
            <SectionTitle
              title="資格・認定"
              subtitle="取得した資格をご紹介します。"
            />

            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-muted-foreground">
                            {cert.year}
                          </div>
                          <h4 className="font-semibold">{cert.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {cert.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
