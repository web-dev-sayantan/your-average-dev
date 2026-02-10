"use client";

import { Analytics } from "@vercel/analytics/next";
import { useEffect, useState } from "react";
import { getConsentFromDocument } from "@/lib/cookies/consent";

const isAnalyticsEnabled = () => Boolean(getConsentFromDocument()?.analytics);

export default function AnalyticsConsent() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const update = () => setEnabled(isAnalyticsEnabled());
    update();

    if (typeof window !== "undefined") {
      window.addEventListener("cookie-consent-updated", update);
      return () => window.removeEventListener("cookie-consent-updated", update);
    }
    return undefined;
  }, []);

  if (!enabled) {
    return null;
  }

  return <Analytics />;
}
