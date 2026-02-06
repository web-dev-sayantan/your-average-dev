import type { Metadata } from "next";
import Link from "next/link";
import { getAllRants } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Rants",
  description: "Unfiltered rants about design, UX, and web dev hot takes.",
  authors: [{ name: "Sayantan Dey" }],
  alternates: {
    canonical: "/rants",
  },
  openGraph: {
    title: "Rants | an_average_dev",
    description: "Unfiltered rants about design, UX, and web dev hot takes.",
    url: "/rants",
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
    title: "Rants | an_average_dev",
    description: "Unfiltered rants about design, UX, and web dev hot takes.",
    creator: "@no0bdev",
    images: ["/android-chrome-512x512.png"],
  },
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function RantsPage() {
  const rants = await getAllRants();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main
        id="main-content"
        className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between px-16 py-32 bg-white dark:bg-black sm:items-start"
      >
        <section className="w-full">
          <h1 className="sr-only">Rants</h1>
          <p className="flex items-baseline text-lg">
            Rants, unfiltered.{" "}
            <span className="text-normal px-2 text-red-500 dark:hidden">
              The app supports Dark Mode, you should too! 😒
            </span>
          </p>
          <p className="mt-3 text-muted-foreground">
            Opinions nobody asked for, but should I really care? Probably not.
          </p>

          {rants.length === 0 ? (
            <div className="mt-10">
              <p className="text-muted-foreground">
                No rants yet. The calm before the storm.
              </p>
            </div>
          ) : (
            <div className="mt-10 space-y-8">
              {rants.map((rant) => (
                <Link
                  key={rant.slug}
                  href={`/rants/${rant.slug}`}
                  className="group block border-l border-muted/60 pl-5 transition-colors hover:border-foreground/40"
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-medium text-foreground group-hover:text-foreground/80">
                      {rant.emoji} {rant.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(rant.date)} · {rant.readingTime} min read
                    </p>
                  </div>
                  <p className="mt-2 text-muted-foreground">{rant.excerpt}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {rant.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
