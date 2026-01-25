'use client';

import { Container, SectionTitle } from '@/components/common';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo } from 'react';
import { getSkillStackGroups } from '@/lib/skills/selectors';

export const SkillStack = () => {
  const skillGroups = useMemo(() => {
    return getSkillStackGroups();
  }, []);

  return (
    <section className="py-12 md:py-20">
      <Container className="py-0">
        <SectionTitle
          title="技術スタック詳細"
          subtitle="カテゴリ別に主な対応範囲を整理しています。"
        />

        <div className="space-y-8">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Layers className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{group.label}</h3>
                      <p className="text-sm text-muted-foreground">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {group.skills.map((skill) => (
                      <div key={skill.id} className="flex flex-col gap-2">
                        <Badge variant="secondary" className="w-fit">
                          {skill.name}
                        </Badge>
                        {skill.scope.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {skill.scope.map((scope) => (
                              <Badge
                                key={`${skill.id}-${scope}`}
                                variant="outline"
                                className="text-xs"
                              >
                                {scope}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">
                            対応範囲の情報がありません
                          </p>
                        )}
                      </div>
                    ))}
                    {group.skills.length === 0 && (
                      <p className="text-sm text-muted-foreground italic">
                        該当するスキルがありません
                      </p>
                    )}
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
