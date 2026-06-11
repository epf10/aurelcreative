# Aurel Creative — marketing site

Single-page marketing site for Aurel Creative (done-for-you digital products for
health/fitness/wellness creators). Static Astro build, deployed to GitHub Pages.

`aurel-creative-site_reference.html` in the repo root is the original hand-written
design this site was ported from. Treat it as the design source of truth when in
doubt about spacing, colors, or copy — the Astro version intentionally preserves
its look.

## Commands

Uses **pnpm** (v11). Native build scripts for esbuild/sharp are allowlisted in
`pnpm-workspace.yaml` (`allowBuilds`) — if installs complain about ignored build
scripts, that file is the fix, not `package.json`.

```sh
pnpm install        # install deps
pnpm dev            # dev server at localhost:4321/aurelcreative
pnpm build          # static build to dist/
pnpm preview        # serve dist/ locally
pnpm astro check    # typecheck (.astro + .ts)
```

Run `pnpm astro check && pnpm build` before considering any change done.

## Architecture

One page, assembled from section components:

- `src/pages/index.astro` — stacks the sections in page order. That's all it does.
- `src/layouts/Base.astro` — `<head>` (fonts, meta, favicon), Header/Footer, and the
  single IntersectionObserver that powers all `.reveal` scroll animations.
- `src/components/` — one component per section (`Hero`, `Opportunity`, `Services`,
  `Process`, `Partners`, `About`, `Faq`, `ApplyForm`) plus shared `Logo` (the mark
  image, used in the hero), `Brand` (the wordmark lockup, used in header/footer),
  `Header`, `Footer`.
- `src/data/site.ts` — **all repeated copy lives here** (cards, steps, FAQ, fit
  lists, form options). Edit text there, not in markup. Longer one-off prose
  paragraphs stay inline in their section component.
- `src/styles/global.css` — design tokens and shared primitives only
  (`.wrap`, `.pad`, `.btn`, `.eyebrow`, `.lead`, `.reveal`, headings).
  Everything section-specific is a scoped `<style>` in that section's component.

Fonts are self-hosted via `@fontsource-variable/*` imports in `Base.astro` — no
Google Fonts requests.

## Brand assets

Official logo PNGs live in `src/assets/logos/` (high-res, whitespace-trimmed from
the 6000×6000 originals) and are rendered through `astro:assets` `<Image>` so the
build emits optimized, properly sized files:

- `AC_Logo_Mark.png` — mark only (no text). Used by `Logo.astro` (hero art) and
  as the source for `public/favicon.png`.
- `AC_Logo_Workmark_Black_1.png` — mark + name, for light backgrounds. Used by
  `Brand.astro` in the header.
- `AC_Logo_Workmark_White_1.png` — mark + name, for dark backgrounds. Used by
  `Brand.astro` in the footer (`inverse` prop).
- `AC_Logo_Workmark_Black_2.png` / `White_2` — name only, no mark. Currently
  unused; kept for future use.

The favicon is a static file (`public/favicon.png`); if the mark ever changes,
regenerate it with:

```sh
magick src/assets/logos/AC_Logo_Mark.png -resize 246x246 -background none -gravity center -extent 256x256 public/favicon.png
```

## Design system

Tokens in `global.css` `:root` — use them, never hardcode:

- Ink `--ink` #0A0A0A / `--ink-soft`, paper `--paper`, `--mist`, `--line`
- Brand accents: `--blue` #0057FF, `--pink` #FF2D9B, `--yellow` #FFE000,
  `--green` #00C853 (always used as a 4-color set, in that order)
- Type: `--display` (Fraunces, headings) / `--body` (Plus Jakarta Sans)

Conventions:

- Single breakpoint: `@media (max-width: 880px)` — grids collapse to one column.
- Scroll reveal: put `.reveal` on an element; the observer in `Base.astro` adds
  `.in`. Stagger siblings with `style="--reveal-delay: 90ms"` (multiples of ~90ms).
- Hero uses its own load-time `.rise` keyframe stagger (not `.reveal`) so it
  animates immediately, plus the animated `Logo` mark (`animated` prop).
- **Every animation must have a `prefers-reduced-motion: reduce` fallback.** The
  existing components show the pattern; keep it for anything new.
- Dark sections (`Opportunity`, `Faq`, footer) sit on `--ink` with
  `rgba(255,255,255,…)` text — match those alpha values for consistency.

## Application form (Web3Forms)

`src/components/ApplyForm.astro` is a qualification form, not a plain contact form:

- Select options carry `data-tier="ok|low"` (defined in `site.ts` →
  `applySelectRows`). Any chosen `low` option = "not the right time yet" result;
  otherwise the success panel (with the Calendly placeholder) shows.
- **Every** submission is POSTed to `https://api.web3forms.com/submit`, including
  disqualified ones — the verdict is appended as a `fit` field so applications can
  be triaged from the email alone. Flip that in the component script if rejected
  applications shouldn't send.
- The access key comes from `PUBLIC_WEB3FORMS_KEY` (see `.env.example`; get a key
  at web3forms.com). It is embedded in the static build — that is how Web3Forms
  works; the key is public by design. Until a real key is set, submissions fail
  and the form shows its inline error message.
- For the deployed site, either commit a real key as the fallback in
  `ApplyForm.astro` or add `PUBLIC_WEB3FORMS_KEY` as a GitHub Actions variable.
- Spam protection: hidden `botcheck` checkbox honeypot (Web3Forms convention).

## Deployment (GitHub Pages)

- `.github/workflows/deploy.yml` builds with `withastro/action` and deploys on
  every push to `main`. One-time repo setup: **Settings → Pages → Source →
  GitHub Actions**.
- `astro.config.mjs` sets `site: 'https://ar-bebop.github.io'` and
  `base: '/aurelcreative'`. If the repo is renamed, update `base`; if a custom
  domain is added, set `site` to it and **remove `base`**.
- All in-page navigation is hash links (`#how`, `#apply`), so `base` only affects
  asset URLs — `Base.astro` already builds the favicon URL from
  `import.meta.env.BASE_URL`. Do the same for any new asset references.

## Known placeholders / TODO

- `PUBLIC_WEB3FORMS_KEY` — placeholder until a real Web3Forms key is created.
- Calendly embed — `ApplyForm.astro` success panel has a stub `div`; replace with
  the real Calendly inline embed for the partnership call.
- Founder portrait — `About.astro` has a gradient placeholder box; swap for a real
  headshot (put it in `src/assets/` and use Astro's `<Image>` for optimization).
- No OG image yet (`og:image` is not set in `Base.astro`).
