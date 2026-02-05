"use client";
import { LaptopMinimal, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <fieldset className="flex items-center rounded-md border border-border/60 m-0 min-w-0 p-0">
      <legend className="sr-only">Theme</legend>
      <Button
        variant={theme === "light" ? "default" : "ghost"}
        size="icon"
        className="hover:outline-hidden hover:outline-transparent"
        type="button"
        aria-pressed={theme === "light"}
        aria-label="Switch to light theme"
        onClick={() => setTheme("light")}
      >
        <Sun
          className={cn(
            "h-5 w-5 text-brand-800",
            theme === "light" && "text-brand-50",
          )}
          aria-hidden="true"
        />
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "ghost"}
        size="icon"
        className="rounded-md border-l border-r hover:outline-hidden hover:outline-transparent"
        type="button"
        aria-pressed={theme === "dark"}
        aria-label="Switch to dark theme"
        onClick={() => setTheme("dark")}
      >
        <Moon
          className={cn(
            "h-5 w-5 text-brand-800",
            theme === "dark" && "text-brand-50",
          )}
          aria-hidden="true"
        />
      </Button>
      <Button
        variant={theme === "system" ? "default" : "ghost"}
        className="hover:outline-hidden hover:outline-transparent"
        size="icon"
        type="button"
        aria-pressed={theme === "system"}
        aria-label="Use system theme"
        onClick={() => setTheme("system")}
      >
        <LaptopMinimal
          className={cn(
            "h-5 w-5 text-brand-800",
            theme === "system" && "text-brand-50",
          )}
          aria-hidden="true"
        />
      </Button>
    </fieldset>
  );
}
