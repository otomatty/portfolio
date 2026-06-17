import { Container, SectionTitle } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'motion/react';
import { proficiencyLevels } from '@/data/skill-sheet';
import { pickText } from '@/lib/skills/skill-sheet';

interface SkillSheetLevelsProps {
  locale?: string;
}

const levelColors: Record<number, string> = {
  1: 'bg-muted text-muted-foreground',
  2: 'bg-blue-500/10 text-blue-600',
  3: 'bg-green-500/10 text-green-600',
  4: 'bg-primary/10 text-primary',
};

/** 習熟度レベルの凡例（各レベルで「できること」を明記） */
export const SkillSheetLevels = ({ locale }: SkillSheetLevelsProps) => {
  return (
    <section className="py-12 md:py-20 bg-secondary/5">
      <Container className="py-0">
        <SectionTitle
          title="習熟度レベルの定義"
          subtitle="各技術の習熟度を、実務経験ベースの 4 段階で評価しています。"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {proficiencyLevels
            .slice()
            .sort((a, b) => b.level - a.level)
            .map((definition, index) => (
              <motion.div
                key={definition.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-5">
                    <div
                      className={`inline-flex items-center justify-center h-9 w-9 rounded-lg font-bold mb-3 ${
                        levelColors[definition.level]
                      }`}
                    >
                      L{definition.level}
                    </div>
                    <h3 className="font-semibold mb-2">
                      {pickText(definition.label, locale)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {pickText(definition.description, locale)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>
      </Container>
    </section>
  );
};
