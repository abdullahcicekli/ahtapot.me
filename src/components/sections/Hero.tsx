'use client';

import { useLanguage } from '@/lib/language-context';
import { Section } from '@/components/primitives';
import { Button } from '@/components/ui';
import { IOCPanel } from '@/components/product/IOCPanel';
import { heroFixture } from '@/components/product/fixtures';
import { CHROME_STORE_URL, GITHUB_URL } from '@/data/constants';

export function Hero() {
  const { t } = useLanguage();

  return (
    <Section className="pt-32">
      <p className="label mb-6 text-ink-3">{t('hero.eyebrow')}</p>

      <h1 className="display mb-6 max-w-[16ch] text-ink">
        {t('hero.title1')}
        <br />
        {t('hero.title2')}
      </h1>

      <p className="mb-10 max-w-[52ch] text-[18px] leading-relaxed text-ink-2">
        {t('hero.subtitle')}
      </p>

      <div className="mb-20 flex flex-wrap items-center gap-4">
        <Button as="a" href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">
          {t('hero.install')}
        </Button>
        <Button as="a" href={GITHUB_URL} target="_blank" rel="noopener noreferrer" variant="ghost">
          {t('hero.github')} ↗
        </Button>
      </div>

      <IOCPanel fixture={heroFixture} />
    </Section>
  );
}
