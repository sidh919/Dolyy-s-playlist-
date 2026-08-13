export type Weather = "dawn" | "noon" | "evening";

export const WEATHERS: { id: Weather; label: string }[] = [
  { id: "dawn", label: "Dawn" },
  { id: "noon", label: "Noon" },
  { id: "evening", label: "Evening" },
];

/** Picks a sensible default so the first paint already matches the visitor's clock. */
export function weatherForHour(hour: number): Weather {
  if (hour >= 5 && hour < 11) return "dawn";
  if (hour >= 11 && hour < 17) return "noon";
  return "evening";
}
