# Ahtapot Website Rebrand — Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the defects found on the built phase-1 site, and add the four sections the feedback round called for — a tabbed feature panel, a provider directory, a visible FAQ, and a three-column footer.

**Architecture:** Continues on `feature/rebrand-website`, on top of phase 1's 42 commits. The token system, primitives and `IOCPanel` are unchanged and reused. One new primitive (`Tabs`) is added. The FAQ's content moves to a shared module consumed by both the visible section and the JSON-LD builder, so they cannot drift.

**Tech Stack:** Unchanged from phase 1.

**Spec:** `docs/superpowers/specs/2026-08-21-ahtapot-rebrand-website-design.md`, "Phase 2 — Feedback round"

## Global Constraints

Phase 1's constraints all still bind. Added or changed for phase 2:

- **No store figures rendered on the page.** `storeStats` stays, consumed only by
  `src/lib/seo/schemas.ts`. No rating, rating count or user count appears in any
  component.
- **No em dashes in copy.** Rewrite the sentence instead of substituting a hyphen.
- **English technical terms must render with English casing on the Turkish route.**
  Provider names, verdict labels and IOC type names are English and carry `lang="en"`.
- **The visible FAQ and the `FAQPage` schema read from one source.** Google requires
  marked-up FAQ content to be visible; a divergence is a policy violation, not a bug.
- **Provider capability data is ground truth**, read from each service's
  `supportedIOCTypes` getter in `ahtapot/src/services/tools/*.ts`. Do not invent or
  round it.
- **Per-section restraint.** One `h2` and one idea per section; at most three facts per
  provider card; the accordion carries no icons; at most three links per footer column.
- Accent budget unchanged: header CTA, hero CTA, mark, plus the closing CTA button.

## Ground truth: provider capabilities

Read from the extension on 2026-08-21. Use exactly these.

| Provider | Supported IOC types |
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

## The seven testimonials

Recovered from `0dc191c:src/data/constants.ts`. Quotes are real Chrome Web Store
reviews; do not edit their wording beyond the trimming phase 1 already applied to the
first two.

| Author | Quote |
| --- | --- |
| Halil Enes Özdemir | Absolutely love this extension! It's simple, fast, and works exactly as promised. |
| Mehmet Kadir Cırık | Özellikle SOC alanında çalışanlar için çok kullanışlı ve verimli bir araç. |
| Sueda Çiçekli | Great tool for quick IOC analysis. Simple, fast, and privacy-focused. Well done! |
| Furkan Doğmuş | It's a good extension for end-users. Makes IOC analysis accessible to everyone. |
| Altuğ Tekiner | Elinize emeğinize sağlık. Çok iyi bir eklenti olmuş! |
| Ömer Faruk Çiçekli | Çok iyi bir eklenti. Faydalı bir extension! |
| Muaz Memiş | Çok iyi bir eklenti |

---

## File Structure

**Create**

| Path | Responsibility |
| --- | --- |
| `src/components/primitives/Tabs.tsx` | Accessible tablist, desktop + mobile triggers |
| `src/data/faq.ts` | The six Q&A pairs, both languages — single source |
| `src/data/providers-detail.ts` | Per-provider capability data |
| `src/components/product/panels.tsx` | The four tab panel bodies |
| `src/components/sections/FeatureTabs.tsx` | Section ③ |
| `src/components/sections/ProviderDirectory.tsx` | Section ④ |
| `src/components/sections/Faq.tsx` | Section ⑥ |

**Modify**

| Path | Change |
| --- | --- |
| `src/app/globals.css` | `.label` no longer force-uppercases; add `.label-en` or equivalent |
| `src/data/translations.ts` | Em dashes out, phase-2 copy in, dead keys out |
| `src/data/constants.ts` | Restore `logo`/`alt`; testimonials back to seven |
| `src/types/index.ts` | Restore `Provider.logo`/`.alt`, add capability fields |
| `src/lib/seo/schemas.ts` | `buildFaqSchema` consumes `src/data/faq.ts` |
| `src/components/sections/SocialProof.tsx` | Seven testimonials, no figures |
| `src/components/sections/Providers.tsx` | Keep the text strip; add `lang="en"` |
| `src/components/product/IOCPanel.tsx` | `lang="en"` on verdict and kind labels |
| `src/components/layout/Footer.tsx` | Three columns plus bottom bar |
| `src/app/[lang]/page.tsx` | New eight-block order |
| `src/components/sections/index.ts` | New exports |

**Delete**

| Path | Reason |
| --- | --- |
| `src/components/sections/Showcase.tsx` | Replaced by `FeatureTabs` |

**Restore from git**

`public/provider-icons/` — deleted in `24723a1`, needed again by the directory.
`git checkout 24723a1^ -- public/provider-icons`

---

## Task 1: Turkish casing and em dashes

Two copy-level defects visible on the built page.

**Files:**
- Modify: `src/app/globals.css`, `src/components/product/IOCPanel.tsx`,
  `src/components/sections/Providers.tsx`, `src/data/translations.ts`
- Create: `src/app/__tests__/casing.test.ts`

**Interfaces:**
- Produces: a `.label` class that no longer force-uppercases, and English technical
  tokens marked `lang="en"`.

- [ ] **Step 1: Write the failing test**

`src/app/__tests__/casing.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

function sources(dir: string): string[] {
  return readdirSync(resolve(process.cwd(), dir), { withFileTypes: true, recursive: true })
    .filter((e) => e.isFile() && /\.tsx?$/.test(e.name) && !e.name.includes('.test.'))
    .map((e) => resolve((e as any).parentPath ?? (e as any).path, e.name));
}

describe('copy', () => {
  it('uses no em dashes', () => {
    const offenders: string[] = [];
    for (const file of sources('src')) {
      const text = readFileSync(file, 'utf8');
      if (text.includes('—')) offenders.push(file.replace(process.cwd() + '/', ''));
    }
    expect(offenders).toEqual([]);
  });
});

describe('English technical tokens', () => {
  it('marks the verdict and kind labels lang="en" so Turkish casing does not apply', () => {
    const panel = readFileSync(
      resolve(process.cwd(), 'src/components/product/IOCPanel.tsx'),
      'utf8',
    );
    expect(panel).toMatch(/lang="en"/);
  });

  it('marks provider names lang="en"', () => {
    const strip = readFileSync(
      resolve(process.cwd(), 'src/components/sections/Providers.tsx'),
      'utf8',
    );
    expect(strip).toMatch(/lang="en"/);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — em dashes present, no `lang="en"` anywhere.

- [ ] **Step 3: Understand the casing rule before changing anything**

The browser applies Turkish casing to `text-transform: uppercase` when the nearest
`lang` is `tr`, turning `i` into `İ`. Marking an element `lang="en"` restores English
casing for that subtree, and is also the semantically correct statement: "VirusTotal"
is an English proper noun regardless of the page language.

Apply `lang="en"` to:
- the verdict label and the kind chip in `IOCPanel.tsx`
- each provider name in `Providers.tsx`

Leave the Turkish eyebrow and section labels alone — Turkish casing is correct for them.

- [ ] **Step 4: Remove the em dashes**

Run: `grep -rn $'—' src/` and rewrite each sentence so it reads naturally without
one. Do not simply substitute a hyphen; recast the clause. Both languages.

- [ ] **Step 5: Run the tests, then verify in a browser**

Run: `npm test && npm run build`

Then serve `out/` and check the Turkish route renders `MALICIOUS`, `VIRUSTOTAL`,
`PULSEDIVE`, `SCAMALYTICS` with a dotless capital I. A grep of the HTML source will not
prove this — the transform happens at render time, so it must be checked in a browser.

- [ ] **Step 6: Commit**

```bash
git add -A src/
git commit -m "fix: English casing for technical terms on the Turkish route"
```

---

## Task 2: Testimonials without figures

**Files:**
- Modify: `src/data/constants.ts`, `src/components/sections/SocialProof.tsx`,
  `src/components/sections/__tests__/SocialProof.test.tsx`, `src/data/translations.ts`

**Interfaces:**
- Produces: `testimonials` with seven entries; `SocialProof` rendering no figures.

- [ ] **Step 1: Write the failing test**

Replace the figure assertions in `SocialProof.test.tsx` with:

```tsx
it('renders all seven Chrome Web Store reviews', () => {
  wrap(<SocialProof />);
  expect(screen.getAllByRole('blockquote')).toHaveLength(7);
});

it('renders no store figures, which drift and need manual refresh', () => {
  const { container } = wrap(<SocialProof />);
  const text = container.textContent ?? '';
  expect(text).not.toMatch(/\b5\.0\b/);
  expect(text).not.toMatch(/\b14\b/);
  expect(text).not.toMatch(/\b68\b/);
});

it('attributes every quote', () => {
  wrap(<SocialProof />);
  for (const t of testimonials) expect(screen.getByText(t.author)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test` — expects 7 blockquotes, finds 2; figures still present.

- [ ] **Step 3: Restore all seven testimonials**

In `src/data/constants.ts`, restore the seven entries from the table in this plan's
header. Keep the two phase-1 quotes as they currently read; add the other five verbatim.
Drop `avatarColor` and `source` from the type and the data — nothing renders them, and
one of the seven used a value outside the union.

- [ ] **Step 4: Rewrite SocialProof**

Remove every `storeStats` reference. The section becomes a quiet grid of quotes with a
label above it. Two columns at `md`, one below. Attribution in the `.label` style, in
`--text-3`. No avatars, no stars, no card chrome — the quotes carry it.

Keep `social.openSource` if it still reads well as a standalone line; remove
`social.rating`, `social.ratings` and `social.users` from both languages and from the
test's REQUIRED list.

- [ ] **Step 5: Verify `storeStats` still reaches the schema**

Run: `grep -rn "storeStats" src/`
Expected: `src/data/store-stats.ts`, `src/data/constants.ts` (re-export) and
`src/lib/seo/schemas.ts` only. No component.

- [ ] **Step 6: Run tests and commit**

```bash
npm test && npm run build
git add -A src/
git commit -m "feat: show all seven reviews and drop the drifting store figures"
```

---

## Task 3: Tabs primitive

The interaction the rest of phase 2 hangs on. Build it properly: real ARIA, real
keyboard support.

**Files:**
- Create: `src/components/primitives/Tabs.tsx`,
  `src/components/primitives/__tests__/Tabs.test.tsx`
- Modify: `src/components/primitives/index.ts`

**Interfaces:**
- Produces:
  - `interface TabItem { id: string; label: string }`
  - `<Tabs items: TabItem[], children: (activeId: string) => ReactNode, className? />`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from '@/components/primitives/Tabs';

const items = [
  { id: 'detect', label: 'Detect' },
  { id: 'analyze', label: 'Analyze' },
  { id: 'ai', label: 'AI' },
];

const setup = () =>
  render(<Tabs items={items}>{(active) => <p>panel:{active}</p>}</Tabs>);

describe('Tabs', () => {
  it('exposes a tablist with one tab per item', () => {
    setup();
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(items.length);
  });

  it('selects the first item by default', () => {
    setup();
    expect(screen.getByRole('tab', { name: 'Detect' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('panel:detect')).toBeInTheDocument();
  });

  it('switches panel on click', async () => {
    setup();
    await userEvent.click(screen.getByRole('tab', { name: 'Analyze' }));
    expect(screen.getByRole('tab', { name: 'Analyze' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('panel:analyze')).toBeInTheDocument();
  });

  it('moves selection with the arrow keys, per the ARIA tabs pattern', async () => {
    setup();
    await userEvent.click(screen.getByRole('tab', { name: 'Detect' }));
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Analyze' })).toHaveAttribute('aria-selected', 'true');
    await userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Detect' })).toHaveAttribute('aria-selected', 'true');
  });

  it('wraps at both ends', async () => {
    setup();
    await userEvent.click(screen.getByRole('tab', { name: 'Detect' }));
    await userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'AI' })).toHaveAttribute('aria-selected', 'true');
  });

  it('keeps only the active tab in the tab order', () => {
    setup();
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('tabindex', '0');
    expect(tabs[1]).toHaveAttribute('tabindex', '-1');
  });

  it('links each panel back to its tab', () => {
    setup();
    const panel = screen.getByRole('tabpanel');
    const tab = screen.getByRole('tab', { name: 'Detect' });
    expect(panel).toHaveAttribute('aria-labelledby', tab.id);
    expect(tab).toHaveAttribute('aria-controls', panel.id);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test` — module not found.

- [ ] **Step 3: Implement**

`src/components/primitives/Tabs.tsx`. Follow the ARIA authoring practice for tabs:
roving `tabindex`, arrow keys move and activate, `Home`/`End` jump to the ends,
`aria-controls` and `aria-labelledby` pair each tab with its panel.

```tsx
'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  items: TabItem[];
  children: (activeId: string) => ReactNode;
  className?: string;
}

export function Tabs({ items, children, className }: TabsProps) {
  const [active, setActive] = useState(items[0]?.id ?? '');
  const base = useId();
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const tabId = (id: string) => `${base}-tab-${id}`;
  const panelId = (id: string) => `${base}-panel-${id}`;

  function focusTab(id: string) {
    setActive(id);
    refs.current[id]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = items.findIndex((i) => i.id === active);
    if (index < 0) return;

    const moves: Record<string, number | 'first' | 'last'> = {
      ArrowRight: 1,
      ArrowLeft: -1,
      Home: 'first',
      End: 'last',
    };
    const move = moves[event.key];
    if (move === undefined) return;

    event.preventDefault();
    if (move === 'first') return focusTab(items[0].id);
    if (move === 'last') return focusTab(items[items.length - 1].id);
    focusTab(items[(index + move + items.length) % items.length].id);
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className="flex gap-1 overflow-x-auto pb-px [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                refs.current[item.id] = el;
              }}
              id={tabId(item.id)}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={panelId(item.id)}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(item.id)}
              className={cn(
                'label shrink-0 rounded-t-card border border-b-0 px-5 py-3 transition-colors',
                selected
                  ? 'border-hairline bg-raised text-ink'
                  : 'border-transparent text-ink-3 hover:text-ink-2',
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        id={panelId(active)}
        role="tabpanel"
        aria-labelledby={tabId(active)}
        tabIndex={0}
        className="rounded-b-outer rounded-tr-outer border border-hairline bg-raised p-6"
      >
        {children(active)}
      </div>
    </div>
  );
}
```

The active trigger shares the panel's background and drops its bottom border, so it
reads as one continuous surface with the panel below — the folder-tab shape.

- [ ] **Step 4: Extend the barrel**

```ts
export { Tabs } from './Tabs';
export type { TabItem } from './Tabs';
```

- [ ] **Step 5: Run tests and commit**

```bash
npm test && npx tsc --noEmit && npm run build
git add src/components/primitives/
git commit -m "feat: add accessible Tabs primitive"
```

---

## Task 4: Feature tabs section

**Files:**
- Create: `src/components/product/panels.tsx`,
  `src/components/sections/FeatureTabs.tsx`,
  `src/components/sections/__tests__/FeatureTabs.test.tsx`
- Modify: `src/data/translations.ts`
- Delete: `src/components/sections/Showcase.tsx` and its test

**Interfaces:**
- Consumes: `Tabs`, `Box`, `Section`, `IOCPanel`, fixtures
- Produces: `<FeatureTabs />` under `id="product"`

- [ ] **Step 1: Write the failing test**

Assert: the section anchors at `id="product"`; four tabs named from the copy; the AI tab,
once activated, names all three analysis modes and MITRE ATT&CK; each panel renders its
own product visual; the Turkish route renders Turkish tab labels.

- [ ] **Step 2: Run to verify it fails**

- [ ] **Step 3: Write the four panels**

`src/components/product/panels.tsx`. Each panel is a short paragraph beside a real-DOM
visual. Content, all of it true of the shipped extension:

| Tab | Copy | Visual |
| --- | --- | --- |
| Detect | Select text anywhere, right-click, and the extension recognises which of the eleven indicator types it is. | The eleven type chips, with the matched one lit |
| Analyze | Every provider that supports that indicator answers at once, results grouped in tabs in the side panel. | `IOCPanel` with `heroFixture` |
| AI | Three depths: Summary for triage, Analysis for escalation, Detailed for investigation. MITRE ATT&CK mapping and hunting queries come with the deeper two. | A mode selector with the three modes and an AI verdict body |
| Privacy | Keys live in the browser's encrypted storage. There is no Ahtapot server; requests go straight to the providers you enabled. | The options-page key list with masked values |

The AI panel is the one that had no description at all in phase 1. Give it the most
room. Do not name model versions.

- [ ] **Step 4: Write the section**

Tab labels come from translations so they localise. Keep one `h2` above the tabs.

- [ ] **Step 5: Delete the Showcase**

```bash
git rm src/components/sections/Showcase.tsx src/components/sections/__tests__/Showcase.test.tsx
```

Its `showcase.*` keys are reused by the panels where the wording still fits; remove the
rest from both languages and from the translations test's REQUIRED list. The eleven
indicator terms must survive somewhere in the rendered page — they are this page's only
SEO surface for them. The Detect panel's chips are the natural home.

- [ ] **Step 6: Run tests and commit**

---

## Task 5: Provider directory

**Files:**
- Create: `src/data/providers-detail.ts`,
  `src/components/sections/ProviderDirectory.tsx`,
  `src/components/sections/__tests__/ProviderDirectory.test.tsx`
- Modify: `src/types/index.ts`, `src/data/constants.ts`
- Restore: `public/provider-icons/`

**Interfaces:**
- Produces: `<ProviderDirectory />` under `id="providers"`; `Provider` regains `logo`
  and `alt` and gains `answers` and `types`.

- [ ] **Step 1: Restore the icons**

```bash
git checkout 24723a1^ -- public/provider-icons
ls public/provider-icons/
```

Expected: the ten provider files plus `passivedns-logo.png`. Delete anything not matched
by a provider in the array — `passivedns-logo.png` has no provider and should go.

- [ ] **Step 2: Write the failing test**

Assert: ten cards; every provider name, its `answers` line and each of its IOC type
chips render; every logo has non-empty alt text; the type lists match the ground-truth
table in this plan; provider names carry `lang="en"`.

- [ ] **Step 3: Write the data**

`src/data/providers-detail.ts`. The `types` arrays are the ground-truth table from this
plan's header, verbatim. The `answers` line says what the provider tells you, in at most
eight words. Write both languages.

- [ ] **Step 4: Write the section**

Three columns at `lg`, two at `md`, one below. Each card: logo at a size where it reads
(cap the height around 28px and let width follow), the name, the answers line, then the
type chips in mono. At most those three facts — the restraint is the point.

- [ ] **Step 5: Run tests and commit**

---

## Task 6: Visible FAQ

The section that closes the structured-data compliance gap.

**Files:**
- Create: `src/data/faq.ts`, `src/components/sections/Faq.tsx`,
  `src/components/sections/__tests__/Faq.test.tsx`
- Modify: `src/lib/seo/schemas.ts`, `src/lib/seo/__tests__/schemas.test.ts`

**Interfaces:**
- Produces: `faq: Record<'en' | 'tr', { q: string; a: string }[]>`; `<Faq />` under
  `id="faq"`; `buildFaqSchema` reads from `faq`.

- [ ] **Step 1: Write the failing test**

The load-bearing assertion is that the two cannot diverge:

```ts
it('renders exactly the questions the FAQPage schema claims', () => {
  render(<LanguageProvider initialLang="en"><Faq /></LanguageProvider>);
  const schema = buildFaqSchema('en') as any;
  for (const entry of schema.mainEntity) {
    expect(screen.getByText(entry.name)).toBeInTheDocument();
  }
  expect(screen.getAllByRole('group')).toHaveLength(schema.mainEntity.length);
});
```

Add the Turkish equivalent, and one asserting every answer's text is present in the DOM
even when its disclosure is closed — `<details>` keeps closed content in the DOM, which
is what makes it valid for this markup.

- [ ] **Step 2: Run to verify it fails**

- [ ] **Step 3: Extract the Q&A pairs**

Move the six pairs currently inline in `buildFaqSchema` into `src/data/faq.ts`,
unchanged, both languages. Keep the interpolations that derive the provider count.

- [ ] **Step 4: Rewrite `buildFaqSchema` to consume it**

It becomes a mapping over `faq[lang]`. The existing schema tests must still pass.

- [ ] **Step 5: Write the section**

Use native `<details>`/`<summary>`. It is keyboard accessible, works without JavaScript,
keeps answers in the DOM when closed, and needs no state. No icons, no chevrons beyond
the default marker, hairline rules between rows. One `h2` above.

- [ ] **Step 6: Run tests, build, and confirm the compliance gap is closed**

After building, extract the `FAQPage` questions from the built HTML and confirm each one
also appears in the visible text of the same page, in both languages. That check is the
entire reason this section exists.

- [ ] **Step 7: Commit**

---

## Task 7: Footer

**Files:**
- Modify: `src/components/layout/Footer.tsx`, `src/data/translations.ts`
- Create: `src/components/layout/__tests__/Footer.test.tsx`

- [ ] **Step 1: Write the failing test**

Assert: three labelled link groups; every group has at most three links; the wordmark
and the tagline render; the bottom bar carries the copyright and both legal links; every
external link has `rel` containing `noopener`.

- [ ] **Step 2: Run to verify it fails**

- [ ] **Step 3: Rewrite the footer**

Structure follows sunday.ai's, adapted to what this project actually has:

```
◍ ahtapot                     Product          Project         Elsewhere
Built for the security          Features         GitHub          Chrome Web Store
community                       Providers        License         Product Hunt
                                FAQ

────────────────────────────────────────────────────────────────
© 2026 Ahtapot                              Privacy      License
```

The Product column links to the new section anchors, which now exist. Each group is a
`nav` with an `aria-label`, or a heading with `aria-labelledby` on its list — the same
lesson as the provider strip: a bare list of links tells a screen reader nothing.

- [ ] **Step 4: Run tests and commit**

---

## Task 8: Page assembly and verification

**Files:**
- Modify: `src/app/[lang]/page.tsx`, `src/components/sections/index.ts`,
  `src/app/__tests__/page-structure.test.ts`, `src/app/sitemap.ts`
- Modify: `src/app/__tests__/build-output.test.ts`

- [ ] **Step 1: Write the failing test**

Assert the page renders the eight blocks in order and none of the deleted ones.

- [ ] **Step 2: Assemble**

```tsx
<Hero />
<Providers />
<FeatureTabs />
<ProviderDirectory />
<SocialProof />
<Faq />
<CTA />
```

- [ ] **Step 3: Update the header and sitemap anchors**

The header's Product link currently targets `#showcase`, which no longer exists. Point it
at `#product`. The sitemap dropped anchors in phase 1 for good reason; leave it that way,
but its regression test cross-checks fragments against real section ids, so confirm it
still passes with the new ids.

- [ ] **Step 4: Extend the build-output assertions**

Add: the four new section ids are present in both languages; every `FAQPage` question
appears in the visible text; no store figure appears in the visible text while
`ratingCount` still appears in the JSON-LD; no em dash appears in any built page.

- [ ] **Step 5: Full verification**

```bash
npm test && npx tsc --noEmit && npm run build
```

Then serve `out/` and check, in a browser:
- the Turkish route renders `MALICIOUS` and `VIRUSTOTAL` with dotless capital I
- the tabs work by mouse and by keyboard, and the panel updates
- 375 / 768 / 1440 with no horizontal scroll at 375
- Lighthouse accessibility still 100

- [ ] **Step 6: Commit**

---

## Self-review notes

The riskiest parts of this plan, called out so their reviewers know where to look:

- **Task 1's casing fix cannot be verified from HTML source.** `text-transform` is a
  render-time transform; only a browser shows the result. A reviewer accepting a grep as
  proof has not checked it.
- **Task 6's whole purpose is that the visible FAQ and the schema agree.** A test that
  asserts the section renders six questions, without tying them to the schema, misses
  the point entirely.
- **Task 5's IOC type lists are the kind of data that looks plausible when wrong.** They
  must match the ground-truth table, which came from the extension's source.
- **Task 3's keyboard support is easy to fake.** Arrow keys must move focus as well as
  selection, and only the active tab may sit in the tab order.
