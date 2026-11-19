# Adding and updating demonstration videos

Videos are deployed alongside the app. All four curriculum detail screens look up
their recording in **`src/data/videos.ts`** and use the same player. Missing
assignments show the existing placeholder. No screen changes are needed for new
recordings.

## 1. Prepare the file

Export an MP4 with H.264 video and AAC audio. Prefer a web-optimized/fast-start
export so playback can begin before the whole file downloads. Check the result
visually, including technique detail, orientation, and sound.

If your compressor does not offer web optimization, and FFmpeg is installed, you
can move the playback metadata to the front without re-encoding:

```sh
ffmpeg -i compressed.mp4 -c copy -movflags +faststart ready-for-app.mp4
```

Use different input and output paths, then add the ready-for-app copy below.
The representative Gojushiho MP4 has already received this optimization.

Each deployed file must be **at most 26,214,400 bytes (25 MiB)**. A target of
roughly 20 MB gives headroom but is not mandatory. Duration alone does not
determine size. In PowerShell, check exact bytes with:

```powershell
(Get-Item 'assets/videos/first_test_gojushiho.mp4').Length
```

Copy the optimized file into `assets/videos/`. Prefer descriptive lowercase names,
such as `pinan-shodan.mp4`. Keep large camera originals backed up separately;
unreferenced originals are not exported by Metro. Do not copy originals into
`public/`, which is exported in full.

## 2. Assign it to an entry

Find the entry's `id` in its catalog, then add a literal `require` to the matching
section in `src/data/videos.ts`:

| Registry section | Catalog |
| --- | --- |
| `kata` | `src/data/kata.ts` |
| `weaponKata` | `src/data/weapon-kata.ts` |
| `partnerDrill` | `src/data/partner-drill.ts` |
| `selfDefense` | `src/data/self-defense.ts` |

For example, after adding `assets/videos/pinan-shodan.mp4`, the kata section becomes:

```ts
kata: {
  gojushiho: require("../../assets/videos/first_test_gojushiho.mp4"),
  "pinan-shodan": require("../../assets/videos/pinan-shodan.mp4"),
},
```

Use the exact catalog ID, not the display name. Assign recordings to individual
techniques, such as a numbered Kihon entry, rather than their group navigation
button. Keep paths literal: Metro cannot bundle dynamically constructed paths.
The registry also accepts direct HTTPS media URLs; provider watch pages are not
playable MP4 URLs.

## 3. Build and review

```sh
npm run typecheck
npm run build:web
npm run preview:web
```

Open <http://127.0.0.1:8083> and visit the entry. Check play, pause, seeking,
fullscreen, sound, and orientation. The player keeps a consistent 16:9 frame and
fits the entire recording inside it; portrait footage will have side bars.
Use this production preview for web video checks rather than relying on Metro's
development asset server.

`build:web` checks every exported file and fails if any exceeds 25 MiB, printing
its path. Compress that file further and rebuild before deploying. It does not
automatically alter your recordings. Only referenced assets are bundled; the
68 MB `gojushiho_tournament.mp4` original stays out of the export.

Run `npm test` for the browser suite, including actual compressed Gojushiho
playback at desktop and phone dimensions. Rebuild after changes when an existing
preview server is running. The video test currently identifies the representative
file by name; update that assertion if you rename or replace this specific file.

## 4. Publish and check your phone

Commit the new MP4 and registry change, then push to the branch connected to
Cloudflare. For this initial setup, also include the accompanying source, script,
test, and documentation changes. Build output is ignored: do not commit `dist-web`.
The Cloudflare build command should be `npm run build:web`, and its static assets
directory should be `dist-web`.

After Cloudflare reports a successful deployment, open
<https://esk-katalog.ryanaltemoose.workers.dev/kata/gojushiho> or the relevant entry
on your phone. Refresh/reopen the home-screen app and verify playback there too.
The build gives media files content-based names, so changed video bytes receive
a new asset URL on the next deployment.

For later replacements, replace the optimized file or update its registry path,
then repeat build, review, and push. No database, external video service, or
special demo environment variable is needed. Watching still requires a connection;
manual offline downloads remain a separate feature.
