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

## HandBrake Settings
Video Bitrate (kbps) = 150,000 / total_seconds

Once you have your number, apply these settings across the tabs in HandBrake:
• `Summary Tab`: Set Format to MP4 and check Web Optimized.
• `Dimensions Tab`: Leave as-is for short clips, or drop Resolution   Limit to 720p HD (or 480p) if the video is longer than 2–3 minutes.
• `Video Tab`:
	• Video Encoder: H.264 (x264) (or H.265 (x265) for slightly better quality at very low bitrates).
	• Framerate (FPS): Set to Same as source (or cap at 30 FPS to save extra data on 60 FPS clips).
	• Quality: Select Avg Bitrate (kbps) instead of Constant Quality, type in your calculated number, and check 2-Pass Encoding (plus Turbo first pass) so HandBrake distributes the limited data accurately.
• `Audio Tab`: Set Codec to AAC, Mixdown to Stereo, and Bitrate to 128 (or 96 if you need extra room for video quality).

Click `Start Encode` at the top toolbar once everything is entered.


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
preview server is running. The playback check uses the Gojushiho entry, so its
recording can be renamed or replaced without changing the test.

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
