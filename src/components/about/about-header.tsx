import { Container } from '@/components/common';
import { Button } from '@/components/ui/button';
import { profile } from '@/data/profile';
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
                src={profile.images.avatar}
                alt="Profile"
                width={256}
                height={256}
                className="h-full w-full object-cover rounded-full border-solid border-primary/20"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
            <div className="mb-4 md:mb-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                {profile.name.ja}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mt-2">
                {profile.name.en}
              </p>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8">
              {profile.role}
            </p>
            <div className="prose prose-lg dark:prose-invert mx-auto px-4 md:px-0">
              <p className="text-left leading-relaxed">
                {profile.bioLong}
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
