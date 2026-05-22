import { SectionTitle, Container } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import { certificationGroups } from '@/data/profile';

const iconMap = {
  award: Award,
  trophy: Trophy,
} as const;

export const Certifications = () => {
  return (
    <section className="py-12 md:py-20 bg-secondary/5">
      <Container className="py-0">
        <div className="text-center mb-12">
          <SectionTitle
            title="資格・受賞歴"
            subtitle="取得資格と受賞実績を表示します。"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
          {certificationGroups.map((cert, certIndex) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: certIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    {(() => {
                      const Icon = iconMap[cert.iconKey];
                      return <Icon className="h-6 w-6 text-primary" />;
                    })()}
                    <h3 className="text-xl font-semibold">{cert.title}</h3>
                  </div>
                  <div className="space-y-6">
                    {cert.items.map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: certIndex * 0.1 + index * 0.1,
                        }}
                        viewport={{ once: true }}
                      >
                        <div className="border-l-2 border-primary/20 pl-4">
                          <div className="text-sm text-muted-foreground mb-1">
                            {item.date}
                          </div>
                          <h4 className="font-semibold mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
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
