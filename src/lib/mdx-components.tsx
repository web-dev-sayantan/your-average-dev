import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="mt-8 mb-4 text-2xl font-semibold text-foreground">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-8 mb-3 text-xl font-semibold text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 mb-2 text-lg font-medium text-foreground">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-4 leading-7 text-muted-foreground">{children}</p>
  ),
  a: ({ href, children }) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-4 hover:text-foreground/80"
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href ?? "#"}
        className="text-foreground underline underline-offset-4 hover:text-foreground/80"
      >
        {children}
      </Link>
    );
  },
  ul: ({ children }) => (
    <ul className="my-4 list-inside list-disc space-y-2 text-muted-foreground">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 list-inside list-decimal space-y-2 text-muted-foreground">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-muted-foreground/40 pl-4 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  hr: () => <hr className="my-8 border-border" />,
};

export function useMDXComponents(
  overrideComponents: MDXComponents,
): MDXComponents {
  return {
    ...components,
    ...overrideComponents,
  };
}

export const mdxComponents = components;
