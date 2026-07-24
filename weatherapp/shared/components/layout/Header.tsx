"use client";

/**
 * shared/components/layout/Header.tsx
 *
 * Persistent app header — houses the search bar and stays visible
 * regardless of scroll position, closing out the "always visible"
 * half of R-WA06 (the search hook/UI itself covered the rest). [F-W01]
 *
 * Deliberately `sticky`, not `fixed`: fixed positioning removes the
 * header from document flow entirely, which means every page below
 * it would need a manual top-offset (padding/margin matching the
 * header's height) to avoid content sliding underneath it — a value
 * that has to be kept in sync by hand everywhere. Sticky participates
 * in normal flow until the scroll threshold, then pins itself, so no
 * other component needs to know or care how tall the header is.
 *
 * Placed in shared/components/layout/ rather than shared/components/ui/
 * — this composes a feature (SearchBar) into app-wide chrome, it isn't
 * a reusable design-system primitive like Button or Card.
 */
import { SearchBar } from "@/features/search/components/SearchBar";

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-border
                 bg-background/80 backdrop-blur-md
                 px-4 py-3 sm:px-6"
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 sm:flex-nowrap sm:gap-4">
        {/* Sans, not mono — mono is reserved exclusively for data
            readouts (see .text-readout in globals.css). Keeping the
            wordmark in sans means mono showing up anywhere in the UI
            reliably signals "this is a live number," not just "brand
            font." That distinction is the whole point of pairing two
            faces instead of one. */}
        <span className="shrink-0 text-lg font-semibold tracking-tight text-accent">
          WeatherMind<span className="text-text-primary">AI</span>
        </span>
        <SearchBar />
      </div>
    </header>
  );
}
