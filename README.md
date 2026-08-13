# Dolyy's playlist

A single-page nostalgia-mixtape site: Next.js App Router + TypeScript + Tailwind v4.

## Run it

```bash
npm install
npm run dev
```

Deploy on Vercel and `@vercel/analytics` + `@vercel/speed-insights` activate automatically — no extra config needed.

## What's real vs. simulated

- **Playlist** — all 108 tracks from your list are in `lib/playlist.ts`, in order.
- **Playback** — no audio files were provided, so the transport (play/pause, seek,
  elapsed time, auto-advance) is a real, working UI simulation driven by each
  track's placeholder duration (`lib/usePlayer.ts`). Swap the `setInterval` tick in
  there for a real `<audio>` element's `timeupdate`/`ended` events once you have
  audio sources — the rest of the player (seek bar, transport, vinyl spin state)
  is already wired to genuine state, not fake props.
- **Cover art** — no album art was supplied, so each disc gets a deterministic
  gradient label (`components/Vinyl.tsx`) instead of a guessed-at photo.
- **Artist credits** — the source list was song titles only, no performer names,
  so each track's subtitle shows the playlist name rather than a fabricated artist.
- **Listener count** — no presence backend exists, so it's a client-side drift
  starting at 212, for atmosphere only.
- **`scene-tall.png`** — you asked for a separately composed portrait background;
  only one source image was provided, so `public/bg/scene-tall.png` is a
  center-weighted crop of `scene-wide.png` as a placeholder. Replace it with a real
  portrait composition whenever you have one — nothing else needs to change.

## Weather (time-of-day) switcher

Dawn / Noon / Evening each carry their own accent color and background-overlay
tint (see the `[data-weather="..."]` blocks in `app/globals.css`) — it's the
one signature move the page is built around. Defaults to whatever matches the
visitor's local clock on load, then the pill in the top row overrides it.

## One naming fix

Your dependency list had `react-don` — that's `react-dom` in `package.json`.

## Structure

```
app/
  layout.tsx      viewport-fit cover, fonts, Analytics/SpeedInsights
  page.tsx        server component, fixed <main> shell
  globals.css      Tailwind v4 @theme tokens + hero-bg/grain/glass/vinyl CSS
components/
  SceneChrome.tsx  client wrapper holding weather + player state
  PlayerDesktop.tsx / PlayerMobile.tsx   the two separate blocks (hidden sm:flex / sm:hidden)
  Vinyl.tsx, SeekBar.tsx, Transport.tsx
  Clock.tsx, ListenerCount.tsx, SocialLinks.tsx, WeatherSwitcher.tsx
lib/
  playlist.ts, weather.ts, usePlayer.ts, time.ts
public/bg/
  scene-wide.png, scene-tall.png
```
