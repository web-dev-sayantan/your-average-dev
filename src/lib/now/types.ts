export type NowItem = {
  title: string;
  note?: string;
  href?: string;
};

export type NowContent = {
  reading: {
    books: NowItem[];
    blogs: NowItem[];
  };
  watching: {
    series: NowItem[];
    movies: NowItem[];
    sports: NowItem[];
  };
};

export type GitHubContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type GitHubContributionCalendar = {
  username: string;
  totalContributions: number;
  days: GitHubContributionDay[];
};

export type YouTubeTrack = {
  id: string;
  title: string;
  href: string;
  publishedAt?: string;
};

export type YouTubePlaylist = {
  id: string;
  title: string;
  href: string;
  tracks: YouTubeTrack[];
};
