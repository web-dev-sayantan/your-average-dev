"use client";

import { Menu, MessageCircleMore, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "home", mobileOnly: true },
    { href: "/rants", label: "rants" },
    { href: "/work", label: "work" },
    { href: "/interests", label: "interests" },
    { href: "/uses", label: "uses" },
    { href: "/resume", label: "resume" },
    {
      href: "/say-hello",
      label: "say hello",
      mobileLabel: "ping",
      mobileOnly: true,
    },
  ];

  const isActiveRoute = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const getNavLinkClass = (href: string, baseClassName: string) =>
    cn(
      baseClassName,
      isActiveRoute(href) &&
        "underline decoration-dotted underline-offset-2 text-foreground",
    );

  const renderNavLinks = ({
    baseClassName,
    onClick,
    mobile,
  }: {
    baseClassName: string;
    onClick?: () => void;
    mobile: boolean;
  }) =>
    navItems
      .filter((item) => (mobile ? item.mobileOnly !== false : !item.mobileOnly))
      .map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={getNavLinkClass(item.href, baseClassName)}
          onClick={onClick}
        >
          {mobile && item.mobileLabel ? item.mobileLabel : item.label}
        </Link>
      ));

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full border-b border-border/60 backdrop-blur-lg md:sticky md:top-0 md:z-40">
      <nav className="relative mx-auto flex h-16 items-center justify-between px-4 md:grid md:max-w-6xl md:grid-cols-[1fr_auto_1fr] md:gap-6">
        <div className="flex gap-3 items-center">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-foreground"
          >
            an_average_dev
          </Link>
          <Link
            href="/say-hello"
            className={cn(
              buttonVariants(),
              "animate-pulse motion-reduce:animate-none",
            )}
            aria-label="Say hello"
            title="Say hello"
          >
            <MessageCircleMore aria-hidden="true" />
          </Link>
        </div>

        <div className="hidden items-center justify-center gap-12 md:flex">
          {renderNavLinks({
            baseClassName:
              "text-sm text-muted-foreground transition-colors hover:text-primary",
            mobile: false,
          })}
        </div>

        <div className="hidden items-center justify-end md:flex">
          <ThemeToggle />
        </div>

        <button
          type="button"
          aria-label="Open menu"
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
          className="inline-flex size-9 items-center justify-center rounded-md border border-border/60 text-foreground transition hover:bg-muted md:hidden"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "fixed right-0 top-0 z-50 flex h-dvh w-full flex-col bg-background/95 backdrop-blur overscroll-contain transition-transform duration-300 md:hidden",
          isMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full pointer-events-none opacity-0 invisible",
        )}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            an_average_dev
          </span>
          <button
            type="button"
            aria-label="Close menu"
            className="inline-flex size-9 items-center justify-center rounded-md border border-border/60 text-foreground transition hover:bg-muted"
            onClick={handleCloseMenu}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-between px-6 py-12">
          <div className="flex flex-col items-center gap-12 text-lg">
            {renderNavLinks({
              baseClassName:
                "text-foreground transition-colors hover:text-primary",
              onClick: handleCloseMenu,
              mobile: true,
            })}
          </div>

          <div className="pt-8 flex items-center justify-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
