import { Container, SectionTitle } from '@/components/common';
import { Award, Briefcase, Code2, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { getCareerHighlights } from '@/data/profile';

const iconMap = {
  briefcase: Briefcase,
  code: Code2,
  users: Users,
  award: Award,
} as const;

export const CareerHighlights = () => {
  return (
    <section className="border-b py-20 md:py-28">
      <Container className="py-0">
        <SectionTitle
          title="キャリアハイライト"
          subtitle="これまでの主な実績をご紹介します。"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {getCareerHighlights().map((item, index) => (
            <motion.div
              key={item.label}
              className="text-center p-6 rounded-[3px] border"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex p-3 rounded-full border border-gold/30 mb-4">
                {(() => {
                  const Icon = iconMap[item.iconKey];
                  return <Icon className="h-6 w-6 text-gold" />;
                })()}
              </div>
              <div className="text-2xl md:text-3xl font-light text-gold mb-1">
                {item.value}
              </div>
              <div className="font-normal mb-2">{item.label}</div>
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
