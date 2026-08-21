# Ahtapot Website Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `ahtapot.me` as a dark-only, five-block marketing site on a new
design-token system with self-hosted type and real-DOM product visuals.

**Architecture:** The existing Next.js 14 static-export app keeps its `[lang]` routing
and its build/deploy pipeline. Everything below the route layer is replaced: a single
`tokens.css` defines the visual system, two layout primitives (`Box`, `Rule`) express
the nested-box language, and one `IOCPanel` component renders every product visual on
the page as real DOM. Nine sections collapse to five. The light theme and its context
provider are deleted outright.

**Tech Stack:** Next.js 14.2 (App Router, `output: 'export'`), React 18, TypeScript 5.6,
Tailwind 3.4, Vitest 2 + @testing-library/react + jsdom (added by this plan), self-hosted
WOFF2.

**Spec:** `docs/superpowers/specs/2026-08-21-ahtapot-rebrand-website-design.md`

## Global Constraints

These apply to every task. Copied verbatim from the spec.

- **Dark-only.** No `.dark` class, no theme toggle, no light-mode token block. One
  theme, defined once on `:root`.
- **Canvas is `#0B0B0D`.** Not `#1A1A1F` — that value is reserved for `--logo-tile`,
  the mark's own ground. If the canvas matches the tile the icon dissolves.
- **Accent discipline.** `#C7F54D` appears in at most three places on the rendered
  page: the primary CTA, the single live dot in `IOCPanel`, and the logo mark. Verdict
  colors (`#F2555A`, `#F0B23C`, `#7BD88F`, `#6B6B73`) are data, never chrome.
- **No AI model names anywhere in shipped output.** Not in copy, not in JSON-LD, not
  in `constants.ts`. Providers are named generically: "Claude · Gemini · GPT".
- **No typed counts.** Any provider count rendered in copy is derived from
  `providers.length`. Store figures come only from `src/data/store-stats.ts`.
- **Store figures (verified 2026-08-21):** rating `5.0`, ratingCount `14`, users `68`.
- **Ten providers.** VirusTotal, OTX, AbuseIPDB, MalwareBazaar, ARIN, Shodan,
  GreyNoise, URLhaus, Pulsedive, Scamalytics. URLhaus is currently missing from the
  site's array and must be added.
- **Zero third-party runtime requests.** Fonts are self-hosted WOFF2 under
  `public/fonts/`. No Google Fonts link, no CDN, no external image host on the
  critical path.
- **Both languages stay in sync.** Every key added to `translations.en` must exist in
  `translations.tr`. Turkish glyph coverage (`ı İ ş Ş ğ Ğ ç Ç ö Ö ü Ü`) is verified in
  the shipped font subsets.
- **Type scale:** display `clamp(44px, 7vw, 88px)` w500 tracking `-.03em` lh `.98`;
  h2 `clamp(28px, 4vw, 44px)` w500; body 15–18px w400 lh 1.6; data Commit Mono 13px;
  label Commit Mono 11px `+.08em` uppercase.
- **Radii:** outer box 24, inner card 16, control 10, pill 999.

---

## File Structure

**Create**

| Path | Responsibility |
| --- | --- |
| `vitest.config.ts` | Test runner config, jsdom environment, `@/` alias |
| `vitest.setup.ts` | `@testing-library/jest-dom` matchers |
| `public/fonts/UncutSans-Variable.woff2` | Display/UI face, subset, 57KB |
| `public/fonts/CommitMono-400.woff2` | Data face, subset, 29KB |
| `public/fonts/README.md` | How the subsets were produced, for reproducibility |
| `public/brand/mark.svg` | Vector mark, used inline by `Mark.tsx` |
| `src/styles/tokens.css` | Every design token, single source |
| `src/data/store-stats.ts` | Rating / ratingCount / userCount, single source |
| `src/components/primitives/Box.tsx` | Outer + inner box shells |
| `src/components/primitives/Rule.tsx` | Hairline container rules |
| `src/components/primitives/Mark.tsx` | Logo mark + wordmark lockup |
| `src/components/primitives/index.ts` | Barrel |
| `src/components/product/fixtures.ts` | Fixture IOC data for mockups |
| `src/components/product/IOCPanel.tsx` | The real-DOM product visual |
| `src/components/sections/Showcase.tsx` | Block ③, absorbs 4 old sections |
| `src/components/sections/SocialProof.tsx` | Block ④, absorbs Testimonials + Stats |
| `src/components/sections/CTA.tsx` | Block ⑤ |
| `src/lib/seo/schemas.ts` | JSON-LD builders extracted from the layout |

**Modify**

| Path | Change |
| --- | --- |
| `package.json` | Vitest deps, `test` script |
| `tailwind.config.ts` | New palette, font families, drop `darkMode`/animations |
| `src/app/globals.css` | Import tokens, strip light theme and legacy utilities |
| `src/app/[lang]/layout.tsx` | Drop `ThemeProvider`, consume `schemas.ts`, fix `theme-color` |
| `src/data/constants.ts` | Add URLhaus, delete `aiProviders` model lists |
| `src/data/translations.ts` | Full copy rewrite for five blocks |
| `src/components/layout/Header.tsx` | Rewrite: no theme toggle, new mark, pill CTA |
| `src/components/layout/Footer.tsx` | Rewrite against tokens |
| `src/components/ui/Button.tsx` | Rewrite against tokens |
| `src/components/sections/Hero.tsx` | Rewrite |
| `src/components/sections/Providers.tsx` | Rewrite as quiet logo strip |
| `src/components/sections/index.ts` | Re-export the five surviving sections |
| `src/app/[lang]/page.tsx` | Five blocks |
| `public/icons/*` | Regenerate from the new mark |

**Delete**

| Path | Reason |
| --- | --- |
| `workflows/deploy.yml` | Stray duplicate of `.github/workflows/deploy.yml` |
| `src/lib/theme-context.tsx` | Dark-only |
| `src/components/sections/Features.tsx` | Absorbed into Showcase |
| `src/components/sections/HowItWorks.tsx` | Absorbed into Showcase |
| `src/components/sections/AIAnalysis.tsx` | Absorbed into Showcase |
| `src/components/sections/IOCTypes.tsx` | Absorbed into Showcase |
| `src/components/sections/Stats.tsx` | Absorbed into SocialProof |
| `src/components/sections/Testimonials.tsx` | Absorbed into SocialProof |
| `src/components/sections/Feedback.tsx` | Footer link |
| `src/components/ui/{Card,Badge,SectionTitle,Avatar}.tsx` | Replaced by primitives |
| `public/images/octopus.png` | Watermark removed |
| `public/images/landing.png` | Replaced by real DOM |
| `public/images/{ahtapot-logo-black,ahtapot-logo-white,logo-black,logo-white}.png` | Old mark |

---

## Task 1: Test infrastructure and stray workflow removal

Nothing in this repo is currently testable — there is no test runner. Every later task
depends on one existing, so it comes first. The stray workflow file is deleted here
because it is a one-line change that needs no test cycle of its own.

**Files:**
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `src/lib/__tests__/utils.test.ts`
- Modify: `package.json`
- Delete: `workflows/deploy.yml`

**Interfaces:**
- Consumes: nothing
- Produces: `npm test` runs Vitest with jsdom and the `@/` path alias resolved.
  All later tasks write tests under `src/**/__tests__/*.test.ts(x)`.

- [ ] **Step 1: Install test dependencies**

```bash
npm install -D vitest@^2.1.8 @vitejs/plugin-react@^4.3.4 jsdom@^25.0.1 \
  @testing-library/react@^16.1.0 @testing-library/jest-dom@^6.6.3 \
  @testing-library/user-event@^14.5.2
```

- [ ] **Step 2: Create the Vitest config**

`vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    include: ['src/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
```

`vitest.setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 3: Add the test script**

In `package.json`, add to `"scripts"`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Write a failing test that proves the harness and the alias work**

`src/lib/__tests__/utils.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { cn, getInitial } from '@/lib/utils';

describe('cn', () => {
  it('merges class names and drops falsy values', () => {
    expect(cn('a', false && 'b', 'c')).toBe('a c');
  });
});

describe('getInitial', () => {
  it('uppercases the first character', () => {
    expect(getInitial('ahtapot')).toBe('A');
  });
});
```

- [ ] **Step 5: Run the tests**

Run: `npm test`
Expected: PASS, 2 tests. If the `@/` alias fails to resolve, the config in Step 2 is
wrong — fix it before continuing, do not work around it with a relative import.

- [ ] **Step 6: Delete the stray workflow duplicate**

`.github/workflows/deploy.yml` is the live workflow and stays. The root copy is inert.

```bash
git rm workflows/deploy.yml
```

- [ ] **Step 7: Verify the real workflow is still present**

Run: `git ls-files .github/workflows/`
Expected: `.github/workflows/deploy.yml`

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vitest.config.ts vitest.setup.ts src/lib/__tests__/utils.test.ts
git commit -m "test: add Vitest harness and remove stray workflow duplicate"
```

---

## Task 2: Store statistics and provider data corrections

Two data defects ship today: the provider array is missing URLhaus while copy claims
ten, and store figures are typed inline in JSON-LD where they have gone stale. Both are
data-shaped, both need a single source, so they are fixed together.

**Files:**
- Create: `src/data/store-stats.ts`
- Create: `src/data/__tests__/store-stats.test.ts`
- Create: `src/data/__tests__/constants.test.ts`
- Modify: `src/data/constants.ts`
- Modify: `src/types/index.ts`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `storeStats: { rating: number; ratingCount: number; userCount: number; verifiedOn: string }`
  - `providers: Provider[]` — length 10, now including URLhaus
  - `CHROME_STORE_URL`, `GITHUB_URL` unchanged
  - `aiProviders` reduced to `{ name, company, logo }[]` with no `models` field

- [ ] **Step 1: Write the failing tests**

`src/data/__tests__/store-stats.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { storeStats } from '@/data/store-stats';

describe('storeStats', () => {
  it('carries the figures verified from the Chrome Web Store listing', () => {
    expect(storeStats.rating).toBe(5.0);
    expect(storeStats.ratingCount).toBe(14);
    expect(storeStats.userCount).toBe(68);
  });

  it('records when the figures were last verified', () => {
    expect(storeStats.verifiedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
```

`src/data/__tests__/constants.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { providers, aiProviders } from '@/data/constants';

describe('providers', () => {
  it('lists all ten providers registered by the extension', () => {
    expect(providers).toHaveLength(10);
  });

  it('includes URLhaus, which was missing from the site', () => {
    expect(providers.map((p) => p.name)).toContain('URLhaus');
  });

  it('matches the extension ServiceRegistry exactly', () => {
    expect(providers.map((p) => p.name).sort()).toEqual([
      'ARIN', 'AbuseIPDB', 'AlienVault OTX', 'GreyNoise', 'MalwareBazaar',
      'Pulsedive', 'Scamalytics', 'Shodan', 'URLhaus', 'VirusTotal',
    ]);
  });

  it('gives every provider a logo path', () => {
    for (const p of providers) {
      expect(p.logo).toMatch(/^\/provider-icons\/.+\.(png|svg)$/);
    }
  });

  it('ships the asset each logo path points at', () => {
    for (const p of providers) {
      const onDisk = resolve(process.cwd(), 'public', p.logo.replace(/^\//, ''));
      expect(existsSync(onDisk), `missing asset for ${p.name}: ${p.logo}`).toBe(true);
    }
  });
});

describe('aiProviders', () => {
  it('names the three AI vendors', () => {
    expect(aiProviders.map((p) => p.name)).toEqual(['Claude', 'Gemini', 'GPT']);
  });

  it('carries no model version names, which go stale', () => {
    const serialized = JSON.stringify(aiProviders);
    for (const stale of ['Sonnet', 'Haiku', 'Opus', 'Flash', 'GPT-4', 'o1', 'o3', '2.5', '1.5']) {
      expect(serialized).not.toContain(stale);
    }
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL — `store-stats` module not found; `providers` has length 9.

- [ ] **Step 3: Create the store stats module**

`src/data/store-stats.ts`:

```ts
/**
 * Figures from the Chrome Web Store listing. Manually refreshed — update
 * `verifiedOn` whenever you change a number, and change nothing else in the app:
 * every consumer reads from here.
 *
 * Source: https://chromewebstore.google.com/detail/gmekhigahdiddngdhfdkeefcomcankpg
 */
export const storeStats = {
  rating: 5.0,
  ratingCount: 14,
  userCount: 68,
  verifiedOn: '2026-08-21',
} as const;
```

- [ ] **Step 4: Add URLhaus to the provider array**

In `src/data/constants.ts`, insert after the `GreyNoise` entry so the order matches
`ServiceRegistry.ts`:

```ts
  { name: 'URLhaus', logo: '/provider-icons/urlhaus-logo.png', alt: 'URLhaus - Malicious URL database' },
```

The logo asset does not exist yet. `abuse-logo.png` belongs to MalwareBazaar and must
not be reused. Source a URLhaus mark from `https://urlhaus.abuse.ch/` and save it as
`public/provider-icons/urlhaus-logo.png` at 128×128 or larger, matching the other
provider icons.

- [ ] **Step 5: Strip model names from `aiProviders`**

Replace the whole `aiProviders` export in `src/data/constants.ts` with:

```ts
export const aiProviders: AIProvider[] = [
  { name: 'Claude', company: 'Anthropic', logo: '/ai-icons/claude-logo.png' },
  { name: 'Gemini', company: 'Google', logo: '/ai-icons/gemini-logo.png' },
  { name: 'GPT', company: 'OpenAI', logo: '/ai-icons/openai-logo.svg' },
];
```

And in `src/types/index.ts`, drop the `models` field:

```ts
export interface AIProvider {
  name: string;
  company: string;
  logo: string;
}
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS. If the `aiProviders` stale-string assertion fails on `'1.5'`, check
that no leftover model array remains in the file.

- [ ] **Step 7: Commit**

```bash
git add src/data/ src/types/index.ts public/provider-icons/urlhaus-logo.png
git commit -m "fix: add missing URLhaus provider and centralize store figures"
```

---

## Task 3: Self-hosted font subsets

The fonts are static assets that never change, so they are generated once and the
binaries are committed. No build-time font pipeline is added — that would put a Python
toolchain in the dependency path of a Node project for no recurring benefit.

**Files:**
- Create: `public/fonts/UncutSans-Variable.woff2`
- Create: `public/fonts/CommitMono-400.woff2`
- Create: `public/fonts/README.md`
- Create: `src/app/__tests__/fonts.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces: two WOFF2 files at known paths, declared as `@font-face` in Task 4.
  Family names are exactly `Uncut Sans` and `Commit Mono`.

- [ ] **Step 1: Write the failing test**

`src/app/__tests__/fonts.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { statSync } from 'node:fs';
import { resolve } from 'node:path';

const fonts = [
  { file: 'UncutSans-Variable.woff2', maxBytes: 70_000 },
  { file: 'CommitMono-400.woff2', maxBytes: 40_000 },
];

describe('self-hosted fonts', () => {
  for (const { file, maxBytes } of fonts) {
    it(`ships ${file} within its size budget`, () => {
      const stat = statSync(resolve(process.cwd(), 'public/fonts', file));
      expect(stat.size).toBeGreaterThan(1000);
      expect(stat.size).toBeLessThan(maxBytes);
    });
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL with `ENOENT` — the font files do not exist.

- [ ] **Step 3: Produce the subsets**

Requires Python with `fonttools` and `brotli`. Use a throwaway virtualenv; nothing here
becomes a project dependency.

```bash
python3 -m venv /tmp/fontenv
/tmp/fontenv/bin/pip install fonttools brotli

# Uncut Sans — SIL OFL 1.1
curl -sL -o /tmp/uncut.zip https://github.com/kaspernordkvist/uncut_sans/archive/refs/heads/main.zip
unzip -oq /tmp/uncut.zip -d /tmp/uncut

# Commit Mono — OFL
curl -sL -o /tmp/commit.zip https://github.com/eigilnikolajsen/commit-mono/releases/latest/download/CommitMono-1.143.zip
unzip -oq /tmp/commit.zip -d /tmp/commit

mkdir -p public/fonts
UNI="U+0000-00FF,U+0100-017F,U+0180-024F,U+2000-206F,U+2190-21FF,U+25A0-25FF"

/tmp/fontenv/bin/pyftsubset \
  /tmp/uncut/uncut_sans-main/Variable/UncutSans-Variable.ttf \
  --unicodes="$UNI" --layout-features='*' --flavor=woff2 \
  --output-file=public/fonts/UncutSans-Variable.woff2

/tmp/fontenv/bin/pyftsubset \
  /tmp/commit/CommitMono-1.143/CommitMono-400-Regular.otf \
  --unicodes="$UNI" --layout-features='*' --flavor=woff2 \
  --output-file=public/fonts/CommitMono-400.woff2
```

Expected sizes: `UncutSans-Variable.woff2` ≈ 57KB, `CommitMono-400.woff2` ≈ 29KB.

- [ ] **Step 4: Verify Turkish coverage and variable axes survived the subset**

```bash
/tmp/fontenv/bin/python - <<'PY'
from fontTools.ttLib import TTFont
TR = {0x0131:'ı',0x0130:'İ',0x015F:'ş',0x015E:'Ş',0x011F:'ğ',0x011E:'Ğ',
      0x00E7:'ç',0x00C7:'Ç',0x00F6:'ö',0x00D6:'Ö',0x00FC:'ü',0x00DC:'Ü'}
for f in ["public/fonts/UncutSans-Variable.woff2", "public/fonts/CommitMono-400.woff2"]:
    t = TTFont(f); cm = t.getBestCmap()
    missing = [c for cp, c in TR.items() if cp not in cm]
    axes = [(a.axisTag, int(a.minValue), int(a.maxValue)) for a in t["fvar"].axes] if "fvar" in t else []
    assert not missing, f"{f} missing Turkish glyphs: {''.join(missing)}"
    print(f"{f}: {len(cm)} glyphs, axes={axes}, Turkish OK")
PY
```

Expected: both report Turkish OK; Uncut Sans reports `[('wght', 300, 700), ('ital', 0, 11)]`.
If the `wght` axis is absent the wrong source file was subset — the static OTFs will not
work, the plan needs `Variable/UncutSans-Variable.ttf`.

- [ ] **Step 5: Document reproduction**

`public/fonts/README.md`:

```markdown
# Fonts

Both faces are self-hosted. The site makes no third-party font requests.

| File | Face | License | Source |
| --- | --- | --- | --- |
| `UncutSans-Variable.woff2` | Uncut Sans, variable (`wght` 300–700, `ital` 0–11) | SIL OFL 1.1 | https://github.com/kaspernordkvist/uncut_sans |
| `CommitMono-400.woff2` | Commit Mono 400 | OFL | https://github.com/eigilnikolajsen/commit-mono |

Both are subset to `U+0000-00FF,U+0100-017F,U+0180-024F,U+2000-206F,U+2190-21FF,U+25A0-25FF`,
which covers Latin, Latin Extended-A/B (Turkish included), general punctuation, arrows,
and geometric shapes.

Regenerate with the `pyftsubset` commands in
`docs/superpowers/plans/2026-08-21-website-rebrand.md`, Task 3. Turkish coverage
(`ı İ ş Ş ğ Ğ ç Ç ö Ö ü Ü`) must be re-verified after any change.
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add public/fonts/ src/app/__tests__/fonts.test.ts
git commit -m "feat: self-host Uncut Sans and Commit Mono subsets"
```

---

## Task 4: Design tokens and Tailwind configuration

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/app/__tests__/tokens.test.ts`
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.ts`
- Modify: `postcss.config.js`

**Interfaces:**
- Consumes: `public/fonts/*.woff2` from Task 3
- Produces: CSS custom properties consumed by every component
  (`--bg`, `--bg-raised`, `--bg-card`, `--bg-input`, `--logo-tile`, `--border`,
  `--border-hi`, `--text`, `--text-2`, `--text-3`, `--accent`, `--accent-dim`,
  `--verdict-malicious`, `--verdict-suspicious`, `--verdict-clean`,
  `--verdict-unknown`, `--r-outer`, `--r-card`, `--r-control`), plus Tailwind
  utilities `font-display` and `font-mono`.

- [ ] **Step 1: Write the failing test**

`src/app/__tests__/tokens.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const tokens = readFileSync(resolve(process.cwd(), 'src/styles/tokens.css'), 'utf8');
const globals = readFileSync(resolve(process.cwd(), 'src/app/globals.css'), 'utf8');

describe('design tokens', () => {
  it('sets the canvas darker than the logo tile so the mark stays visible', () => {
    expect(tokens).toContain('--bg: #0B0B0D');
    expect(tokens).toContain('--logo-tile: #1A1A1F');
  });

  it('defines the brand accent sampled from the mark', () => {
    expect(tokens).toContain('--accent: #C7F54D');
  });

  it('declares both self-hosted faces', () => {
    expect(tokens).toContain("font-family: 'Uncut Sans'");
    expect(tokens).toContain("font-family: 'Commit Mono'");
    expect(tokens).toContain('/fonts/UncutSans-Variable.woff2');
    expect(tokens).toContain('/fonts/CommitMono-400.woff2');
  });

  it('uses font-display: swap so text paints before the font arrives', () => {
    expect(tokens.match(/font-display:\s*swap/g)).toHaveLength(2);
  });

  it('declares the variable weight range for the display face', () => {
    expect(tokens).toContain('font-weight: 300 700');
  });
});

describe('globals.css', () => {
  it('imports the tokens', () => {
    expect(globals).toContain("@import './../styles/tokens.css'");
  });

  it('carries no light-theme block', () => {
    expect(globals).not.toContain('.dark');
    expect(globals).not.toContain('--bg-primary');
  });

  it('drops the legacy decorative utilities', () => {
    expect(globals).not.toContain('gradient-text');
    expect(globals).not.toContain('animate-float');
  });

  it('makes no third-party font request', () => {
    expect(globals).not.toMatch(/fonts\.googleapis|fonts\.gstatic|@import url\(['"]?http/);
    expect(tokens).not.toMatch(/fonts\.googleapis|fonts\.gstatic/);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL with `ENOENT` on `src/styles/tokens.css`.

- [ ] **Step 3: Write the tokens**

`src/styles/tokens.css`:

```css
@font-face {
  font-family: 'Uncut Sans';
  src: url('/fonts/UncutSans-Variable.woff2') format('woff2-variations');
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Commit Mono';
  src: url('/fonts/CommitMono-400.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

:root {
  /* Canvas layers. --bg is deliberately darker than --logo-tile: at the same
     value the mark's own dark square dissolves into the page. */
  --bg: #0B0B0D;
  --bg-raised: #121215;
  --bg-card: #171719;
  --bg-input: #1E1E22;
  --logo-tile: #1A1A1F;

  --border: rgba(255, 255, 255, 0.07);
  --border-hi: rgba(255, 255, 255, 0.12);

  --text: #F2F2F3;
  --text-2: #9B9BA3;
  --text-3: #6B6B73;

  /* At most three uses per page: primary CTA, the live dot in IOCPanel, the mark. */
  --accent: #C7F54D;
  --accent-dim: rgba(199, 245, 77, 0.12);
  --accent-ink: #1A1A1F;

  /* Data only. Never used for page chrome. */
  --verdict-malicious: #F2555A;
  --verdict-suspicious: #F0B23C;
  --verdict-clean: #7BD88F;
  --verdict-unknown: #6B6B73;

  --r-outer: 24px;
  --r-card: 16px;
  --r-control: 10px;

  --container: 1200px;
}
```

- [ ] **Step 4: Rewrite globals.css**

Replace the entire contents of `src/app/globals.css`:

```css
@import './../styles/tokens.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    background: var(--bg);
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Uncut Sans', ui-sans-serif, system-ui, sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background: var(--accent-dim);
    color: var(--text);
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

@layer components {
  .display {
    font-size: clamp(44px, 7vw, 88px);
    font-weight: 500;
    letter-spacing: -0.03em;
    line-height: 0.98;
  }

  .h2 {
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  .data {
    font-family: 'Commit Mono', ui-monospace, monospace;
    font-size: 13px;
    line-height: 1.5;
  }

  .label {
    font-family: 'Commit Mono', ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
}
```

- [ ] **Step 5: Enable `@import` resolution in PostCSS**

`globals.css` now begins with an `@import`. Tailwind's documentation requires
`postcss-import` ahead of `tailwindcss` for that to inline correctly; relying on
Next.js's internal css-loader to do it is undocumented behavior.

```bash
npm install -D postcss-import@^16.1.0
```

`postcss.config.js`:

```js
module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 6: Rewrite the Tailwind config**

Replace `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        raised: 'var(--bg-raised)',
        card: 'var(--bg-card)',
        input: 'var(--bg-input)',
        hairline: 'var(--border)',
        'hairline-hi': 'var(--border-hi)',
        ink: 'var(--text)',
        'ink-2': 'var(--text-2)',
        'ink-3': 'var(--text-3)',
        accent: 'var(--accent)',
        'accent-dim': 'var(--accent-dim)',
        'accent-ink': 'var(--accent-ink)',
        malicious: 'var(--verdict-malicious)',
        suspicious: 'var(--verdict-suspicious)',
        clean: 'var(--verdict-clean)',
      },
      fontFamily: {
        display: ["'Uncut Sans'", 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ["'Commit Mono'", 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        outer: 'var(--r-outer)',
        card: 'var(--r-card)',
        control: 'var(--r-control)',
      },
      maxWidth: {
        container: 'var(--container)',
      },
    },
  },
  plugins: [],
};

export default config;
```

Note there is no `darkMode` key — the site has one theme.

- [ ] **Step 7: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 8: Verify the app still builds and the tokens actually inlined**

Run: `npm run build`
Expected: succeeds. Components still referencing deleted variables like
`var(--bg-primary)` will render wrong but will not fail the build — they are replaced in
Tasks 9-13 and 15.

Confirm the `@import` resolved rather than being passed through to the browser:

Run: `grep -rl "Uncut Sans" .next/static/css/ 2>/dev/null || grep -rl "Uncut Sans" out/_next/static/css/`
Expected: at least one compiled stylesheet contains the `@font-face`. If nothing
matches, `postcss-import` is not wired up — fix Step 5, do not proceed.

- [ ] **Step 9: Commit**

```bash
git add src/styles/tokens.css src/app/globals.css tailwind.config.ts postcss.config.js package.json package-lock.json src/app/__tests__/tokens.test.ts
git commit -m "feat: add dark-only design token system"
```

---

## Task 5: Brand mark and icon set

**Files:**
- Create: `public/brand/mark.svg`
- Create: `src/components/primitives/Mark.tsx`
- Create: `src/components/primitives/__tests__/Mark.test.tsx`
- Modify: `public/icons/favicon-16x16.png`, `favicon-32x32.png`, `favicon.ico`,
  `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`

**Interfaces:**
- Consumes: `--logo-tile`, `--accent` from Task 4
- Produces: `<Mark size?: number />` renders the tile+tentacle mark;
  `<Wordmark />` renders mark plus the "ahtapot" wordmark as a horizontal lockup.

- [ ] **Step 1: Write the failing test**

`src/components/primitives/__tests__/Mark.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Mark, Wordmark } from '@/components/primitives/Mark';

describe('Mark', () => {
  it('renders an accessible label', () => {
    render(<Mark />);
    expect(screen.getByRole('img', { name: /ahtapot/i })).toBeInTheDocument();
  });

  it('scales from a single size prop', () => {
    const { container } = render(<Mark size={48} />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('48');
    expect(svg.getAttribute('height')).toBe('48');
  });

  it('paints the tile and tentacle from brand tokens, not hardcoded hex', () => {
    const { container } = render(<Mark />);
    const html = container.innerHTML;
    expect(html).toContain('var(--logo-tile)');
    expect(html).toContain('var(--accent)');
  });

  it('carries real traced path data, not the plan placeholder', () => {
    const { container } = render(<Mark />);
    const d = container.querySelector('path')!.getAttribute('d')!;
    expect(d).not.toBe('TRACED_PATH_HERE');
    expect(d.length).toBeGreaterThan(200);
    expect(d).toMatch(/^[Mm]/);
  });
});

describe('Wordmark', () => {
  it('renders the product name as text so it is selectable and indexable', () => {
    render(<Wordmark />);
    expect(screen.getByText('ahtapot')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/components/primitives/Mark`.

- [ ] **Step 3: Trace the mark to SVG**

The source is `/Users/abdullah/Desktop/AhtapotSecurity/frontend/public/ahtapot-logo.png`,
4168×4168, exactly two colors: `#1A1A1F` tile, `#C7F54D` tentacle.

```bash
brew install potrace imagemagick   # if not present
mkdir -p public/brand

# Isolate the tentacle as a black-on-white bitmap, then trace it
magick /Users/abdullah/Desktop/AhtapotSecurity/frontend/public/ahtapot-logo.png \
  -fuzz 20% -fill black -opaque '#C7F54D' \
  -fill white +opaque black \
  -resize 1024x1024 /tmp/tentacle.pbm

potrace /tmp/tentacle.pbm --svg --alphamax 1 --opttolerance 0.2 -o /tmp/tentacle.svg
```

Open `/tmp/tentacle.svg`, take the single `<path d="...">`, and hand-assemble
`public/brand/mark.svg` with a `0 0 100 100` viewBox — scale the traced path so the
tentacle occupies the same proportion of the tile as in the source:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="26" fill="#1A1A1F"/>
  <path d="TRACED_PATH_HERE" fill="#C7F54D"/>
</svg>
```

Verify by opening it in a browser at 32px next to the source PNG at 32px — the
silhouettes must match. If potrace produces a jagged path, raise `--alphamax` toward 1.3
and re-trace; do not hand-smooth control points.

- [ ] **Step 4: Write the Mark component**

`src/components/primitives/Mark.tsx`. Paste the same path data as in Step 3, with
`fill` swapped for CSS variables so the mark participates in the token system:

```tsx
interface MarkProps {
  size?: number;
  className?: string;
}

export function Mark({ size = 28, className }: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Ahtapot"
    >
      <rect width="100" height="100" rx="26" fill="var(--logo-tile)" />
      <path d="TRACED_PATH_HERE" fill="var(--accent)" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ''}`}>
      <Mark size={26} />
      <span className="font-display text-[17px] font-medium tracking-[-0.02em] text-ink">
        ahtapot
      </span>
    </span>
  );
}
```

`Mark` already exposes `role="img"` with `aria-label`, so `Wordmark` must not add a
second accessible name — the text node beside it is the label.

- [ ] **Step 5: Add the barrel export**

`src/components/primitives/index.ts`:

```ts
export { Mark, Wordmark } from './Mark';
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS, 4 tests.

- [ ] **Step 7: Regenerate the icon set**

Icons need the opaque tile, so they render from the source PNG, not from the
variable-driven component.

```bash
SRC=/Users/abdullah/Desktop/AhtapotSecurity/frontend/public/ahtapot-logo.png
magick "$SRC" -resize 16x16   public/icons/favicon-16x16.png
magick "$SRC" -resize 32x32   public/icons/favicon-32x32.png
magick "$SRC" -resize 180x180 public/icons/apple-touch-icon.png
magick "$SRC" -resize 192x192 public/icons/android-chrome-192x192.png
magick "$SRC" -resize 512x512 public/icons/android-chrome-512x512.png
magick "$SRC" -resize 48x48 -define icon:auto-resize=48,32,16 public/icons/favicon.ico
rm -f public/icons/favicon.png
```

- [ ] **Step 8: Verify the icons rendered**

Run: `file public/icons/*.png public/icons/favicon.ico`
Expected: each PNG reports its intended dimensions; the `.ico` reports MS Windows icon
with 3 sizes. Open `public/icons/favicon-32x32.png` and confirm the tentacle is legible
at that size — if it reads as a green smudge, the mark needs a tighter crop for small
sizes, which is a design change to raise before proceeding.

- [ ] **Step 9: Commit**

```bash
git add public/brand/ public/icons/ src/components/primitives/
git commit -m "feat: add brand mark component and regenerate icon set"
```

---

## Task 6: Box and Rule layout primitives

These two components carry the whole mastra-derived structural language. Everything
visual after this task composes them.

**Files:**
- Create: `src/components/primitives/Box.tsx`
- Create: `src/components/primitives/Rule.tsx`
- Create: `src/components/primitives/__tests__/Box.test.tsx`
- Modify: `src/components/primitives/index.ts`

**Interfaces:**
- Consumes: Tailwind utilities from Task 4
- Produces:
  - `<Box as?: ElementType, tone?: 'outer' | 'card', className?, children>` —
    `outer` renders `bg-raised rounded-outer`, `card` renders `bg-card rounded-card`;
    both get `border border-hairline`.
  - `<Section id?, className?, children>` — page band with the hairline vertical
    container rules and standard vertical rhythm.

- [ ] **Step 1: Write the failing test**

`src/components/primitives/__tests__/Box.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Box } from '@/components/primitives/Box';
import { Section } from '@/components/primitives/Rule';

describe('Box', () => {
  it('defaults to the outer tone', () => {
    render(<Box data-testid="b">x</Box>);
    expect(screen.getByTestId('b').className).toContain('rounded-outer');
    expect(screen.getByTestId('b').className).toContain('bg-raised');
  });

  it('renders the card tone with the smaller radius', () => {
    render(<Box tone="card" data-testid="b">x</Box>);
    expect(screen.getByTestId('b').className).toContain('rounded-card');
    expect(screen.getByTestId('b').className).toContain('bg-card');
  });

  it('always draws a hairline border', () => {
    render(<Box data-testid="b">x</Box>);
    expect(screen.getByTestId('b').className).toContain('border-hairline');
  });

  it('accepts a different element via as', () => {
    render(<Box as="article" data-testid="b">x</Box>);
    expect(screen.getByTestId('b').tagName).toBe('ARTICLE');
  });

  it('merges caller classes rather than replacing its own', () => {
    render(<Box className="p-10" data-testid="b">x</Box>);
    const cls = screen.getByTestId('b').className;
    expect(cls).toContain('p-10');
    expect(cls).toContain('rounded-outer');
  });
});

describe('Section', () => {
  it('renders its id so nav anchors resolve', () => {
    const { container } = render(<Section id="showcase">x</Section>);
    expect(container.querySelector('section#showcase')).toBeInTheDocument();
  });

  it('draws the two container rules that frame every band', () => {
    const { container } = render(<Section>x</Section>);
    expect(container.querySelectorAll('[data-rule]')).toHaveLength(2);
  });

  it('hides the decorative rules from assistive technology', () => {
    const { container } = render(<Section>x</Section>);
    for (const rule of container.querySelectorAll('[data-rule]')) {
      expect(rule).toHaveAttribute('aria-hidden', 'true');
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `Box` or `Rule`.

- [ ] **Step 3: Write Box**

`src/components/primitives/Box.tsx`:

```tsx
import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BoxProps {
  as?: ElementType;
  tone?: 'outer' | 'card';
  className?: string;
  children: ReactNode;
  [key: string]: unknown;
}

const tones = {
  outer: 'bg-raised rounded-outer',
  card: 'bg-card rounded-card',
} as const;

export function Box({ as: Tag = 'div', tone = 'outer', className, children, ...rest }: BoxProps) {
  return (
    <Tag className={cn('border border-hairline', tones[tone], className)} {...rest}>
      {children}
    </Tag>
  );
}
```

- [ ] **Step 4: Write Rule and Section**

`src/components/primitives/Rule.tsx`. The rules are absolutely positioned at the
container edges and span the full band height — this is the structural signature of the
design.

```tsx
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn('relative px-6 py-24 md:py-32', className)}>
      <div className="relative mx-auto w-full max-w-container">
        <span
          data-rule
          aria-hidden="true"
          className="pointer-events-none absolute -left-6 top-0 hidden h-full w-px bg-hairline md:block"
        />
        <span
          data-rule
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 top-0 hidden h-full w-px bg-hairline md:block"
        />
        {children}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Extend the barrel**

`src/components/primitives/index.ts`:

```ts
export { Mark, Wordmark } from './Mark';
export { Box } from './Box';
export { Section } from './Rule';
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS, 8 new tests.

- [ ] **Step 7: Commit**

```bash
git add src/components/primitives/
git commit -m "feat: add Box and Section layout primitives"
```

---

## Task 7: IOCPanel product visual

One component renders every product visual on the page. When the extension UI changes
in a later workstream, this file is the only thing that needs to follow.

**Files:**
- Modify: `src/lib/utils.ts` (preliminary — see below)
- Modify: `package.json` (preliminary)
- Create: `src/lib/__tests__/cn-merge.test.ts` (preliminary)
- Create: `src/components/product/fixtures.ts`
- Create: `src/components/product/IOCPanel.tsx`
- Create: `src/components/product/__tests__/IOCPanel.test.tsx`

### Preliminary: make `cn` resolve Tailwind conflicts

`cn` is currently plain `clsx`, which concatenates. When a caller passes a utility that
collides with a component's own — `Section` hardcodes `py-24 md:py-32` while Tasks 10
and 12 pass `py-16` and `py-20` — both land in the class list and the winner is decided
by Tailwind's emission order, not by JSX order. Measured against Tailwind 3.4.14, the
emission order is `.py-16`, `.py-20`, `.py-24`, `.py-28`, `.pt-32`, so `py-24` beats
both `py-16` and `py-20` while `py-28` and `pt-32` win. Two of five sections would
silently render with the wrong spacing and no test would catch it.

```bash
npm install tailwind-merge@^2.5.4
```

`src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}
```

`src/lib/__tests__/cn-merge.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn conflict resolution', () => {
  it('lets a caller class override a component default', () => {
    expect(cn('py-24', 'py-16')).toBe('py-16');
  });

  it('keeps responsive variants independent of the base utility', () => {
    expect(cn('py-24 md:py-32', 'py-16')).toBe('md:py-32 py-16');
  });

  it('leaves non-conflicting classes alone', () => {
    expect(cn('border border-hairline rounded-outer', 'p-10')).toBe(
      'border border-hairline rounded-outer p-10',
    );
  });
});
```

Run `npm test` and confirm these three pass plus the existing 35 before starting the
`IOCPanel` work. The existing `cn` test from Task 1 asserts `cn('a', false && 'b', 'c')`
returns `'a c'`; `twMerge` leaves non-Tailwind tokens untouched, so it still passes.


**Interfaces:**
- Consumes: `Box` from Task 6, verdict tokens from Task 4
- Produces:
  - `type Verdict = 'malicious' | 'suspicious' | 'clean' | 'unknown'`
  - `interface IOCFixture { query: string; kind: string; verdict: Verdict; headline: string; tags: string[]; meta: string[] }`
  - `heroFixture`, `aiFixture`, `privacyFixture` — three named fixtures
  - `<IOCPanel fixture: IOCFixture, compact?: boolean />`

- [ ] **Step 1: Write the failing test**

`src/components/product/__tests__/IOCPanel.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IOCPanel } from '@/components/product/IOCPanel';
import { heroFixture } from '@/components/product/fixtures';

describe('IOCPanel', () => {
  it('renders the queried indicator as selectable text, not an image', () => {
    render(<IOCPanel fixture={heroFixture} />);
    expect(screen.getByText('198.51.100.23')).toBeInTheDocument();
  });

  it('sets indicator and metadata in the mono face for legibility', () => {
    render(<IOCPanel fixture={heroFixture} />);
    expect(screen.getByText('198.51.100.23').className).toContain('font-mono');
  });

  it('renders the verdict label', () => {
    render(<IOCPanel fixture={heroFixture} />);
    expect(screen.getByText(/malicious/i)).toBeInTheDocument();
  });

  it('colors the verdict dot from the verdict token, never the brand accent', () => {
    const { container } = render(<IOCPanel fixture={heroFixture} />);
    const dot = container.querySelector('[data-verdict-dot]')!;
    expect(dot.className).toContain('bg-malicious');
    expect(dot.className).not.toContain('bg-accent');
  });

  it('renders every tag and meta entry from the fixture', () => {
    render(<IOCPanel fixture={heroFixture} />);
    for (const tag of heroFixture.tags) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }
    for (const meta of heroFixture.meta) {
      expect(screen.getByText(meta)).toBeInTheDocument();
    }
  });

  it('drops the meta row in compact mode so showcase boxes stay short', () => {
    const { container } = render(<IOCPanel fixture={heroFixture} compact />);
    expect(container.querySelector('[data-meta-row]')).toBeNull();
  });

  it('marks itself decorative so screen readers are not read a fake console', () => {
    const { container } = render(<IOCPanel fixture={heroFixture} />);
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `IOCPanel`.

- [ ] **Step 3: Write the fixtures**

`src/components/product/fixtures.ts`. These are illustrative, not live lookups. The IP
is from `198.51.100.0/24` (TEST-NET-2), reserved by RFC 5737 for documentation — never
a real address, because the panel attributes malicious activity to whatever it shows.
The hash is rendered middle-truncated the way real tooling displays one.

```ts
export type Verdict = 'malicious' | 'suspicious' | 'clean' | 'unknown';

export interface IOCFixture {
  query: string;
  kind: string;
  verdict: Verdict;
  headline: string;
  tags: string[];
  meta: string[];
}

export const heroFixture: IOCFixture = {
  query: '198.51.100.23',
  kind: 'IPv4',
  verdict: 'malicious',
  headline: 'VirusTotal 42/94',
  tags: ['Mirai botnet', 'ELF malware'],
  meta: ['AS13335', 'CN', 'first seen 3d ago'],
};

export const aiFixture: IOCFixture = {
  query: 'CVE-2024-3400',
  kind: 'CVE',
  verdict: 'malicious',
  headline: 'Actively exploited',
  tags: ['Command injection', 'T1190'],
  meta: ['CVSS 10.0', 'PAN-OS', 'patch available'],
};

export const privacyFixture: IOCFixture = {
  query: 'a3f5c9e1…b2d4f6a8',
  kind: 'SHA256',
  verdict: 'clean',
  headline: 'No detections',
  tags: ['Analyzed locally', 'Keys never leave device'],
  meta: ['0 telemetry', '0 servers', 'MIT licensed'],
};
```

- [ ] **Step 4: Write IOCPanel**

`src/components/product/IOCPanel.tsx`:

```tsx
import { Box } from '@/components/primitives';
import { cn } from '@/lib/utils';
import type { IOCFixture, Verdict } from './fixtures';

const dotTone: Record<Verdict, string> = {
  malicious: 'bg-malicious',
  suspicious: 'bg-suspicious',
  clean: 'bg-clean',
  unknown: 'bg-ink-3',
};

interface IOCPanelProps {
  fixture: IOCFixture;
  compact?: boolean;
  className?: string;
}

export function IOCPanel({ fixture, compact = false, className }: IOCPanelProps) {
  return (
    <Box aria-hidden="true" className={cn('space-y-2 p-2', className)}>
      <Box tone="card" className="flex items-center justify-between gap-3 px-4 py-3">
        <span className="font-mono text-[13px] text-ink">{fixture.query}</span>
        <span className="label rounded-control bg-input px-2 py-1 text-ink-3">
          {fixture.kind}
        </span>
      </Box>

      <Box tone="card" className="space-y-3 px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <span
              data-verdict-dot
              className={cn('h-1.5 w-1.5 rounded-full', dotTone[fixture.verdict])}
            />
            <span className="label text-ink">{fixture.verdict}</span>
          </span>
          <span className="font-mono text-[12px] text-ink-2">{fixture.headline}</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {fixture.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-control bg-input px-2 py-1 text-[12px] text-ink-2"
            >
              {tag}
            </span>
          ))}
        </div>

        {!compact && (
          <div
            data-meta-row
            className="flex flex-wrap gap-x-3 gap-y-1 border-t border-hairline pt-3"
          >
            {fixture.meta.map((entry) => (
              <span key={entry} className="font-mono text-[12px] text-ink-3">
                {entry}
              </span>
            ))}
          </div>
        )}
      </Box>
    </Box>
  );
}
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS, 7 new tests. The `aria-hidden` assertion targets `container.firstElementChild`
— if it fails, `Box` is dropping unknown props; check the `...rest` spread from Task 6.

- [ ] **Step 6: Commit**

```bash
git add src/lib/utils.ts src/lib/__tests__/cn-merge.test.ts package.json package-lock.json
git commit -m "fix: resolve Tailwind class conflicts in cn"

git add src/components/product/
git commit -m "feat: add IOCPanel real-DOM product visual"
```

---

## Task 8: Copy rewrite

The five-block structure needs new copy in both languages, and the old keys carry model
names that must not ship.

**Files:**
- Modify: `src/data/translations.ts`
- Create: `src/data/__tests__/translations.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces: translation keys used by Tasks 9–12:
  `nav.product`, `nav.docs`, `nav.install`,
  `hero.eyebrow`, `hero.title1`, `hero.title2`, `hero.subtitle`, `hero.install`, `hero.github`,
  `providers.title`,
  `showcase.title`, `showcase.select.title`, `showcase.select.desc`,
  `showcase.ai.title`, `showcase.ai.desc`, `showcase.privacy.title`, `showcase.privacy.desc`,
  `social.rating`, `social.users`, `social.openSource`,
  `cta.title`, `cta.install`,
  `footer.privacy`, `footer.license`, `footer.feedback`, `footer.madeWith`

- [ ] **Step 1: Write the failing test**

`src/data/__tests__/translations.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { translations } from '@/data/translations';

const REQUIRED = [
  'nav.product', 'nav.docs', 'nav.install',
  'hero.eyebrow', 'hero.title1', 'hero.title2', 'hero.subtitle', 'hero.install', 'hero.github',
  'providers.title',
  'showcase.title',
  'showcase.select.title', 'showcase.select.desc',
  'showcase.ai.title', 'showcase.ai.desc',
  'showcase.privacy.title', 'showcase.privacy.desc',
  'social.rating', 'social.users', 'social.openSource',
  'cta.title', 'cta.install',
  'footer.privacy', 'footer.license', 'footer.feedback', 'footer.madeWith',
] as const;

describe('translations', () => {
  it('defines every required key in English', () => {
    for (const key of REQUIRED) {
      expect(Object.keys(translations.en)).toContain(key);
    }
  });

  it('keeps Turkish in exact sync with English', () => {
    expect(Object.keys(translations.tr).sort()).toEqual(Object.keys(translations.en).sort());
  });

  it('leaves no value empty in either language', () => {
    for (const lang of ['en', 'tr'] as const) {
      for (const [key, value] of Object.entries(translations[lang])) {
        expect(value, `${lang}.${key} is empty`).not.toBe('');
      }
    }
  });

  it('names no AI model version, which would go stale', () => {
    const all = JSON.stringify(translations);
    for (const stale of ['GPT-4', 'Sonnet', 'Haiku', 'Opus', '2.0 Flash', '2.5 Flash', 'o1', 'o3']) {
      expect(all, `found stale model reference: ${stale}`).not.toContain(stale);
    }
  });

  it('hardcodes no provider count, which drifts from the registry', () => {
    const all = JSON.stringify(translations);
    expect(all).not.toMatch(/\b10 (providers|sources|intelligence)/i);
    expect(all).not.toMatch(/\b10 (sağlayıcı|kaynak)/i);
  });

  it('drops the keys belonging to deleted sections', () => {
    const gone = ['howItWorks.title', 'features.title', 'ai.title', 'ioc.title',
                  'stats.iocTypes', 'testimonials.title', 'feedback.title'];
    for (const key of gone) {
      expect(Object.keys(translations.en)).not.toContain(key);
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — required keys missing, stale model names present.

- [ ] **Step 3: Replace translations.ts**

Replace the entire file:

```ts
export const translations = {
  en: {
    'nav.product': 'Product',
    'nav.docs': 'Docs',
    'nav.install': 'Install',

    'hero.eyebrow': 'Free and open source',
    'hero.title1': 'Threat intel,',
    'hero.title2': 'in your browser.',
    'hero.subtitle':
      'Select any indicator on any page and get a verdict from every source you already trust — without breaking your flow.',
    'hero.install': 'Install',
    'hero.github': 'View source',

    'providers.title': 'Queries the sources your SOC already runs on',

    'showcase.title': 'Select, analyze, move on.',
    'showcase.select.title': 'Select anything',
    'showcase.select.desc':
      'IPv4, IPv6, domains, URLs, MD5, SHA1, SHA256, emails, CVEs, Bitcoin and Ethereum addresses are detected automatically. Highlight one, and every provider that supports it answers at once.',
    'showcase.ai.title': 'A verdict, not a data dump',
    'showcase.ai.desc':
      'Claude, Gemini and GPT turn raw provider output into a triage decision, with MITRE ATT&CK mapping and hunting queries ready to paste into your workflow.',
    'showcase.privacy.title': 'Nothing leaves your machine',
    'showcase.privacy.desc':
      'No accounts, no servers, no telemetry. Your API keys live in encrypted browser storage and talk only to the providers you configured.',

    'social.rating': 'on the Chrome Web Store',
    'social.users': 'analysts',
    'social.openSource': 'MIT licensed',

    'cta.title': 'Add it to your browser.',
    'cta.install': 'Install',

    'footer.privacy': 'Privacy',
    'footer.license': 'License',
    'footer.feedback': 'Feedback',
    'footer.madeWith': 'Built for the security community',
  },
  tr: {
    'nav.product': 'Ürün',
    'nav.docs': 'Dokümanlar',
    'nav.install': 'Yükle',

    'hero.eyebrow': 'Ücretsiz ve açık kaynak',
    'hero.title1': 'Tehdit istihbaratı,',
    'hero.title2': 'tarayıcının içinde.',
    'hero.subtitle':
      'Herhangi bir sayfadaki göstergeyi seç, güvendiğin tüm kaynaklardan tek seferde sonuç al — akışını bölmeden.',
    'hero.install': 'Yükle',
    'hero.github': 'Kaynağı gör',

    'providers.title': "SOC'unun zaten kullandığı kaynakları sorgular",

    'showcase.title': 'Seç, analiz et, devam et.',
    'showcase.select.title': 'Her şeyi seç',
    'showcase.select.desc':
      "IPv4, IPv6, domain, URL, MD5, SHA1, SHA256, e-posta, CVE, Bitcoin ve Ethereum adresleri otomatik tespit edilir. Birini işaretle, destekleyen tüm sağlayıcılar aynı anda cevap versin.",
    'showcase.ai.title': 'Veri yığını değil, karar',
    'showcase.ai.desc':
      'Claude, Gemini ve GPT ham sağlayıcı çıktısını triage kararına dönüştürür; MITRE ATT&CK eşlemesi ve hunting sorguları iş akışına yapıştırmaya hazır gelir.',
    'showcase.privacy.title': 'Hiçbir şey cihazından çıkmaz',
    'showcase.privacy.desc':
      'Hesap yok, sunucu yok, telemetri yok. API anahtarların şifreli tarayıcı deposunda durur ve yalnızca senin yapılandırdığın sağlayıcılarla konuşur.',

    'social.rating': 'Chrome Web Store puanı',
    'social.users': 'analist',
    'social.openSource': 'MIT lisanslı',

    'cta.title': 'Tarayıcına ekle.',
    'cta.install': 'Yükle',

    'footer.privacy': 'Gizlilik',
    'footer.license': 'Lisans',
    'footer.feedback': 'Geri bildirim',
    'footer.madeWith': 'Güvenlik topluluğu için geliştirildi',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS, 6 new tests.

- [ ] **Step 5: Verify the Turkish text was not mangled on write**

Run: `file src/data/translations.ts && grep -c 'ı\|ş\|ğ\|ç\|ö\|ü\|İ' src/data/translations.ts`
Expected: `UTF-8 Unicode text`, and a count above 20. A count of 0 or a `ASCII text`
verdict means the editor stripped the diacritics — rewrite the file, do not patch it
character by character.

- [ ] **Step 6: Commit**

```bash
git add src/data/translations.ts src/data/__tests__/translations.test.ts
git commit -m "feat: rewrite site copy for five-block structure"
```

---

## Task 9: Button, Header and Footer

**Files:**
- Modify: `src/components/ui/Button.tsx`
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/__tests__/Header.test.tsx`

**Interfaces:**
- Consumes: `Wordmark` (Task 5), translation keys (Task 8), `CHROME_STORE_URL` and
  `GITHUB_URL` (Task 2)
- Produces: `<Button variant?: 'primary' | 'ghost'>`; `<Header />`; `<Footer />`

- [ ] **Step 1: Write the failing test**

`src/components/layout/__tests__/Header.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/layout/Header';
import { LanguageProvider } from '@/lib/language-context';

function renderHeader(lang: 'en' | 'tr' = 'en') {
  return render(
    <LanguageProvider initialLang={lang}>
      <Header />
    </LanguageProvider>,
  );
}

describe('Header', () => {
  it('renders the wordmark', () => {
    renderHeader();
    expect(screen.getByText('ahtapot')).toBeInTheDocument();
  });

  it('offers no theme toggle — the site is dark-only', () => {
    renderHeader();
    expect(screen.queryByTitle(/toggle theme/i)).toBeNull();
  });

  it('links to the other language', () => {
    renderHeader('en');
    expect(screen.getByRole('link', { name: 'TR' })).toHaveAttribute('href', '/tr/');
  });

  it('shows Turkish copy on the Turkish route', () => {
    renderHeader('tr');
    expect(screen.getByText('Ürün')).toBeInTheDocument();
  });

  it('points the install CTA at the Chrome Web Store', () => {
    renderHeader();
    const cta = screen.getByRole('link', { name: /install/i });
    expect(cta).toHaveAttribute('href', expect.stringContaining('chromewebstore.google.com'));
    expect(cta).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });
});
```

`next/navigation`'s `usePathname` is not available under jsdom. Add a mock at the top of
the test file, below the imports:

```tsx
import { vi } from 'vitest';
vi.mock('next/navigation', () => ({
  usePathname: () => '/en/',
  useRouter: () => ({ push: vi.fn() }),
}));
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — the current Header renders an image wordmark and a theme toggle.

- [ ] **Step 3: Rewrite Button**

`src/components/ui/Button.tsx` — replace the `variantStyles` map and drop the
`btn`/`btn-primary` class indirection, which lived in the deleted globals block:

```tsx
import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'ghost';

interface BaseButtonProps {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button'; href?: never };

type ButtonAsLink = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  'inline-flex items-center gap-2 rounded-control px-4 py-2 text-[14px] font-medium transition-colors';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-ink hover:brightness-95',
  ghost: 'text-ink-2 hover:text-ink',
};

export function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  const cls = cn(base, variants[variant], className);

  if (props.as === 'a') {
    const { as, ...linkProps } = props;
    return <a className={cls} {...linkProps}>{children}</a>;
  }

  const { as, ...buttonProps } = props as ButtonAsButton;
  return <button className={cls} {...buttonProps}>{children}</button>;
}
```

Leave `src/components/ui/index.ts` alone for now. `Card`, `Badge`, `SectionTitle` and
`Avatar` are still imported by the legacy sections, which are not deleted until Task 13;
narrowing the barrel here would break compilation for four tasks. Task 13 removes the
files and the exports together.

- [ ] **Step 4: Rewrite Header**

`src/components/layout/Header.tsx`:

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Xmark } from 'iconoir-react';
import { useLanguage } from '@/lib/language-context';
import { Wordmark } from '@/components/primitives';
import { Button } from '@/components/ui';
import { CHROME_STORE_URL, GITHUB_URL } from '@/data/constants';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, t } = useLanguage();
  const pathname = usePathname();

  const otherLang = language === 'en' ? 'tr' : 'en';
  const pathWithoutLang = pathname.replace(/^\/(en|tr)/, '');
  const otherLangHref = `/${otherLang}${pathWithoutLang || '/'}`;

  const links = [
    { href: `/${language}/#showcase`, label: t('nav.product') },
    { href: GITHUB_URL, label: 'GitHub', external: true },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-hairline bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-container items-center justify-between px-6">
        <Link href={`/${language}/`} aria-label="Ahtapot">
          <Wordmark />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="text-[14px] text-ink-2 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <Link
            href={otherLangHref}
            className="text-[14px] text-ink-2 transition-colors hover:text-ink"
          >
            {otherLang.toUpperCase()}
          </Link>
          <Button as="a" href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">
            {t('nav.install')}
          </Button>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-ink md:hidden"
          aria-label="Menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <Xmark width={20} height={20} /> : <Menu width={20} height={20} />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="flex flex-col gap-4 border-b border-hairline bg-bg p-6 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="text-ink-2 hover:text-ink"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link href={otherLangHref} className="text-ink-2 hover:text-ink">
            {otherLang.toUpperCase()}
          </Link>
          <Button as="a" href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">
            {t('nav.install')}
          </Button>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 5: Rewrite Footer**

`src/components/layout/Footer.tsx`:

```tsx
'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { Wordmark } from '@/components/primitives';
import { GITHUB_URL } from '@/data/constants';

export function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="border-t border-hairline px-6 py-10">
      <div className="mx-auto flex max-w-container flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <Wordmark />
          <p className="text-[13px] text-ink-3">{t('footer.madeWith')}</p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-[13px] text-ink-2">
          <Link href={`/${language}/privacy/`} className="hover:text-ink">
            {t('footer.privacy')}
          </Link>
          <a href={`${GITHUB_URL}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            {t('footer.license')}
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            GitHub
          </a>
          <a
            href="https://www.producthunt.com/products/ahtapot"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink"
          >
            Product Hunt
          </a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS, 5 new tests.

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/ src/components/layout/
git commit -m "feat: rebuild Button, Header and Footer on the token system"
```

---

## Task 10: Hero and Providers sections

**Files:**
- Modify: `src/components/sections/Hero.tsx`
- Modify: `src/components/sections/Providers.tsx`
- Create: `src/components/sections/__tests__/Hero.test.tsx`

**Interfaces:**
- Consumes: `Section` (Task 6), `IOCPanel` + `heroFixture` (Task 7), `Button` (Task 9),
  `providers` (Task 2), copy keys (Task 8)
- Produces: `<Hero />`, `<Providers />`

- [ ] **Step 1: Write the failing test**

`src/components/sections/__tests__/Hero.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/sections/Hero';
import { Providers } from '@/components/sections/Providers';
import { LanguageProvider } from '@/lib/language-context';
import { providers } from '@/data/constants';

vi.mock('next/navigation', () => ({
  usePathname: () => '/en/',
  useRouter: () => ({ push: vi.fn() }),
}));

const wrap = (ui: React.ReactNode) =>
  render(<LanguageProvider initialLang="en">{ui}</LanguageProvider>);

describe('Hero', () => {
  it('renders the headline as a single h1', () => {
    wrap(<Hero />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(/threat intel/i);
  });

  it('renders the product visual as DOM, not an img', () => {
    const { container } = wrap(<Hero />);
    expect(screen.getByText('198.51.100.23')).toBeInTheDocument();
    expect(container.querySelector('img')).toBeNull();
  });

  it('offers install and source actions', () => {
    wrap(<Hero />);
    expect(screen.getByRole('link', { name: /install/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view source/i })).toBeInTheDocument();
  });

  it('shows no Product Hunt badge — it moved to the footer', () => {
    const { container } = wrap(<Hero />);
    expect(container.innerHTML).not.toContain('producthunt');
  });
});

describe('Providers', () => {
  it('renders a logo for every registered provider', () => {
    wrap(<Providers />);
    expect(screen.getAllByRole('img')).toHaveLength(providers.length);
  });

  it('gives every logo alt text', () => {
    wrap(<Providers />);
    for (const img of screen.getAllByRole('img')) {
      expect(img.getAttribute('alt')).toBeTruthy();
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — the current Hero renders images and a Product Hunt badge.

- [ ] **Step 3: Rewrite Hero**

`src/components/sections/Hero.tsx`:

```tsx
'use client';

import { useLanguage } from '@/lib/language-context';
import { Section } from '@/components/primitives';
import { Button } from '@/components/ui';
import { IOCPanel } from '@/components/product/IOCPanel';
import { heroFixture } from '@/components/product/fixtures';
import { CHROME_STORE_URL, GITHUB_URL } from '@/data/constants';

export function Hero() {
  const { t } = useLanguage();

  return (
    <Section className="pt-32">
      <p className="label mb-6 text-ink-3">{t('hero.eyebrow')}</p>

      <h1 className="display mb-6 max-w-[16ch] text-ink">
        {t('hero.title1')}
        <br />
        {t('hero.title2')}
      </h1>

      <p className="mb-10 max-w-[52ch] text-[18px] leading-relaxed text-ink-2">
        {t('hero.subtitle')}
      </p>

      <div className="mb-20 flex flex-wrap items-center gap-4">
        <Button as="a" href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">
          {t('hero.install')}
        </Button>
        <Button as="a" href={GITHUB_URL} target="_blank" rel="noopener noreferrer" variant="ghost">
          {t('hero.github')} ↗
        </Button>
      </div>

      <IOCPanel fixture={heroFixture} className="max-w-[560px]" />
    </Section>
  );
}
```

- [ ] **Step 4: Rewrite Providers**

`src/components/sections/Providers.tsx`. The strip is deliberately quiet — grayscale at
low opacity, brightening on hover.

```tsx
'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import { Section } from '@/components/primitives';
import { providers } from '@/data/constants';

export function Providers() {
  const { t } = useLanguage();

  return (
    <Section className="py-16">
      <p className="label mb-8 text-ink-3">{t('providers.title')}</p>

      <ul className="flex flex-wrap items-center gap-x-10 gap-y-6">
        {providers.map((provider) => (
          <li key={provider.name}>
            <Image
              src={provider.logo}
              alt={provider.alt}
              width={92}
              height={26}
              className="h-6 w-auto opacity-45 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS, 6 new tests. The Hero `img` assertion will fail if `IOCPanel` still uses
an image anywhere — it must be pure DOM.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/Hero.tsx src/components/sections/Providers.tsx src/components/sections/__tests__/
git commit -m "feat: rebuild Hero and Providers sections"
```

---

## Task 11: Showcase section

This block absorbs four deleted sections — `Features`, `HowItWorks`, `AIAnalysis` and
`IOCTypes` — so the SEO-relevant terms from each survive in its body copy.

**Files:**
- Create: `src/components/sections/Showcase.tsx`
- Create: `src/components/sections/__tests__/Showcase.test.tsx`

**Interfaces:**
- Consumes: `Section`, `Box` (Task 6); `IOCPanel`, all three fixtures (Task 7);
  `showcase.*` copy (Task 8)
- Produces: `<Showcase />` rendering three boxes under `id="showcase"`

- [ ] **Step 1: Write the failing test**

`src/components/sections/__tests__/Showcase.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Showcase } from '@/components/sections/Showcase';
import { LanguageProvider } from '@/lib/language-context';

vi.mock('next/navigation', () => ({
  usePathname: () => '/en/',
  useRouter: () => ({ push: vi.fn() }),
}));

const wrap = (lang: 'en' | 'tr' = 'en') =>
  render(<LanguageProvider initialLang={lang}><Showcase /></LanguageProvider>);

describe('Showcase', () => {
  it('anchors at #showcase so the nav link resolves', () => {
    const { container } = wrap();
    expect(container.querySelector('section#showcase')).toBeInTheDocument();
  });

  it('renders exactly three boxes', () => {
    wrap();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3);
  });

  it('keeps the IOC type terms that used to live in the IOCTypes section', () => {
    wrap();
    const text = document.body.textContent ?? '';
    for (const term of ['IPv4', 'IPv6', 'SHA256', 'CVE', 'Bitcoin', 'Ethereum']) {
      expect(text).toContain(term);
    }
  });

  it('names the AI vendors generically, with no model versions', () => {
    wrap();
    const text = document.body.textContent ?? '';
    expect(text).toMatch(/Claude/);
    expect(text).not.toMatch(/Sonnet|Haiku|Opus|GPT-4o/);
  });

  it('renders a product visual in every box', () => {
    wrap();
    expect(screen.getByText('198.51.100.23')).toBeInTheDocument();
    expect(screen.getByText('CVE-2024-3400')).toBeInTheDocument();
    expect(screen.getByText('a3f5c9e1…b2d4f6a8')).toBeInTheDocument();
  });

  it('renders Turkish copy on the Turkish route', () => {
    wrap('tr');
    expect(screen.getByText(/Her şeyi seç/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `Showcase`.

- [ ] **Step 3: Write Showcase**

`src/components/sections/Showcase.tsx`:

```tsx
'use client';

import { useLanguage } from '@/lib/language-context';
import { Section, Box } from '@/components/primitives';
import { IOCPanel } from '@/components/product/IOCPanel';
import { heroFixture, aiFixture, privacyFixture } from '@/components/product/fixtures';
import type { TranslationKey } from '@/data/translations';
import type { IOCFixture } from '@/components/product/fixtures';

interface ShowcaseItem {
  id: string;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  fixture: IOCFixture;
}

const items: ShowcaseItem[] = [
  { id: 'select', titleKey: 'showcase.select.title', descKey: 'showcase.select.desc', fixture: heroFixture },
  { id: 'ai', titleKey: 'showcase.ai.title', descKey: 'showcase.ai.desc', fixture: aiFixture },
  { id: 'privacy', titleKey: 'showcase.privacy.title', descKey: 'showcase.privacy.desc', fixture: privacyFixture },
];

export function Showcase() {
  const { t } = useLanguage();

  return (
    <Section id="showcase">
      <h2 className="h2 mb-14 text-ink">{t('showcase.title')}</h2>

      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <Box key={item.id} as="article" className="flex flex-col gap-5 p-6">
            <div className="space-y-2">
              <h3 className="text-[17px] font-medium text-ink">{t(item.titleKey)}</h3>
              <p className="text-[14px] leading-relaxed text-ink-2">{t(item.descKey)}</p>
            </div>
            <IOCPanel fixture={item.fixture} compact className="mt-auto" />
          </Box>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS, 6 new tests. The IOC-terms assertion depends on
`showcase.select.desc` from Task 8 listing every type — if it fails, that string was
edited, not the component.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Showcase.tsx src/components/sections/__tests__/Showcase.test.tsx
git commit -m "feat: add Showcase section absorbing four legacy sections"
```

---

## Task 12: SocialProof and CTA sections

**Files:**
- Create: `src/components/sections/SocialProof.tsx`
- Create: `src/components/sections/CTA.tsx`
- Create: `src/components/sections/__tests__/SocialProof.test.tsx`
- Modify: `src/data/constants.ts`

**Interfaces:**
- Consumes: `storeStats` (Task 2), `Section` (Task 6), `Button` (Task 9), copy (Task 8)
- Produces: `<SocialProof />`, `<CTA />`; `testimonials` reduced to two entries

- [ ] **Step 1: Write the failing test**

`src/components/sections/__tests__/SocialProof.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SocialProof } from '@/components/sections/SocialProof';
import { CTA } from '@/components/sections/CTA';
import { LanguageProvider } from '@/lib/language-context';
import { storeStats, testimonials } from '@/data/constants';

vi.mock('next/navigation', () => ({
  usePathname: () => '/en/',
  useRouter: () => ({ push: vi.fn() }),
}));

const wrap = (ui: React.ReactNode) =>
  render(<LanguageProvider initialLang="en">{ui}</LanguageProvider>);

describe('SocialProof', () => {
  it('renders figures from the single store-stats source', () => {
    wrap(<SocialProof />);
    expect(screen.getByText(String(storeStats.rating.toFixed(1)))).toBeInTheDocument();
    expect(screen.getByText(String(storeStats.userCount))).toBeInTheDocument();
  });

  it('shows exactly two quotes', () => {
    wrap(<SocialProof />);
    expect(screen.getAllByRole('blockquote')).toHaveLength(2);
  });

  it('attributes every quote to a named reviewer', () => {
    wrap(<SocialProof />);
    for (const testimonial of testimonials) {
      expect(screen.getByText(testimonial.author)).toBeInTheDocument();
    }
  });
});

describe('CTA', () => {
  it('renders the closing headline and install action', () => {
    wrap(<CTA />);
    expect(screen.getByRole('heading')).toHaveTextContent(/add it to your browser/i);
    expect(screen.getByRole('link', { name: /install/i })).toHaveAttribute(
      'href',
      expect.stringContaining('chromewebstore.google.com'),
    );
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — modules missing; `testimonials` still has 7 entries.

- [ ] **Step 3: Trim testimonials and re-export storeStats**

In `src/data/constants.ts`, cut the `testimonials` array to the two strongest entries
and re-export the stats so consumers have one import site:

```ts
export { storeStats } from './store-stats';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "Absolutely love this extension! It's simple, fast, and works exactly as promised.",
    author: 'Halil Enes Özdemir',
    source: 'Chrome Web Store',
    avatarColor: 'green',
  },
  {
    id: '2',
    quote: 'Özellikle SOC alanında çalışanlar için çok kullanışlı ve verimli bir araç.',
    author: 'Mehmet Kadir Cırık',
    source: 'Chrome Web Store',
    avatarColor: 'blue',
  },
];
```

- [ ] **Step 4: Write SocialProof**

`src/components/sections/SocialProof.tsx`:

```tsx
'use client';

import { useLanguage } from '@/lib/language-context';
import { Section } from '@/components/primitives';
import { storeStats, testimonials } from '@/data/constants';

export function SocialProof() {
  const { t } = useLanguage();

  return (
    <Section className="py-20">
      <div className="mb-12 flex flex-wrap items-baseline gap-x-8 gap-y-3">
        <span className="flex items-baseline gap-2">
          <span className="font-display text-[32px] font-medium tracking-[-0.02em] text-ink">
            {storeStats.rating.toFixed(1)}
          </span>
          <span className="text-[14px] text-ink-3">{t('social.rating')}</span>
        </span>

        <span className="flex items-baseline gap-2">
          <span className="font-display text-[32px] font-medium tracking-[-0.02em] text-ink">
            {storeStats.userCount}
          </span>
          <span className="text-[14px] text-ink-3">{t('social.users')}</span>
        </span>

        <span className="text-[14px] text-ink-3">{t('social.openSource')}</span>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {testimonials.map((testimonial) => (
          <blockquote key={testimonial.id} className="space-y-3">
            <p className="text-[15px] leading-relaxed text-ink-2">“{testimonial.quote}”</p>
            <footer className="label text-ink-3">{testimonial.author}</footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 5: Write CTA**

`src/components/sections/CTA.tsx`:

```tsx
'use client';

import { useLanguage } from '@/lib/language-context';
import { Section } from '@/components/primitives';
import { Button } from '@/components/ui';
import { CHROME_STORE_URL } from '@/data/constants';

export function CTA() {
  const { t } = useLanguage();

  return (
    <Section className="py-28">
      <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="h2 max-w-[18ch] text-ink">{t('cta.title')}</h2>
        <Button as="a" href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">
          {t('cta.install')}
        </Button>
      </div>
    </Section>
  );
}
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS, 4 new tests. `getAllByRole('blockquote')` requires the element to be a
real `<blockquote>` — if it fails, the element was changed to a `div`.

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/SocialProof.tsx src/components/sections/CTA.tsx src/components/sections/__tests__/SocialProof.test.tsx src/data/constants.ts
git commit -m "feat: add SocialProof and CTA sections"
```

---

## Task 13: Page assembly and dead code removal

**Files:**
- Modify: `src/app/[lang]/page.tsx`
- Modify: `src/components/sections/index.ts`
- Delete: `src/lib/theme-context.tsx`
- Delete: `src/components/sections/{Features,HowItWorks,AIAnalysis,IOCTypes,Stats,Testimonials,Feedback}.tsx`
- Delete: `src/components/ui/{Card,Badge,SectionTitle,Avatar}.tsx`
- Modify: `src/components/ui/index.ts`
- Modify: `src/app/manifest.ts`
- Create: `src/app/__tests__/page-structure.test.ts`

**Interfaces:**
- Consumes: all five section components
- Produces: the assembled home page

- [ ] **Step 1: Write the failing test**

`src/app/__tests__/page-structure.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const read = (p: string) => readFileSync(resolve(process.cwd(), p), 'utf8');

describe('home page', () => {
  it('renders exactly the five approved blocks', () => {
    const page = read('src/app/[lang]/page.tsx');
    for (const block of ['Hero', 'Providers', 'Showcase', 'SocialProof', 'CTA']) {
      expect(page).toContain(`<${block} />`);
    }
  });

  it('renders none of the deleted sections', () => {
    const page = read('src/app/[lang]/page.tsx');
    for (const gone of ['HowItWorks', 'Features', 'AIAnalysis', 'IOCTypes', 'Stats', 'Testimonials', 'Feedback']) {
      expect(page).not.toContain(`<${gone} />`);
    }
  });
});

describe('dead code', () => {
  const removed = [
    'src/lib/theme-context.tsx',
    'src/components/sections/Features.tsx',
    'src/components/sections/HowItWorks.tsx',
    'src/components/sections/AIAnalysis.tsx',
    'src/components/sections/IOCTypes.tsx',
    'src/components/sections/Stats.tsx',
    'src/components/sections/Testimonials.tsx',
    'src/components/sections/Feedback.tsx',
    'src/components/ui/Card.tsx',
    'src/components/ui/Badge.tsx',
    'src/components/ui/SectionTitle.tsx',
    'src/components/ui/Avatar.tsx',
  ];

  for (const path of removed) {
    it(`deletes ${path}`, () => {
      expect(existsSync(resolve(process.cwd(), path))).toBe(false);
    });
  }

  it('leaves no import of the theme context anywhere in src', () => {
    const layout = read('src/app/[lang]/layout.tsx');
    expect(layout).not.toContain('theme-context');
    expect(layout).not.toContain('ThemeProvider');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — the deleted files still exist and the layout still imports
`ThemeProvider`.

- [ ] **Step 3: Rewrite the page**

`src/app/[lang]/page.tsx`:

```tsx
import { Hero, Providers, Showcase, SocialProof, CTA } from '@/components/sections';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }];
}

export default function LangPage() {
  return (
    <>
      <Hero />
      <Providers />
      <Showcase />
      <SocialProof />
      <CTA />
    </>
  );
}
```

`src/components/sections/index.ts`:

```ts
export { Hero } from './Hero';
export { Providers } from './Providers';
export { Showcase } from './Showcase';
export { SocialProof } from './SocialProof';
export { CTA } from './CTA';
```

- [ ] **Step 4: Remove ThemeProvider from the layout**

In `src/app/[lang]/layout.tsx`, delete the `ThemeProvider` import and unwrap it:

```tsx
      <body className="antialiased">
        <LanguageProvider initialLang={lang}>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
```

Also correct the theme color, which still points at the logo tile:

```tsx
    other: {
      'theme-color': '#0B0B0D',
      'msapplication-TileColor': '#0B0B0D',
    },
```

`src/app/manifest.ts` carries the same stale colors. Update both:

```ts
    background_color: '#0B0B0D',
    theme_color: '#0B0B0D',
```

- [ ] **Step 5: Delete the dead files**

```bash
git rm src/lib/theme-context.tsx \
  src/components/sections/Features.tsx \
  src/components/sections/HowItWorks.tsx \
  src/components/sections/AIAnalysis.tsx \
  src/components/sections/IOCTypes.tsx \
  src/components/sections/Stats.tsx \
  src/components/sections/Testimonials.tsx \
  src/components/sections/Feedback.tsx \
  src/components/ui/Card.tsx \
  src/components/ui/Badge.tsx \
  src/components/ui/SectionTitle.tsx \
  src/components/ui/Avatar.tsx
```

Now narrow the UI barrel, which was deliberately left wide in Task 9 so the legacy
sections kept compiling. `src/components/ui/index.ts`:

```ts
export { Button } from './Button';
```

- [ ] **Step 6: Check for orphaned references**

Run: `grep -rn "theme-context\|useTheme\|SectionTitle\|<Badge\|<Card\|<Avatar" src/`
Expected: no output. The privacy page at `src/app/[lang]/privacy/page.tsx` may still
reference deleted components — if it does, rewrite those usages against `Box` and plain
elements before continuing.

- [ ] **Step 7: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS, 15 new tests.

- [ ] **Step 8: Commit**

```bash
git add -A src/
git commit -m "feat: assemble five-block page and delete superseded sections"
```

---

## Task 14: Structured data extraction and refresh

`src/app/[lang]/layout.tsx` is roughly 470 lines, most of it inline JSON-LD carrying
stale figures and model names. Extracting the builders makes the stale values testable
and shrinks a file that has grown past the point of being reviewable.

**Files:**
- Create: `src/lib/seo/schemas.ts`
- Create: `src/lib/seo/__tests__/schemas.test.ts`
- Modify: `src/app/[lang]/layout.tsx`

**Interfaces:**
- Consumes: `storeStats` (Task 2), `providers` (Task 2)
- Produces:
  - `buildSoftwareApplicationSchema(lang, description): object`
  - `buildOrganizationSchema(lang): object`
  - `buildWebSiteSchema(lang, description): object`
  - `buildFaqSchema(lang): object`
  - `buildHowToSchema(lang): object`
  - `buildAllSchemas(lang, description): object[]`

- [ ] **Step 1: Write the failing test**

`src/lib/seo/__tests__/schemas.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { buildAllSchemas, buildSoftwareApplicationSchema } from '@/lib/seo/schemas';
import { storeStats } from '@/data/store-stats';
import { providers } from '@/data/constants';

describe('structured data', () => {
  it('takes its rating figures from the single store-stats source', () => {
    const schema = buildSoftwareApplicationSchema('en', 'desc') as any;
    expect(schema.aggregateRating.ratingValue).toBe(String(storeStats.rating));
    expect(schema.aggregateRating.ratingCount).toBe(String(storeStats.ratingCount));
  });

  it('names no AI model version', () => {
    const serialized = JSON.stringify(buildAllSchemas('en', 'desc'));
    for (const stale of ['Sonnet', 'Haiku', 'Opus', 'GPT-4o', 'o1', 'o3', '2.5 Flash', '1.5 Pro', '16 AI Models']) {
      expect(serialized, `found stale reference: ${stale}`).not.toContain(stale);
    }
  });

  it('derives the provider count rather than typing it', () => {
    const serialized = JSON.stringify(buildAllSchemas('en', 'desc'));
    expect(serialized).toContain(`${providers.length} threat intelligence providers`);
  });

  it('lists every provider by name in the FAQ answer', () => {
    const serialized = JSON.stringify(buildAllSchemas('en', 'desc'));
    for (const provider of providers) {
      expect(serialized).toContain(provider.name);
    }
  });

  it('builds schemas for both languages', () => {
    expect(buildAllSchemas('tr', 'açıklama').length).toBeGreaterThan(0);
    expect(buildAllSchemas('en', 'desc').length).toBe(buildAllSchemas('tr', 'açıklama').length);
  });

  it('gives every schema a context and a type', () => {
    for (const schema of buildAllSchemas('en', 'desc') as any[]) {
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBeTruthy();
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/lib/seo/schemas`.

- [ ] **Step 3: Write the schema builders**

`src/lib/seo/schemas.ts`. Move each JSON-LD object from the layout into a builder,
applying three corrections: rating figures read from `storeStats`, the provider count is
interpolated from `providers.length`, and every AI model name is removed. The
`featureList` entry that read `'16 AI Models from Claude, Gemini, OpenAI'` becomes
`'AI-assisted analysis with Claude, Gemini and GPT'`, and the `'Dark/Light Theme
Support'` entry is dropped — the extension keeps its themes but the claim is not the
site's to make here, and the site itself is now dark-only.

```ts
import { storeStats } from '@/data/store-stats';
import { providers } from '@/data/constants';

const BASE_URL = 'https://ahtapot.me';
const STORE_URL =
  'https://chromewebstore.google.com/detail/ahtapot-ioc-analysis-tool/gmekhigahdiddngdhfdkeefcomcankpg';
const REPO_URL = 'https://github.com/abdullahcicekli/ahtapot';

type Lang = 'en' | 'tr';

const providerNames = providers.map((p) => p.name).join(', ');

export function buildSoftwareApplicationSchema(lang: Lang, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Ahtapot - IOC Analyzer Extension',
    applicationCategory: 'SecurityApplication',
    applicationSubCategory: 'Browser Security Extension',
    operatingSystem: 'Chrome, Chromium-based browsers, Edge, Brave, Arc, Vivaldi, Opera',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(storeStats.rating),
      ratingCount: String(storeStats.ratingCount),
      bestRating: '5',
      worstRating: '1',
    },
    description,
    featureList: [
      'AI-assisted analysis with Claude, Gemini and GPT',
      'MITRE ATT&CK mapping',
      `${providers.length} threat intelligence providers (${providerNames})`,
      'Smart IOC detection: IPv4, IPv6, Domain, URL, MD5, SHA1, SHA256, Email, CVE, Bitcoin, Ethereum',
      'Privacy-first architecture with no data collection',
      'Context menu analysis',
      'Configurable cache',
    ],
    author: { '@type': 'Person', name: 'Abdullah Cicekli', url: 'https://github.com/abdullahcicekli' },
    publisher: { '@type': 'Organization', name: 'Ahtapot', url: BASE_URL },
    url: `${BASE_URL}/${lang}/`,
    downloadUrl: STORE_URL,
    installUrl: STORE_URL,
    isAccessibleForFree: true,
    license: `${REPO_URL}/blob/main/LICENSE`,
    inLanguage: [lang, 'en', 'tr'],
  };
}

export function buildOrganizationSchema(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ahtapot',
    alternateName: ['Ahtapot IOC Analyzer', 'Ahtapot Security'],
    url: BASE_URL,
    logo: `${BASE_URL}/icons/android-chrome-512x512.png`,
    description:
      lang === 'en'
        ? 'Ahtapot is a free, open-source IOC analyzer browser extension for security professionals and SOC analysts.'
        : 'Ahtapot, güvenlik profesyonelleri ve SOC analistleri için ücretsiz, açık kaynaklı bir IOC analizci tarayıcı eklentisidir.',
    founder: { '@type': 'Person', name: 'Abdullah Cicekli', url: 'https://github.com/abdullahcicekli' },
    sameAs: [REPO_URL, STORE_URL],
  };
}

export function buildWebSiteSchema(lang: Lang, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ahtapot - IOC Analyzer Extension',
    alternateName: ['Ahtapot', 'IOC Analyzer', 'Ahtapot Eklentisi', 'IOC Analizci'],
    url: BASE_URL,
    description,
    inLanguage: [lang, 'en', 'tr'],
    publisher: { '@type': 'Organization', name: 'Ahtapot', url: BASE_URL },
  };
}

export function buildFaqSchema(lang: Lang) {
  const qa =
    lang === 'en'
      ? [
          ['What is Ahtapot IOC Analyzer Extension?',
           `Ahtapot is a free, open-source IOC (Indicator of Compromise) analyzer browser extension for Chrome and Chromium-based browsers. It helps security professionals and SOC analysts analyze suspicious IPs, domains, URLs, and file hashes using ${providers.length} threat intelligence providers and AI-assisted analysis.`],
          ['Is Ahtapot free?',
           'Yes. Ahtapot is completely free and open source. There are no premium tiers or subscriptions. You supply your own API keys for the providers and AI services you want to use.'],
          ['Which browsers support Ahtapot?',
           'Chrome, Microsoft Edge, Brave, Arc, Vivaldi, Opera, and all Chromium-based browsers.'],
          ['Which threat intelligence providers does Ahtapot support?',
           `Ahtapot integrates with ${providers.length} threat intelligence providers: ${providerNames}.`],
          ['Does Ahtapot collect my data?',
           'No. Ahtapot has a privacy-first architecture and collects no user data, browsing history, or analyzed indicators. API keys are stored locally in your browser, and the extension talks only to the providers you configure.'],
          ['What types of IOCs can Ahtapot analyze?',
           'IPv4 addresses, IPv6 addresses, domains, URLs, MD5 hashes, SHA1 hashes, SHA256 hashes, email addresses, CVE identifiers, Bitcoin addresses, and Ethereum addresses.'],
        ]
      : [
          ['Ahtapot IOC Analizci Eklentisi nedir?',
           `Ahtapot, Chrome ve Chromium tabanlı tarayıcılar için ücretsiz, açık kaynaklı bir IOC analizci tarayıcı eklentisidir. Güvenlik profesyonellerinin ve SOC analistlerinin ${providers.length} tehdit istihbarat sağlayıcısı ve yapay zeka destekli analiz ile şüpheli IP, domain, URL ve dosya hashlerini incelemesine yardımcı olur.`],
          ['Ahtapot ücretsiz mi?',
           'Evet. Ahtapot tamamen ücretsiz ve açık kaynaklıdır. Premium katman veya abonelik yoktur. Kullanmak istediğiniz sağlayıcılar ve yapay zeka hizmetleri için kendi API anahtarlarınızı sağlarsınız.'],
          ["Hangi tarayıcılar Ahtapot'u destekler?",
           'Chrome, Microsoft Edge, Brave, Arc, Vivaldi, Opera ve tüm Chromium tabanlı tarayıcılar.'],
          ['Ahtapot hangi tehdit istihbarat sağlayıcılarını destekler?',
           `Ahtapot ${providers.length} tehdit istihbarat sağlayıcısıyla entegredir: ${providerNames}.`],
          ['Ahtapot verilerimi topluyor mu?',
           'Hayır. Ahtapot gizlilik öncelikli bir mimariye sahiptir; kullanıcı verisi, tarama geçmişi veya analiz edilen göstergeleri toplamaz. API anahtarları tarayıcınızda yerel olarak saklanır ve eklenti yalnızca yapılandırdığınız sağlayıcılarla iletişim kurar.'],
          ['Ahtapot hangi IOC türlerini analiz edebilir?',
           "IPv4 adresleri, IPv6 adresleri, domainler, URL'ler, MD5 hashleri, SHA1 hashleri, SHA256 hashleri, e-posta adresleri, CVE tanımlayıcıları, Bitcoin adresleri ve Ethereum adresleri."],
        ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map(([name, text]) => ({
      '@type': 'Question',
      name,
      acceptedAnswer: { '@type': 'Answer', text },
    })),
  };
}

export function buildHowToSchema(lang: Lang) {
  const steps =
    lang === 'en'
      ? [
          ['Install the extension', 'Install Ahtapot from the Chrome Web Store. It works on Chrome, Edge, Brave, and all Chromium-based browsers.'],
          ['Configure API keys', 'Open extension settings and add your API keys for the threat intelligence providers and AI services you want to use.'],
          ['Select and analyze', 'Select any text containing an indicator on any webpage, right-click, and choose "Analyze with Ahtapot".'],
          ['Review results', 'Review results from every provider that supports the indicator, and optionally run AI analysis for triage and MITRE ATT&CK mapping.'],
        ]
      : [
          ['Eklentiyi yükleyin', "Chrome Web Store'dan Ahtapot'u yükleyin. Chrome, Edge, Brave ve tüm Chromium tabanlı tarayıcılarda çalışır."],
          ['API anahtarlarını yapılandırın', 'Eklenti ayarlarını açın ve kullanmak istediğiniz tehdit istihbarat sağlayıcıları ve yapay zeka hizmetleri için API anahtarlarınızı ekleyin.'],
          ['Seçin ve analiz edin', 'Herhangi bir web sayfasında gösterge içeren metni seçin, sağ tıklayın ve "Ahtapot ile Analiz Et"i seçin.'],
          ['Sonuçları inceleyin', 'Göstergeyi destekleyen tüm sağlayıcılardan gelen sonuçları inceleyin; triage ve MITRE ATT&CK eşlemesi için isteğe bağlı yapay zeka analizini çalıştırın.'],
        ];

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: lang === 'en' ? 'How to use Ahtapot IOC Analyzer' : 'Ahtapot IOC Analizci nasıl kullanılır',
    step: steps.map(([name, text], i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name,
      text,
    })),
    totalTime: 'PT5M',
  };
}

export function buildAllSchemas(lang: Lang, description: string) {
  return [
    buildSoftwareApplicationSchema(lang, description),
    buildOrganizationSchema(lang),
    buildWebSiteSchema(lang, description),
    buildFaqSchema(lang),
    buildHowToSchema(lang),
  ];
}
```

- [ ] **Step 4: Consume the builders in the layout**

In `src/app/[lang]/layout.tsx`, delete every inline `<script type="application/ld+json">`
block — including the seven individual `Review` schemas, which duplicated testimonials
that no longer all appear on the page — and replace the whole `<head>` with:

```tsx
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildAllSchemas(lang, seoData[lang].description)),
          }}
        />
      </head>
```

Add the import at the top:

```tsx
import { buildAllSchemas } from '@/lib/seo/schemas';
```

Also strip the model names from the two `seoData` description strings and the two
`ogDescription` strings — they currently read "Claude, Gemini, GPT-4o". Replace each
occurrence of `GPT-4o` with `GPT`, and each `10 threat intelligence providers` /
`10 tehdit istihbarat sağlayıcısı` with the provider-agnostic phrasing
`threat intelligence providers` / `tehdit istihbarat sağlayıcıları`. Do the same for the
`keywords` strings, removing `GPT-4o`.

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS, 6 new tests.

- [ ] **Step 6: Verify no stale reference survives anywhere in the source**

Run:

```bash
grep -rniE "gpt-4o|sonnet|haiku|3 opus|2\.0 flash|2\.5 flash|1\.5 pro|16 AI Models|ratingCount: '9'" src/ || echo CLEAN
```

Expected: `CLEAN`.

- [ ] **Step 7: Commit**

```bash
git add src/lib/seo/ "src/app/[lang]/layout.tsx"
git commit -m "refactor: extract JSON-LD builders and refresh stale figures"
```

---

## Task 15: Migrate the privacy page to the new tokens and strip model names

`src/app/[lang]/privacy/page.tsx` makes 90 CSS-variable references, nearly all to names
Task 4 deleted. It is a live page linked from the footer, and it now renders inside the
new Header and Footer. Left alone it ships as a half-rebranded page with text falling
back to inherited colors.

The page imports no deleted component — only `useLanguage`, `Link`, `Script` and the
constants — so this is a token migration, not a rewrite.

It also carries 24 AI model version references across its English and Turkish copy —
`Sonnet 4`, `3.5 Haiku`, `GPT-4o Mini`, and the rest — which violate the global
no-model-names constraint. No other task touches this file's copy, so they are removed
here. The page is a privacy disclosure: naming the *vendors* data may reach is the
substance and must stay. Only the version lists go.

**Files:**
- Modify: `src/app/[lang]/privacy/page.tsx`
- Create: `src/app/__tests__/privacy-tokens.test.ts`

**Interfaces:**
- Consumes: tokens from Task 4
- Produces: nothing other tasks depend on

- [ ] **Step 1: Write the failing test**

`src/app/__tests__/privacy-tokens.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const TOKENS = readFileSync(resolve(process.cwd(), 'src/styles/tokens.css'), 'utf8');

/** Every custom property the token file actually defines. */
const defined = new Set(
  [...TOKENS.matchAll(/^\s*(--[a-z0-9-]+):/gm)].map((m) => m[1]),
);

function sourceFiles(dir: string): string[] {
  return readdirSync(resolve(process.cwd(), dir), { withFileTypes: true, recursive: true })
    .filter((e) => e.isFile() && /\.tsx?$/.test(e.name))
    .map((e) => resolve(e.parentPath ?? (e as any).path, e.name));
}

describe('CSS variable references', () => {
  it('references no variable the token file does not define', () => {
    const orphans: string[] = [];

    for (const file of sourceFiles('src')) {
      const source = readFileSync(file, 'utf8');
      for (const match of source.matchAll(/var\((--[a-z0-9-]+)\)/g)) {
        if (!defined.has(match[1])) {
          orphans.push(`${file.replace(process.cwd() + '/', '')}: ${match[1]}`);
        }
      }
    }

    expect(orphans).toEqual([]);
  });
});
```

This test guards the whole `src` tree, not just the privacy page — it catches any
orphaned reference left behind by Tasks 9 through 13 as well.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL, listing roughly 90 orphaned references, nearly all in
`src/app/[lang]/privacy/page.tsx`.

- [ ] **Step 3: Map the old names to the new ones**

| Old | New | Why |
| --- | --- | --- |
| `--text-primary` | `--text` | Primary body text |
| `--text-secondary` | `--text-2` | Secondary text |
| `--text-muted` | `--text-3` | Muted text |
| `--bg-primary` | `--bg` | Page canvas |
| `--bg-secondary` | `--bg-raised` | Raised surface |
| `--bg-card` | `--bg-card` | Unchanged |
| `--border` | `--border` | Unchanged |
| `--accent-dim` | `--accent-dim` | Unchanged |

- [ ] **Step 4: Apply the rename**

Order matters: rewrite the longest names first so `--text-primary` is not partially
matched by a `--text` rule.

```bash
F="src/app/[lang]/privacy/page.tsx"
perl -pi -e 's/var\(--text-primary\)/var(--text)/g;
             s/var\(--text-secondary\)/var(--text-2)/g;
             s/var\(--text-muted\)/var(--text-3)/g;
             s/var\(--bg-primary\)/var(--bg)/g;
             s/var\(--bg-secondary\)/var(--bg-raised)/g;' "$F"
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test`
Expected: PASS. If orphans remain, the report names each file and variable — fix those
too. Do not add alias definitions to `tokens.css` to silence the test; the point is that
the old names are gone.

- [ ] **Step 6: Strip the AI model version lists**

Find them:

Run: `grep -nE "Sonnet|Haiku|Opus|GPT-4|o1 |o3 |Flash|1\.5 Pro" "src/app/[lang]/privacy/page.tsx"`

Each hit is a list item naming a vendor followed by its models. Keep the vendor, drop
the versions. For example:

```tsx
// before
<li><strong>Claude (Anthropic)</strong> - Sonnet 4, 3.5 Sonnet, 3.5 Haiku, 3 Opus</li>
<li><strong>Google Gemini</strong> - 2.5 Flash, 2.5 Pro, 2.0 Flash, 1.5 Pro</li>
<li><strong>OpenAI</strong> - GPT-4o, GPT-4o Mini, GPT-4 Turbo, o1, o3 Mini</li>

// after
<li><strong>Claude</strong> (Anthropic)</li>
<li><strong>Gemini</strong> (Google)</li>
<li><strong>GPT</strong> (OpenAI)</li>
```

Apply the same edit to both the English and the Turkish copy — the file contains two
parallel blocks. Re-run the grep afterwards; it must return nothing.

Add this assertion to `src/app/__tests__/privacy-tokens.test.ts`:

```ts
describe('privacy page copy', () => {
  it('names AI vendors but no model versions', () => {
    const page = readFileSync(
      resolve(process.cwd(), 'src/app/[lang]/privacy/page.tsx'),
      'utf8',
    );
    for (const stale of ['Sonnet', 'Haiku', 'Opus', 'GPT-4', 'o3 Mini', '2.5 Flash', '1.5 Pro']) {
      expect(page, `privacy page still names ${stale}`).not.toContain(stale);
    }
    expect(page).toContain('Claude');
    expect(page).toContain('Gemini');
  });
});
```

- [ ] **Step 7: Check the page for legacy visual idioms**

Run: `grep -n "gradient-text\|animate-float\|hover:-translate-y\|dark:" "src/app/[lang]/privacy/page.tsx"`

Any match is a leftover from the deleted design language. Remove the class; the page
should read as plain typographic content on the new canvas. `dark:` variants in
particular are dead — Tailwind's `darkMode` key is gone from the config, so they never
apply.

- [ ] **Step 8: Commit**

```bash
git add "src/app/[lang]/privacy/page.tsx" src/app/__tests__/privacy-tokens.test.ts
git commit -m "fix: migrate privacy page tokens and drop stale model names"
```

---

## Task 16: Build verification and asset cleanup

**Files:**
- Delete: `public/images/{octopus.png,landing.png,ahtapot-logo-black.png,ahtapot-logo-white.png,logo-black.png,logo-white.png}`
- Modify: `public/images/og-image.png`
- Create: `src/app/__tests__/build-output.test.ts`

**Interfaces:**
- Consumes: everything
- Produces: a verified static export in `out/`

- [ ] **Step 1: Delete the superseded images**

```bash
git rm public/images/octopus.png public/images/landing.png \
  public/images/ahtapot-logo-black.png public/images/ahtapot-logo-white.png \
  public/images/logo-black.png public/images/logo-white.png
```

`chromeAvailable.png` stays only if something still references it. Check:

Run: `grep -rn "chromeAvailable" src/`
If there is no output, delete it too: `git rm public/images/chromeAvailable.png`

- [ ] **Step 2: Verify nothing references a deleted asset**

Run: `grep -rnE "octopus|landing\.png|ahtapot-logo-(black|white)|logo-(black|white)\.png" src/ public/`
Expected: no output. `public/fonts/README.md` and the spec may mention them in prose;
only code references matter.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: succeeds, writing `out/`.

Note `next.config.js` sets `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds`,
so the build will not catch type errors. Run the type check explicitly:

Run: `npx tsc --noEmit`
Expected: no errors. Fix any that appear — do not rely on the build's suppression.

- [ ] **Step 4: Write the build-output test**

`src/app/__tests__/build-output.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const outDir = resolve(process.cwd(), 'out');
const hasBuild = existsSync(outDir);

describe.skipIf(!hasBuild)('static export', () => {
  const read = (p: string) => readFileSync(resolve(outDir, p), 'utf8');

  it('emits both language routes', () => {
    expect(existsSync(resolve(outDir, 'en/index.html'))).toBe(true);
    expect(existsSync(resolve(outDir, 'tr/index.html'))).toBe(true);
  });

  it('ships the self-hosted fonts', () => {
    expect(existsSync(resolve(outDir, 'fonts/UncutSans-Variable.woff2'))).toBe(true);
    expect(existsSync(resolve(outDir, 'fonts/CommitMono-400.woff2'))).toBe(true);
  });

  it('requests no third-party font host', () => {
    for (const page of ['en/index.html', 'tr/index.html']) {
      expect(read(page)).not.toMatch(/fonts\.googleapis|fonts\.gstatic|use\.typekit/);
    }
  });

  it('names no AI model version in any rendered page', () => {
    const pages = ['en/index.html', 'tr/index.html', 'en/privacy/index.html', 'tr/privacy/index.html'];
    for (const page of pages) {
      const html = read(page);
      for (const stale of ['GPT-4o', 'Sonnet', 'Haiku', 'Opus', '2.0 Flash', '1.5 Pro', 'o3 Mini']) {
        expect(html, `${page} contains ${stale}`).not.toContain(stale);
      }
    }
  });

  it('emits the privacy routes it links to from every footer', () => {
    expect(existsSync(resolve(outDir, 'en/privacy/index.html'))).toBe(true);
    expect(existsSync(resolve(outDir, 'tr/privacy/index.html'))).toBe(true);
  });

  it('renders the Turkish page with real Turkish characters', () => {
    expect(read('tr/index.html')).toMatch(/tarayıcının|Güvenlik|seç/);
  });

  it('carries the refreshed store figures in structured data', () => {
    const html = read('en/index.html');
    expect(html).toContain('"ratingCount":"14"');
    expect(html).not.toContain('"ratingCount":"9"');
  });
});
```

- [ ] **Step 5: Run the full suite**

Run: `npm test`
Expected: PASS, all tests including the 6 build-output tests. If they report as skipped,
`out/` is missing — run `npm run build` first.

- [ ] **Step 6: Regenerate the Open Graph image**

Serve the build and capture the hero at OG dimensions:

```bash
npx serve out -l 4321 &
sleep 2
npx playwright screenshot --viewport-size=1200,630 \
  http://localhost:4321/en/ public/images/og-image.png
kill %1
```

Open `public/images/og-image.png` and confirm the headline is legible and the mark is
visible. If the sticky header crops the headline awkwardly, capture with
`--full-page=false` after scrolling, or compose the image manually at 1200×630 — an OG
image that cuts a word in half is worse than none.

- [ ] **Step 7: Visual check across breakpoints**

```bash
npx serve out -l 4321 &
sleep 2
for w in 375 768 1440; do
  npx playwright screenshot --viewport-size=$w,900 --full-page \
    http://localhost:4321/en/ /tmp/ahtapot-$w.png
done
kill %1
```

Open all three. Confirm: no horizontal scroll at 375; the container hairline rules are
hidden below `md` and visible at 1440; the accent green appears at most three times per
viewport; the `IOCPanel` mono text is legible at 375.

- [ ] **Step 8: Accessibility and performance audit**

```bash
npx serve out -l 4321 &
sleep 2
npx lighthouse http://localhost:4321/en/ \
  --only-categories=accessibility,performance,seo \
  --chrome-flags="--headless" --output=json --output-path=/tmp/lh.json
kill %1
node -e "const r=require('/tmp/lh.json');for(const k of ['accessibility','performance','seo'])console.log(k, Math.round(r.categories[k].score*100))"
```

Expected: accessibility ≥ 95, SEO ≥ 95. Investigate any accessibility finding rather
than accepting the score — contrast on `--text-3` (`#6B6B73`) against `--bg` (`#0B0B0D`)
measures about 4.6:1, which passes AA for normal text but leaves no margin; if
Lighthouse flags it, lighten `--text-3`, do not silence the check.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: remove superseded assets and verify static export"
```

- [ ] **Step 10: Open the pull request**

```bash
git push -u origin feature/rebrand-website
gh pr create --title "Rebrand: dark-only five-block website" \
  --body "Implements docs/superpowers/specs/2026-08-21-ahtapot-rebrand-website-design.md

Rebuilds ahtapot.me on a dark-only token system with self-hosted Uncut Sans and
Commit Mono, real-DOM product visuals, and five sections in place of nine.

Also fixes two data defects found during implementation: URLhaus was missing from
the site's provider array while copy claimed ten, and the JSON-LD carried a stale
rating count of 9 against the store's actual 14.

🤖 Generated with [Claude Code](https://claude.com/claude-code)"
```

Merging to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes to
GitHub Pages. Verify `https://ahtapot.me` after the workflow completes.

---

## Notes for the next workstream

Two things surfaced during this work that belong to later workstreams, recorded so they
are not lost:

- The Chrome Web Store listing is now titled "Ahtapot — AI-Powered IOC Threat
  Intelligence", but `CHROME_STORE_URL` still uses the old `ahtapot-ioc-analysis-tool`
  slug. The old slug redirects, so nothing is broken; update it when workstream 5
  touches store metadata.
- `src/app/[lang]/privacy/page.tsx` was migrated to the new tokens in Task 15 but not
  redesigned. It reads as plain typographic content on the new canvas, which is
  adequate; a proper layout pass belongs with workstream 2.
