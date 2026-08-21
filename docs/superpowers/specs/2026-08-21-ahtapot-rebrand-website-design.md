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

### Store figures

Verified from the Chrome Web Store listing on 2026-08-21: rating **5.0**, **14
ratings**, **68 users**. The listing is now titled "Ahtapot — AI-Powered IOC Threat
Intelligence".

The JSON-LD in `src/app/[lang]/layout.tsx` carries `ratingCount: '9'` and
`dateModified: '2025-01-01'`, both stale. These figures move into a single
`src/data/store-stats.ts` module consumed by both the social proof section and the
structured data, so they cannot drift apart again. Figures are typed once and
manually refreshed; no number is written inline in a component or a schema.


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
│  │  ★ 5.0 · 14 ratings · 68 users · Open src │  │  ④ SOCIAL PROOF
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

## Deployment

Deployment is already automated and correct: `.github/workflows/deploy.yml` is tracked
and builds on push to `main`, uploading `./out` to GitHub Pages. An identical stray
copy sits at `workflows/deploy.yml` in the repo root, where it does nothing; it is
deleted during implementation. No deployment work is otherwise needed for this
workstream.

---

# Phase 2 — Feedback round

Added 2026-08-21 after reviewing the built phase-1 site. Phase 1's decisions stand
except where contradicted below.

## Defects found on the built page

**Turkish uppercase-I.** `.label` applies `text-transform: uppercase` and the Turkish
route sets `<html lang="tr">`, so the browser applies Turkish casing rules and every
lowercase `i` in an English technical term becomes `İ`. The Turkish page renders
`MALİCİOUS`, `VİRUSTOTAL`, `ALİENVAULT OTX`, `PULSEDİVE`, `SCAMALYTİCS`. Fix: mark
English technical tokens `lang="en"`, which is both semantically correct and restores
English casing.

**FAQ structured data has no visible counterpart.** The page ships a `FAQPage` schema
with six questions and renders none of them. Google requires marked-up content to be
visible to the user; as built this risks losing rich results or drawing a manual action.
A visible FAQ section is therefore required, not optional, and its content must match
the schema exactly.

**Em dashes.** Eight in the copy. Removed.

## Revised decisions

| Decision | Phase 1 | Phase 2 | Why |
| --- | --- | --- | --- |
| Store figures on the page | rating, ratingCount, userCount | **none rendered** | All three drift and need manual refresh. `storeStats` stays for JSON-LD, where the rich snippet needs it. |
| Testimonials | 2 | **all 7** | With the numbers gone, the reviews carry the social proof alone. |
| Feature presentation | three static boxes | **tabbed panel** | The boxes read as generic. Tabs let each real product surface get a full panel, and give the AI capability the description it never had. |
| Provider logos | deleted with the text strip | **restored in a directory grid** | A card grid gives them a size where they read, and answers a question a SOC analyst actually has. |
| Footer | one row | **three columns plus a bottom bar** | |

## Added sections

**Feature tabs.** Replaces the three-box showcase. Real ARIA tabs (`role="tablist"`,
`aria-selected`), with a desktop trigger row and a horizontally scrolling mobile row.
Four tabs, each mapping to a surface the extension actually has:

| Tab | Surface | Content |
| --- | --- | --- |
| Detect | content script | select, right-click, 11 IOC types recognised automatically |
| Analyze | side panel | ten providers answer, results in tabs |
| AI | AI service | three modes — summary, analysis, detailed — plus MITRE ATT&CK mapping |
| Privacy | options page | keys in local encrypted storage, no backend |

The three modes are real: `AIAnalysisMode` in `ahtapot/src/services/ai/AIService.ts`
takes `summary | analysis | detailed`.

**Provider directory.** Ten cards, each carrying the provider name, what it answers, and
the IOC types it supports. The type lists are ground truth, read from each service's
`supportedIOCTypes` getter in the extension:

| Provider | Supported types |
| --- | --- |
| VirusTotal | IPv4, IPv6, Domain, URL, MD5, SHA1, SHA256 |
| OTX AlienVault | IPv4, IPv6, Domain, URL, MD5, SHA1, SHA256, CVE |
| AbuseIPDB | IPv4, IPv6 |
| MalwareBazaar | MD5, SHA1, SHA256 |
| ARIN | IPv4, IPv6 |
| Shodan | IPv4, IPv6, Domain |
| GreyNoise | IPv4 |
| URLhaus | URL, Domain, IPv4, IPv6, MD5, SHA256 |
| Pulsedive | IPv4, IPv6, Domain, URL, MD5, SHA1, SHA256 |
| Scamalytics | IPv4, IPv6 |

**FAQ.** Visible, six questions, matching `buildFaqSchema` exactly in both languages.
Plain accordion, no icons.

**Footer.** Tagline, three link columns of at most three links each, bottom bar with
copyright and legal links.

## Page architecture

```
① Hero              unchanged
② Provider strip    unchanged, quiet early trust signal
③ Feature tabs      new, replaces the three-box showcase
④ Provider directory new
⑤ Testimonials      all seven, no figures
⑥ FAQ               new, matches the schema
⑦ CTA               unchanged
⑧ Footer            three columns
```

## On minimalism

Phase 2 adds sections while the brief also asks for more restraint. These are not in
conflict: sunday.ai runs nine sections. Its calm comes from each section doing one
thing, not from having few. So the constraint is per-section — one `h2` and one idea
each, at most three facts per provider card, an accordion with no ornament, three links
per footer column. The accent budget is unchanged.
