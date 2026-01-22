'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ResponsiveDialog } from '@/components/ui/responsive-dialog';
import {
  Bot,
  Cloud,
  Cog,
  GitBranch,
  Monitor,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'motion/react';

type TechnicalInterest = {
  name: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
  details: {
    overview: string;
    experience: string;
    projects: string[];
    learningGoals: string[];
  };
};

const technicalInterests: TechnicalInterest[] = [
  {
    name: 'Web フロントエンド',
    icon: Monitor,
    description:
      'React エコシステム全般と、Rust を活用したフロントエンド技術に強い関心があります。',
    tags: ['React', 'Next.js', 'TypeScript', 'Tauri', 'WebAssembly'],
    details: {
      overview:
        'モダンなWebフロントエンド開発において、Reactを中心としたエコシステムを深く理解し、パフォーマンスと開発体験の両立を目指しています。',
      experience:
        'Next.js App Router、React Server Components、TypeScriptを用いた型安全な開発、Tauriによるデスクトップアプリ開発の経験があります。',
      projects: [
        'Next.js 15 を使用したポートフォリオサイト',
        'Tauri + React によるデスクトップアプリ',
        'WebAssembly を活用した高速画像処理ツール',
      ],
      learningGoals: [
        'React 19 の新機能の習得',
        'Rust + WebAssembly によるパフォーマンス最適化',
        'フロントエンドのテスト戦略の改善',
      ],
    },
  },
  {
    name: 'Web バックエンド',
    icon: Cog,
    description:
      'Rust による高パフォーマンスなバックエンド開発に興味を持っています。',
    tags: ['Rust', 'Axum', 'Actix-web', 'Node.js', 'GraphQL'],
    details: {
      overview:
        '高パフォーマンスで信頼性の高いバックエンドシステムの構築に情熱を持っています。特にRustの型システムを活用した堅牢なAPI開発に興味があります。',
      experience:
        'Node.js/Express での REST API 開発、GraphQL サーバーの構築、Rust/Axum での高速 API 開発の経験があります。',
      projects: [
        'Axum を使用したマイクロサービス API',
        'GraphQL スキーマ設計と実装',
        'リアルタイム通信を含むバックエンドシステム',
      ],
      learningGoals: [
        'Rust によるシステムプログラミング',
        'gRPC と Protocol Buffers の習得',
        'データベース最適化とクエリパフォーマンス',
      ],
    },
  },
  {
    name: 'クラウド・データベース',
    icon: Cloud,
    description:
      'スケーラブルなクラウドインフラと、エッジで動作するデータベースに注目しています。',
    tags: ['AWS', 'Turso', 'LibSQL', 'Edge Computing'],
    details: {
      overview:
        'クラウドネイティブなアーキテクチャとエッジコンピューティングを組み合わせた、低レイテンシで高可用性なシステム設計に興味があります。',
      experience:
        'AWS (Lambda, S3, RDS, CloudFront) の構築運用、Supabase によるバックエンド開発、エッジデータベースの検証経験があります。',
      projects: [
        'サーバーレスアーキテクチャによる API 構築',
        'Turso を使用したエッジデータベース検証',
        'CDN と Edge Functions の最適化',
      ],
      learningGoals: [
        'Kubernetes とコンテナオーケストレーション',
        'マルチリージョンデプロイメント',
        'コスト最適化とパフォーマンス監視',
      ],
    },
  },
  {
    name: 'DevOps・CI/CD',
    icon: GitBranch,
    description: '効率的な開発ワークフローの構築と自動化に取り組んでいます。',
    tags: ['GitHub Actions', 'Docker', 'Terraform', 'IaC'],
    details: {
      overview:
        '開発から本番環境へのデリバリーを自動化し、チームの生産性と品質を向上させるDevOps文化の構築に取り組んでいます。',
      experience:
        'GitHub Actions によるCI/CDパイプライン構築、Docker によるコンテナ化、Terraform による Infrastructure as Code の実践経験があります。',
      projects: [
        'モノレポでの CI/CD パイプライン最適化',
        'Docker Compose による開発環境統一',
        'Terraform によるクラウドリソース管理',
      ],
      learningGoals: [
        'GitOps ワークフローの導入',
        '監視とオブザーバビリティの改善',
        'セキュリティ自動化（DevSecOps）',
      ],
    },
  },
  {
    name: 'AI ツール・開発支援',
    icon: Bot,
    description:
      'AI を活用した開発効率化ツールの活用と、新しい開発手法の確立に興味があります。',
    tags: ['Cursor', 'Devin', 'GitHub Copilot', 'AI-Driven Development'],
    details: {
      overview:
        'AI アシスタントを活用した新しい開発スタイルを模索し、人間とAIが協調して高品質なソフトウェアを効率的に開発する手法を研究しています。',
      experience:
        'Cursor、GitHub Copilot を日常的に使用した開発、AI ペアプログラミング、プロンプトエンジニアリングの実践経験があります。',
      projects: [
        'AI アシスタントを活用した開発ワークフロー確立',
        'プロンプトテンプレートの作成と改善',
        'AI コードレビューの導入',
      ],
      learningGoals: [
        'LLM のファインチューニングと RAG',
        'AI エージェントの開発と活用',
        'AI 駆動開発のベストプラクティス確立',
      ],
    },
  },
];

const TechnicalInterestCard = ({
  item,
  index,
}: {
  item: TechnicalInterest;
  index: number;
}) => {
  const Icon = item.icon;

  const triggerCard = (
    <Card className="h-full group hover:border-primary/50 transition-colors cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <h4 className="font-semibold text-lg">{item.name}</h4>
        </div>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const dialogContent = (
    <div className="space-y-6 pb-4">
      <div>
        <h4 className="font-semibold text-sm text-muted-foreground mb-2">
          概要
        </h4>
        <p className="text-sm leading-relaxed">{item.details.overview}</p>
      </div>

      <div>
        <h4 className="font-semibold text-sm text-muted-foreground mb-2">
          経験
        </h4>
        <p className="text-sm leading-relaxed">{item.details.experience}</p>
      </div>

      <div>
        <h4 className="font-semibold text-sm text-muted-foreground mb-2">
          関連プロジェクト
        </h4>
        <ul className="space-y-1">
          {item.details.projects.map((project) => (
            <li
              key={project}
              className="text-sm text-muted-foreground flex items-start gap-2"
            >
              <span className="text-primary mt-1">•</span>
              <span>{project}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-sm text-muted-foreground mb-2">
          学習目標
        </h4>
        <ul className="space-y-1">
          {item.details.learningGoals.map((goal) => (
            <li
              key={goal}
              className="text-sm text-muted-foreground flex items-start gap-2"
            >
              <span className="text-primary mt-1">•</span>
              <span>{goal}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-sm text-muted-foreground mb-2">
          技術スタック
        </h4>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      key={item.name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <ResponsiveDialog
        trigger={triggerCard}
        title={item.name}
        description={item.description}
        contentClassName="sm:max-w-[700px] md:max-w-[800px] max-h-[calc(100vh-4rem)] overflow-y-auto"
      >
        {dialogContent}
      </ResponsiveDialog>
    </motion.div>
  );
};

const TechnicalInterests = () => {
  return (
    <div>
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="h-1 w-8 bg-primary rounded-full" />
        <h3 className="text-2xl font-bold">技術分野</h3>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {technicalInterests.map((item, index) => (
          <TechnicalInterestCard key={item.name} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TechnicalInterests;
