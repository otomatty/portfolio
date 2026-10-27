import { Container, SectionTitle } from '@/components/common';
import { Cloud, Layout, Server } from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo } from 'react';
import { getSkillSummary } from '@/lib/skills/selectors';

const summaryIcons = {
  frontend: Layout,
  backend: Server,
  infra: Cloud,
};

const summaryColors = {
  frontend: 'border border-foreground/20 text-foreground/80',
  backend: 'border border-gold/40 text-gold/80',
  infra: 'border border-gold/25 text-gold/70',
};

export const SkillSummary = () => {
  const summaryData = useMemo(() => {
    return getSkillSummary().map((item) => ({
      ...item,
      icon: summaryIcons[item.id as keyof typeof summaryIcons] ?? Layout,
      colorClass:
        summaryColors[item.id as keyof typeof summaryColors] ??
        'border border-gold text-gold',
    }));
  }, []);

  return (
    <section className="border-b py-20 md:py-28">
      <Container className="py-0">
        <SectionTitle
          title="スキル概要"
          subtitle="各分野での経験年数と得意領域をご紹介します。"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {summaryData.map((item, index) => (
            <motion.div
              key={item.label}
              className="text-center p-6 rounded-[3px] border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                className={`inline-flex p-3 rounded-lg ${item.colorClass} mb-4`}
              >
                <item.icon className="h-6 w-6" />
              </div>
              <div className="text-2xl md:text-3xl font-light text-gold mb-1">
                {item.experience || '-'}
              </div>
              <div className="font-normal mb-2">{item.label}</div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
