import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeToggle from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "My App",
  description: "Users management & signup",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
        <ThemeProvider>
          <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur dark:bg-neutral-900/80">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
              <Link href="/" className="text-lg font-semibold tracking-tight">
                MyApp
              </Link>
              <nav className="flex items-center gap-4">
                <Link
                  href="/users"
                  className="rounded-xl border px-3 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Users
                </Link>
                <Link
                  href="/sign_up"
                  className="rounded-xl border px-3 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Sign Up
                </Link>
                <ThemeToggle />
              </nav>
            </div>
          </header>

          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

          <footer className="mt-20 border-t py-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
            © {new Date().getFullYear()} MyApp. All rights reserved.
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
