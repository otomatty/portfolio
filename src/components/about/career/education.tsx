import { Container, SectionTitle } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'motion/react';
import { certificationGroups } from '@/data/profile';

const certificationItems =
  certificationGroups.find((group) => group.id === 'certifications')?.items ?? [];

export const Education = () => {
  return (
    <section className="py-12 md:py-20">
      <Container className="py-0">
        <div className="grid grid-cols-1 gap-8">
          <div>
            <SectionTitle
              title="資格・認定"
              subtitle="取得した資格をご紹介します。"
            />

            <div className="space-y-3">
              {certificationItems.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-muted-foreground">
                            {cert.date}
                          </div>
                          <h4 className="font-semibold">{cert.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {cert.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
