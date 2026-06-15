import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Container, SectionTitle } from '@/components/common';
import { Mail, MessageSquare } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { motion } from 'motion/react';
import type { HomepageCopy } from '@/data/homepage';
import { localePath } from '@/lib/i18n';
import { profile } from '@/data/profile';

export interface CTASectionProps {
  copy: HomepageCopy;
  locale: string;
  email?: string;
}

export const CTASection = ({
  copy,
  locale,
  email = 'akimasa.sugai@saedgewell.com',
}: CTASectionProps) => {
  const homepageCopy = copy;
  const contactHref = localePath('/contact', locale);

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-linear-to-b from-background to-muted/30" />
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(hsl(var(--foreground)/0.2)_1px,transparent_1px)] [background-size:24px_24px]" />

      <Container className="relative py-0 overflow-x-hidden">
        <SectionTitle
          title={homepageCopy.cta.title}
          subtitle={homepageCopy.cta.subtitle}
          align="center"
          className="mb-16"
        />

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-linear-to-r from-primary to-primary-foreground rounded-2xl blur-sm opacity-25 transition-all group-hover:opacity-40" />
            <Card className="relative h-full bg-card/95 backdrop-blur-sm supports-backdrop-filter:bg-card/75 transition-all duration-300 group-hover:scale-[1.02]">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col gap-4 sm:gap-6">
                  <div className="flex items-center gap-3 text-primary">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
                      {homepageCopy.cta.contact.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground text-pretty whitespace-pre-line">
                    {homepageCopy.cta.contact.description}
                  </p>
                  <Button asChild size="lg" className="w-full">
                    <a href={contactHref}>{homepageCopy.cta.contact.buttonText}</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="h-full bg-card/95 backdrop-blur-sm supports-backdrop-filter:bg-card/75">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-3 text-foreground">
                      <div className="p-2 rounded-lg bg-muted">
                        <Mail className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
                        {homepageCopy.cta.availability.email}
                      </h3>
                    </div>
                    <a
                      href={`mailto:${email}`}
                      className="group/link inline-flex items-center gap-2 text-primary hover:text-primary/90 transition-colors"
                    >
                      <span className="text-base sm:text-lg break-all">{email}</span>
                      <span className="text-primary/70 group-hover/link:translate-x-0.5 transition-transform">
                        →
                      </span>
                    </a>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-3 text-foreground">
                      <div className="p-2 rounded-lg bg-muted">
                        <SiGithub color="currentColor" className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
                        {homepageCopy.introduction.cards.github.title}
                      </h3>
                    </div>
                    <a
                      href={profile.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-2 text-primary hover:text-primary/90 transition-colors"
                    >
                      <span className="text-base sm:text-lg break-all">
                        {profile.socials.github.replace('https://', '')}
                      </span>
                      <span className="text-primary/70 group-hover/link:translate-x-0.5 transition-transform">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
