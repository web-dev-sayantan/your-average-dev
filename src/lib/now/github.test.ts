import { describe, expect, it } from "bun:test";
import {
  fetchGitHubContributionCalendar,
  getGitHubCalendarDateRange,
} from "./github";

describe("fetchGitHubContributionCalendar", () => {
  it("returns null when no GitHub token is configured", async () => {
    const originalToken = process.env.GITHUB_TOKEN;
    delete process.env.GITHUB_TOKEN;

    try {
      const calendar =
        await fetchGitHubContributionCalendar("web-dev-sayantan");
      expect(calendar).toBeNull();
    } finally {
      process.env.GITHUB_TOKEN = originalToken;
    }
  });

  it("returns a normalized 53-week grid from GraphQL contribution days", async () => {
    const originalToken = process.env.GITHUB_TOKEN;
    process.env.GITHUB_TOKEN = "test-token";

    try {
      const { from } = getGitHubCalendarDateRange();

      let requestedUrl = "";
      let requestInit: RequestInit | undefined;
      const fetchMock = async (
        input: string | URL | Request,
        init?: RequestInit,
      ) => {
        requestedUrl = String(input);
        requestInit = init;

        return new Response(
          JSON.stringify({
            data: {
              user: {
                contributionsCollection: {
                  contributionCalendar: {
                    weeks: [
                      {
                        contributionDays: [
                          {
                            date: from,
                            contributionCount: 3,
                            contributionLevel: "SECOND_QUARTILE",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          }),
          { status: 200 },
        );
      };

      const calendar = await fetchGitHubContributionCalendar(
        "web-dev-sayantan",
        fetchMock,
      );

      expect(requestedUrl).toBe("https://api.github.com/graphql");
      expect(requestInit?.method).toBe("POST");
      expect(requestInit?.headers).toEqual(
        expect.objectContaining({
          Authorization: "Bearer test-token",
          "Content-Type": "application/json",
        }),
      );

      const requestBody =
        typeof requestInit?.body === "string"
          ? JSON.parse(requestInit.body)
          : {};
      expect(requestBody.variables).toEqual(
        expect.objectContaining({
          login: "web-dev-sayantan",
        }),
      );

      expect(calendar).not.toBeNull();
      expect(calendar?.username).toBe("web-dev-sayantan");
      expect(calendar?.days.length).toBe(371);
      expect(
        calendar?.days.some(
          (day) => day.date === from && day.count === 3 && day.level === 2,
        ),
      ).toBe(true);
      expect(calendar?.totalContributions).toBe(3);
    } finally {
      process.env.GITHUB_TOKEN = originalToken;
    }
  });

  it("maps unknown GraphQL levels to zero", async () => {
    const originalToken = process.env.GITHUB_TOKEN;
    process.env.GITHUB_TOKEN = "test-token";

    try {
      const { from } = getGitHubCalendarDateRange();
      const fetchMock = async () =>
        new Response(
          JSON.stringify({
            data: {
              user: {
                contributionsCollection: {
                  contributionCalendar: {
                    weeks: [
                      {
                        contributionDays: [
                          {
                            date: from,
                            contributionCount: 1,
                            contributionLevel: "UNEXPECTED_LEVEL",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          }),
          { status: 200 },
        );

      const calendar = await fetchGitHubContributionCalendar(
        "web-dev-sayantan",
        fetchMock,
      );

      const day = calendar?.days.find((entry) => entry.date === from);
      expect(day?.level).toBe(0);
    } finally {
      process.env.GITHUB_TOKEN = originalToken;
    }
  });

  it("returns null when upstream response is not OK", async () => {
    const originalToken = process.env.GITHUB_TOKEN;
    process.env.GITHUB_TOKEN = "test-token";

    try {
      const fetchMock = async () => new Response("", { status: 500 });

      const calendar = await fetchGitHubContributionCalendar(
        "web-dev-sayantan",
        fetchMock,
      );

      expect(calendar).toBeNull();
    } finally {
      process.env.GITHUB_TOKEN = originalToken;
    }
  });

  it("returns null when upstream JSON is invalid", async () => {
    const originalToken = process.env.GITHUB_TOKEN;
    process.env.GITHUB_TOKEN = "test-token";

    try {
      const fetchMock = async () =>
        new Response("<html>not json</html>", { status: 200 });

      const calendar = await fetchGitHubContributionCalendar(
        "web-dev-sayantan",
        fetchMock,
      );

      expect(calendar).toBeNull();
    } finally {
      process.env.GITHUB_TOKEN = originalToken;
    }
  });
});
