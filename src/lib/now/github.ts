import { cache } from "react";
import type {
  GitHubContributionCalendar,
  GitHubContributionDay,
} from "@/lib/now/types";

type FetchLike = (
  input: string | URL | Request,
  init?: RequestInit,
) => Promise<Response>;

const GITHUB_CONTRIBUTION_WEEKS = 53;
const DAYS_IN_WEEK = 7;
const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

type GitHubContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

type GitHubContributionDayNode = {
  date: string;
  contributionCount: number;
  contributionLevel: GitHubContributionLevel | string;
};

type GitHubGraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          weeks?: {
            contributionDays?: GitHubContributionDayNode[];
          }[];
        };
      };
    };
  };
};

const contributionLevelToNumber: Record<GitHubContributionLevel, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const normalizeContributionLevel = (
  contributionLevel: GitHubContributionLevel | string,
): number => {
  if (contributionLevel in contributionLevelToNumber) {
    return contributionLevelToNumber[
      contributionLevel as GitHubContributionLevel
    ];
  }

  return 0;
};

const formatDate = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = `${date.getUTCMonth() + 1}`.padStart(2, "0");
  const day = `${date.getUTCDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getUtcDate = (date: Date): Date =>
  new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );

export const getGitHubCalendarDateRange = (): {
  from: string;
  to: string;
  gridStart: Date;
} => {
  const today = getUtcDate(new Date());
  const to = formatDate(today);

  const fromDate = new Date(today);
  fromDate.setUTCDate(
    fromDate.getUTCDate() - (GITHUB_CONTRIBUTION_WEEKS * DAYS_IN_WEEK - 1),
  );

  const gridStart = new Date(fromDate);
  gridStart.setUTCDate(gridStart.getUTCDate() - gridStart.getUTCDay());

  return {
    from: formatDate(fromDate),
    to,
    gridStart,
  };
};

export const fetchGitHubContributionCalendar = async (
  username: string,
  fetchImpl: FetchLike = fetch,
): Promise<GitHubContributionCalendar | null> => {
  if (!username) return null;
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const { from, to, gridStart } = getGitHubCalendarDateRange();

  const response = await fetchImpl(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    next: { revalidate: 60 * 30 },
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "an-average-dev-now-page",
    },
    body: JSON.stringify({
      query: `
        query GitHubContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $login) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                weeks {
                  contributionDays {
                    date
                    contributionCount
                    contributionLevel
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        login: username,
        from: `${from}T00:00:00Z`,
        to: `${to}T23:59:59Z`,
      },
    }),
  });

  if (!response.ok) {
    return null;
  }

  let payload: GitHubGraphQLResponse;
  try {
    payload = (await response.json()) as GitHubGraphQLResponse;
  } catch {
    return null;
  }

  const contributionCalendar =
    payload.data?.user?.contributionsCollection?.contributionCalendar;
  if (!contributionCalendar) return null;

  const parsed = new Map<string, GitHubContributionDay>();
  for (const week of contributionCalendar.weeks ?? []) {
    for (const day of week.contributionDays ?? []) {
      parsed.set(day.date, {
        date: day.date,
        count: day.contributionCount,
        level: normalizeContributionLevel(day.contributionLevel),
      });
    }
  }

  const days: GitHubContributionDay[] = [];
  const cursor = new Date(gridStart);

  for (
    let index = 0;
    index < GITHUB_CONTRIBUTION_WEEKS * DAYS_IN_WEEK;
    index += 1
  ) {
    const date = formatDate(cursor);
    const day = parsed.get(date) ?? {
      date,
      count: 0,
      level: 0,
    };

    days.push(day);
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  const totalContributions = days.reduce((sum, day) => sum + day.count, 0);

  return {
    username,
    totalContributions,
    days,
  };
};

export const getGitHubContributionCalendar = cache(
  fetchGitHubContributionCalendar,
);
