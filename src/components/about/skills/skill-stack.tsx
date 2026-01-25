'use client';

import { Container, SectionTitle } from '@/components/common';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Layout,
  Server,
  Cloud,
  Settings,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo } from 'react';
import { getSkillStackByGroup } from '@/lib/skills/selectors';

const groupIcons = {
  frontend: Layout,
  backend: Server,
  infra: Cloud,
  other: Settings,
};

const groupColors = {
  frontend: 'border-l-blue-500',
  backend: 'border-l-green-500',
  infra: 'border-l-orange-500',
  other: 'border-l-purple-500',
};

export const SkillStack = () => {
  const skillGroups = useMemo(() => {
    return getSkillStackByGroup();
  }, []);

  return (
    <section className="py-12 md:py-20">
      <Container className="py-0">
        <SectionTitle
          title="技術スタック詳細"
          subtitle="カテゴリ別に主な対応範囲を整理しています。"
        />

        <div className="space-y-12">
          {skillGroups.map((group, groupIndex) => {
            if (group.categories.length === 0) return null;

            const GroupIcon =
              groupIcons[group.id as keyof typeof groupIcons] ?? Layout;
            const borderColor =
              groupColors[group.id as keyof typeof groupColors] ??
              'border-l-gray-500';

            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                viewport={{ once: true }}
              >
                {/* 大カテゴリヘッダー */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <GroupIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{group.label}</h3>
                    <p className="text-sm text-muted-foreground">
                      {group.description}
                    </p>
                  </div>
                </div>

                {/* サブカテゴリ（カード群） */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.categories.map((category) => (
                    <Card
                      key={category.id}
                      className={`border-l-4 ${borderColor}`}
                    >
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3">{category.label}</h4>
                        <div className="space-y-3">
                          {category.skills.map((skill) => (
                            <div key={skill.id} className="flex flex-col gap-2">
                              <div className="flex items-center gap-2">
                                {skill.icon && (
                                  <img
                                    src={skill.icon}
                                    alt={skill.name}
                                    className="h-5 w-5 object-contain"
                                  />
                                )}
                                <Badge variant="secondary" className="w-fit">
                                  {skill.name}
                                </Badge>
                              </div>
                              {skill.scope.length > 0 && (
                                <div className="flex flex-wrap gap-1 ml-7">
                                  {skill.scope.slice(0, 3).map((scope) => (
                                    <Badge
                                      key={`${skill.id}-${scope}`}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {scope}
                                    </Badge>
                                  ))}
                                  {skill.scope.length > 3 && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs text-muted-foreground"
                                    >
                                      +{skill.scope.length - 3}
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
