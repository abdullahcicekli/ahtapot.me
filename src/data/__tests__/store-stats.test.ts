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
