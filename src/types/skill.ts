export type SkillCategory =
  | 'Language'
  | 'Framework/Library'
  | 'Database'
  | 'Cloud'
  | 'Infra/Tool'
  | 'Methodology'
  | 'Design'
  | 'Other';

export interface RelatedLink {
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

export interface SkillEvent {
  date: string;
  type:
    | 'learning_start'
    | 'project'
    | 'repository'
    | 'article'
    | 'certificate'
    | 'slides'
    | 'contribution'
    | 'other';
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  startDate?: string;
  projectCount?: number;
  repositoryCount?: number;
  articleCount?: number;
  certificates?: string[];
  icon?: string;
  description?: string;
  strengths?: string[];
  relatedLinks?: RelatedLink[];
  mainVersions?: string[];
  proficiency?: string;
  learning?: string[];
  interests?: string[];
  events?: SkillEvent[];
}
