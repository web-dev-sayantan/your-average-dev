export type CookiePreferences = {
  essential: true;
  appearance: boolean;
  analytics: boolean;
};

export const CONSENT_COOKIE = "cookie_consent";
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 365;

const parseConsentPayload = (payload: unknown): CookiePreferences | null => {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const record = payload as Record<string, unknown>;

  return {
    essential: true,
    appearance: Boolean(record.appearance),
    analytics: Boolean(record.analytics),
  };
};

export const parseConsentCookieValue = (
  value: string | null | undefined,
): CookiePreferences | null => {
  if (!value) {
    return null;
  }

  if (value === "1") {
    return {
      essential: true,
      appearance: true,
      analytics: true,
    };
  }

  try {
    const decoded = decodeURIComponent(value);
    const parsed = JSON.parse(decoded);
    return parseConsentPayload(parsed);
  } catch {
    return null;
  }
};

const readCookieValue = (
  cookieString: string | undefined,
  name: string,
): string | null => {
  if (!cookieString) {
    return null;
  }

  const cookies = cookieString.split(";");
  for (const rawCookie of cookies) {
    const cookie = rawCookie.trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.slice(name.length + 1);
    }
  }

  return null;
};

export const getConsentFromDocument = (): CookiePreferences | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const value = readCookieValue(document.cookie, CONSENT_COOKIE);
  return parseConsentCookieValue(value);
};

export const createConsentCookieValue = (
  preferences: CookiePreferences,
  secureFlag: string,
) => {
  const payload = encodeURIComponent(
    JSON.stringify({
      v: CONSENT_VERSION,
      ...preferences,
    }),
  );

  return `${CONSENT_COOKIE}=${payload}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax${secureFlag}`;
};
