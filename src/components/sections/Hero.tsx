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
    <Section className="pt-28 md:pt-36 md:pb-28">
      <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div>
          {/* Slightly tighter cap in the split layout so the headline holds two lines */}
          <h1 className="display mb-6 max-w-[16ch] text-ink lg:text-[clamp(48px,4.6vw,66px)]">
            {t('hero.title1')}
            <br />
            {t('hero.title2')}
          </h1>

          <p className="mb-10 max-w-[52ch] text-[18px] leading-relaxed text-ink-2">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button as="a" href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">
              {t('hero.install')}
            </Button>
            <Button as="a" href={GITHUB_URL} target="_blank" rel="noopener noreferrer" variant="ghost">
              {t('hero.github')} ↗
            </Button>
          </div>
        </div>

        <IOCPanel fixture={heroFixture} className="w-full lg:justify-self-end" />
      </div>
    </Section>
  );
}
