// features/forecast/types.ts

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
}

export interface DailyForecast {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitationChance: number;
  uvIndex: number;
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast[]; // up to 16 entries — sliced per card
}
