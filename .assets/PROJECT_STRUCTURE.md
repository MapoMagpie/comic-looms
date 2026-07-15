# Project Structure

> [!NOTE]
> This document is intended to be supplementing the [CONTRIBUTING](CONTRIBUTING.md) guide.
>
> For deeper architecture notes and internal flow, please see [CONTRIBUTING_ARCHITECTURE.md](.assets/CONTRIBUTING_ARCHITECTURE.md).

> [!TIP]
> For a template file for creating new matchers, check out [template-example.ts](src/platform/matchers/template-example.ts).

```bash
comic-looms/
├── .assets/                           # Localized documentation and assets
│   ├── README_CN.md                   # Chinese README
│   ├── README_ES.md                   # Spanish README
│   ├── README_KO.md                   # Korean README
│   ├── HELP.md                        # General help (English)
│   ├── HELP_CN.md                     # Chinese help
│   ├── HELP_ES.md                     # Spanish help
│   ├── HELP_KO.md                     # Korean help
│   ├── CONTRIBUTING_ARCHITECTURE.md   # Assist document for the contribution guide (English)
│   └── PROJECT_STRUCTURE.md           # Full project structure (English) [THIS DOCUMENT]
│
├── .github/                           # GitHub configuration
│   └── workflows/
│       └── main.yml                   # CI/CD pipeline (GitHub Actions)
│
├── src/                               # Source code (TypeScript)
│   ├── main.ts                        # Entry point: Initializes all core systems
│   │                                    #    - IMGFetcherQueue
│   │                                    #    - IdleLoader
│   │                                    #    - PageFetcher
│   │                                    #    - Downloader
│   │                                    #    - UI managers (BigImageFrameManager, FullViewGridManager)
│   │                                    #    - Event listeners (EBUS subscriptions)
│   │
│   ├── config.ts                      # Global configuration management
│   │                                    #    - Default settings (threads, timeouts, etc.)
│   │                                    #    - Site-specific overrides
│   │                                    #    - Persistence (GM_getValue/GM_setValue or localStorage)
│   │                                    #    - Schema validation & migration
│   │
│   ├── event-bus.ts                   # Central event bus (EBUS)
│   │                                    #    - Pub-sub pattern for cross-module communication
│   │                                    #    - Types: ifq-do, start-download, toggle-main-view, etc.
│   │
│   ├── page-fetcher.ts                # PageFetcher: Orchestrates chapter/page fetching
│   │                                    #    - Uses async generators for lazy loading
│   │
│   ├── img-fetcher.ts                 # IMGFetcher: Individual image fetching
│   │                                    #    - State machine: URL → DATA → DONE
│   │                                    #    - Handles retries (up to 3 times)
│   │                                    #    - Integrates with Matcher for site-specific logic
│   │
│   ├── idle-loader.ts                 # IdleLoader: Background pre-loading
│   │                                    #    - Loads images one-by-one when "Auto Load" is enabled
│   │                                    #    - Uses configurable thread count (maxIdleThreads)
│   │
│   ├── fetcher-queue.ts               # IMGFetcherQueue: Manages concurrent image downloads
│   │                                    #    - Controls how many images load simultaneously (threads)
│   │                                    #    - Tracks current/finished indices
│   │
│   ├── img-node.ts                    # ImageNode: Image metadata container
│   │                                    #    - Encapsulates: thumbnailSrc, href, title, originSrc
│   │                                    #    - Tracks fetch state and DOM elements
│   │
│   ├── filter.ts                      # Filtering logic: Filters images/content based on user settings
│   │
│   ├── download/
│   │   ├── downloader.ts              # Downloader: Batch download and ZIP packaging
│   │   │                                    #    - Handles multi-volume splitting (1.5GB limit)
│   │   │                                    #    - Progress tracking
│   │   │                                    #    - Cherry-picking support
│   │   │
│   │   └── gallery-meta.ts            # Gallery metadata: Defines GalleryMeta type for ZIP storage
│   │
│   ├── platform/                      # Platform adapter system (CORE FOR NEW SITES)
│   │   ├── adapt.ts                   # ADAPTER singleton: Registry for all Matcher implementations
│   │   │                                    #    - URL matching & activation
│   │   │                                    #    - Site-specific configuration merging
│   │   │
│   │   ├── platform.ts                # Base classes: Matcher & BaseMatcher
│   │   │                                    #    - Defines abstract methods for site adapters
│   │   │                                    #    - Provides default implementations for optional methods
│   │   │
│   │   └── matchers/                  # 43+ site-specific matchers (+1 Template)
│   │       ├── template-example.ts    # Template file for creating new matchers
│   │       ├── 18comic.ts             # Handles scrambled/disordered images with obfuscated restoration
│   │       ├── 3hentai.ts             # 3hentai
│   │       ├── akuma.ts               # Akuma.moe
│   │       ├── arca.ts                # Arca.live
│   │       ├── artstation.ts          # ArtStation: Extracts artwork info from page elements
│   │       ├── asmhentai.ts           # ASM Hentai
│   │       ├── bilibili.ts            # Bilibili
│   │       ├── colamanga.ts           # ColaManga
│   │       ├── danbooru.ts            # Danbooru (booru-style)
│   │       ├── douban.ts              # Douban: Chinese media platform
│   │       ├── eahentai.ts            # EA Hentai
│   │       ├── ehentai.ts             # E-Hentai (sprite sheets)
│   │       ├── github.ts              # GitHub: Extracts images from repository pages
│   │       ├── hanime1.ts             # Hanime1
│   │       ├── hdoujin.ts             # HDoujin
│   │       ├── hentainexus.ts         # HentaiNexus
│   │       ├── hentaizap.ts           # HentaiZap
│   │       ├── hitomi.ts              # Hitomi: Directly requests API and decodes content. Handles encrypted image lists
│   │       ├── im-hentai.ts           # IM Hentai
│   │       ├── instagram.ts           # Instagram
│   │       ├── jandan.ts              # Jandan
│   │       ├── kemono.ts              # Kemono (API-based)
│   │       ├── komiic.ts              # Komiic: Comic platform
│   │       ├── konachan.ts            # Konachan
│   │       ├── kuaikanmanhua.ts       # Kuaikan Manhua
│   │       ├── mangacopy.ts           # MangaCopy (AES-CBC decryption)
│   │       ├── mangapark.ts           # MangaPark (server failover)
│   │       ├── mangatoto.ts           # MangaToto (chapter support)
│   │       ├── manhuagui.ts           # ManhuaGui: Chinese comic platform
│   │       ├── mh160.ts               # MH160
│   │       ├── miniserve.ts           # MiniServe (local ZIP)
│   │       ├── mycomic.ts             # MyComic
│   │       ├── nhentai.ts             # nHentai: Extracts all image info from a script tag
│   │       ├── niyaniya.ts            # Niyanya
│   │       ├── pixiv.ts               # Pixiv: Gets artist ID, requests works via API. Handles ugoira animations via FFmpegConvertor
│   │       ├── rokuhentai.ts          # Roku Hentai
│   │       ├── se8.ts                 # SE8
│   │       ├── seqingman.ts           # SeqingMan
│   │       ├── steam.ts               # Steam
│   │       ├── wnacg.ts               # Wnacg
│   │       ├── yabai.ts               # Yabai
│   │       ├── yandere.ts             # Yande.re
│   │       └── ykmh.ts                # YKMH
│   │
│   ├── ui/                            #  User Interface Components (Shadow DOM)
│   │   ├── actions-custom.ts          #  Custom user actions
│   │   ├── big-image-frame-manager.ts #  BigImageFrameManager: Large image viewer UI
│   │   │                                    #    - Navigation controls
│   │   │                                    #    - Zoom, pagination, continuous modes
│   │   │                                    #    - Keyboard/mouse/touch interactions
│   │   │
│   │   ├── chapters-panel.ts          #  ChaptersPanel: Chapter selection UI
│   │   ├── config-panel.ts            #  ConfigPanel: Configuration panel
│   │   │                                    #    - All configurable options
│   │   │                                    #    - Keyboard shortcuts customization
│   │   │                                    #    - Site profiles
│   │   │
│   │   ├── context-menu.ts            #  ContextMenu: Custom right-click context menu
│   │   ├── downloader-canvas.ts       #  DownloaderCanvas: Downloader visualization
│   │   ├── downloader-panel.ts        #  DownloaderPanel: Download management UI
│   │   │                                    #    - Cherry-picking
│   │   │                                    #    - Multi-volume ZIP splitting
│   │   │
│   │   ├── event.ts                   #  UI event handlers
│   │   │                                    #    - Keyboard events
│   │   │                                    #    - Mouse/touch events
│   │   │                                    #    - Context-aware shortcuts
│   │   │
│   │   ├── filter-panel.ts            #  FilterPanel: Image/content filtering UI
│   │   ├── full-view-grid-manager.ts  #  FullViewGridManager: Thumbnail grid UI
│   │   │                                    #    - Lazy-loaded image display
│   │   │                                    #    - Grid/flow modes
│   │   │
│   │   ├── help.ts                    #  HelpPanel: Help panel UI
│   │   ├── html.ts                    #  UI Root: Creates Shadow DOM container
│   │   │                                    #    - Initializes all UI components
│   │   │
│   │   ├── keyboard-custom.ts         #  Keyboard shortcuts customization
│   │   ├── page-helper.ts             #  Floating control bar
│   │   │                                    #    - Navigation buttons
│   │   │                                    #    - Zoom controls
│   │   │                                    #    - Draggable positioning
│   │   │
│   │   ├── site-profiles.ts           #  Site-specific profile management
│   │   │                                    #    - URL overrides
│   │   │                                    #    - Custom settings per site
│   │   │
│   │   ├── style-custom-panel.ts      #  Custom CSS editor
│   │   ├── style.ts                   #  CSS for all UI elements
│   │   │                                    #    - CSS custom properties for theming
│   │   │                                    #    - Responsive design
│   │   │
│   │   └── video-control.ts           #  Video playback controls
│   │
│   └── utils/                         #  Utility Functions
│       ├── debouncer.ts               #  Debounces function calls (e.g., for rapid scrolling)
│       ├── drag-element.ts            #  Draggable element utilities
│       ├── ev-log.ts                  #  EventLogger: Event logging for debugging
│       ├── ffmpeg-convertor.ts        #  FFmpeg WASM for ugoira/video processing
│       ├── ffmpeg.ts                  #  FFmpegIntegration: FFmpeg WASM integration helpers
│       ├── icons.ts                   #  SVG icon definitions
│       ├── image-resizing.ts          #  Image resizing utilities
│       ├── i18n.ts                    #  Internationalization (i18n)
│       │                                     #    - Language detection
│       │                                     #    - Translation management
│       │
│       ├── keyboard.ts                #  KeyboardUtilities: Keyboard utility functions
│       ├── linkify.ts                 #  URL linking utilities
│       ├── media-helper.ts            #  Media handling helpers
│       ├── progress-bar.ts            #  Progress bar UI component
│       ├── query-cssrules.ts          #  QueryCSSRules: CSS rule querying
│       ├── query-element.ts           #  QueryElement: DOM element querying
│       ├── query.ts                   #  Query: Unified network request handler
│       │                                     #    - Wrapper for fetch/GM_xmlhttpRequest
│       │
│       ├── random.ts                  #  RandomUtilities: Random number/string utilities
│       ├── relocate-element.ts        #  RelocateElement: Element repositioning utilities
│       ├── revert-monkey-patch.ts     #  Reverts Violentmonkey/Tampermonkey patches
│       ├── scroller.ts                #  Scroller: Scrolling utilities
│       ├── sleep.ts                   #  Sleep: Async sleep utility (for rate limiting)
│       ├── sprite-split.ts            #  SpriteSplit: Sprite sheet parsing (E-Hentai)
│       │                                     #    - Splits sprites into individual images
│       │
│       ├── touch.ts                   #  TouchUtilities: Touch event utilities
│       ├── ugoira.ts                  #  Ugoira: Pixiv ugoira animation handling
│       ├── url.ts                     #  URLUtilities: URL parsing/manipulation utilities
│       └── zip-stream.ts              #  ZipStream: Streaming ZIP creation
│                                             #    - Multi-volume splitting (1.5GB)
│                                             #    - Handles large galleries
│
├── .gitattributes
├── .gitignore
├── LICENSE                            #  MIT License
├── README.md                          #  User-facing documentation
├── CONTRIBUTING.md                    #  Contribution guide (English)
├── flake.lock                         #  Nix development environment
├── flake.nix                          #  Nix configuration
├── package-lock.json
├── package.json                       #  Dependencies & npm scripts
├── tsconfig.json                      #  TypeScript configuration
├── vite-env.d.ts
└── vite.config.ts                     #  Build configuration
                                              #    - Vite + vite-plugin-monkey
                                              #    - FFmpeg worker embedding
                                              #    - CDN dependencies
                                              #    - Userscript metadata
```
