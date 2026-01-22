'use client';

import { Container } from '@/components/common';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutHeader = () => {
  return (
    <section className="py-12 md:py-20 bg-secondary/5">
      <Container className="py-0">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto mb-6 md:mb-8">
              <img
                src="/images/akimasapf.webp"
                alt="Profile"
                className="h-full w-full object-cover rounded-full border-solid border-primary/20"
                loading="eager"
              />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              菅井 瑛正
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8">
              プロダクトエンジニア
            </p>
            <div className="prose prose-lg dark:prose-invert mx-auto px-4 md:px-0">
              <p className="text-left leading-relaxed">
                TypeScript/React を中心としたフロントエンドから、Rust/Go/Python による
                バックエンド、AWS/GCP 等のクラウドインフラまで幅広い技術領域をカバーする
                エンジニアです。OSSをカスタマイズして高品質なアプリケーションを構築する
                ノウハウや、企業DX推進・チーム育成の経験を活かし、技術と組織の両面から
                課題解決に取り組んでいます。
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <Button asChild variant="outline" size="lg">
                <a href="/about/story" className="gap-2 inline-flex items-center">
                  エンジニアへの道のりを見る
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
