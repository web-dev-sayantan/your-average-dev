import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Portfolio of Sayantan Dey, an average software engineer who ships web apps, rants, and resumes.",
  authors: [{ name: "Sayantan Dey" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sayantan Dey | an_average_dev",
    description:
      "Portfolio of Sayantan Dey, an average software engineer who ships web apps, rants, and resumes.",
    url: "/",
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
    title: "Sayantan Dey | an_average_dev",
    description:
      "Portfolio of Sayantan Dey, an average software engineer who ships web apps, rants, and resumes.",
    creator: "@no0bdev",
    images: ["/android-chrome-512x512.png"],
  },
};

export default function Home() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.anaverage.dev";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sayantan Dey",
    url: siteUrl,
    jobTitle: "Software Engineer",
    sameAs: [
      "https://github.com/web-dev-sayantan",
      "https://linkedin.com/in/webdevsayantan",
      "https://x.com/no0bdev",
    ],
  };

  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-background">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Safe - using JSON.stringify for JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main
        id="main-content"
        className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start"
      >
        <section>
          <p className="text-muted-foreground">
            Lorem ipsum,{" "}
            <span className="dark:hidden text-destructive">
              Light mode, seriously? 😒
            </span>
          </p>
          <br />
          <div className="flex flex-wrap items-baseline text-muted-foreground">
            <span>I'm</span>
            <h1 className="text-2xl text-foreground">&nbsp;Sayantan.&nbsp;</h1>
            <span>
              An average software{" "}
              <span className="line-through">developer</span> engineer.
            </span>
          </div>
          <p className="text-muted-foreground mt-3">
            I've worked for{" "}
            <span className="text-destructive/90">enterprises</span> since{" "}
            <span className="text-foreground/80">September, 2014</span> and
            developed tons of{" "}
            <span className="text-foreground/90">web apps</span> crammed with
            tables, autocompletes, calendars, multiselects and what not.
          </p>
          <br />
          <p className="flex flex-wrap text-muted-foreground">
            Why should you hire me?&nbsp;{" "}
            <span className="text-foreground">
              Because I understand Closures. 😎
            </span>
          </p>
          <p className="text-muted-foreground">
            Though less significant with Claude around, but I also know a bit of
          </p>
          <p className="flex flex-wrap items-center">
            <Image
              src="/angular_gradient.png"
              alt="Angular Logo"
              width={20}
              height={20}
            />
            &nbsp;
            <a
              href="https://angular.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:decoration-dotted hover:underline-offset-3"
            >
              Angular
            </a>
            , &nbsp;
            <Image src="/React.svg" alt="React Logo" width={18} height={18} />
            &nbsp;
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:decoration-dotted hover:underline-offset-3"
            >
              React
            </a>
            ,&nbsp;
            <Image
              src="/Node.js.svg"
              alt="Node.js Logo"
              width={18}
              height={18}
            />
            &nbsp;
            <a
              href="https://nodejs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:decoration-dotted hover:underline-offset-3"
            >
              Node.js
            </a>
            &nbsp; <span className="text-muted-foreground">(</span>&nbsp;
            <Image src="/Bun.svg" alt="Bun Logo" width={18} height={18} />
            &nbsp;
            <a
              href="https://bun.sh"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:decoration-dotted hover:underline-offset-3"
            >
              Bun
            </a>
            &nbsp;{" "}
            <span className="text-muted-foreground">
              because it's apparently cool)
            </span>
          </p>
          <br />
          <h2 className="flex items-baseline"> 👑&nbsp; Achievements: </h2>
          <ul className="list-disc list-inside">
            <li className="text-muted-foreground mt-3">
              A table that competes with Excel? ✅
            </li>
            <li className="text-muted-foreground">
              A single page form that will take a full day to fill up? ✅
            </li>
            <li className="text-muted-foreground">
              Read 10,000 lines to find why the save button is not getting
              enabled? ✅
            </li>
            <li className="text-muted-foreground mb-3">
              A codebase that{" "}
              <a
                href="https://www.britannica.com/biography/Dennis-M-Ritchie"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted underline-offset-3 hover:text-foreground transition-colors"
              >
                Dennis Ritchie
              </a>{" "}
              would have approved? ❌
            </li>
          </ul>
          <br />
          <p className="text-muted-foreground mb-6">
            If you think you can get your work done by this average engineer,
            I'm all ears @ &nbsp;
            <a
              href="mailto:web.dev.sayantan@gmail.com"
              className="text-foreground underline underline-offset-4"
            >
              web.dev.sayantan@gmail.com
            </a>
          </p>
          <p className="text-muted-foreground">Lorem ipsum, </p>
          <p className="text-muted-foreground">dolor sit amet cons</p>
        </section>
      </main>
    </div>
  );
}
