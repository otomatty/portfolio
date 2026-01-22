export type MetricType =
  | 'development_experience'
  | 'project_count'
  | 'personal_project_count';

export interface Metric {
  type: MetricType;
  value: number;
}
