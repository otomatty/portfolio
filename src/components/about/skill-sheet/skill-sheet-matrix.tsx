import { Container, SectionTitle } from '@/components/common';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'motion/react';
import { useMemo } from 'react';
import { getSkillProficiencyGroups, pickText } from '@/lib/skills/skill-sheet';

interface SkillSheetMatrixProps {
  locale?: string;
}

const levelBorders: Record<number, string> = {
  1: 'border-l-muted-foreground/40',
  2: 'border-l-blue-500',
  3: 'border-l-green-500',
  4: 'border-l-primary',
};

const levelBadge: Record<number, string> = {
  1: 'bg-muted text-muted-foreground',
  2: 'bg-blue-500/10 text-blue-600',
  3: 'bg-green-500/10 text-green-600',
  4: 'bg-primary/10 text-primary',
};

/** 技術 × 習熟度 × 経験年数のマトリクス（習熟度レベル降順） */
export const SkillSheetMatrix = ({ locale }: SkillSheetMatrixProps) => {
  const groups = useMemo(() => getSkillProficiencyGroups(), []);

  return (
    <section className="py-12 md:py-20">
      <Container className="py-0">
        <SectionTitle
          title="スキルサマリ"
          subtitle="技術ごとの習熟度と経験年数を一覧にまとめています。"
        />

        <div className="space-y-8">
          {groups.map((group, groupIndex) => (
            <motion.div
              key={group.level}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`inline-flex items-center justify-center h-8 w-8 rounded-lg font-bold text-sm ${
                    levelBadge[group.level]
                  }`}
                >
                  L{group.level}
                </span>
                <div>
                  <h3 className="font-bold">{pickText(group.label, locale)}</h3>
                  <p className="text-xs text-muted-foreground">
                    {pickText(group.description, locale)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.skills.map((skill) => (
                  <Card
                    key={skill.skillId}
                    className={`border-l-4 ${levelBorders[group.level]}`}
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      {skill.icon && (
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="h-6 w-6 object-contain shrink-0"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate">{skill.name}</div>
                        {skill.experience && (
                          <div className="text-xs text-muted-foreground">
                            経験 {skill.experience}
                          </div>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs shrink-0">
                        L{skill.level}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
