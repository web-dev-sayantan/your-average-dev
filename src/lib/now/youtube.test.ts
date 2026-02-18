import { describe, expect, it } from "bun:test";
import { fetchYouTubeMusicPlaylists, parseTracksFromFeed } from "./youtube";

describe("parseTracksFromFeed", () => {
  it("extracts and decodes up to 6 tracks", () => {
    const feed = `
      <feed>
        <entry><yt:videoId>vid1</yt:videoId><title>Track &amp; One</title><published>2026-02-01T10:00:00Z</published></entry>
        <entry><yt:videoId>vid2</yt:videoId><title>Track Two</title><published>2026-02-01T11:00:00Z</published></entry>
        <entry><yt:videoId>vid3</yt:videoId><title>Track Three</title><published>2026-02-01T12:00:00Z</published></entry>
        <entry><yt:videoId>vid4</yt:videoId><title>Track Four</title><published>2026-02-01T13:00:00Z</published></entry>
        <entry><yt:videoId>vid5</yt:videoId><title>Track Five</title><published>2026-02-01T14:00:00Z</published></entry>
        <entry><yt:videoId>vid6</yt:videoId><title>Track Six</title><published>2026-02-01T15:00:00Z</published></entry>
        <entry><yt:videoId>vid7</yt:videoId><title>Track Seven</title><published>2026-02-01T16:00:00Z</published></entry>
      </feed>
    `;

    const tracks = parseTracksFromFeed(feed);

    expect(tracks.length).toBe(6);
    expect(tracks[0]).toEqual({
      id: "vid1",
      title: "Track & One",
      href: "https://music.youtube.com/watch?v=vid1",
      publishedAt: "2026-02-01T10:00:00Z",
    });
  });
});

describe("fetchYouTubeMusicPlaylists", () => {
  it("returns empty list when no playlist ids are provided", async () => {
    const playlists = await fetchYouTubeMusicPlaylists({
      playlistIds: [],
      playlistLabels: [],
      fetchImpl: async () => new Response("", { status: 500 }),
    });

    expect(playlists).toEqual([]);
  });

  it("builds playlists from feed responses and applies labels", async () => {
    const fetchMock = async (input: string | URL | Request) => {
      const url = String(input);

      if (url.includes("PL_ONE")) {
        return new Response(
          `<feed><title>Feed One</title><entry><yt:videoId>a1</yt:videoId><title>First</title></entry></feed>`,
          { status: 200 },
        );
      }

      if (url.includes("PL_TWO")) {
        return new Response(
          `<feed><title>Feed Two</title><entry><yt:videoId>b1</yt:videoId><title>Second</title></entry></feed>`,
          { status: 200 },
        );
      }

      return new Response("", { status: 404 });
    };

    const playlists = await fetchYouTubeMusicPlaylists({
      playlistIds: ["PL_ONE", "PL_TWO"],
      playlistLabels: ["Focus Mix"],
      fetchImpl: fetchMock,
    });

    expect(playlists.length).toBe(2);
    expect(playlists[0]?.title).toBe("Focus Mix");
    expect(playlists[0]?.tracks[0]?.href).toBe(
      "https://music.youtube.com/watch?v=a1",
    );
    expect(playlists[1]?.title).toBe("Feed Two");
    expect(playlists[1]?.tracks[0]?.id).toBe("b1");
  });

  it("filters out non-OK playlist responses", async () => {
    const fetchMock = async (input: string | URL | Request) => {
      const url = String(input);
      if (url.includes("PL_OK")) {
        return new Response(
          `<feed><title>Good Feed</title><entry><yt:videoId>x1</yt:videoId><title>Good</title></entry></feed>`,
          { status: 200 },
        );
      }

      return new Response("", { status: 500 });
    };

    const playlists = await fetchYouTubeMusicPlaylists({
      playlistIds: ["PL_OK", "PL_FAIL"],
      fetchImpl: fetchMock,
    });

    expect(playlists.length).toBe(1);
    expect(playlists[0]?.id).toBe("PL_OK");
  });
});
