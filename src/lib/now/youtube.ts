import { cache } from "react";
import type { YouTubePlaylist, YouTubeTrack } from "@/lib/now/types";

type FetchLike = (
  input: string | URL | Request,
  init?: RequestInit,
) => Promise<Response>;

const YOUTUBE_FEED_BASE_URL =
  "https://www.youtube.com/feeds/videos.xml?playlist_id=";
const MAX_TRACKS_PER_PLAYLIST = 6;

const decodeXmlEntities = (value: string): string =>
  value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");

const extractTagValue = (input: string, tag: string): string | null => {
  const match = input.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return match?.[1]?.trim() ?? null;
};

export const parseTracksFromFeed = (feedXml: string): YouTubeTrack[] => {
  const entries = feedXml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];

  return entries.slice(0, MAX_TRACKS_PER_PLAYLIST).flatMap((entry) => {
    const id = extractTagValue(entry, "yt:videoId");
    const rawTitle = extractTagValue(entry, "title");
    const publishedAt = extractTagValue(entry, "published") ?? undefined;

    if (!id || !rawTitle) {
      return [];
    }

    return [
      {
        id,
        title: decodeXmlEntities(rawTitle),
        href: `https://music.youtube.com/watch?v=${id}`,
        publishedAt,
      },
    ];
  });
};

const parseCommaSeparatedEnv = (value: string | undefined): string[] =>
  (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

type FetchYouTubeMusicPlaylistsOptions = {
  fetchImpl?: FetchLike;
  playlistIds?: string[];
  playlistLabels?: string[];
};

export const fetchYouTubeMusicPlaylists = async (
  options: FetchYouTubeMusicPlaylistsOptions = {},
): Promise<YouTubePlaylist[]> => {
  const fetchImpl = options.fetchImpl ?? fetch;
  const playlistIds =
    options.playlistIds ??
    parseCommaSeparatedEnv(process.env.YOUTUBE_MUSIC_PLAYLIST_IDS);
  const playlistLabels =
    options.playlistLabels ??
    parseCommaSeparatedEnv(process.env.YOUTUBE_MUSIC_PLAYLIST_LABELS);

  if (playlistIds.length === 0) {
    return [];
  }

  const playlists = await Promise.all(
    playlistIds.map(async (playlistId, index) => {
      const response = await fetchImpl(
        `${YOUTUBE_FEED_BASE_URL}${encodeURIComponent(playlistId)}`,
        {
          next: { revalidate: 60 * 15 },
        },
      );

      if (!response.ok) {
        return null;
      }

      const feedXml = await response.text();
      const feedTitle = extractTagValue(feedXml, "title");
      const tracks = parseTracksFromFeed(feedXml);

      return {
        id: playlistId,
        title:
          playlistLabels[index] ??
          (feedTitle ? decodeXmlEntities(feedTitle) : `Playlist ${index + 1}`),
        href: `https://music.youtube.com/playlist?list=${playlistId}`,
        tracks,
      } satisfies YouTubePlaylist;
    }),
  );

  return playlists.filter((playlist): playlist is YouTubePlaylist =>
    Boolean(playlist),
  );
};

export const getYouTubeMusicPlaylists = cache(() =>
  fetchYouTubeMusicPlaylists(),
);
