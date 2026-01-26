"use client";

import { Contact, Menu, MessageCircleMore } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 items-center justify-between px-4 md:grid md:max-w-6xl md:grid-cols-[1fr_auto_1fr] md:gap-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          your_average_dev
        </Link>

        <div className="hidden items-center justify-center gap-12 md:flex">
          <Link
            href="/blog"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            rants
          </Link>
          <Link
            href="/work"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            work
          </Link>
          <Link
            href="/interests"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            interests
          </Link>
          <Link
            href="/resume"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            resume
          </Link>
        </div>

        <div className="hidden items-center justify-end gap-3 md:flex">
          <Link href="/say-hello">
            <Button>
              <MessageCircleMore />
              Hey!
            </Button>
          </Link>
          <ThemeToggle />
        </div>

        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex size-9 items-center justify-center rounded-md border border-border/60 text-foreground transition hover:bg-muted md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>
    </header>
  );
}
