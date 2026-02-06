"use client";

import { Menu, MessageCircleMore, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const openButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    if (!isMenuOpen) return;

    const body = document.body;
    const html = document.documentElement;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyTouchAction = body.style.touchAction;
    const prevHtmlOverflow = html.style.overflow;

    const nav = document.getElementById("site-nav");
    const main = document.getElementById("main-content");
    const skipLink = document.querySelector<HTMLAnchorElement>(
      'a[href="#main-content"]',
    );

    const hiddenTargets = [nav, main, skipLink].filter(
      (target): target is HTMLElement => Boolean(target),
    );

    const prevHiddenState = hiddenTargets.map((target) => ({
      el: target,
      ariaHidden: target.getAttribute("aria-hidden"),
      hadInert: target.hasAttribute("inert"),
    }));

    body.style.overflow = "hidden";
    body.style.touchAction = "none";
    html.style.overflow = "hidden";

    hiddenTargets.forEach((target) => {
      target.setAttribute("aria-hidden", "true");
      target.setAttribute("inert", "");
    });

    return () => {
      body.style.overflow = prevBodyOverflow;
      body.style.touchAction = prevBodyTouchAction;
      html.style.overflow = prevHtmlOverflow;

      prevHiddenState.forEach(({ el, ariaHidden, hadInert }) => {
        if (ariaHidden === null) {
          el.removeAttribute("aria-hidden");
        } else {
          el.setAttribute("aria-hidden", ariaHidden);
        }

        if (hadInert) {
          el.setAttribute("inert", "");
        } else {
          el.removeAttribute("inert");
        }
      });
    };
  }, [isMenuOpen]);

  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      handleCloseMenu();
      return;
    }

    if (event.key !== "Tab") return;

    const menu = event.currentTarget;
    const focusableSelectors = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
    ].join(", ");
    const focusables = Array.from(
      menu.querySelectorAll<HTMLElement>(focusableSelectors),
    ).filter((el) => !el.hasAttribute("inert"));

    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const isShift = event.shiftKey;
    const active = document.activeElement as HTMLElement | null;

    if (isShift && active === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!isShift && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    lastFocusedElementRef.current =
      (document.activeElement as HTMLElement | null) ?? null;
    closeButtonRef.current?.focus();

    return () => {
      const restoreTarget =
        lastFocusedElementRef.current ?? openButtonRef.current;
      restoreTarget?.focus();
    };
  }, [isMenuOpen]);

  return (
    <header className="w-full border-b border-border/60 backdrop-blur-lg md:sticky md:top-0 md:z-40">
      <nav
        id="site-nav"
        className="relative mx-auto flex h-16 items-center justify-between px-4 md:grid md:max-w-6xl md:grid-cols-[1fr_auto_1fr] md:gap-6"
      >
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
          ref={openButtonRef}
          className="inline-flex size-9 items-center justify-center rounded-md border border-border/60 text-foreground transition hover:bg-muted md:hidden"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        className={cn(
          "fixed right-0 top-0 z-50 flex h-dvh w-full flex-col bg-background/95 backdrop-blur overscroll-contain transition-transform duration-300 md:hidden",
          isMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full pointer-events-none opacity-0 invisible",
        )}
        aria-hidden={!isMenuOpen}
        onKeyDown={handleMenuKeyDown}
      >
        <h2 id="mobile-menu-title" className="sr-only">
          Mobile navigation
        </h2>
        <div className="flex items-center justify-between px-4 py-4">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            an_average_dev
          </span>
          <button
            type="button"
            aria-label="Close menu"
            ref={closeButtonRef}
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
