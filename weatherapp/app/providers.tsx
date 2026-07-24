"use client";

/**
 * app/providers.tsx
 *
 * Composed client-side provider tree. Wraps the app with:
 *   - React Query   -> caching/dedup for search + (upcoming) weather hooks
 *   - LocationProvider -> shared "current location" state [supports R-WA06-R-WA12]
 *
 * Kept as a single composed component so layout.tsx stays uncluttered
 * as more providers (e.g. auth, once R-WA01 is scheduled) get added
 * in later sprints — one file to touch, not a deeper wrapper tree in
 * the layout itself.
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { LocationProvider } from "@/context/LocationContext";

export function Providers({ children }: { children: React.ReactNode }) {
  // Created inside useState so each browser session gets its own
  // QueryClient instance. Required under the Next.js App Router to
  // avoid one client's cache leaking into another user's request
  // during server rendering.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LocationProvider>{children}</LocationProvider>
    </QueryClientProvider>
  );
}
