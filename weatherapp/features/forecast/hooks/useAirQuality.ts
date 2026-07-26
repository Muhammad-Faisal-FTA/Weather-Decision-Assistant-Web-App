// features/forecast/hooks/useAirQuality.ts
// Separate query from useWeatherData — a failed air-quality call
// must not affect the weather cards. [R-WA18]
import { useQuery } from "@tanstack/react-query";
import { fetchAirQuality } from "../api/airQuality";
import { useLocation } from "@/context/LocationContext";

export function useAirQuality() {
  const { location } = useLocation();

  return useQuery({
    queryKey: ["airQuality", location?.latitude, location?.longitude],
    queryFn: async () => {
      const raw = await fetchAirQuality(location!.latitude, location!.longitude);
      return {
        pm10: raw.current.pm10,
        pm25: raw.current.pm2_5,
        uvIndex: raw.current.uv_index,
      };
    },
    enabled: !!location,
    staleTime: 10 * 60 * 1000,
  });
}
