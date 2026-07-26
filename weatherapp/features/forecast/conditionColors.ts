// features/forecast/conditionColors.ts
// Maps a metric value to a semantic color class — the only place
// these thresholds live, so tuning them later is a one-file edit.

export function uvColor(uv: number): string {
  if (uv >= 8) return "text-danger";
  if (uv >= 3) return "text-warning";
  return "text-success";
}

export function rainColor(chance: number): string {
  if (chance >= 60) return "text-danger";
  if (chance >= 30) return "text-warning";
  return "text-text-secondary";
}

export function pm25Color(value: number): string {
  if (value >= 35) return "text-danger";
  if (value >= 12) return "text-warning";
  return "text-success";
}

export function pm10Color(value: number): string {
  if (value >= 154) return "text-danger";
  if (value >= 54) return "text-warning";
  return "text-success";
}
