export function parseDuration(mmss: string): number {
  const [m, s] = mmss.split(":").map(Number);
  return m * 60 + s;
}

export function formatTime(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${rem.toString().padStart(2, "0")}`;
}
