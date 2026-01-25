import type { Metric } from '@/types/metrics';
import { getDevelopmentExperienceYears } from './profile';
import { getAllWorks, getWorksByCategory } from './works';

export function getHomeMetrics(): Metric[] {
  const allWorks = getAllWorks();
  const personalWorks = getWorksByCategory('personal');
  const developmentExperienceYears = getDevelopmentExperienceYears();

  return [
    {
      type: 'development_experience',
      value: developmentExperienceYears,
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
