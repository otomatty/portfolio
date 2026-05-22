import { SectionTitle, Container } from '@/components/common';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getTechStacks } from '@/lib/skills/selectors';
import { ArrowRight, Database, Layout, Server, Cloud, GitBranch, type LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

const categoryIcons: Record<string, LucideIcon> = {
  'フロントエンド': Layout,
  'バックエンド': Server,
  'データベース': Database,
  'クラウド・インフラ': Cloud,
  'CI/CD・ツール': GitBranch,
};

const techStacks = getTechStacks().map((stack) => ({
  ...stack,
  icon: categoryIcons[stack.category] || Layout,
}));

export const TechStack = () => {
  return (
    <section className="py-12 md:py-20">
      <Container className="py-0">
        <SectionTitle
          title="技術スタック"
          subtitle="実務で使用している技術一覧を表示します。"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
          {techStacks.map((stack, stackIndex) => (
            <motion.div
              key={stack.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: stackIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <stack.icon className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold">{stack.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {stack.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-sm"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Button asChild variant="outline" size="lg">
            <a href="/about/skills" className="gap-2 inline-flex items-center">
              スキルの詳細を見る
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};
