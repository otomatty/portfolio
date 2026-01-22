'use client';

import { Container, SectionTitle } from '@/components/common';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Rocket, Target } from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo } from 'react';
import { skillsData } from '@/data/skills';

interface DevelopmentItem {
  name: string;
  relatedSkill?: string;
}

const extractLearningItems = (): DevelopmentItem[] => {
  const items: DevelopmentItem[] = [];
  const seen = new Set<string>();

  for (const skill of skillsData) {
    if (skill.learning) {
      for (const item of skill.learning) {
        if (!seen.has(item)) {
          seen.add(item);
          items.push({ name: item, relatedSkill: skill.name });
        }
      }
    }
  }

  return items.slice(0, 6);
};

const extractInterestItems = (): DevelopmentItem[] => {
  const items: DevelopmentItem[] = [];
  const seen = new Set<string>();

  for (const skill of skillsData) {
    if (skill.interests) {
      for (const item of skill.interests) {
        if (!seen.has(item)) {
          seen.add(item);
          items.push({ name: item, relatedSkill: skill.name });
        }
      }
    }
  }

  return items.slice(0, 6);
};

const developmentCategories = [
  {
    icon: Rocket,
    title: '現在学習中',
    description: '積極的に学習・習得を進めている技術',
    getItems: extractLearningItems,
  },
  {
    icon: Target,
    title: '今後習得予定',
    description: '将来的に習得したい技術・分野',
    getItems: extractInterestItems,
  },
];

export const SkillDevelopment = () => {
  const categories = useMemo(() => {
    return developmentCategories.map((category) => ({
      ...category,
      items: category.getItems(),
    }));
  }, []);

  return (
    <section className="py-12 md:py-20 bg-secondary/5">
      <Container className="py-0">
        <SectionTitle
          title="スキル開発の方向性"
          subtitle="現在学習中の技術と今後の習得予定についてご紹介します。"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <category.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {category.items.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{item.name}</span>
                        {item.relatedSkill && (
                          <Badge variant="outline" className="text-xs">
                            {item.relatedSkill}
                          </Badge>
                        )}
                      </li>
                    ))}
                    {category.items.length === 0 && (
                      <li className="text-sm text-muted-foreground italic">
                        データがありません
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
