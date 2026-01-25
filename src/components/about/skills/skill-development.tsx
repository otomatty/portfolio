'use client';

import { Container, SectionTitle } from '@/components/common';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Cloud, Briefcase, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo } from 'react';
import { getSkillDevelopmentGoals } from '@/lib/skills/selectors';

const goalIcons = {
  'rust-development': Code,
  'serverless-fullstack': Cloud,
  'product-management': Briefcase,
};

export const SkillDevelopment = () => {
  const goals = useMemo(() => getSkillDevelopmentGoals(), []);

  return (
    <section className="py-12 md:py-20 bg-secondary/5">
      <Container className="py-0">
        <SectionTitle
          title="スキル開発の方向性"
          subtitle="現在注力している3つの方向性と、それに向けた学習内容をご紹介します。"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {goals.map((goal, index) => {
            const Icon = goalIcons[goal.id as keyof typeof goalIcons] || Code;
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-bold text-sm leading-tight">
                        {goal.title}
                      </h3>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {goal.description}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                          学習中
                        </h4>
                        <ul className="space-y-2">
                          {goal.learningItems.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                          関連スキル
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {goal.relatedSkills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
