"use client";

/**
 * features/search/components/SearchBar.tsx
 *
 * Persistent, always-visible location search bar. [F-W01, R-WA06]
 * Placed inside a sticky Header (shared/components/layout/Header.tsx)
 * so it stays visible on scroll — this component itself only owns
 * search UI/state, not its own position in the page.
 *
 * Two input methods, both writing to the same LocationContext:
 *   1. Typed search -> useLocationSearch (debounced, R-WA06)
 *   2. "Use my location" button -> useCurrentLocation (R-WA07)
 *
 * Full keyboard support on the dropdown (arrow keys, Enter, Escape)
 * per R-WA24 — aria roles alone announce state correctly to screen
 * readers, but don't make the widget operable without a mouse; the
 * onKeyDown handler below is what actually does that.
 */
import { useEffect, useId, useRef, useState } from "react";
import { useLocationSearch } from "../hooks/useLocationSearch";
import { useCurrentLocation } from "../hooks/useCurrentLocation";
import { useLocation } from "@/context/LocationContext";
import type { GeocodeResult } from "../types";

const MIN_QUERY_LENGTH = 2;

export function SearchBar() {
  const { query, setQuery, results, isLoading, isError } = useLocationSearch();
  const { locate, isLocating, error: locateError } = useCurrentLocation();
  const { setLocation } = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  const showDropdown = isOpen && query.trim().length >= MIN_QUERY_LENGTH;

  // Stale index protection: if the result set changes size (new
  // query resolved) while a later index was active, reset rather
  // than pointing past the end of the new array.
  useEffect(() => {
    setActiveIndex(-1);
  }, [results]);

  function handleSelect(result: GeocodeResult) {
    setLocation({
      displayName: result.admin1
        ? `${result.name}, ${result.admin1}, ${result.country}`
        : `${result.name}, ${result.country}`,
      latitude: result.latitude,
      longitude: result.longitude,
    });
    setQuery(result.name);
    setIsOpen(false);
    setActiveIndex(-1);
    inputRef.current?.blur();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showDropdown || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault(); // stop the caret from moving inside the input
        setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0) handleSelect(results[activeIndex]);
        break;
      case "Escape":
        setIsOpen(false);
        setActiveIndex(-1);
        break;
    }
  }

  return (
    // Full width on mobile (fills whatever the header gives it),
    // capped at 448px from the sm breakpoint up — the fixed
    // max-w-md previously applied unconditionally, which forced the
    // header into overflow on narrow viewports.
    <div className="relative w-full sm:max-w-md">
      <input
        ref={inputRef}
        type="text"
        role="combobox"
        aria-expanded={showDropdown}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-label="Search for a city"
        // Tells assistive tech which option is currently highlighted
        // via the keyboard — the accessible equivalent of the visual
        // highlight applied to the active <li> below.
        aria-activedescendant={
          activeIndex >= 0 && results[activeIndex]
            ? `option-${results[activeIndex].id}`
            : undefined
        }
        placeholder="Search for a city..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        className="w-full rounded-md border border-border bg-surface py-3 pl-4 pr-11
                   text-text-primary placeholder:text-text-muted
                   focus:outline-none focus:ring-2 focus:ring-accent
                   transition-colors duration-150 ease-in-out"
      />

      <button
        type="button"
        onClick={locate}
        disabled={isLocating}
        aria-label="Use my current location"
        title="Use my current location"
        className="absolute right-3 top-1/2 -translate-y-1/2
                   text-text-muted hover:text-accent
                   transition-colors duration-150 ease-in-out disabled:opacity-40"
      >
        {isLocating ? (
          <span className="block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M22 12h-3M5 12H2" />
          </svg>
        )}
      </button>

      {locateError && (
        <p className="mt-1.5 text-xs text-danger" role="alert">
          {locateError}
        </p>
      )}

      {showDropdown && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="Location suggestions"
          className="absolute z-10 mt-2 w-full overflow-hidden rounded-md
                     border border-border bg-surface-alt shadow-card"
        >
          {isLoading && (
            <li className="px-4 py-3 text-sm text-text-muted" aria-live="polite">
              Searching…
            </li>
          )}

          {/* Scoped to this dropdown only — a failed search never
              breaks the rest of the dashboard. [R-WA18] */}
          {isError && !isLoading && (
            <li className="px-4 py-3 text-sm text-danger" role="alert">
              Couldn&apos;t search locations right now. Try again.
            </li>
          )}

          {!isLoading && !isError && results.length === 0 && (
            <li className="px-4 py-3 text-sm text-text-muted">
              No matches found.
            </li>
          )}

          {results.map((result, index) => {
            const isActive = index === activeIndex;
            return (
              <li
                key={result.id}
                id={`option-${result.id}`}
                role="option"
                aria-selected={isActive}
              >
                <button
                  type="button"
                  // Keeps focus on the input so onBlur doesn't close
                  // the dropdown before onClick's handleSelect runs.
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelect(result)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors duration-150 ease-in-out
                    ${isActive
                      ? "bg-primary-dark text-text-primary"
                      : "text-text-secondary hover:bg-primary-dark hover:text-text-primary"}`}
                >
                  <span className="text-text-primary">{result.name}</span>
                  {result.admin1 ? `, ${result.admin1}` : ""}
                  {`, ${result.country}`}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
