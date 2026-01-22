'use client';

import { Container, SectionTitle } from '@/components/common';
import { Cloud, Database, Layout, Server } from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo } from 'react';
import { skillsData } from '@/data/skills';
import { calculateExperiencePeriod } from '@/lib/dateUtils';

const getCategoryExperience = (categories: string[]) => {
  const categorySkills = skillsData.filter((skill) =>
    categories.includes(skill.category)
  );

  if (categorySkills.length === 0) return null;

  const earliestDate = categorySkills.reduce(
    (earliest, skill) => {
      if (!skill.startDate) return earliest;
      if (!earliest) return skill.startDate;
      return skill.startDate < earliest ? skill.startDate : earliest;
    },
    null as string | null
  );

  if (!earliestDate) return null;

  return calculateExperiencePeriod(earliestDate);
};

const getCategoryProficiency = (categories: string[]) => {
  const categorySkills = skillsData.filter((skill) =>
    categories.includes(skill.category)
  );

  const advancedCount = categorySkills.filter((skill) =>
    skill.proficiency?.includes('Advanced')
  ).length;

  if (advancedCount >= 2) return 'エキスパート';
  if (advancedCount >= 1) return '上級';
  return '中級';
};

const summaryItems = [
  {
    icon: Layout,
    label: 'フロントエンド',
    categories: ['Framework/Library'],
    description: 'React/Next.js を中心とした開発',
  },
  {
    icon: Server,
    label: 'バックエンド',
    categories: ['Language', 'Framework/Library'],
    description: 'Node.js/Python/Go による API 開発',
  },
  {
    icon: Database,
    label: 'データベース',
    categories: ['Database'],
    description: 'PostgreSQL/Supabase 等の設計・運用',
  },
  {
    icon: Cloud,
    label: 'クラウド・インフラ',
    categories: ['Cloud', 'Infra/Tool'],
    description: 'AWS/GCP/Docker でのインフラ構築',
  },
];

export const SkillSummary = () => {
  const summaryData = useMemo(() => {
    return summaryItems.map((item) => ({
      ...item,
      experience: getCategoryExperience(item.categories),
      proficiency: getCategoryProficiency(item.categories),
    }));
  }, []);

  return (
    <section className="py-12 md:py-20">
      <Container className="py-0">
        <SectionTitle
          title="スキル概要"
          subtitle="各分野での経験年数と得意領域をご紹介します。"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {summaryData.map((item, index) => (
            <motion.div
              key={item.label}
              className="text-center p-6 rounded-xl bg-card border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                {item.experience || '-'}
              </div>
              <div className="font-semibold mb-2">{item.label}</div>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
