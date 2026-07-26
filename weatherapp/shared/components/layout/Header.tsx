"use client";
// weatherapp/shared/components/layout/Header.tsx
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { SearchBar } from "@/features/search/components/SearchBar";

export function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 sm:flex-nowrap sm:gap-4">
        <span className="shrink-0 text-lg font-semibold tracking-tight text-accent">
          WeatherMind<span className="text-text-primary">AI</span>
        </span>

        <SearchBar />

        <div className="shrink-0 text-sm">
          {status === "authenticated" ? (
            <div className="flex items-center gap-3">
              <Link href="/profile" className="text-text-secondary hover:text-text-primary">
                Profile
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-text-secondary hover:text-text-primary"
              >
                Log out
              </button>
            </div>
          ) : status === "loading" ? null : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-text-secondary hover:text-text-primary">
                Log in
              </Link>
              <Link href="/register" className="font-medium text-accent hover:opacity-80">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
