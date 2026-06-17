import { skills } from '@/data/skills';
import {
  getValidSkillProficiencies,
  proficiencyLevels,
  skillSheetProjects,
  type LocalizedText,
  type ProficiencyLevel,
  type SkillSheetProject,
} from '@/data/skill-sheet';
import { calculateExperiencePeriod } from '@/lib/dateUtils';
import type { Locale } from '@/lib/i18n';
import { resolveLocale } from '@/lib/i18n';

/** 多言語テキストをロケールに応じて解決（EN未整備時は ja にフォールバック） */
export const pickText = (
  text: LocalizedText,
  locale?: string | Locale
): string => {
  const resolved = resolveLocale(locale);
  if (resolved === 'en') return text.en ?? text.ja;
  return text.ja;
};

/** 期間（YYYY-MM）を表示用文字列に整形 */
export const formatPeriod = (
  period: SkillSheetProject['period'],
  locale?: string | Locale
): string => {
  const resolved = resolveLocale(locale);
  const present = resolved === 'en' ? 'Present' : '現在';
  const format = (value: string) => {
    const [year, month] = value.split('-');
    if (!month) return year;
    return resolved === 'en' ? `${year}/${month}` : `${year}年${Number(month)}月`;
  };
  const start = format(period.start);
  const end = period.end ? format(period.end) : present;
  return `${start} - ${end}`;
};

export type SkillSheetProjectView = SkillSheetProject;

/** 案件一覧（新しい順を想定したデータ順をそのまま返す） */
export const getSkillSheetProjects = (): SkillSheetProjectView[] =>
  skillSheetProjects;

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
  label: LocalizedText;
  description: LocalizedText;
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
