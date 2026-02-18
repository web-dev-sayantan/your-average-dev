This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## `/now` page integration setup

The `/now` route supports:

- Manual content for books/blogs/series/movies/sports in `src/lib/now/content.ts`
- GitHub contribution graph via GitHub GraphQL API
- YouTube Music playlists via YouTube playlist feeds

Environment variables:

```bash
# Defaults to web-dev-sayantan if not set
GITHUB_USERNAME=your-github-username

# Required for GitHub GraphQL API (public contribution data)
GITHUB_TOKEN=ghp_xxx

# Comma-separated YouTube playlist IDs (works with YouTube Music playlists too)
YOUTUBE_MUSIC_PLAYLIST_IDS=PLxxx,PLyyy

# Optional comma-separated labels in the same order as IDs
YOUTUBE_MUSIC_PLAYLIST_LABELS=Focus Mix,Coding Mix
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
