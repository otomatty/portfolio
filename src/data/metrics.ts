import type { Metric } from '@/types/metrics';
import { getAllWorks, getWorksByCategory } from './works';

const DEVELOPMENT_EXPERIENCE_YEARS = 8;

export function getHomeMetrics(): Metric[] {
  const allWorks = getAllWorks();
  const personalWorks = getWorksByCategory('personal');

  return [
    {
      type: 'development_experience',
      value: DEVELOPMENT_EXPERIENCE_YEARS,
    },
    {
      type: 'project_count',
      value: allWorks.length,
    },
    {
      type: 'personal_project_count',
      value: personalWorks.length,
    },
  ];
}
