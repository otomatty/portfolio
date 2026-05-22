import { Container, SectionTitle } from '@/components/common';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Cloud, Layout, Server } from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo } from 'react';
import { getSkillCapabilities } from '@/lib/skills/selectors';

const capabilityIcons = {
  frontend: Layout,
  backend: Server,
  infra: Cloud,
};

export const SkillCapabilities = () => {
  const capabilities = useMemo(() => {
    return getSkillCapabilities().map((capability) => ({
      ...capability,
      icon:
        capabilityIcons[capability.id as keyof typeof capabilityIcons] ??
        Layout,
    }));
  }, []);

  return (
    <section className="py-12 md:py-20 bg-secondary/5">
      <Container className="py-0">
        <SectionTitle
          title="対応可能な業務・役割"
          subtitle="このような仕事をお任せください。"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <capability.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">
                        {capability.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {capability.description}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {capability.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm">{task}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground mb-2">
                      主要技術
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {capability.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
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
