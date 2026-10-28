import { skills } from '@/data/skills';
import {
  getValidSkillProficiencies,
  proficiencyLevels,
  skillSheetProjects,
  type ProficiencyLevel,
  type SkillSheetProject,
} from '@/data/skill-sheet';
import { getWorkBySlug } from '@/data/works';
import { calculateExperiencePeriod } from '@/lib/dateUtils';
import type { Impact, WorkCategory } from '@/types/works';
type Period = { start: string; end?: string };

/** 期間（YYYY-MM）を表示用文字列に整形 */
export const formatPeriod = (period: Period): string => {
  const format = (value: string) => {
    const [year, month] = value.split('-');
    if (!month) return year;
    return `${year}年${Number(month)}月`;
  };
  const start = format(period.start);
  const end = period.end ? format(period.end) : '現在';
  return `${start} - ${end}`;
};

/** 実績から引いた情報を合わせた案件 */
export type SkillSheetProjectView = Omit<SkillSheetProject, 'period' | 'category'> & {
  period: Period;
  category: WorkCategory;
  title: string;
  goal: string;
  impacts: Impact[];
  masked: boolean;
};

/**
 * 案件一覧（開始月の新しい順。同じ月はデータの順）。
 * 期間・区分・目指したこと・成果の数値・NDA 配慮は、紐づく実績から引く。
 */
export const getSkillSheetProjects = (): SkillSheetProjectView[] =>
  skillSheetProjects.map((project) => {
    const work = getWorkBySlug(project.workSlug);
    if (!work) {
      throw new Error(`スキルシートの案件 ${project.id} が参照する実績 ${project.workSlug} がありません`);
    }
    return {
      ...project,
      period: project.period ?? work.period,
      category: project.category ?? work.category,
      title: work.subtitle ? `${work.title} — ${work.subtitle}` : work.title,
      goal: work.goal ?? work.description,
      impacts: work.impacts ?? [],
      masked: work.masked ?? false,
    };
  }).sort((a, b) => b.period.start.localeCompare(a.period.start));

export type SkillProficiencyView = {
  skillId: string;
  name: string;
  icon?: string;
  level: ProficiencyLevel;
  /** startDate から算出した経験年数表記（無い場合 null） */
  experience: string | null;
};

export type SkillProficiencyGroup = {
  level: ProficiencyLevel;
  label: string;
  description: string;
  skills: SkillProficiencyView[];
};

/**
 * 習熟度マトリクスをレベル降順でグループ化して返す。
 * 各スキルの名称・アイコン・経験年数は既存 SkillRecord から解決する。
 */
export const getSkillProficiencyGroups = (): SkillProficiencyGroup[] => {
  const skillMap = new Map(skills.map((s) => [s.id, s]));

  const views: SkillProficiencyView[] = getValidSkillProficiencies().map(
    (proficiency) => {
      const record = skillMap.get(proficiency.skillId);
      return {
        skillId: proficiency.skillId,
        name: record?.name ?? proficiency.skillId,
        icon: record?.icon,
        level: proficiency.level,
        experience: record?.startDate
          ? calculateExperiencePeriod(record.startDate)
          : null,
      };
    }
  );

  return proficiencyLevels
    .slice()
    .sort((a, b) => b.level - a.level)
    .map((definition) => ({
      level: definition.level,
      label: definition.label,
      description: definition.description,
      skills: views.filter((view) => view.level === definition.level),
    }))
    .filter((group) => group.skills.length > 0);
};
