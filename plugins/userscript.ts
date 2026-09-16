import type { Plugin } from "vite";

export interface UserscriptOptions {
  /** Complete `// ==UserScript== ... ==/UserScript==` block. */
  meta: string;
  /** Userscript file name, relative to `build.outDir`. */
  fileName?: string;
  /** File name of the metadata-only script, relative to `build.outDir`. Set to `false` to skip it. */
  metaFileName?: string | false;
}

/**
 * Prepends the userscript metadata block to the entry chunk and emits the
 * `.meta.js` companion file.
 */
export function userscript(options: UserscriptOptions): Plugin {
  const metaFileName = options.metaFileName === undefined ? "comic-looms.meta.js" : options.metaFileName;

  return {
    name: "userscript",
    apply: "build",
    enforce: "post",

    generateBundle(_outputOptions, bundle) {
      const entryChunk = Object.values(bundle).find((item) => item.type === "chunk" && item.isEntry);
      if (!entryChunk || entryChunk.type !== "chunk") throw new Error("[userscript] no entry chunk found");
      entryChunk.code = `${options.meta}\n\n${entryChunk.code}`;
      if (metaFileName !== false) this.emitFile({ type: "asset", fileName: metaFileName, source: options.meta });
    },
  };
}
