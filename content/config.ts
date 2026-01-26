export interface RantFrontmatter {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags: string[];
  emoji: string;
}

export interface Rant extends RantFrontmatter {
  content: string;
  readingTime: number;
}

export interface RantMeta extends RantFrontmatter {
  readingTime: number;
}
