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

describe('privacy page provider count', () => {
  const page = readFileSync(
    resolve(process.cwd(), 'src/app/[lang]/privacy/page.tsx'),
    'utf8',
  );

  it('imports providers instead of typing a count', () => {
    expect(page).toMatch(/import\s*\{[^}]*\bproviders\b[^}]*\}\s*from\s*['"]@\/data\/constants['"]/);
  });

  it('never types the provider count as a literal 10', () => {
    expect(page).not.toMatch(/\b10\s+security services\b/);
    expect(page).not.toMatch(/\b10\s+güvenlik servisi\b/);
    expect(page).not.toMatch(/\(10\s+Services\)/);
    expect(page).not.toMatch(/\(10\s+Servis\)/);
  });
});
