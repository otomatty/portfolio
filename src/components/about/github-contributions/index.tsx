import type { ContributionDay } from '@/types/github';
import { SectionTitle } from '@/components/common';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GithubContributionCalendar } from './github-contribution-calendar';
import { GithubContributionChart } from './github-contribution-chart';

interface GithubContributionsProps {
  contributions: ContributionDay[];
}

export const GithubContributions = ({ contributions }: GithubContributionsProps) => {
  return (
    <div>
      <SectionTitle
        title="GitHub Contributions"
        subtitle="GitHubのコントリビューションを表示します。"
      />
      <Tabs defaultValue="calendar">
        <TabsList>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="chart">Chart</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar">
          <GithubContributionCalendar contributions={contributions} />
        </TabsContent>

        <TabsContent value="chart">
          <GithubContributionChart contributions={contributions} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
