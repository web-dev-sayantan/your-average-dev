/* eslint-disable react/no-danger */
import type { ThemeScriptProps } from "./types";

// Inline script to set the theme class before React hydrates.
const themeScript = `(() => {
  const storageKey = "theme";
  const defaultTheme = "system";
  const cookieMaxAge = 31536000;
  const classList = document.documentElement.classList;
  const isTheme = (value) => value === "light" || value === "dark" || value === "system";
  const getCookie = (name) => {
    const cookies = document.cookie ? document.cookie.split("; ") : [];
    const cookie = cookies.find((entry) => entry.startsWith(name + "="));
    return cookie ? cookie.slice(name.length + 1) : null;
  };
  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const resolveTheme = (theme) => (theme === "system" ? getSystemTheme() : theme);

  let storedTheme = null;
  try {
    storedTheme = getCookie(storageKey);
  } catch {
    storedTheme = null;
  }

  const theme = isTheme(storedTheme) ? storedTheme : defaultTheme;
  const resolvedTheme = resolveTheme(theme);

  try {
    document.cookie =
      storageKey + "=" + theme + "; path=/; max-age=" + cookieMaxAge + "; samesite=lax";
  } catch {
    // Ignore cookie failures in restricted environments.
  }

  classList.remove("light", "dark");
  classList.add(resolvedTheme);
})();`;

export const ThemeScript = ({ nonce }: ThemeScriptProps) => (
  // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for pre-hydration theme setup.
  <script nonce={nonce} dangerouslySetInnerHTML={{ __html: themeScript }} />
);
