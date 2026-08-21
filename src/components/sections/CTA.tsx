'use client';

import { useLanguage } from '@/lib/language-context';
import { Section } from '@/components/primitives';
import { Button } from '@/components/ui';
import { CHROME_STORE_URL } from '@/data/constants';

export function CTA() {
  const { t } = useLanguage();

  return (
    <Section className="py-28 md:py-32">
      <div className="flex flex-col items-center gap-8 rounded-outer border border-hairline bg-raised px-8 py-16 text-center md:py-20">
        <h2 className="h2 max-w-[18ch] text-ink">{t('cta.title')}</h2>
        <Button as="a" href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">
          {t('cta.install')}
        </Button>
      </div>
    </Section>
  );
}
