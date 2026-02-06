"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  ResolvedTheme,
  Theme,
  ThemeProviderProps,
  UseThemeProps,
} from "./types";

const DEFAULT_STORAGE_KEY = "theme";
const DEFAULT_THEME: Theme = "system";
const LIGHT_DARK_CLASSES: ResolvedTheme[] = ["light", "dark"];
const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const ThemeContext = createContext<UseThemeProps | undefined>(undefined);

/**
 * Type guard function that narrows a string or null value to a valid Theme type.
 * @param value - The value to check against valid theme options
 * @returns `true` if value is one of "light", "dark", or "system"; otherwise `false`
 * @typeParam value is Theme - Asserts that if the function returns true, TypeScript will treat `value` as a Theme type
 */
const isTheme = (value: string | null): value is Theme =>
  value === "light" || value === "dark" || value === "system";

const getSystemTheme = (): ResolvedTheme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const getCookieValue = (name: string): string | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const cookies = document.cookie ? document.cookie.split("; ") : [];
  const cookie = cookies.find((entry) => entry.startsWith(`${name}=`));

  return cookie ? cookie.slice(name.length + 1) : null;
};

const createThemeCookie = (name: string, value: Theme) =>
  `${name}=${value}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; samesite=lax`;

const getStoredTheme = (storageKey: string, defaultTheme: Theme): Theme => {
  try {
    const storedTheme = getCookieValue(storageKey);
    return isTheme(storedTheme) ? storedTheme : defaultTheme;
  } catch {
    return defaultTheme;
  }
};

const removeThemeClasses = (classList: DOMTokenList) => {
  for (const themeClass of LIGHT_DARK_CLASSES) {
    classList.remove(themeClass);
  }
};

const applyThemeClass = (resolvedTheme: ResolvedTheme) => {
  const classList = document.documentElement.classList;
  removeThemeClasses(classList);
  classList.add(resolvedTheme);
};

const disableTransitionsTemporarily = () => {
  const style = document.createElement("style");
  style.setAttribute("data-theme-transition", "");
  style.appendChild(
    document.createTextNode(
      "*,*::before,*::after{transition:none !important;animation:none !important}",
    ),
  );
  document.head.appendChild(style);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      style.remove();
    });
  });
};

export const ThemeProvider = ({
  children,
  defaultTheme = DEFAULT_THEME,
  storageKey = DEFAULT_STORAGE_KEY,
  enableSystem = true,
  disableTransitionOnChange = true,
}: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof window === "undefined"
      ? defaultTheme
      : getStoredTheme(storageKey, defaultTheme),
  );
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() =>
    typeof window === "undefined" ? "dark" : getSystemTheme(),
  );

  const resolvedTheme: ResolvedTheme = theme === "system" ? systemTheme : theme;

  const setTheme = useCallback(
    (nextTheme: Theme) => {
      setThemeState(nextTheme);
      try {
        // biome-ignore lint: Cookie is used to sync theme between server and client.
        document.cookie = createThemeCookie(storageKey, nextTheme);
      } catch {
        // Ignore cookie failures in restricted environments.
      }
    },
    [storageKey],
  );

  useEffect(() => {
    if (!enableSystem) {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      setSystemTheme(media.matches ? "dark" : "light");
    };

    handleChange();
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, [enableSystem]);

  useEffect(() => {
    if (disableTransitionOnChange) {
      disableTransitionsTemporarily();
    }

    applyThemeClass(resolvedTheme);
  }, [resolvedTheme, disableTransitionOnChange]);

  const contextValue = useMemo<UseThemeProps>(
    () => ({
      theme,
      setTheme,
      resolvedTheme,
      systemTheme,
    }),
    [theme, setTheme, resolvedTheme, systemTheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): UseThemeProps => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
};
