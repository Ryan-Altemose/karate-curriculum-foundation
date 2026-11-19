# ESK KataLog

A free, personal-use karate curriculum reference built with Expo, React Native,
and TypeScript. Browse kata, weapon kata, partner drills, self-defense, and belt
requirements. All ranks are accessible without accounts or a backend.

## Current checkpoint

- Search by entry name and an optional reverse-rank-order switch.
- Shared intermediate pages for Sai Kihon, Tonfa Kihon, and Escrima Stick Patterns.
- Partner-drill groups for Conditioning Drills, Fighting Attacks, Uke Waza, and Promise Kumite.
- ESK KataLog app identity, placeholder icons, web manifest, and Apple home-screen metadata.
- The compressed Gojushiho recording is included in production, using the shared
  video registry in `src/data/videos.ts`. The larger original is not referenced
  and is excluded from the web export.

The normal export is suitable for Cloudflare static hosting. Offline caching,
the rest of the video library, and provider embeds are deferred. The current web
app requires a network connection.

The web HTML shows a small loading indicator until React renders the app. Screen
code is bundled together (`expo-router` has web async routes disabled), avoiding
blank screens while fetching individual routes. Videos are still separate assets
and load when their player is opened. Adding a home-screen icon does not cache
the curriculum or videos for offline use.

Web navigation uses a short directional slide in `PageTransition.web.tsx`, while
the wave background stays fixed. Browser reduced-motion preferences disable the
slide. Native builds retain the navigator's normal platform transitions.

## Run locally

Use Node.js 24 LTS (24.3 or newer) and npm. Node 25 is outside the supported range
of the current React Native/Metro dependencies.

```sh
npm install
npm run web
```

Expo also supports the mobile workflow with `npm start`, `npm run ios`, and
`npm run android`. Video playback uses `expo-video`; custom native builds need
rebuilding when native dependencies change. Expo Go is a development preview.

## Review the production preview

```sh
npm run build:web
npm run preview:web
```

Open <http://127.0.0.1:8083> on this computer. The preview supports refreshing detail
URLs directly. Its loopback address is not accessible from a phone. The web export
is written to ignored `dist-web/`, separate from the native `dist/` export.

Review the home screen, all category lists, search, reverse sorting, belt
requirements, and grouped weapon navigation. Gojushiho should play the compressed
recording; entries without a recording show "No video available." Refresh a detail
URL and check browser Back navigation.

## Home-screen installation

The manifest at `public/manifest.webmanifest` defines the name, standalone display,
and 192/512 pixel icons. `public/index.html` contains Apple home-screen metadata
and a 180 pixel Apple touch icon reference. The native icon is 1024 pixels.
These placeholder assets are resized copies of `assets/images/Shorin-patch.png`;
the artwork is unchanged.

Once an HTTPS preview is approved and hosted, test adding it to the home screen
from Safari on iPhone and the install/add-to-home-screen menu in Chrome on Android.
Check the displayed name and icon, standalone launch, safe areas, navigation,
and reopening after a site update. Physical-device installation is not verified
by the browser tests or Expo Go. No service worker or offline cache is installed
at this checkpoint.

## Cloudflare deployment

The current app is hosted at <https://esk-katalog.ryanaltemoose.workers.dev> using
Workers static assets. Keep the existing GitHub-connected deployment configured
to build with `npm run build:web` and publish `dist-web`. Commit and push both new
video files and their registry assignments when adding recordings. If the existing
deploy command uses Wrangler, keep its assets directory pointed at `dist-web`.

The following output-directory guidance also applies to Cloudflare Pages:

For a normal deployment or update:

1. Run `npm run build:web` and the checks below.
2. Deploy only `dist-web/`, not the repository, `assets/`, or the native `dist/`.
3. Use the generated HTTPS URL for phone installation tests.
4. Verify direct links such as `/weapon-kata/tonfa-kihon` and page refreshes.

For Git integration, the build command is `npm run build:web`, output directory
`dist-web`, and Node version 24 LTS. Direct Upload can instead upload the prebuilt
folder from the Cloudflare dashboard. Cloudflare requires a separate project to
switch from Direct Upload to Git integration later; choose that workflow before
creating a project. The export intentionally has no `404.html`, allowing Pages'
default single-page-app fallback. `public/_headers` makes the manifest revalidate.

A Cloudflare static asset must be at most 25 MiB (26,214,400 bytes). A 20 MB target
is optional headroom, not a separate limit. The compressed Gojushiho file is
21,111,388 bytes (20.13 MiB) after lossless fast-start optimization and fits. Keep original recordings backed up separately;
publish optimized browser-compatible MP4 copies. See [the video workflow](docs/videos.md).

## Verification

Use the normal production preview above and open `/kata/gojushiho` to test the
same compressed recording that will be deployed. A separate demo build or
environment variable is no longer needed. The original recording is unchanged.

`npm run build:web` also checks exported asset sizes and fails if any file exceeds
Cloudflare's 25 MiB limit.

```sh
npm run typecheck
npm test
```

Playwright uses installed Microsoft Edge at desktop and phone dimensions. It
checks curriculum navigation, search/sorting, weapon groups, installation metadata,
icon dimensions, real video playback/pause/seeking, the shared video frame, and
the missing-video state. If no preview is running, it builds
and starts one automatically. Stop/rebuild an existing preview after source
changes so tests use the latest export.

Phone-sized browser tests do not replace Safari/iOS or Android device checks.

Type checking also rejects unused local variables, imports, and parameters.
The four curriculum detail routes share `src/components/CatalogDetail.tsx`, so
changes to the video/description layout should be made there.

## Curriculum and video data

Curriculum is maintained in `src/data/`. Catalog sequence determines browsing order;
rank requirements are defined separately in `src/data/curriculum.ts`.
From Ikkyu onward, an empty category array means review of all previously learned
material. The curriculum builder sets `reviewPrevious` and the rank page shows a
button to that category's full list. Nonempty arrays still show their specific
techniques; earlier ranks keep their existing empty-category placeholder.
Weapon and partner-drill `groupId` references define intermediate pages;
rank requirements can supply a display name while retaining the same destination.
To add another conditioning drill, add its entry to `src/data/partner-drill.ts`
with `groupId: "conditioning-drills"`. It will appear on that group's page.
Keep descriptions in `notes`. Assign videos in `src/data/videos.ts` for all four
categories; follow [docs/videos.md](docs/videos.md) when adding recordings.
Provider watch-page URLs need a future embed/external-link implementation.
Adding the PWA to a home screen does not download a video library; offline
downloads would be a separate feature.
