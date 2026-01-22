'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Container, SectionTitle } from '@/components/common';
import { cn } from '@/lib/utils';
import {
  Calendar,
  CalendarClock,
  FileText,
  Mail,
  MessageSquare,
  Phone,
} from 'lucide-react';
import { motion } from 'motion/react';
import { homepageCopy } from '@/data/homepage';

export interface CTASectionProps {
  title?: string;
  subtitle?: string;
  contactButtonText?: string;
  estimateLink?: string;
  estimateButtonText?: string;
  email?: string;
  phoneNumber?: string;
}

const AvailabilityIndicator = ({ status }: { status: '○' | '△' | '×' }) => {
  const getColor = () => {
    switch (status) {
      case '○':
        return 'bg-green-500/80 ring-green-500/30';
      case '△':
        return 'bg-yellow-500/80 ring-yellow-500/30';
      case '×':
        return 'bg-red-500/80 ring-red-500/30';
      default:
        return 'bg-gray-500/80 ring-gray-500/30';
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          'w-3 h-3 rounded-full ring-2 ring-offset-1 ring-offset-background transition-all',
          getColor()
        )}
      />
    </div>
  );
};

export const CTASection = ({
  estimateLink = '/services/estimate',
  email = 'saedgewell@gmail.com',
  phoneNumber = '080-9068-9306',
}: CTASectionProps) => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-background to-muted/30" />
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(hsl(var(--foreground)/0.2)_1px,transparent_1px)] [background-size:24px_24px]" />

      <Container className="relative py-0">
        <SectionTitle
          title={homepageCopy.cta.title}
          subtitle={homepageCopy.cta.subtitle}
          align="center"
          className="mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-linear-to-r from-primary to-primary-foreground rounded-2xl blur-sm opacity-25 transition-all group-hover:opacity-40" />
            <Card className="relative h-full bg-card/95 backdrop-blur-sm supports-backdrop-filter:bg-card/75 transition-all duration-300 group-hover:scale-[1.02]">
              <CardContent className="p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3 text-primary">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {homepageCopy.cta.contact.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-pretty whitespace-pre-line">
                    {homepageCopy.cta.contact.description}
                  </p>
                  <Button asChild size="lg" className="w-full">
                    <a href="/contact">{homepageCopy.cta.contact.buttonText}</a>
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
            className="relative group"
          >
            <div className="absolute -inset-1 bg-linear-to-r from-primary to-primary-foreground rounded-2xl blur-sm opacity-25 transition-all group-hover:opacity-40" />
            <Card className="relative h-full bg-card/95 backdrop-blur-sm supports-backdrop-filter:bg-card/75 transition-all duration-300 group-hover:scale-[1.02]">
              <CardContent className="p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3 text-primary">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {homepageCopy.cta.estimate.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-pretty whitespace-pre-line">
                    {homepageCopy.cta.estimate.description}
                  </p>
                  <Button asChild size="lg" className="w-full">
                    <a href={estimateLink}>{homepageCopy.cta.estimate.buttonText}</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="bg-card/95 backdrop-blur-sm supports-backdrop-filter:bg-card/75 overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-end gap-8 flex-col lg:flex-row">
                  <div className="space-y-6 flex-1 h-full w-full">
                    <div className="flex items-center gap-3 text-foreground">
                      <div className="p-2 rounded-lg bg-muted">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-semibold tracking-tight">
                        {homepageCopy.cta.availability.title}
                      </h3>
                    </div>
                    <div className="overflow-x-auto rounded-lg border bg-card/50">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="px-3 py-3 text-left font-medium">
                              {homepageCopy.cta.availability.timeSlot}
                            </th>
                            <th className="px-3 py-3 text-center font-medium">
                              {homepageCopy.cta.availability.days.monday}
                            </th>
                            <th className="px-3 py-3 text-center font-medium">
                              {homepageCopy.cta.availability.days.tuesday}
                            </th>
                            <th className="px-3 py-3 text-center font-medium">
                              {homepageCopy.cta.availability.days.wednesday}
                            </th>
                            <th className="px-3 py-3 text-center font-medium">
                              {homepageCopy.cta.availability.days.thursday}
                            </th>
                            <th className="px-3 py-3 text-center font-medium">
                              {homepageCopy.cta.availability.days.friday}
                            </th>
                            <th className="px-3 py-3 text-center font-medium">
                              {homepageCopy.cta.availability.days.saturday}
                            </th>
                            <th className="px-3 py-3 text-center font-medium">
                              {homepageCopy.cta.availability.days.sunday}
                            </th>
                            <th className="px-3 py-3 text-center font-medium">
                              {homepageCopy.cta.availability.days.holiday}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="px-3 py-3 font-medium">9:00 - 12:00</td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="×" />
                            </td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="×" />
                            </td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="×" />
                            </td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="×" />
                            </td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="×" />
                            </td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="△" />
                            </td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="△" />
                            </td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="△" />
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-3 py-3 font-medium">13:00 - 19:00</td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="×" />
                            </td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="×" />
                            </td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="×" />
                            </td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="×" />
                            </td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="×" />
                            </td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="△" />
                            </td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="△" />
                            </td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="△" />
                            </td>
                          </tr>
                          <tr>
                            <td className="px-3 py-3 font-medium">20:00 - 22:00</td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="○" />
                            </td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="○" />
                            </td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="○" />
                            </td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="○" />
                            </td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="○" />
                            </td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="△" />
                            </td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="△" />
                            </td>
                            <td className="px-3 py-3">
                              <AvailabilityIndicator status="△" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="flex gap-6 p-4 text-sm text-muted-foreground bg-muted/30">
                        <div className="flex items-center gap-2">
                          <AvailabilityIndicator status="○" />
                          <span>{homepageCopy.cta.availability.status.available}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AvailabilityIndicator status="△" />
                          <span>{homepageCopy.cta.availability.status.consultation}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AvailabilityIndicator status="×" />
                          <span>{homepageCopy.cta.availability.status.unavailable}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 flex-1 w-full">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-foreground">
                        <div className="p-2 rounded-lg bg-muted">
                          <Mail className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-semibold tracking-tight">
                          {homepageCopy.cta.availability.email}
                        </h3>
                      </div>
                      <a
                        href={`mailto:${email}`}
                        className="group/link inline-flex items-center gap-2 text-primary hover:text-primary/90 transition-colors"
                      >
                        <span className="text-lg">{email}</span>
                        <span className="text-primary/70 group-hover/link:translate-x-0.5 transition-transform">
                          →
                        </span>
                      </a>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-foreground">
                        <div className="p-2 rounded-lg bg-muted">
                          <Phone className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-semibold tracking-tight">
                          {homepageCopy.cta.availability.phone}
                        </h3>
                      </div>
                      <a
                        href={`tel:${phoneNumber}`}
                        className="group/link inline-flex items-center gap-2 text-primary hover:text-primary/90 transition-colors"
                      >
                        <span className="text-lg">{phoneNumber}</span>
                        <span className="text-primary/70 group-hover/link:translate-x-0.5 transition-transform">
                          →
                        </span>
                      </a>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-foreground">
                        <div className="p-2 rounded-lg bg-muted">
                          <CalendarClock className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-semibold tracking-tight">
                          {homepageCopy.cta.availability.meetingSchedule}
                        </h3>
                      </div>
                      <Button asChild size="lg" className="w-full">
                        <a
                          href="https://calendly.com/saedgewell"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2"
                        >
                          <CalendarClock className="w-5 h-5" />
                          <span>{homepageCopy.cta.availability.meetingSchedule}</span>
                        </a>
                      </Button>
                    </div>
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
