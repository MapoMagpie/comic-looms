export function isXShortcutEnabled(hostname: string, editing: boolean, repeated: boolean) {
  return /^(x|twitter)\.com$/.test(hostname) && !editing && !repeated;
}

export const xShortcutDefaults = { "x-toggle-like": ["h"], "x-toggle-bookmark": ["b"] };
