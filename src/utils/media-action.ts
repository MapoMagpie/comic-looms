export type MediaKind = "video" | "animation" | undefined;

export function supportsMediaAction(kind: MediaKind, action: string): boolean {
  return kind === "video" || (kind === "animation" && !/^video-(mute|volume)/.test(action));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
