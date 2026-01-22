/**
 * Work item type definition
 */
export interface Work {
  slug: string;
  title: string;
  description: string;
  category: 'company' | 'freelance' | 'personal';
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
