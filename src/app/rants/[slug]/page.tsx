import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { getAllRantSlugs, getRantBySlug } from "@/lib/mdx";
import { mdxComponents } from "@/lib/mdx-components";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllRantSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const rant = await getRantBySlug(slug);

  if (!rant) {
    return {
      title: "Rant Not Found",
    };
  }

  return {
    title: `${rant.title} | your_average_dev`,
    description: rant.excerpt,
    openGraph: {
      title: rant.title,
      description: rant.excerpt,
      type: "article",
      publishedTime: rant.date,
    },
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const rehypePrettyCodeOptions = {
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
  keepBackground: false,
  defaultLang: "plaintext",
};

export default async function RantPage({ params }: PageProps) {
  const { slug } = await params;
  const rant = await getRantBySlug(slug);

  if (!rant) {
    notFound();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main
        id="main-content"
        className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between px-16 py-32 bg-white dark:bg-black sm:items-start"
      >
        <article className="w-full">
          <Link
            href="/rants"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to rants{" "}
            <span className="dark:hidden text-destructive">
              ( And to dark mode, please! )
            </span>
          </Link>

          <header className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground">
              {rant.emoji} {rant.title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {formatDate(rant.date)} · {rant.readingTime} min read
            </p>
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
          </header>

          <div className="prose-custom">
            <MDXRemote
              source={rant.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                    [rehypePrettyCode, rehypePrettyCodeOptions],
                  ],
                },
              }}
            />
          </div>
        </article>
      </main>
    </div>
  );
}
