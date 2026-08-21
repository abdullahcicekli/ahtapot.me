# Rebrand handoff

Written 2026-08-21 so this work can be picked up on another machine. The SDD ledger
that tracked it lives under `.superpowers/sdd/`, which the tooling gitignores, so
everything durable is here instead.

## Where things stand

Branch `feature/rebrand-website`, forked from `main` at `0dc191c`. **Never merged.**

| | Status |
| --- | --- |
| Phase 1 — brand system and five-block site | Complete. 42 commits, whole-branch review clean, recommendation was MERGE. |
| Phase 2 — feedback round | Tasks 1–4 of 8 done. Tasks 5–8 not started. |

Every task in both phases went through implement → review → fix-round-if-needed. The
tree is green at every commit: `npm test`, `npx tsc --noEmit`, `npm run build` all pass.

## Phase 2 progress

| # | Task | State |
| --- | --- | --- |
| 1 | Turkish casing bug, em dashes | Complete, reviewed |
| 2 | All seven testimonials, no store figures | Complete, reviewed |
| 3 | `Tabs` primitive | Complete, reviewed, one fix round |
| 4 | Feature tabs section | Fixed after review said Not approved; **re-review still owed** |
| 5 | Provider directory | Not started |
| 6 | Visible FAQ | Not started |
| 7 | Footer | Not started |
| 8 | Page assembly and verification | Not started |

**Resume at:** a scoped re-review of Task 4's fix (`ed0561a..050b8bb`), then Task 5.

The plan for tasks 5–8 is written and committed:
`docs/superpowers/plans/2026-08-21-website-rebrand-phase-2.md`.

## The Turkish casing trap, because it will bite again

`.label` applies `text-transform: uppercase`. On `<html lang="tr">` browsers use Turkish
casing, where `i` uppercases to `İ`. So English technical terms inside a `.label` on the
Turkish route render wrong: `MALİCİOUS`, `VİRUSTOTAL`, `PULSEDİVE`.

The fix is `lang="en"` on the element holding the English token. **It cuts both ways** —
putting `lang="en"` on a *Turkish* string breaks it in the other direction, turning
`ÖNERİLEN` into `ÖNERILEN`. Task 4 introduced exactly that bug and caught it before
review.

Rules of thumb:
- Provider names, verdict labels, IOC type names, AI mode names → `lang="en"`
- Turkish copy, Turkish reviewer names, translated labels → leave alone

A tree-wide test in `src/app/__tests__/casing.test.ts` guards this, but it has a known
blind spot: values embedded in a locally-defined, non-exported array escape its static
resolution. Apply `lang="en"` deliberately and check the Turkish route in a browser.
**This cannot be verified from HTML source** — the transform happens at render time.

## Decisions taken during the work

These were judgement calls made without asking. Anything here can be reverted.

**Phase 1**

- Canvas is `#0B0B0D`, darker than the mark's own `#1A1A1F` tile, so the icon does not
  dissolve into the page.
- `--text-3` was lightened from `#6B6B73` to `#8C8C96`. The original measured 3.72:1
  against the canvas and failed WCAG AA; the spec had wrongly claimed it passed.
- The hero fixture uses `198.51.100.23` (RFC 5737 documentation range). The original
  `103.77.241.135` is a real routable address that the page was labelling malicious.
- The provider strip renders text, not logos: the logos measured 24×24 against 148×24,
  unreadable at the strip's opacity.
- `cn` uses `tailwind-merge`. Without it a caller's `py-16` lost to `Section`'s own
  `py-24`, and two of five sections rendered with wrong spacing.
- "Nothing leaves your machine" was false and became "We never see your data". The
  privacy page's "all data processing happens locally" was false in the same way, under
  the *International Users* heading, and was rewritten.
- CI now runs `npm test` and `npx tsc --noEmit` before building. It previously ran
  neither.

**Phase 2**

- No store figures render on the page at all. `storeStats` survives only for the
  `aggregateRating` in JSON-LD, where the rich snippet needs it.
- The provider directory shows what each provider answers and which IOC types it
  supports, read from the extension's `supportedIOCTypes` getters. A customer-logo case
  studies grid was rejected — the product has no enterprise customers to show.
- "Hunting queries" became "detection rule suggestions": the extension's actual field is
  `detection_engineering.suggested_rules`, described in-code as rule description or
  pseudocode.

## Open items

- **The FAQ compliance gap is still live.** The page ships a `FAQPage` schema with six
  questions and renders none of them, which violates Google's requirement that
  marked-up content be visible. Task 6 closes it. Do not merge to `main` before that.
- The privacy page's GDPR controller/processor wording was left as-is. It reads
  coherently, but recharacterising who is controller and who is processor is a legal
  judgement, not a copy edit. Worth a lawyer's eye.
- `docs/superpowers/plans/2026-08-21-website-rebrand.md` describes phase 1 and is
  historical now; phase 2's plan supersedes it for anything still open.

## Running it

```bash
npm install
npm test            # 125 passing
npx tsc --noEmit    # clean
npm run build       # emits en, tr, en/privacy, tr/privacy into out/
cd out && python3 -m http.server 4321   # npx serve does not work here
```

Merging to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes to
GitHub Pages at `ahtapot.me`.
