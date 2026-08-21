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
