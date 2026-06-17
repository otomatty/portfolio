import { Container, SectionTitle } from '@/components/common';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Database,
  Cloud,
  Code2,
  Users,
  Wrench,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';
import { projectPhases } from '@/data/skill-sheet';
import {
  formatPeriod,
  getSkillSheetProjects,
  pickText,
} from '@/lib/skills/skill-sheet';

interface SkillSheetProjectsProps {
  locale?: string;
}

const techGroups = [
  { key: 'languages', label: '言語', icon: Code2 },
  { key: 'frameworks', label: 'FW', icon: Code2 },
  { key: 'databases', label: 'DB', icon: Database },
  { key: 'cloud', label: 'クラウド', icon: Cloud },
  { key: 'tools', label: 'ツール', icon: Wrench },
] as const;

export const SkillSheetProjects = ({ locale }: SkillSheetProjectsProps) => {
  const projects = getSkillSheetProjects();

  return (
    <section className="py-12 md:py-20">
      <Container className="py-0">
        <SectionTitle
          title="案件一覧"
          subtitle="担当した案件を、役割・担当工程・規模・使用技術とともに構造化して整理しています。"
        />

        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card
                className={
                  project.isCurrent ? 'border-l-4 border-l-primary' : ''
                }
              >
                <CardContent className="p-6">
                  {/* ヘッダー: 期間・業界・役割 */}
                  <div className="flex flex-col gap-2 mb-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-lg font-bold">
                          {pickText(project.role, locale)}
                        </h3>
                        {project.isCurrent && (
                          <Badge className="text-xs">現職</Badge>
                        )}
                        {project.masked && (
                          <Badge
                            variant="outline"
                            className="text-xs text-muted-foreground gap-1"
                          >
                            <ShieldCheck className="h-3 w-3" />
                            NDA配慮
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-primary">
                        <Building2 className="h-4 w-4" />
                        {pickText(project.industry, locale)}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground shrink-0">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {formatPeriod(project.period, locale)}
                      </span>
                      {(project.scale || project.teamSize) && (
                        <span className="flex items-center gap-1.5">
                          <Users className="h-4 w-4" />
                          {project.teamSize
                            ? `${project.teamSize}名`
                            : project.scale
                              ? pickText(project.scale, locale)
                              : ''}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 業務概要 */}
                  <p className="text-muted-foreground mb-4">
                    {project.workSlug ? (
                      <>
                        {pickText(project.summary, locale)}{' '}
                        <a
                          href={`/works/${project.workSlug}`}
                          className="text-primary hover:underline whitespace-nowrap"
                        >
                          実績を見る →
                        </a>
                      </>
                    ) : (
                      pickText(project.summary, locale)
                    )}
                  </p>

                  {/* 担当工程チェック */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">担当工程</h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {projectPhases.map((phase) => {
                        const active = project.phases.includes(phase.id);
                        const Icon = active ? CheckCircle2 : Circle;
                        return (
                          <span
                            key={phase.id}
                            className={`flex items-center gap-1.5 text-sm ${
                              active
                                ? 'text-foreground'
                                : 'text-muted-foreground/40'
                            }`}
                          >
                            <Icon
                              className={`h-4 w-4 ${
                                active ? 'text-primary' : ''
                              }`}
                            />
                            {pickText(phase.label, locale)}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* 成果 */}
                  {project.achievements && project.achievements.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">成果</h4>
                      <ul className="space-y-1">
                        {project.achievements.map((achievement) => (
                          <li
                            key={achievement.ja}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="text-primary mt-1">•</span>
                            {pickText(achievement, locale)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 使用技術 */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">使用技術</h4>
                    <div className="flex flex-col gap-2">
                      {techGroups.map(({ key, label, icon: Icon }) => {
                        const items = project.technologies[key];
                        if (!items || items.length === 0) return null;
                        return (
                          <div
                            key={key}
                            className="flex items-start gap-2 flex-wrap"
                          >
                            <span className="flex items-center gap-1 text-xs text-muted-foreground w-16 shrink-0 pt-0.5">
                              <Icon className="h-3.5 w-3.5" />
                              {label}
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {items.map((tech) => (
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
                        );
                      })}
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
