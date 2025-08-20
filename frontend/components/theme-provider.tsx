"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark" | "system";
type ThemeContextType = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyThemeClass(theme: Theme) {
  const root = document.documentElement;
  const mode = theme === "system" ? getSystemTheme() : theme;
  root.classList.toggle("dark", mode === "dark");
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  // hydrate from localStorage once on mount
  useEffect(() => {
    const stored = (localStorage.getItem("theme") as Theme) || "system";
    setThemeState(stored);
    applyThemeClass(stored);
    setMounted(true);

    // live-update on system change if theme === system
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const current = (localStorage.getItem("theme") as Theme) || "system";
      if (current === "system") applyThemeClass("system");
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("theme", t);
    applyThemeClass(t);
  };

  const toggleTheme = () => {
    const next = (document.documentElement.classList.contains("dark") ? "light" : "dark") as Theme;
    setTheme(next);
  };

  const resolvedTheme = useMemo<"light" | "dark">(() => {
    if (!mounted) return "light";
    return theme === "system" ? getSystemTheme() : theme;
  }, [theme, mounted]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme]
  );

  // Prevent flashing by rendering children only after first mount
  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-neutral-900" />;
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
