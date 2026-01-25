/**
 * 大カテゴリ（フロントエンド、バックエンド、インフラなど）
 */
export interface SkillCategoryGroup {
  id: string;
  label: string;
  description?: string;
  categoryIds: string[];
}

/**
 * サブカテゴリ（フレームワーク、スタイリング、状態管理など）
 */
export interface SkillCategory {
  id: string;
  groupId: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface SkillRole {
  id: string;
  label: string;
  description?: string;
  tasks?: string[];
}

export interface SkillTag {
  id: string;
  label: string;
}

export interface SkillProject {
  name: string;
  url: string;
  description?: string;
}

export interface SkillLink {
  type:
    | 'project'
    | 'repository'
    | 'article'
    | 'certificate'
    | 'slides'
    | 'contribution'
    | 'other';
  name: string;
  url: string;
}

export interface SkillRecord {
  id: string;
  name: string;
  categoryIds: string[];
  roleIds: string[];
  tagIds?: string[];
  icon?: string;
  startDate?: string;
  summary?: string;
  scope?: string[];
  strengths?: string[];
  useCases?: string[];
  projects?: SkillProject[];
  links?: SkillLink[];
  learning?: string[];
  interests?: string[];
}

export interface SkillSummaryItem {
  id: string;
  label: string;
  description: string;
  experience: string | null;
}

export interface SkillCapability {
  id: string;
  title: string;
  description: string;
  tasks: string[];
  technologies: string[];
}

export interface SkillStackItem {
  id: string;
  name: string;
  icon?: string;
  scope: string[];
}

export interface SkillStackGroup {
  id: string;
  groupId: string;
  label: string;
  description: string;
  skills: SkillStackItem[];
}

export interface SkillDevelopmentItem {
  name: string;
  relatedSkill?: string;
}
