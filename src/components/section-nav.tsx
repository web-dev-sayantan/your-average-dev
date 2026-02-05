"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type UsesSection = {
  title: string;
  id: string;
};

type SectionNavProps = {
  sections: UsesSection[];
};

export default function SectionNav({ sections }: SectionNavProps) {
  const navRef = useRef<HTMLElement | null>(null);
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    const target = navRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloating(!entry.isIntersecting);
      },
      {
        rootMargin: "0px 0px -40% 0px",
        threshold: 0,
      },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Page sections"
        className="flex flex-wrap gap-x-3 gap-y-2 text-sm"
      >
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="min-w-25 text-center text-muted-foreground rounded-full border border-primary/30 bg-background/85 px-4 py-1.5 transition-colors hover:text-foreground"
          >
            {s.title}
          </a>
        ))}
      </nav>

      <nav
        aria-label="Page sections"
        aria-hidden={!showFloating}
        className={`pointer-events-none fixed left-1/2 top-20 z-30 hidden -translate-x-1/2 md:flex ${
          showFloating ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="pointer-events-auto flex flex-wrap items-center gap-2.5">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={cn(
                "min-w-25 text-center rounded-full border border-border/70 bg-background/85 px-4 py-2.5 text-xs text-muted-foreground [box-shadow:0_0_20px_0px_color-mix(in_oklch,var(--primary)_20%,transparent)] backdrop-blur transition-colors hover:bg-muted hover:text-foreground",
                !showFloating && "hidden pointer-events-none",
              )}
            >
              {s.title}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
