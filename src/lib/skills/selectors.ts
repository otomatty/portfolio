import { skills } from '@/data/skills';
import {
  skillCategories,
  skillCategoryGroups,
  skillRoles,
} from '@/data/skills-taxonomy';
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
  // 大カテゴリ（フロントエンド、バックエンド、インフラ）でグループ化
  return skillCategoryGroups
    .filter((group) => group.id !== 'other') // その他は除外
    .map((group) => {
      // このグループに属するカテゴリIDを取得
      const categoryIds = group.categoryIds;

      // 該当カテゴリに属するスキルを抽出
      const relatedSkills = skills.filter((skill) =>
        skill.categoryIds.some((catId) => categoryIds.includes(catId))
      );

      const earliestDate = getEarliestStartDate(relatedSkills);

      return {
        id: group.id,
        label: group.label,
        description: group.description ?? '',
        experience: earliestDate
          ? calculateExperiencePeriod(earliestDate)
          : null,
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
  // 大カテゴリでグループ化して返す
  const result: SkillStackGroup[] = [];

  for (const group of skillCategoryGroups) {
    // このグループに属するサブカテゴリを取得
    const subCategories = skillCategories.filter(
      (cat) => cat.groupId === group.id
    );

    for (const category of subCategories) {
      const relatedSkills = skills.filter((skill) =>
        skill.categoryIds.includes(category.id)
      );

      if (relatedSkills.length === 0) continue;

      result.push({
        id: category.id,
        groupId: group.id,
        label: category.label,
        description: category.description ?? '',
        skills: relatedSkills.map((skill) => ({
          id: skill.id,
          name: skill.name,
          icon: skill.icon,
          scope: skill.scope ?? [],
        })),
      });
    }
  }

  return result;
};

/**
 * 大カテゴリでグループ化されたスキルスタックを取得
 */
export const getSkillStackByGroup = () => {
  const stackGroups = getSkillStackGroups();

  return skillCategoryGroups.map((group) => ({
    ...group,
    categories: stackGroups.filter((stack) => stack.groupId === group.id),
  }));
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

/**
 * Tech Stack（技術スタック一覧）
 * About ページの技術スタックカード用
 */
export interface TechStackCategory {
  category: string;
  technologies: string[];
}

export const getTechStacks = (): TechStackCategory[] => {
  const categoryMapping = [
    {
      category: 'フロントエンド',
      categoryIds: ['language', 'frontend-framework', 'frontend-styling', 'frontend-state', 'frontend-ui', 'frontend-animation'],
    },
    {
      category: 'バックエンド',
      categoryIds: ['backend-runtime', 'backend-baas', 'backend-api'],
    },
    {
      category: 'データベース',
      categoryIds: ['database', 'orm'],
    },
    {
      category: 'クラウド・インフラ',
      categoryIds: ['cloud', 'container'],
    },
    {
      category: 'CI/CD・ツール',
      categoryIds: ['cicd', 'frontend-testing', 'frontend-tooling'],
    },
  ];

  return categoryMapping.map((mapping) => {
    const technologies = skills
      .filter((skill) =>
        skill.categoryIds.some((catId) => mapping.categoryIds.includes(catId))
      )
      .filter((skill) => skill.startDate) // 開始日があるスキルのみ（実務経験あり）
      .sort((a, b) => {
        // 開始日が古い（経験が長い）順にソート
        if (!a.startDate || !b.startDate) return 0;
        return a.startDate < b.startDate ? -1 : 1;
      })
      .map((skill) => skill.name);

    return {
      category: mapping.category,
      technologies,
    };
  }).filter((stack) => stack.technologies.length > 0);
};

/**
 * スキル開発の方向性（目標ベース）
 */
export interface SkillDevelopmentGoal {
  id: string;
  title: string;
  description: string;
  learningItems: string[];
  relatedSkills: string[];
}

export const getSkillDevelopmentGoals = (): SkillDevelopmentGoal[] => {
  return [
    {
      id: 'rust-development',
      title: 'Rustを使用したアプリケーション開発',
      description:
        '高パフォーマンス・安全性を重視したRust製アプリケーションの開発スキルを習得',
      learningItems: [
        'Leptosによるフルスタック開発',
        'Axumを使ったバックエンドAPI',
        'Tauriでのデスクトップアプリ',
        'WebAssemblyの活用',
      ],
      relatedSkills: ['Rust', 'Tauri', 'WebAssembly'],
    },
    {
      id: 'serverless-fullstack',
      title: 'サーバーレスフルスタック開発',
      description:
        'エッジコンピューティングとBaaSを活用した、スケーラブルなフルスタックアプリケーション構築',
      learningItems: [
        'Supabase Edge Functions',
        'Cloudflare Workers × Hono',
        'Vercel AI SDK',
        'エッジデータベース（D1, Turso）',
      ],
      relatedSkills: ['Supabase', 'Cloudflare', 'Vercel', 'Hono'],
    },
    {
      id: 'product-management',
      title: 'プロダクトマネージャーへの成長',
      description:
        '技術とビジネスを橋渡しし、プロダクトの価値を最大化するPMスキルの習得',
      learningItems: [
        'プロダクトマネジメント基礎',
        'ユーザーリサーチ手法',
        'データ駆動意思決定',
        'プロダクト戦略立案',
      ],
      relatedSkills: ['プロジェクト管理', 'UIデザイン', 'Figma'],
    },
  ];
};
