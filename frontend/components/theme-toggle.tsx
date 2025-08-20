"use client";

import React from "react";
import { useTheme } from "./theme-provider";

const ThemeToggle: React.FC = () => {
  const { resolvedTheme, toggleTheme, theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleTheme}
        className="rounded-2xl border px-3 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        aria-label="Toggle Dark Mode"
        title="Toggle Dark Mode"
      >
        {resolvedTheme === "dark" ? "🌙 Dark" : "☀️ Light"}
      </button>

      <select
        className="rounded-xl border px-2 py-1 text-sm bg-transparent text-gray-900 dark:text-gray-100"
        value={theme}
        onChange={(e) => setTheme(e.target.value as any)}
        aria-label="Theme Mode"
        title="Theme Mode"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};

export default ThemeToggle;
