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
