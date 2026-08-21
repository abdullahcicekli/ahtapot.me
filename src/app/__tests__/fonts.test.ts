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
