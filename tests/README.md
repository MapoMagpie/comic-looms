# Media controls and X list discovery

Run `npm ci`, `npm test`, and `npm run build` using Node.js 24.
The Node tests use simulated media clocks, decoder responses and X responses.
They do not require a browser, authentication or access to X. They cover parser
boundaries, pagination, cache/account isolation, volume/seek limits and asynchronous
animation disposal. They do not prove real codec or live X API compatibility.

For the browser regression page, run `npx vite --host 127.0.0.1` and open
`http://127.0.0.1:5173/tests/media-controls.html` in a browser supporting ImageDecoder.
This exercises real GIF/WebP decoding, the original keyboard settings panel and
context menu. Video timing still uses a simulated clock in this page.
The fixtures are four solid-colour frames (red, green, blue, yellow), generated
with Pillow with delays of 100, 200, 100 and 300 ms; the static WebP is one red frame.

## Manual userscript checks

- Install the built userscript in a supported browser/userscript manager and open
  a video in big-image mode. Test K/J/L/,/./M/I/O, toolbar updates and pause state
  when switching media. The video step is approximately 1/30 second, not an exact
  frame seek. Confirm volume 0 remains 0 after switching videos and reloading.
- Remap a media key in the existing keyboard panel and verify it works. Typing in
  an input or editable field must not trigger media actions.
- Open direct animated GIF/WebP files on a supported gallery. Check stepping,
  fast progress dragging, multiple images per page, scroll modes, zoom/rotation,
  chapter changes, closing and reopening the reader. No canvas/control should
  remain after closing. Unsupported decoders retain the normal original image.
- Context menu: 8 media actions for video, 5 for animation, none for static images
  or grid mode. X “GIF” posts are usually videos and use the video path.
- On X home, the original three chapters should appear immediately. With no
  cached management request, check pinned lists; visit the Lists page, then reopen
  Comic Looms on home and check owned/subscribed lists. Check names, duplicates,
  recommendation exclusion, list-specific pagination and switching accounts.
- Block a list endpoint or clear its cache and ensure the original chapters keep
  working. The management request cache is account-scoped, expires after seven
  days, and never stores authentication headers, cookies or request cursors.

## Current limits

The browser regression page and real authenticated X flows have not yet been run
for this contribution. The X fixture response shapes are synthetic, based on the
provided design; upstream API changes can require parser updates. Discovery
fails closed when a live feature-switch value cannot be found. Resource timing
visibility varies with the browser/userscript manager. The main bundle fallback
only reads the script URL already present in the document; it does not evaluate
downloaded code. Management pagination is capped at 20 requests. Per-list tweet
fetching reuses the existing upstream TwitterListsAPI (including its existing
tweet-timeline query ID).
