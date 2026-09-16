#!/usr/bin/env node
/**
 * Development loop for the userscript:
 *
 *   npm run dev
 *
 * - serves the project root over HTTP (like `miniserve .`), so the last
 *   successful build can be installed from
 *   `http://localhost:8080/dist/comic-looms.user.js`
 * - watches `src/`, `plugins/` and the build config files, and reruns the
 *   build (`tsc` + `vite build`) on every change
 * - builds into `dist/.dev` and only moves the files into `dist/` after a
 *   successful build, so a broken build never replaces the installed script
 */
import { spawn } from "node:child_process";
import { createReadStream, watch } from "node:fs";
import { mkdir, rename, rm, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { dirname, extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const STAGING = join(DIST, ".dev");
const OUTPUT_FILES = ["comic-looms.user.js", "comic-looms.meta.js"];
const WATCH_DIRS = ["src", "plugins"];
const WATCH_FILES = new Set(["vite.config.ts", "userscript.meta.ts", "userscript.icon.ts", "tsconfig.json", "package.json"]);
const PORT = Number(process.env.PORT ?? 8080);

const TSC = require.resolve("typescript/bin/tsc");
const VITE = join(dirname(require.resolve("vite/package.json")), "bin", "vite.js");

const color = (code, text) => (process.stdout.isTTY ? `\x1b[${code}m${text}\x1b[0m` : text);
const info = (message) => console.log(color(36, "[dev]"), message);
const success = (message) => console.log(color(32, "[dev]"), message);
const failure = (message) => console.error(color(31, "[dev]"), message);

function run(args) {
  return new Promise((resolvePromise) => {
    const child = spawn(process.execPath, args, { cwd: ROOT, stdio: "inherit" });
    child.on("close", (code) => resolvePromise(code === 0));
  });
}

let building = false;
let pending = false;

async function build() {
  if (building) {
    pending = true;
    return;
  }
  building = true;
  try {
    await rm(STAGING, { recursive: true, force: true });
    info("building...");
    if (!(await run([TSC, "--noEmit"]))) {
      failure("type check failed, dist/ unchanged");
      return;
    }
    if (!(await run([VITE, "build", "--outDir", STAGING]))) {
      failure("build failed, dist/ unchanged");
      return;
    }
    await mkdir(DIST, { recursive: true });
    for (const name of OUTPUT_FILES) {
      await rename(join(STAGING, name), join(DIST, name));
    }
    await rm(STAGING, { recursive: true, force: true });
    success(`built at ${new Date().toLocaleTimeString()} -> dist/comic-looms.user.js`);
  } catch (error) {
    failure(`unexpected error, dist/ unchanged: ${error.message}`);
  } finally {
    building = false;
    if (pending) {
      pending = false;
      void build();
    }
  }
}

const MIME_TYPES = {
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
};

const server = createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url ?? "/", "http://localhost").pathname);
  if (pathname === "/") {
    const installUrl = `http://${req.headers.host ?? `localhost:${PORT}`}/dist/comic-looms.user.js`;
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Comic Looms (dev)</title>
  </head>
  <body>
    <p>Install the userscript:</p>
    <p><a href="${installUrl}">${installUrl}</a></p>
  </body>
</html>
`);
    return;
  }
  const filePath = resolve(ROOT, `.${pathname}`);
  if (!filePath.startsWith(ROOT + sep)) {
    res.writeHead(403).end("forbidden");
    return;
  }
  const stats = await stat(filePath).catch(() => undefined);
  if (!stats?.isFile()) {
    res.writeHead(404).end("not found");
    return;
  }
  res.writeHead(200, {
    "content-type": MIME_TYPES[extname(filePath)] ?? "application/octet-stream",
    "content-length": stats.size,
    "cache-control": "no-cache",
    "access-control-allow-origin": "*",
  });
  if (req.method === "HEAD") res.end();
  else createReadStream(filePath).pipe(res);
});

let debounceTimer;
function scheduleBuild() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => void build(), 200);
}

for (const dir of WATCH_DIRS) {
  watch(join(ROOT, dir), { recursive: true }, () => scheduleBuild());
}
watch(ROOT, { recursive: false }, (_event, filename) => {
  if (filename && WATCH_FILES.has(filename)) scheduleBuild();
});

server.on("error", (error) => {
  failure(error.code === "EADDRINUSE" ? `port ${PORT} is already in use (set PORT to change it)` : error.message);
  process.exit(1);
});

server.listen(PORT, "0.0.0.0", () => {
  info(`serving ${ROOT}`);
  info(`install: http://localhost:${PORT}/dist/comic-looms.user.js`);
  info(`watching ${WATCH_DIRS.join(", ")} and ${[...WATCH_FILES].join(", ")}`);
  void build();
});

process.on("SIGINT", () => {
  server.close();
  process.exit(0);
});
