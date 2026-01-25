'use client';

import { Container, SectionTitle } from '@/components/common';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Code2, GraduationCap, Rocket } from 'lucide-react';
import { motion } from 'motion/react';
import { careerEntries, type CareerEntry } from '@/data/profile';

const iconMap: Record<CareerEntry['iconKey'], typeof Building2> = {
  building: Building2,
  code: Code2,
  graduation: GraduationCap,
  rocket: Rocket,
};

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
                          {(() => {
                            const Icon = iconMap[entry.iconKey];
                            return <Icon className="h-5 w-5 text-primary" />;
                          })()}
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
