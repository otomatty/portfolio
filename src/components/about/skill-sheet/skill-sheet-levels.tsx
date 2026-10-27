import { Container, SectionTitle } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'motion/react';
import { proficiencyLevels } from '@/data/skill-sheet';

const levelColors: Record<number, string> = {
  1: 'border border-border text-muted-foreground',
  2: 'border border-foreground/20 text-foreground/80',
  3: 'border border-gold/40 text-gold/80',
  4: 'border border-gold text-gold',
};

/** 習熟度レベルの凡例（各レベルで「できること」を明記） */
export const SkillSheetLevels = () => {
  return (
    <section className="border-b py-20 md:py-28">
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
                      className={`inline-flex items-center justify-center h-9 w-9 rounded-lg font-normal mb-3 ${
                        levelColors[definition.level]
                      }`}
                    >
                      L{definition.level}
                    </div>
                    <h3 className="font-normal mb-2">
                      {definition.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {definition.description}
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
