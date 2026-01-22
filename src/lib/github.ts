import type { ContributionDay } from '@/types/github';

const contributionQuery = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              color
            }
          }
        }
      }
    }
  }
`;

export const getGithubCalendarContributions = async (
  username: string,
  token: string
): Promise<ContributionDay[]> => {
  if (!username || !token) {
    throw new Error('GitHub username and token are required.');
  }

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: contributionQuery,
      variables: { username },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(
      `GitHub API error: ${data.errors.map((error: { message: string }) => error.message).join(', ')}`
    );
  }

  const calendar = data.data.user.contributionsCollection.contributionCalendar;
  const contributions: ContributionDay[] = [];

  for (const week of calendar.weeks) {
    for (const day of week.contributionDays) {
      const count = day.contributionCount;
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (count > 0) level = 1;
      if (count >= 4) level = 2;
      if (count >= 8) level = 3;
      if (count >= 12) level = 4;

      contributions.push({
        date: day.date,
        count,
        level,
        color: day.color,
      });
    }
  }

  return contributions;
};
