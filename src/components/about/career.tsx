'use client';

import { Container, SectionTitle } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Building2, Code2, GraduationCap, Rocket } from 'lucide-react';
import { motion } from 'motion/react';
import { careerEntries } from '@/data/profile';

const iconMap = {
  building: Building2,
  code: Code2,
  graduation: GraduationCap,
  rocket: Rocket,
} as const;

const formatCareerTitle = (title: string, company?: string) => {
  if (!company) return title;
  return `${company} ${title}`;
};

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
            {careerEntries.map((career, index) => (
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
                        {(() => {
                          const Icon = iconMap[career.iconKey];
                          return <Icon className="h-6 w-6 text-primary" />;
                        })()}
                      </div>
                      <div className="w-full">
                        <div className="text-sm text-muted-foreground mb-1">
                          {career.period}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          {formatCareerTitle(career.title, career.company)}
                        </h3>
                        <p className="text-muted-foreground">
                          {career.description}
                        </p>
                        {career.projects && career.projects.length > 0 && (
                          <div className="mt-4 space-y-3 border-l-2 border-primary/20 ml-2">
                            {career.projects.map((child, childIndex) => (
                              <div
                                key={`${career.id}-${childIndex}`}
                                className="pl-4"
                              >
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
