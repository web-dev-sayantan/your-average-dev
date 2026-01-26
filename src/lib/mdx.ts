import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import type { Rant, RantFrontmatter, RantMeta } from "@/../content/config";

const RANTS_DIR = path.join(process.cwd(), "content", "rants");
const WORDS_PER_MINUTE = 250;

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / WORDS_PER_MINUTE);
}

export async function getAllRants(): Promise<RantMeta[]> {
  const files = await fs.readdir(RANTS_DIR);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  const rants = await Promise.all(
    mdxFiles.map(async (file) => {
      const filePath = path.join(RANTS_DIR, file);
      const fileContent = await fs.readFile(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      const frontmatter = data as RantFrontmatter;

      return {
        ...frontmatter,
        readingTime: calculateReadingTime(content),
      };
    }),
  );

  // Sort by date descending (newest first)
  return rants.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getRantBySlug(slug: string): Promise<Rant | null> {
  const files = await fs.readdir(RANTS_DIR);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  for (const file of mdxFiles) {
    const filePath = path.join(RANTS_DIR, file);
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const frontmatter = data as RantFrontmatter;

    if (frontmatter.slug === slug) {
      return {
        ...frontmatter,
        content,
        readingTime: calculateReadingTime(content),
      };
    }
  }

  return null;
}

export async function getAllRantSlugs(): Promise<string[]> {
  const rants = await getAllRants();
  return rants.map((rant) => rant.slug);
}
