// features/forecast/hooks/useWeatherData.ts
// One fetch, powers current + daily + weekly cards (R-WA08-R-WA11)

import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../api/weather";
import { useLocation } from "@/context/LocationContext";
import type { WeatherData } from "../types";

export function useWeatherData() {
  const { location } = useLocation();

  return useQuery<WeatherData>({
    queryKey: ["weather", location?.latitude, location?.longitude],
    queryFn: async () => {
      const raw = await fetchWeather(location!.latitude, location!.longitude);
      return {
        current: {
          temperature: raw.current.temperature_2m,
          feelsLike: raw.current.apparent_temperature,
          humidity: raw.current.relative_humidity_2m,
          windSpeed: raw.current.wind_speed_10m,
          weatherCode: raw.current.weather_code,
        },
        daily: raw.daily.time.map((date: string, i: number) => ({
          date,
          weatherCode: raw.daily.weather_code[i],
          tempMax: raw.daily.temperature_2m_max[i],
          tempMin: raw.daily.temperature_2m_min[i],
          precipitationChance: raw.daily.precipitation_probability_max[i],
          uvIndex: raw.daily.uv_index_max[i],
        })),
      };
    },
    enabled: !!location,
    staleTime: 10 * 60 * 1000,
  });
}
