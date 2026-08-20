# Ahtapot Rebrand — Workstream 1: Brand System + Website

**Date:** 2026-08-21
**Repo:** `ahtapot.me` (Next.js 14, static export, GitHub Pages via CNAME `ahtapot.me`)
**Status:** Approved design, ready for implementation plan

## Context

Ahtapot is a Chrome extension for IOC (indicator of compromise) analysis, live for
some time with 70+ active users and a 4.9 store rating. The product works; the
presentation has aged. The marketing site uses a system font stack at
`font-extrabold`, a blurred octopus watermark, an unframed screenshot bleeding off
the viewport, and nine stacked sections. It also advertises AI models that are no
longer current.

A new brand mark exists at
`/Users/abdullah/Desktop/AhtapotSecurity/frontend/public/ahtapot-logo.png`: a lime
tentacle on a dark rounded square. Sampling it confirms the palette is unchanged from
the current site — exactly `#1A1A1F` and `#C7F54D`. The rebrand is therefore a change
of *mark and design language*, not of brand color.

## Scope

This spec covers workstream 1 only. The full rebrand decomposes into five
independent efforts, each with its own spec, plan, and implementation cycle:

1. **Brand system + website** — this document
2. Extension UI rebrand — carry these tokens into the popup
3. AI model layer — current models, provider abstraction
4. New integrations
5. CI/CD — merge to `main` publishes to the Chrome Web Store

Workstreams 2–5 are out of scope here. Workstream 1 must not block on them: every
product visual on the site is built as real DOM, so the site ships before the
extension UI is touched.

## Decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Visual direction | Dark-first, mastra.ai structural language | Brand mark is dark + lime; near-black canvas with nested boxes matches it directly |
| Theme | Dark-only, toggle removed | Halves design and QA surface; single theme lets every border and elevation be tuned once |
| Sections | 5 blocks, down from 9 | "Minimal" requires cutting, not rearranging |
| Display type | Uncut Sans VF, self-hosted | SIL OFL 1.1, variable (`wght`, `ital`), Turkish-complete, closest free face to Styrene B |
| Data type | Commit Mono, self-hosted | OFL, 1175 glyphs, designed for character disambiguation — correct for hashes, IPs, CVEs |
| Product visuals | Real DOM, not screenshots | Always sharp, no retina asset set, text is selectable and indexable, ~5KB, single source of truth |
| Languages | TR + EN | Existing `[lang]` routes retained; a large share of store reviews are Turkish |
| Model names | Not hardcoded | Model names go stale; the site says "Claude · Gemini · GPT" |
| Provider count | Derived, never typed | A literal in copy drifts from the registry, as it already has |

### Provider count correction

The extension registers exactly ten providers in
`ahtapot/src/services/ServiceRegistry.ts:84-183`: VirusTotal, OTX, AbuseIPDB,
MalwareBazaar, ARIN, Shodan, GreyNoise, URLhaus, Pulsedive, Scamalytics.

The site's `src/data/constants.ts` lists only nine — **URLhaus is missing** — while
`translations.ts` claims "10 providers". The logo strip and the copy already disagree.

Implementation must add URLhaus to the `providers` array (a logo asset is needed; the
existing `abuse-logo.png` belongs to MalwareBazaar) and render any count in copy from
`providers.length` rather than as a typed literal, in both TR and EN.


### Reference analysis

Both reference sites derive much of their polish from licensed foundry type. This was
verified by reading the `name` tables of their served `woff2` files:

| Site | Display | Secondary |
| --- | --- | --- |
| sunday.ai | Basel Grotesk — Optimo SARL (Chi-Long Trieu), commercial | Styrene B Web — Commercial Type, commercial (aliased `mono`; not monospace) |
| mastra.ai | Greed VF — Displaay Type Foundry (Martin Vácha), commercial. Axes `wght 400–700`, `wdth 100–115`, `ital 0–14` | Commit Mono — Eigil Nikolajsen, open source |

Licensing Greed was priced and rejected in favor of free faces (Displaay: 75 € single
style, 247 € uprights family, 360 € full family). Commit Mono is adopted directly — it
is free, and it is what mastra actually uses for its mono.

Turkish coverage was verified against `ı İ ş Ş ğ Ğ ç Ç ö Ö ü Ü`:

| Font | Glyphs | Axes | Turkish | License |
| --- | --- | --- | --- | --- |
| Uncut Sans VF | 472 | `wght`, `ital` | complete | SIL OFL 1.1 |
| Commit Mono 400 | 1175 | — | complete | OFL |

What carries over from the references is structure, not typeface: mastra's nested
rounded boxes and hairline container rules, and sunday's oversized display type set at
regular-to-medium weight with tight negative tracking rather than at extrabold.

## Design tokens

Defined once on `:root`. No `.dark` variant — the page has one theme.

```
Canvas layers                       Type
--bg          #0B0B0D  canvas       display  Uncut Sans VF w500
--bg-raised   #121215  outer box             clamp(44px, 7vw, 88px)
--bg-card     #171719  inner card            tracking -.03em / lh .98
--bg-input    #1E1E22  control      h2       clamp(28px, 4vw, 44px) w500
--logo-tile   #1A1A1F  icon ground  body     15–18px w400 lh 1.6
                                    data     Commit Mono 13px
--border      rgba(255,255,255,.07) label    Commit Mono 11px +.08em upper
--border-hi   rgba(255,255,255,.12)
                                    Radius   outer 24 · card 16
--text        #F2F2F3                        control 10 · pill 999
--text-2      #9B9BA3
--text-3      #6B6B73             Verdict (data only, never chrome)
--accent      #C7F54D               malicious   #F2555A
--accent-dim  rgba(199,245,77,.12)  suspicious  #F0B23C
                                    clean       #7BD88F
                                    unknown     #6B6B73
```

`--bg` is deliberately darker than `--logo-tile`. At `#1A1A1F` the mark's own dark
square would dissolve into the canvas and the icon would read as a floating tentacle.

**Accent discipline.** `#C7F54D` appears in at most three places on the page: the
primary CTA, the single live dot in the hero panel, and the logo. The current site
uses lime for a headline clause, which is the main source of its dated feel. Verdict
colors are not accents — they are data, and appear only inside product mockups.

## Page architecture

Five blocks. Hairline vertical rules sit at the container edges and run the full page
height — the structural signature borrowed from mastra.

```
┌─────────────────────────────────────────────────┐
│  ◍ ahtapot        Product  Docs  GitHub  [Install]│  56px, sticky, blur
├──┬───────────────────────────────────────────┬──┤  hairline rules
│  │  Threat intel,                            │  │
│  │  in your browser.                88px w500│  │
│  │                                           │  │
│  │  IOC analysis from every source you       │  │  18px --text-2
│  │  already trust — without leaving the page.│  │
│  │                                           │  │  ① HERO
│  │  [ Install ]  Docs ↗                      │  │
│  │  ┌─ IOCPanel r=24 ────────────────────┐   │  │
│  │  └────────────────────────────────────┘   │  │
├──┼───────────────────────────────────────────┼──┤
│  │  VirusTotal  Shodan  AbuseIPDB  OTX  …    │  │  ② PROVIDERS
│  │  grayscale, opacity .45, hover → 1        │  │
├──┼───────────────────────────────────────────┼──┤
│  │  Select, analyze, move on.             h2 │  │
│  │  ┌────────┐ ┌────────┐ ┌────────┐         │  │  ③ SHOWCASE
│  │  │ Select │ │ AI     │ │ Zero   │         │  │  IOCTypes + HowItWorks
│  │  │ [DOM]  │ │ [DOM]  │ │ [DOM]  │         │  │  absorbed here
│  │  └────────┘ └────────┘ └────────┘         │  │
├──┼───────────────────────────────────────────┼──┤
│  │  ★ 4.9   ·   70+ analysts   ·  Open source│  │  ④ SOCIAL PROOF
│  │  "…"   ·   "…"                  2 quotes  │  │
├──┼───────────────────────────────────────────┼──┤
│  │  Add it to your browser.   [ Install ]    │  │  ⑤ CTA
│  │  ─────────────────────────────────────    │  │
│  │  ◍  ahtapot      GitHub  Privacy  TR/EN   │  │  footer
└──┴───────────────────────────────────────────┴──┘
```

## Components

### `IOCPanel`

One component renders every product visual on the page. Fixture data is passed as
props; no live API calls.

```
<IOCPanel>            outer shell, r=24, --bg-raised, hairline border
 ├ <QueryRow>         r=16, --bg-card, Commit Mono — 103.77.241.135
 ├ <VerdictCard>      r=16 — ● MALICIOUS · VirusTotal 42/94
 │                    the single lime dot lives here
 └ <MetaRow>          Commit Mono — AS13335 · CN · first seen 3d
```

Hero renders it full-size. Each showcase box renders a cropped variant. When the
extension UI changes in workstream 2, this one file updates and all four visuals
follow.

### Section components

`Hero`, `Providers`, `Showcase`, `SocialProof`, `CTA`, plus `Header` and `Footer`.
Existing `Card`, `Badge`, `SectionTitle`, `Avatar` are replaced by the new box
primitives; `Button` is rewritten against the new tokens.

## Removals

| Item | Disposition |
| --- | --- |
| Blurred octopus watermark in hero | Deleted — visual noise |
| Product Hunt badge | Moved to footer |
| `Testimonials` (7 entries) | Reduced to 2, folded into social proof line |
| `Stats`, `HowItWorks`, `IOCTypes` sections | Absorbed into showcase boxes |
| `Feedback` section | Footer link |
| `AIAnalysis` section | Becomes showcase box ② |
| `gradient-text`, `animate-float`, `.card:hover -translate-y` | Deleted |
| `theme-context.tsx` and the toggle | Deleted — dark-only |
| Hardcoded model names in `constants.ts` | Replaced with generic provider names |

Removed copy is not discarded silently: any content with SEO value that leaves the
home page (IOC type list, how-it-works steps) is folded into showcase box body text
so the keywords survive.

## Assets

- New mark sourced from `AhtapotSecurity/frontend/public/ahtapot-logo.png` (4168×4168).
  Generate `favicon.ico`, 16/32, `apple-touch-icon`, 192/512, and an inline SVG
  wordmark lockup for the header.
- Regenerate `og-image.png` against the new design.
- Fonts subset to `latin` + `latin-ext` (Turkish glyphs required), converted to
  `woff2`, self-hosted under `public/fonts/`. No external font requests — the site is
  a static export and must have zero third-party runtime dependencies.
- Delete superseded assets: `octopus.png`, `landing.png`, old logo variants.

## Verification

- `next build` produces a clean static export
- Lighthouse accessibility ≥ 95; `#1A1A1F` text on `#C7F54D` measures 12.4:1
- Both `/tr` and `/en` routes render with correct Turkish glyph rendering
- Responsive at 375 / 768 / 1440
- No network requests to third-party origins on page load
- Rendered page contains no reference to a specific AI model version
- Provider strip renders all ten registered providers, and any count in copy equals
  `providers.length` in both languages

## Open item

`ahtapot.me/workflows/deploy.yml` sits at the repo root rather than under
`.github/workflows/`, so it is not an active GitHub Actions workflow. Site deployment
may currently be manual. This is checked and corrected as the first task of
implementation — a rebuilt site that cannot deploy is not shipped.
