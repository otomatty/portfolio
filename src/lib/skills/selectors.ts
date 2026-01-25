import { skills } from '@/data/skills';
import { skillCategories, skillRoles } from '@/data/skills-taxonomy';
import { calculateExperiencePeriod } from '@/lib/dateUtils';
import type {
  SkillCapability,
  SkillDevelopmentItem,
  SkillRecord,
  SkillStackGroup,
  SkillSummaryItem,
} from '@/types/skill';

const getEarliestStartDate = (items: SkillRecord[]): string | null => {
  if (items.length === 0) return null;

  return items.reduce((earliest, skill) => {
    if (!skill.startDate) return earliest;
    if (!earliest) return skill.startDate;
    return skill.startDate < earliest ? skill.startDate : earliest;
  }, null as string | null);
};

export const getSkillSummary = (): SkillSummaryItem[] => {
  const summaryGroups = [
    {
      id: 'frontend',
      label: 'フロントエンド',
      description: 'React/Next.js を中心とした開発',
      categoryIds: ['frontend'],
      experience: null,
    },
    {
      id: 'backend',
      label: 'バックエンド',
      description: 'API 設計とデータ処理の実装',
      categoryIds: ['backend'],
      experience: null,
    },
    {
      id: 'database',
      label: 'データベース',
      description: 'スキーマ設計とクエリ最適化',
      categoryIds: ['database'],
      experience: null,
    },
    {
      id: 'cloud',
      label: 'クラウド・インフラ',
      description: 'サーバーレス基盤と運用設計',
      categoryIds: ['cloud', 'infra'],
      experience: null,
    },
  ];

  return summaryGroups.map((item) => {
    const relatedSkills = skills.filter((skill) =>
      item.categoryIds.some((categoryId) =>
        skill.categoryIds.includes(categoryId)
      )
    );
    const earliestDate = getEarliestStartDate(relatedSkills);

    return {
      ...item,
      experience: earliestDate ? calculateExperiencePeriod(earliestDate) : null,
    };
  });
};

export const getSkillCapabilities = (): SkillCapability[] => {
  return skillRoles
    .map((role) => {
      const relatedSkills = skills.filter((skill) =>
        skill.roleIds.includes(role.id)
      );
      const technologies = relatedSkills.map((skill) => skill.name);

      return {
        id: role.id,
        title: role.label,
        description: role.description ?? '',
        tasks: role.tasks ?? [],
        technologies,
      };
    })
    .filter((role) => role.technologies.length > 0);
};

export const getSkillStackGroups = (): SkillStackGroup[] => {
  return skillCategories
    .map((category) => {
      const relatedSkills = skills.filter((skill) =>
        skill.categoryIds.includes(category.id)
      );

      return {
        id: category.id,
        label: category.label,
        description: category.description ?? '',
        skills: relatedSkills.map((skill) => ({
          id: skill.id,
          name: skill.name,
          scope: skill.scope ?? [],
        })),
      };
    })
    .filter((group) => group.skills.length > 0);
};

const extractUniqueItems = (
  field: 'learning' | 'interests'
): SkillDevelopmentItem[] => {
  const items: SkillDevelopmentItem[] = [];
  const seen = new Set<string>();

  for (const skill of skills) {
    const list = skill[field];
    if (!list) continue;

    for (const item of list) {
      if (seen.has(item)) continue;
      seen.add(item);
      items.push({ name: item, relatedSkill: skill.name });
    }
  }

  return items.slice(0, 6);
};

export const getSkillDevelopmentItems = () => {
  return {
    learning: extractUniqueItems('learning'),
    interests: extractUniqueItems('interests'),
  };
};
