/**
 * shared/hooks/useDebounce.ts
 *
 * Generic debounce hook, deliberately placed in `shared/` rather than
 * `features/search/` — it has no search-specific logic and will be
 * reused wherever a value needs to settle before triggering work
 * (e.g. a future settings input), not duplicated per feature.
 */
import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timeout);
  }, [value, delayMs]);

  return debounced;
}
