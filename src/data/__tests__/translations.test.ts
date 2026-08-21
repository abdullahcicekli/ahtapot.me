import { describe, it, expect } from 'vitest';
import { translations } from '@/data/translations';

const REQUIRED = [
  'nav.product', 'nav.install',
  'hero.eyebrow', 'hero.title1', 'hero.title2', 'hero.subtitle', 'hero.install', 'hero.github',
  'providers.title',
  'product.title',
  'product.tabs.detect', 'product.tabs.analyze', 'product.tabs.ai', 'product.tabs.privacy',
  'product.detect.desc', 'product.analyze.desc', 'product.ai.desc', 'product.privacy.desc',
  'social.title', 'social.openSource',
  'cta.title', 'cta.install',
  'footer.privacy', 'footer.license', 'footer.madeWith',
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
