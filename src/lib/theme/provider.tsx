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

const ThemeContext = createContext<UseThemeProps | undefined>(undefined);

const isTheme = (value: string | null): value is Theme =>
  value === "light" || value === "dark" || value === "system";

const getSystemTheme = (): ResolvedTheme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const getStoredTheme = (storageKey: string, defaultTheme: Theme): Theme => {
  try {
    const storedTheme = window.localStorage.getItem(storageKey);
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
    typeof window === "undefined" ? "light" : getSystemTheme(),
  );

  const resolvedTheme: ResolvedTheme = theme === "system" ? systemTheme : theme;

  const setTheme = useCallback(
    (nextTheme: Theme) => {
      setThemeState(nextTheme);
      try {
        window.localStorage.setItem(storageKey, nextTheme);
      } catch {
        // Ignore storage failures in restricted environments.
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
    const resolved = theme === "system" ? systemTheme : theme;

    if (disableTransitionOnChange) {
      disableTransitionsTemporarily();
    }

    applyThemeClass(resolved);
  }, [theme, systemTheme, disableTransitionOnChange]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== storageKey) {
        return;
      }

      const nextTheme = isTheme(event.newValue) ? event.newValue : defaultTheme;
      setThemeState(nextTheme);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [defaultTheme, storageKey]);

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
