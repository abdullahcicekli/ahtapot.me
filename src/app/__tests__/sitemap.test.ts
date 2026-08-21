import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import sitemap from '@/app/sitemap';

const read = (p: string) => readFileSync(resolve(process.cwd(), p), 'utf8');

// Every route the static export actually produces (trailingSlash: true in next.config.js).
const REAL_PATHS = ['/en/', '/tr/', '/en/privacy/', '/tr/privacy/'];

describe('sitemap', () => {
  it('only lists paths the app router actually emits', () => {
    for (const entry of sitemap()) {
      const url = new URL(entry.url);
      expect(REAL_PATHS).toContain(url.pathname);
    }
  });

  it('only lists a fragment when an element with that id exists on the page', () => {
    const page = read('src/app/[lang]/page.tsx');
    const sectionNames = [...page.matchAll(/<(\w+) \/>/g)].map((m) => m[1]);
    const sectionSource = sectionNames
      .map((name) => read(`src/components/sections/${name}.tsx`))
      .join('\n');

    for (const entry of sitemap()) {
      const url = new URL(entry.url);
      if (!url.hash) continue;
      const id = url.hash.slice(1);
      expect(sectionSource, `no element with id="${id}" found on the page`).toContain(`id="${id}"`);
    }
  });
});
