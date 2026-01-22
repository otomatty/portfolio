'use client';

import { Container, SectionTitle } from '@/components/common';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Crown, Star, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo } from 'react';
import { skillsData } from '@/data/skills';
import type { Skill } from '@/types/skill';

type ProficiencyLevel = 'expert' | 'advanced' | 'intermediate';

const categorizeByProficiency = (
  skills: Skill[]
): Record<ProficiencyLevel, Skill[]> => {
  const result: Record<ProficiencyLevel, Skill[]> = {
    expert: [],
    advanced: [],
    intermediate: [],
  };

  for (const skill of skills) {
    const proficiency = skill.proficiency?.toLowerCase() || '';

    if (
      proficiency.includes('advanced') ||
      proficiency.includes('エキスパート')
    ) {
      result.expert.push(skill);
    } else if (
      proficiency.includes('intermediate') ||
      proficiency.includes('上級')
    ) {
      result.advanced.push(skill);
    } else {
      result.intermediate.push(skill);
    }
  }

  return result;
};

const levelConfig: Record<
  ProficiencyLevel,
  {
    label: string;
    description: string;
    icon: typeof Crown;
    badgeVariant: 'default' | 'secondary' | 'outline';
  }
> = {
  expert: {
    label: 'エキスパート',
    description:
      '業務の中心技術として日常的に使用。深い知識を持ち、チームをリードできる。',
    icon: Crown,
    badgeVariant: 'default',
  },
  advanced: {
    label: '上級',
    description:
      '実務で問題なく使用可能。複雑な実装やトラブルシューティングに対応できる。',
    icon: Star,
    badgeVariant: 'secondary',
  },
  intermediate: {
    label: '中級',
    description: '基本的な実装が可能。学習を継続しながら実務に活用。',
    icon: TrendingUp,
    badgeVariant: 'outline',
  },
};

export const SkillStack = () => {
  const skillGroups = useMemo(() => {
    const categorized = categorizeByProficiency(skillsData);

    return (Object.keys(levelConfig) as ProficiencyLevel[]).map((level) => ({
      level,
      ...levelConfig[level],
      skills: categorized[level],
    }));
  }, []);

  return (
    <section className="py-12 md:py-20">
      <Container className="py-0">
        <SectionTitle
          title="技術スタック詳細"
          subtitle="習熟度別に整理した技術一覧です。"
        />

        <div className="space-y-8">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.level}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <group.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{group.label}</h3>
                      <p className="text-sm text-muted-foreground">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <Badge
                        key={skill.id}
                        variant={group.badgeVariant}
                        className="text-sm py-1 px-3"
                      >
                        {skill.name}
                      </Badge>
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
