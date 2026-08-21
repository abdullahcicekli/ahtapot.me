'use client';

import { useLanguage } from '@/lib/language-context';
import { Section, Box } from '@/components/primitives';
import { IOCPanel } from '@/components/product/IOCPanel';
import { heroFixture, aiFixture, privacyFixture } from '@/components/product/fixtures';
import type { TranslationKey } from '@/data/translations';
import type { IOCFixture } from '@/components/product/fixtures';

interface ShowcaseItem {
  id: string;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  fixture: IOCFixture;
}

const items: ShowcaseItem[] = [
  { id: 'select', titleKey: 'showcase.select.title', descKey: 'showcase.select.desc', fixture: heroFixture },
  { id: 'ai', titleKey: 'showcase.ai.title', descKey: 'showcase.ai.desc', fixture: aiFixture },
  { id: 'privacy', titleKey: 'showcase.privacy.title', descKey: 'showcase.privacy.desc', fixture: privacyFixture },
];

export function Showcase() {
  const { t } = useLanguage();

  return (
    <Section id="showcase">
      <h2 className="h2 mb-14 text-ink">{t('showcase.title')}</h2>

      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => {
          const headingId = `showcase-${item.id}-title`;
          return (
            <Box
              key={item.id}
              as="article"
              aria-labelledby={headingId}
              className="flex flex-col gap-5 p-6"
            >
              <div className="space-y-2">
                <h3 id={headingId} className="text-[17px] font-medium text-ink">
                  {t(item.titleKey)}
                </h3>
                <p className="text-[14px] leading-relaxed text-ink-2">{t(item.descKey)}</p>
              </div>
              <IOCPanel fixture={item.fixture} compact className="mt-auto" />
            </Box>
          );
        })}
      </div>
    </Section>
  );
}
