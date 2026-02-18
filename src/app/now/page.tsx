import type { Metadata } from "next";
import { nowContent } from "@/lib/now/content";
import { getGitHubContributionCalendar } from "@/lib/now/github";
import type {
  GitHubContributionDay,
  NowItem,
  YouTubePlaylist,
} from "@/lib/now/types";
import { getYouTubeMusicPlaylists } from "@/lib/now/youtube";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What I am currently reading, watching, and listening to, plus my GitHub commit activity.",
  authors: [{ name: "Sayantan Dey" }],
  alternates: {
    canonical: "/now",
  },
  openGraph: {
    title: "Now | an_average_dev",
    description:
      "What I am currently reading, watching, and listening to, plus my GitHub commit activity.",
    url: "/now",
    type: "website",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "an_average_dev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Now | an_average_dev",
    description:
      "What I am currently reading, watching, and listening to, plus my GitHub commit activity.",
    creator: "@no0bdev",
    images: ["/android-chrome-512x512.png"],
  },
};

const githubLevelToClass: Record<number, string> = {
  0: "bg-muted/70",
  1: "bg-emerald-300/60 dark:bg-emerald-800/60",
  2: "bg-emerald-400/70 dark:bg-emerald-700/70",
  3: "bg-emerald-500/80 dark:bg-emerald-600/80",
  4: "bg-emerald-600/90 dark:bg-emerald-500/90",
};

const splitIntoWeeks = (
  days: GitHubContributionDay[],
): GitHubContributionDay[][] => {
  const weeks: GitHubContributionDay[][] = [];

  for (let index = 0; index < days.length; index += 7) {
    weeks.push(days.slice(index, index + 7));
  }

  return weeks;
};

function ItemList({ items }: { items: NowItem[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">Nothing added yet.</p>;
  }

  return (
    <ul className="list-disc list-inside space-y-2">
      {items.map((item) => (
        <li
          key={`${item.title}-${item.href ?? "no-link"}`}
          className="text-muted-foreground"
        >
          {item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-dotted underline-offset-3 hover:text-foreground/80"
            >
              {item.title}
            </a>
          ) : (
            <span className="text-foreground">{item.title}</span>
          )}
          {item.note ? <span>&nbsp;- {item.note}</span> : null}
        </li>
      ))}
    </ul>
  );
}

function NowCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border/70 bg-background/70 p-5">
      <h2 className="text-lg text-foreground">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function YouTubeMusicSection({ playlists }: { playlists: YouTubePlaylist[] }) {
  if (playlists.length === 0) {
    return (
      <p className="text-muted-foreground">
        I'm sad Youtube music doesn't have an API similar to Spotify's.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      {playlists.map((playlist) => (
        <div
          key={playlist.id}
          className="rounded-lg border border-border/60 p-4"
        >
          <p className="text-foreground">
            <a
              href={playlist.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-dotted underline-offset-3 hover:text-foreground/80"
            >
              {playlist.title}
            </a>
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1.5">
            {playlist.tracks.length === 0 ? (
              <li className="text-muted-foreground">No tracks available.</li>
            ) : (
              playlist.tracks.map((track) => (
                <li key={track.id} className="text-muted-foreground">
                  <a
                    href={track.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline decoration-dotted underline-offset-3 hover:text-foreground/80"
                  >
                    {track.title}
                  </a>
                </li>
              ))
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

function GitHubContributionSection({
  username,
  totalContributions,
  days,
}: {
  username: string;
  totalContributions: number;
  days: GitHubContributionDay[];
}) {
  const weeks = splitIntoWeeks(days);

  return (
    <div>
      <p className="text-muted-foreground">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline decoration-dotted underline-offset-3 hover:text-foreground/80"
        >
          @{username}
        </a>
        &nbsp;with&nbsp;
        <span className="text-foreground">{totalContributions}</span>
        &nbsp;contributions in the last 53 weeks.
      </p>
      <div className="mt-4 overflow-x-auto pb-2">
        <div className="inline-grid grid-flow-col gap-1">
          {weeks.map((week) => (
            <div
              key={`week-${week[0]?.date ?? "unknown"}`}
              className="grid grid-rows-7 gap-1"
            >
              {week.map((day) => (
                <div
                  key={day.date}
                  className={`size-2.5 rounded-[3px] ${githubLevelToClass[day.level] ?? githubLevelToClass[0]}`}
                  title={`${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Less</p>
      <div className="mt-1 flex items-center gap-1" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((level) => (
          <span
            key={`legend-${level}`}
            className={`size-2.5 rounded-[3px] ${githubLevelToClass[level]}`}
          />
        ))}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">More</p>
    </div>
  );
}

export default async function NowPage() {
  const githubUsername = process.env.GITHUB_USERNAME ?? "web-dev-sayantan";

  const [githubCalendar, youtubePlaylists] = await Promise.all([
    getGitHubContributionCalendar(githubUsername),
    getYouTubeMusicPlaylists(),
  ]);

  return (
    <div className="flex flex-1 items-center justify-center bg-background font-sans">
      <main
        id="main-content"
        className="w-full max-w-4xl px-6 py-20 sm:px-10 lg:px-16"
      >
        <section>
          <p className="text-muted-foreground">
            A now page with fewer promises and more receipts.
          </p>
          <h1 className="mt-2 text-3xl text-foreground">
            What I am up to right now.
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Real-time where possible, manually updated where life is chaotic.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <NowCard title="Reading: books">
              <ItemList items={nowContent.reading.books} />
            </NowCard>

            <NowCard title="Reading: blogs">
              <ItemList items={nowContent.reading.blogs} />
            </NowCard>

            <NowCard title="Watching: series">
              <ItemList items={nowContent.watching.series} />
            </NowCard>

            <NowCard title="Watching: movies">
              <ItemList items={nowContent.watching.movies} />
            </NowCard>

            <NowCard title="Watching: sports">
              <ItemList items={nowContent.watching.sports} />
            </NowCard>

            <NowCard title="Listening: YouTube Music">
              <YouTubeMusicSection playlists={youtubePlaylists} />
            </NowCard>
          </div>

          <div className="mt-4">
            <NowCard title="GitHub contribution graph">
              {githubCalendar ? (
                <GitHubContributionSection
                  username={githubCalendar.username}
                  totalContributions={githubCalendar.totalContributions}
                  days={githubCalendar.days}
                />
              ) : (
                <p className="text-muted-foreground">
                  Could not load contribution data right now.
                </p>
              )}
            </NowCard>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Data sources: GitHub GraphQL API and YouTube feeds for configured
            playlists.
          </p>
        </section>
      </main>
    </div>
  );
}
