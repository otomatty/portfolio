'use client';

import { Container, SectionTitle } from '@/components/common';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Cloud, Layout, Server, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

interface Capability {
  icon: typeof Layout;
  title: string;
  description: string;
  tasks: string[];
  technologies: string[];
}

const capabilities: Capability[] = [
  {
    icon: Layout,
    title: 'フロントエンド開発',
    description: 'モダンな UI/UX を実現するための技術スタック',
    tasks: [
      'React/Next.js を使用した SPA・SSR アプリ構築',
      'デザインシステム・コンポーネント設計',
      'パフォーマンス最適化（Core Web Vitals 改善）',
      'TypeScript による型安全な開発',
      'アクセシビリティ対応',
    ],
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
    ],
  },
  {
    icon: Server,
    title: 'バックエンド開発',
    description: 'スケーラブルな API とサービスの構築',
    tasks: [
      'REST API / tRPC による API 設計・実装',
      'データベース設計（PostgreSQL, Supabase）',
      '認証・認可システムの構築',
      'サーバーレスアーキテクチャ設計',
      'Edge Functions の活用',
    ],
    technologies: ['Node.js', 'Hono', 'Python', 'Go', 'PostgreSQL', 'Supabase'],
  },
  {
    icon: Cloud,
    title: 'インフラ・DevOps',
    description: 'スケーラブルなインフラ設計と運用',
    tasks: [
      'CI/CD パイプライン構築（GitHub Actions）',
      'Docker によるコンテナ化',
      'クラウドインフラ設計（AWS, GCP, Cloudflare）',
      '監視・ログ基盤の構築',
      '開発環境の統一・効率化',
    ],
    technologies: ['Docker', 'AWS', 'GCP', 'Cloudflare', 'GitHub Actions'],
  },
  {
    icon: Smartphone,
    title: 'ネイティブアプリ開発',
    description: 'クロスプラットフォームアプリケーション開発',
    tasks: [
      'React Native によるモバイルアプリ開発',
      'Tauri によるデスクトップアプリ開発',
      'Web 技術を活用したハイブリッドアプリ',
    ],
    technologies: ['React Native', 'Tauri', 'Electron'],
  },
];

export const SkillCapabilities = () => {
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
              key={capability.title}
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
                      <h3 className="text-xl font-bold">{capability.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {capability.description}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {capability.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
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
