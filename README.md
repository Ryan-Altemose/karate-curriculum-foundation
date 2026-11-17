# ESK Curriculum Reference

A free, personal-use karate curriculum reference built with Expo, React Native,
and TypeScript. Browse kata, weapon kata, partner drills, self-defense, and belt
requirements. All ranks are accessible without accounts or a backend.

## Review checkpoint

The existing category colors, belt visuals, and navigation are retained. The mock
student dashboard and rank locks have been removed. Gojushiho is the only entry
with a demonstration video so far; other entries show a missing-video state.
Partial exercises remain accessible through the relevant belt requirements.

This checkpoint adds browser support and a production web export. PWA installation,
offline caching, hosting, additional videos, and provider embeds are deferred.

## Run locally

Use Node.js 24 LTS (24.3 or newer) and npm. Node 25 is outside the supported range
of the current React Native/Metro dependencies.

```sh
npm install
npm run web
```

Expo also supports the existing mobile workflow with `npm start`, `npm run ios`,
and `npm run android`. Video playback now uses `expo-video`; existing custom
native builds need rebuilding to include it. Native device playback has not yet
been verified for this checkpoint.

## Review the production preview

```sh
npm run build:web
npm run preview:web
```

Open <http://127.0.0.1:8083> on this computer. The preview server supports refreshing
detail URLs directly. Its loopback address is not accessible from a phone.
The web export is written to ignored `dist-web/`, separate from the existing native
`dist/` export.

Suggested review:

- Check the simplified home screen and familiar category buttons.
- Open Curriculum, expand Black Belts, and open Kudan.
- Open Kata and select Kusanku; it should be accessible without a video.
- Open Gojushiho and check play/pause, seeking, audio, and fullscreen.
- Browse the other three categories and resize the window to phone width.
- Refresh a detail URL and use the browser's Back button.

## Verification

```sh
npm run typecheck
npm test
```

Playwright runs against the production export at desktop and phone dimensions.
It uses installed Microsoft Edge. Tests cover the reference home screen,
unrestricted navigation across categories and advanced belts, detail URL refresh,
and actual video loading, playback, and seeking. If no preview is running, the
test runner builds and starts one automatically. Stop/rebuild an existing preview
after changing source files so tests use the latest export.

Phone-sized browser tests do not replace Safari/iOS or Android device checks.

## Curriculum and video data

Curriculum is maintained in `src/data/`. Belt organization is independent of
access; existing `minimumRankOrder` metadata does not restrict any screen.
Keep descriptions in `notes`. Use `videoUrl` for a direct browser-compatible media
URL, or `videoAsset` for the bundled kata demonstration. Provider watch-page URLs
such as YouTube require a future embed/external-link implementation.

Videos are outside the Expo Router `app/` directory. The existing Gojushiho MP4
is approximately 65 MiB and has not been compressed. Its size and hosting location
must be addressed before deploying to a host with smaller per-file limits.
