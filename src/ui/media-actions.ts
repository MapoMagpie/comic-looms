export const mediaActions = {
  "video-play-pause": ["k", "▶/Ⅱ"],
  "video-seek-backward": ["j", "−5s"],
  "video-seek-forward": ["l", "+5s"],
  "video-frame-prev": [",", "◀|"],
  "video-frame-next": [".", "|▶"],
  "video-mute": ["m", "MUTE"],
  "video-volume-up": ["i", "VOL+"],
  "video-volume-down": ["o", "VOL−"],
} as const;

export type MediaAction = keyof typeof mediaActions;
export type MediaKind = "video" | "animation" | undefined;

export function supportsMediaAction(kind: MediaKind, action: string): boolean {
  return kind === "video" || (kind === "animation" && !/^video-(mute|volume)/.test(action));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
