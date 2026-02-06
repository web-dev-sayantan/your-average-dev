// ──────────────────────────────────────────────
// /uses – hardware, software, tools & desk setup
// Edit the `usesData` array below to add/remove items.
// ──────────────────────────────────────────────

import type { Metadata } from "next";
import SectionNav from "@/components/section-nav";

export const metadata: Metadata = {
  title: "Uses",
  description: "Hardware, software, tools, and desk setup that I use daily.",
  authors: [{ name: "Sayantan Dey" }],
  alternates: {
    canonical: "/uses",
  },
  openGraph: {
    title: "Uses | an_average_dev",
    description: "Hardware, software, tools, and desk setup that I use daily.",
    url: "/uses",
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
    title: "Uses | an_average_dev",
    description: "Hardware, software, tools, and desk setup that I use daily.",
    creator: "@no0bdev",
    images: ["/android-chrome-512x512.png"],
  },
};

type UsesItem = {
  name: string;
  description?: string;
  url?: string;
  details?: string[];
};

type UsesSubcategory = {
  label: string;
  items: UsesItem[];
};

type UsesSection = {
  title: string;
  id: string;
  subcategories: UsesSubcategory[];
};

const usesData: UsesSection[] = [
  {
    title: "Hardware",
    id: "hardware",
    subcategories: [
      {
        label: "💻 Computer",
        items: [
          {
            name: "MacBook Pro 14″ M1 Pro (2021)",
            description:
              "Overpriced aluminum slab. 16GB RAM struggling to keep 500 Chrome tabs alive. It's doing its best.",
            url: "https://www.apple.com/macbook-pro/",
          },
          {
            name: "Dell Latitude 5330",
            description: "Because my company don't think I deserve a MacBook.",
            url: "https://www.dell.com/en-us/search/latitude",
          },
        ],
      },
      {
        label: "🖥️ Monitor",
        items: [
          {
            name: 'ASUS ProArt (24" 1080p)',
            description:
              "Because color accuracy matters when finding out syntax errors.",
            url: "https://a.co/d/08aVEByW",
          },
        ],
      },
      {
        label: "⌨️ Peripherals",
        items: [
          {
            name: "Royalaxe R87 Keyboard",
            description: "Compact 87 keys mechanical noise maker.",
            url: "https://a.co/d/07nOPLU1",
          },
          {
            name: "TECKNET Wireless Mouse",
            description: "It works. That's all I need.",
            url: "https://a.co/d/03zrf9yR",
          },
        ],
      },
      {
        label: "🎧 Audio",
        items: [
          {
            name: "Sony ULT Wear",
            description:
              "When the construction noise outside requires industrial-grade silence.",
            url: "https://a.co/d/0anoy6c4",
          },
          {
            name: "JBL Clip 5",
            description: "It's small. It's loud. It's waterproof.",
            url: "https://a.co/d/0eUsZ8rX",
          },
        ],
      },
    ],
  },
  {
    title: "Software",
    id: "software",
    subcategories: [
      {
        label: "📝 Editor & Terminal",
        items: [
          {
            name: "Visual Studio Code",
            description:
              "The only reason I have a job. If multi-cursor goes away, I retire.",
            url: "https://code.visualstudio.com/",
            details: [
              "GitHub Copilot: writing my code",
              "Catppuccin Mocha theme: whatever is dark and purple",
              "Geist Mono font: because ligatures are life",
            ],
          },
          {
            name: "Warp",
            description:
              "Because the terminal needs to be GPU accelerated for 'ls -la'.",
            url: "https://warp.dev/",
          },
          {
            name: "Zsh + Oh My Zsh",
            description: "Colorful text that makes me feel like a hacker.",
            url: "https://ohmyz.sh/",
          },
        ],
      },
      {
        label: "🌐 Browser & DevTools",
        items: [
          {
            name: "Helium Browser",
            description:
              "It crashes everytime it updates, but it blocks ads and doesn't show cyrpto shit.",
            url: "https://helium.computer/",
          },
          {
            name: "Brave Browser",
            description: "Because I'm lazy to unistall it.",
            url: "https://brave.com/",
          },
          {
            name: "Zen Browser",
            description:
              "Vertical tabs. No distractions. Most sites don't work.",
            url: "https://zenbrowser.com/",
          },
        ],
      },
      {
        label: "⚛️ Languages & Frameworks",
        items: [
          {
            name: "TypeScript",
            description:
              "I add types so I can satisfy the red squigglies. `any` is a crime.",
          },
          {
            name: "React / Next.js",
            description:
              "The Vercel ecosystem. I'm trapped in the App Router and I can't get out.",
            url: "https://nextjs.org/",
          },
          {
            name: "Angular",
            description:
              "Stockholm syndrome in framework form. But hey, Signals are cool.",
            url: "https://angular.dev/",
          },
          {
            name: "Tailwind CSS",
            description:
              "Writing CSS in HTML classes because I'm too lazy to name things.",
            url: "https://tailwindcss.com/",
          },
          {
            name: "Node.js / Bun",
            description:
              "Bun is fast. Node is stable. I use whichever command I type first.",
            url: "https://bun.sh/",
          },
        ],
      },
      {
        label: "🛠️ CLI & Dev Tools",
        items: [
          {
            name: "Git + GitHub",
            description: "Git push --force and pray.",
          },
          {
            name: "Biome",
            description:
              "Because configuring ESLint and Prettier was taking years off my life.",
            url: "https://biomejs.dev/",
          },
          {
            name: "fnm (Fast Node Manager)",
            description: "Because nvm is too slow for my impatience.",
            url: "https://github.com/Schniz/fnm",
          },
        ],
      },
    ],
  },
  {
    title: "Desk Setup",
    id: "desk",
    subcategories: [
      {
        label: "🪑 Furniture",
        items: [
          {
            name: 'Generic 40" desk',
            description:
              "It can bear the weight of my keyboard, monitor, laptop, and a jar of cookies.",
            url: "https://a.co/d/04MdUuzU",
          },
          {
            name: "Generic office chair",
            description:
              "My back's best friend. Costs as much as weekly grocery.",
            url: "https://a.co/d/0av22bFK",
          },
        ],
      },
      {
        label: "🔌 Accessories",
        items: [
          {
            name: "LED Desk Lamp",
            description: "Saves my eyes and some electricity.",
            url: "https://a.co/d/0elZThCm",
          },
          {
            name: "A surge protector",
            description:
              "I can't afford to lose my laptop and my life together.",
            url: "https://a.co/d/0bUERo1h",
          },
        ],
      },
    ],
  },
  {
    title: "Misc",
    id: "misc",
    subcategories: [
      {
        label: "⚡ Productivity",
        items: [
          {
            name: "Raycast",
            description: "Spotlight on steroids. I use 1% of its features.",
            url: "https://www.raycast.com/",
          },
          {
            name: "Bitwarden",
            description: "Because I can't trust my memory anymore.",
            url: "https://bitwarden.com/",
          },
        ],
      },
      {
        label: "🎨 Design",
        items: [
          {
            name: "Figma",
            description: "I draw rectangles here.",
            url: "https://www.figma.com/",
          },
          {
            name: "Excalidraw",
            description: "I draw messy rectangles here.",
            url: "https://excalidraw.com/",
          },
        ],
      },
      {
        label: "🎙️ Podcasts I Keep Going Back To",
        items: [
          {
            name: "Syntax – Wes Bos & Scott Tolinski",
            url: "https://syntax.fm/",
          },
          {
            name: "The Changelog",
            url: "https://changelog.com/podcast",
          },
        ],
      },
    ],
  },
];

export default function UsesPage() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-zinc-50 dark:bg-black">
      <main
        id="main-content"
        className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-6 sm:px-16 bg-white dark:bg-black sm:items-start"
      >
        <section className="w-full">
          {/* Header */}
          <h1 className="text-2xl text-foreground">Uses</h1>
          <p className="mt-2 text-muted-foreground">
            No one cares about the things I use daily, so I am gonna list them
            anyway.
          </p>

          {/* Quick section navigation */}
          <div className="mt-6">
            <SectionNav sections={usesData} />
          </div>

          {/* Sections */}
          {usesData.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="mt-14 scroll-mt-24"
            >
              <h2 className="text-lg text-foreground font-medium">
                {section.title}
              </h2>

              {section.subcategories.map((sub) => (
                <div key={sub.label} className="mt-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
                    {sub.label}
                  </p>

                  <div className="mt-4 space-y-6">
                    {sub.items.map((item) => (
                      <div
                        key={item.name}
                        className="border-l border-muted/60 pl-5"
                      >
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground font-medium hover:underline hover:decoration-dotted hover:underline-offset-3"
                          >
                            {item.name}
                          </a>
                        ) : (
                          <p className="text-foreground font-medium">
                            {item.name}
                          </p>
                        )}

                        {item.description && (
                          <p className="mt-1 text-muted-foreground text-sm">
                            {item.description}
                          </p>
                        )}

                        {item.details && item.details.length > 0 && (
                          <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-muted-foreground/80">
                            {item.details.map((d) => (
                              <li key={d}>{d}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
