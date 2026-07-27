// weatherapp/features/recommendation/hooks/useRecommendation.ts — F-W07
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getRecommendation } from "@/lib/recommendationClient";
import { useWeatherData } from "@/features/forecast/hooks/useWeatherData";

export function useRecommendation() {
  const { data: session, status } = useSession();
  const { data: weather } = useWeatherData();
  const token = (session as { backendToken?: string })?.backendToken;

  return useQuery({
    queryKey: ["recommendation", weather?.current, token],
    queryFn: () => getRecommendation(token!, weather!.current),
    enabled: status === "authenticated" && !!token && !!weather,
    staleTime: 30 * 60 * 1000,
  });
}
