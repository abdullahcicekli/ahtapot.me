import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { providers } from '@/data/constants';

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

  it('points every logo at a file that exists under public/', () => {
    for (const provider of providers) {
      expect(existsSync(join(process.cwd(), 'public', provider.logo)), provider.logo).toBe(true);
    }
  });
});
