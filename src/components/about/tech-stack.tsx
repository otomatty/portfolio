'use client';

import { SectionTitle, Container } from '@/components/common';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Code2, Database, Layout, Server } from 'lucide-react';
import { motion } from 'motion/react';

const techStacks = [
  {
    category: 'フロントエンド',
    icon: Layout,
    technologies: [
      { name: 'React', level: 'エキスパート' },
      { name: 'Next.js', level: 'エキスパート' },
      { name: 'TypeScript', level: 'エキスパート' },
      { name: 'Tailwind CSS', level: 'エキスパート' },
      { name: 'Framer Motion', level: '上級' },
      { name: 'shadcn/ui', level: '上級' },
      { name: 'Jotai', level: '上級' },
    ],
  },
  {
    category: 'バックエンド・言語',
    icon: Server,
    technologies: [
      { name: 'Node.js', level: 'エキスパート' },
      { name: 'Python', level: '上級' },
      { name: 'Go', level: '上級' },
      { name: 'Rust', level: '中級' },
      { name: 'FastAPI', level: '上級' },
      { name: 'Express', level: '上級' },
      { name: 'tRPC', level: '上級' },
    ],
  },
  {
    category: 'ネイティブアプリ',
    icon: Code2,
    technologies: [
      { name: 'React Native', level: '上級' },
      { name: 'Tauri', level: '上級' },
      { name: 'Electron', level: '中級' },
    ],
  },
  {
    category: 'データベース・サーバレス',
    icon: Database,
    technologies: [
      { name: 'PostgreSQL', level: '上級' },
      { name: 'Supabase', level: 'エキスパート' },
      { name: 'Turso', level: '上級' },
      { name: 'Prisma', level: '上級' },
      { name: 'Drizzle', level: '上級' },
      { name: 'Redis', level: '中級' },
    ],
  },
  {
    category: 'クラウド・インフラ',
    icon: Code2,
    technologies: [
      { name: 'AWS', level: '上級' },
      { name: 'GCP', level: '上級' },
      { name: 'Cloudflare', level: '上級' },
      { name: 'Docker', level: '上級' },
      { name: 'Kubernetes', level: '中級' },
      { name: 'CI/CD', level: '上級' },
      { name: 'Git', level: 'エキスパート' },
    ],
  },
];

const getBadgeVariant = (level: string) => {
  switch (level) {
    case 'エキスパート':
      return 'default';
    case '上級':
      return 'secondary';
    default:
      return 'outline';
  }
};

export const TechStack = () => {
  return (
    <section className="py-12 md:py-20">
      <Container className="py-0">
        <SectionTitle
          title="技術スタック"
          subtitle="実務で使用している技術一覧を表示します。"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
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
                        key={tech.name}
                        variant={getBadgeVariant(tech.level)}
                        className="text-sm"
                      >
                        {tech.name}
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
