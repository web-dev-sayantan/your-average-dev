"use client";

import { Menu, MessageCircleMore, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full border-b border-border/60 backdrop-blur-sm">
      <nav className="relative mx-auto flex h-16 items-center justify-between px-4 md:grid md:max-w-6xl md:grid-cols-[1fr_auto_1fr] md:gap-6">
        <div className="flex gap-3 items-center">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-foreground"
          >
            your_average_dev
          </Link>
          <Link href="/say-hello" className="animate-pulse">
            <Button>
              <MessageCircleMore />
            </Button>
          </Link>
        </div>

        <div className="hidden items-center justify-center gap-12 md:flex">
          <Link
            href="/rants"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            rants
          </Link>
          <Link
            href="/work"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            work
          </Link>
          <Link
            href="/interests"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            interests
          </Link>
          <Link
            href="/resume"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            resume
          </Link>
        </div>

        <div className="hidden items-center justify-end md:flex">
          <ThemeToggle />
        </div>

        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex size-9 items-center justify-center rounded-md border border-border/60 text-foreground transition hover:bg-muted md:hidden"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      <div
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full flex-col bg-background/95 backdrop-blur transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            your_average_dev
          </span>
          <button
            type="button"
            aria-label="Close menu"
            className="inline-flex size-9 items-center justify-center rounded-md border border-border/60 text-foreground transition hover:bg-muted"
            onClick={handleCloseMenu}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-between px-6 py-12">
          <div className="flex flex-col items-center gap-12 text-lg">
            <Link
              href="/rants"
              className="text-foreground transition-colors hover:text-primary"
              onClick={handleCloseMenu}
            >
              rants
            </Link>
            <Link
              href="/work"
              className="text-foreground transition-colors hover:text-primary"
              onClick={handleCloseMenu}
            >
              work
            </Link>
            <Link
              href="/resume"
              className="text-foreground transition-colors hover:text-primary"
              onClick={handleCloseMenu}
            >
              resume
            </Link>
            <Link
              href="/say-hello"
              className="text-foreground transition-colors hover:text-primary"
              onClick={handleCloseMenu}
            >
              ping
            </Link>
          </div>

          <div className="pt-8 flex items-center justify-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
