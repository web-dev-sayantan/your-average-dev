/* eslint-disable react/no-danger */
import type { ThemeScriptProps } from "./types";

// Inline script to set the theme class before React hydrates.
const themeScript = `(() => {
  const storageKey = "theme";
  const defaultTheme = "system";
  const classList = document.documentElement.classList;
  const isTheme = (value) => value === "light" || value === "dark" || value === "system";
  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const resolveTheme = (theme) => (theme === "system" ? getSystemTheme() : theme);

  let storedTheme = null;
  try {
    storedTheme = localStorage.getItem(storageKey);
  } catch {
    storedTheme = null;
  }

  const theme = isTheme(storedTheme) ? storedTheme : defaultTheme;
  const resolvedTheme = resolveTheme(theme);

  classList.remove("light", "dark");
  classList.add(resolvedTheme);
})();`;

export const ThemeScript = ({ nonce }: ThemeScriptProps) => (
  // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for pre-hydration theme setup.
  <script nonce={nonce} dangerouslySetInnerHTML={{ __html: themeScript }} />
);
