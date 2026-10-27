import type { ContributionDay } from '@/types/github';
import { useState } from 'react';

interface GithubContributionCalendarProps {
  contributions: ContributionDay[];
}

const getColor = (count: number): string => {
  if (count === 0) return 'bg-foreground/5';
  if (count >= 1 && count <= 5) return 'bg-gold/25';
  if (count >= 6 && count <= 10) return 'bg-gold/50';
  if (count >= 11 && count <= 15) return 'bg-gold/75';
  return 'bg-gold';
};

const groupByYear = (
  contributions: ContributionDay[]
): Record<string, ContributionDay[]> => {
  return contributions.reduce(
    (acc: Record<string, ContributionDay[]>, day) => {
      const year = new Date(day.date).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(day);
      return acc;
    },
    {}
  );
};

const getDaysByWeekday = (
  year: string,
  contributions: ContributionDay[]
): ContributionDay[][] => {
  const daysByWeekday: ContributionDay[][] = [[], [], [], [], [], [], []];
  const startDate = new Date(`${year}-01-01`);
  const endDate = new Date(`${year}-12-31`);
  const currentDate = startDate;

  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().slice(0, 10);
    const weekday = currentDate.getDay();
    const contribution = contributions.find((day) => day.date === dateString);
    const contributionCount = contribution ? contribution.count : 0;

    if (daysByWeekday[weekday]) {
      daysByWeekday[weekday].push({
        date: dateString,
        count: contributionCount,
        level: contribution?.level || 0,
        color: contribution?.color || '',
      });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return daysByWeekday;
};

export const GithubContributionCalendar = ({
  contributions,
}: GithubContributionCalendarProps) => {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const contributionsByYear = groupByYear(contributions);
  const years = Object.keys(contributionsByYear).sort(
    (a, b) => Number.parseInt(b, 10) - Number.parseInt(a, 10)
  );

  const daysByWeekday = getDaysByWeekday(
    selectedYear,
    contributionsByYear[selectedYear] || []
  );

  return (
    <div className="h-[400px] flex gap-4">
      <div className="flex flex-col gap-1">
        {daysByWeekday.map((days, index) => (
          <div
            key={`${days[0]?.date}-${index}`}
            className="flex justify-start gap-1"
          >
            {days.map((day) => (
              <div
                key={day.date}
                className={`w-4 h-4 rounded ${getColor(day.count)}`}
                title={`${day.date}: ${day.count}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col ml-2">
        {years.map((year) => (
          <button
            key={year}
            type="button"
            className={`mx-1 rounded-full border px-3 py-1 text-xs tracking-[0.06em] transition-colors ${
              selectedYear === year
                ? 'border-gold text-gold'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};
