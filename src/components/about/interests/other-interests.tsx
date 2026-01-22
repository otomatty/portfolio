'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Film,
  Hammer,
  Landmark,
  type LucideIcon,
  Plane,
  Sprout,
  TreeDeciduous,
} from 'lucide-react';
import { motion } from 'motion/react';

type OtherInterest = {
  name: string;
  description: string;
  icon: LucideIcon;
};

const otherInterests: OtherInterest[] = [
  {
    name: '盆栽',
    description:
      '日本の伝統的な盆栽の育成を楽しんでいます。自然の美しさをミニチュアで表現する奥深さに魅了されています。',
    icon: TreeDeciduous,
  },
  {
    name: 'DIY',
    description:
      '家具や小物の制作など、ものづくりを楽しんでいます。設計から完成まで自分の手で作り上げる達成感があります。',
    icon: Hammer,
  },
  {
    name: '旅行',
    description:
      '国内外問わず、新しい土地や文化に触れることが好きです。特に自然豊かな場所や歴史的な街並みを訪れています。',
    icon: Plane,
  },
  {
    name: '映画',
    description:
      'さまざまなジャンルの映画を観ることが好きです。ストーリーや映像美から新しいインスピレーションを得ています。',
    icon: Film,
  },
  {
    name: '家庭菜園',
    description:
      '野菜やハーブを育てています。自分で育てた作物を収穫する喜びと、土に触れるリラックス効果を楽しんでいます。',
    icon: Sprout,
  },
  {
    name: '美術館・博物館',
    description:
      'アートや歴史的な展示物を鑑賞することが好きです。新しい知識や視点を得られる貴重な時間です。',
    icon: Landmark,
  },
];

const OtherInterests = () => {
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
        <h3 className="text-2xl font-bold">趣味・プライベート</h3>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherInterests.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-lg">{item.name}</h4>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default OtherInterests;
