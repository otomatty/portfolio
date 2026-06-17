/**
 * Work kind (並列表示の主軸): 実務 / 個人開発
 */
export type WorkKind = 'professional' | 'personal';

/**
 * Work category (働き方の細目)
 */
export type WorkCategory = 'company' | 'freelance' | 'personal';

/**
 * Work item type definition
 */
export interface Work {
  slug: string;
  title: string;
  description: string;
  /** 実務 / 個人開発（並列表示の主軸） */
  kind: WorkKind;
  /** 働き方の細目（company/freelance/personal） */
  category: WorkCategory;
  status: 'published' | 'draft';
  thumbnail: string;
  technologies: string[];
  github_url: string | null;
  website_url: string | null;
  created_at: string;
  updated_at: string;
  isPinned?: boolean;
}

/**
 * Works index type
 */
export interface WorksIndex {
  version: number;
  generatedAt: string;
  totalCount: number;
  works: Work[];
}
