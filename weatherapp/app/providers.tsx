"use client";
// weatherapp/app/providers.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { LocationProvider } from "@/context/LocationContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
      })
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <LocationProvider>{children}</LocationProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
