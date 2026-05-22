import { Container, SectionTitle } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { Book, Code2, Lightbulb, Users } from 'lucide-react';
import { motion } from 'motion/react';

const influences = [
  {
    category: '技術・ツール',
    icon: Code2,
    items: [
      {
        name: 'React / Next.js',
        description: 'コンポーネント思考と宣言的 UI の美しさに魅了されました',
      },
      {
        name: 'TypeScript',
        description: '型安全性がもたらす開発体験の向上を実感',
      },
      {
        name: 'Cursor',
        description: 'AI 駆動開発の可能性を広げてくれた革新的ツール',
      },
    ],
  },
  {
    category: '書籍・学習リソース',
    icon: Book,
    items: [
      {
        name: 'リーダブルコード',
        description: '読みやすいコードを書くことの重要性を学びました',
      },
      {
        name: 'Clean Architecture',
        description: 'ソフトウェア設計の原則を深く理解するきっかけに',
      },
      {
        name: 'Zenn / Qiita',
        description: '日本のエンジニアコミュニティから多くを学んでいます',
      },
    ],
  },
  {
    category: 'コミュニティ・人',
    icon: Users,
    items: [
      {
        name: 'OSS コミュニティ',
        description: 'オープンソースの精神と協調の大切さを学びました',
      },
      {
        name: '教育現場での生徒たち',
        description: '「伝わる」ことの難しさと喜びを教えてくれました',
      },
      {
        name: 'クライアントの皆様',
        description: '実際の課題解決を通じて成長させていただきました',
      },
    ],
  },
  {
    category: '考え方・哲学',
    icon: Lightbulb,
    items: [
      {
        name: 'ユーザーファースト',
        description: '使う人の視点を常に意識した開発を心がけています',
      },
      {
        name: '継続的改善',
        description: '小さな改善を積み重ねることの力を信じています',
      },
      {
        name: 'シンプルさ',
        description: '複雑さを避け、本質的な解決を目指します',
      },
    ],
  },
];

export const Influences = () => {
  return (
    <section className="py-12 md:py-20">
      <Container className="py-0">
        <SectionTitle
          title="影響を受けたもの"
          subtitle="私のエンジニアとしての考え方を形作ったものたちです。"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {influences.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <category.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold">{category.category}</h3>
                  </div>

                  <ul className="space-y-4">
                    {category.items.map((item) => (
                      <li key={item.name}>
                        <div className="font-medium mb-1">{item.name}</div>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
