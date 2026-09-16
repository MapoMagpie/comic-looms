import { defineConfig } from "vite";
import { userscript } from "./plugins/userscript";
import { CDN_PACKAGES, META, VERSION } from "./userscript.meta";

const FILE_NAME = "comic-looms.user.js";

/**
 * Packages that are loaded from a CDN through `@require` and referenced by the
 * global they expose (see `CDN_PACKAGES` in `userscript.meta.ts`).
 */
const externalGlobals = Object.fromEntries(CDN_PACKAGES.map((pkg) => [pkg.name, pkg.global]));

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    _VERSION_: JSON.stringify(VERSION),
  },
  build: {
    target: "esnext",
    // Userscripts are plain files, so keep them readable by default.
    minify: false,
    sourcemap: false,
    // Single IIFE bundle: there is no module loader in a userscript.
    lib: {
      entry: "src/main.ts",
      formats: ["iife"],
      name: "ComicLooms",
      fileName: () => FILE_NAME,
    },
    rolldownOptions: {
      // `simple` debug info adds `//#region <file>` comments to the bundle.
      experimental: { attachDebugInfo: "none" },
      external: Object.keys(externalGlobals),
      output: {
        globals: externalGlobals,
        intro: "'use strict';",
        comments: false,
      },
    },
  },
  plugins: [
    userscript({
      meta: META,
      fileName: FILE_NAME,
    }),
  ],
});
