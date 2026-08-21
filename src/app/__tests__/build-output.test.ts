import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const outDir = resolve(process.cwd(), 'out');
const hasBuild = existsSync(outDir);

describe('static export', () => {
  if (!hasBuild) {
    it('requires a production build to run these assertions', () => {
      throw new Error(
        'out/ not found. These are the highest-value checks in the suite (no third-party ' +
          'fonts, no leaked AI model names, both language routes, refreshed store figures) ' +
          'and they cannot run against source alone. Run `npm run build` first, then re-run ' +
          '`npm test` (or use `npm run test:build`, which does both).'
      );
    });
    return;
  }

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
