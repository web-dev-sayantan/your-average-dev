"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createConsentCookieValue,
  getConsentFromDocument,
  type CookiePreferences,
} from "@/lib/cookies/consent";

const THEME_COOKIE = "theme";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    const stored = getConsentFromDocument();
    return (
      stored ?? {
        essential: true,
        appearance: true,
        analytics: false,
      }
    );
  });

  useEffect(() => {
    setIsMounted(true);
    if (!getConsentFromDocument()) {
      setIsVisible(true);
    }
  }, []);

  const secureFlag = useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }
    return window.location.protocol === "https:" ? "; Secure" : "";
  }, []);

  const persistPreferences = (nextPreferences: CookiePreferences) => {
    document.cookie = createConsentCookieValue(nextPreferences, secureFlag);

    if (!nextPreferences.appearance) {
      document.cookie = `${THEME_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax${secureFlag}`;
    }

    setIsVisible(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cookie-consent-updated"));
    }
  };

  const handleSave = () => {
    persistPreferences(preferences);
  };

  const handleAcceptAll = () => {
    persistPreferences({
      essential: true,
      appearance: true,
      analytics: true,
    });
  };

  const handleEssentialOnly = () => {
    persistPreferences({
      essential: true,
      appearance: false,
      analytics: false,
    });
  };

  if (!isMounted || !isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-border bg-background/95 px-5 py-4 shadow-lg backdrop-blur">
        <div className="space-y-2">
          <p className="text-sm text-foreground">
            Cookie menu: choose your own crumbs. Essential ones keep the lights
            on, appearance cookies remember your theme, and analytics help me
            figure out which pixels you vibe with.
          </p>
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-card/60 p-3 text-sm">
            <label className="flex items-center justify-between gap-4">
              <span className="text-foreground">Essential cookies</span>
              <input
                type="checkbox"
                checked
                disabled
                className="h-4 w-4 cursor-not-allowed accent-foreground"
                aria-label="Essential cookies are always on"
              />
            </label>
            <label className="flex items-center justify-between gap-4">
              <span className="text-foreground">Appearance cookies</span>
              <input
                type="checkbox"
                checked={preferences.appearance}
                onChange={(event) =>
                  setPreferences((current) => ({
                    ...current,
                    appearance: event.target.checked,
                  }))
                }
                className="h-4 w-4 accent-foreground"
              />
            </label>
            <label className="flex items-center justify-between gap-4">
              <span className="text-foreground">Analytics cookies</span>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(event) =>
                  setPreferences((current) => ({
                    ...current,
                    analytics: event.target.checked,
                  }))
                }
                className="h-4 w-4 accent-foreground"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={handleEssentialOnly}
            className="inline-flex items-center justify-center rounded-full border border-foreground/15 px-4 py-2 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="inline-flex items-center justify-center rounded-full border border-foreground/10 bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Accept all crumbs
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center rounded-full border border-foreground/15 px-4 py-2 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Save my crumbs
          </button>
        </div>
      </div>
    </div>
  );
}
