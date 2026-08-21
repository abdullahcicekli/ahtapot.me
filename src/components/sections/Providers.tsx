'use client';

import { useLanguage } from '@/lib/language-context';
import { Section } from '@/components/primitives';
import { providers } from '@/data/constants';

export function Providers() {
  const { t } = useLanguage();

  return (
    <Section className="py-16 md:py-20">
      <p id="providers-label" className="label mb-8 text-ink-3">
        {t('providers.title')}
      </p>

      <ul
        role="list"
        aria-labelledby="providers-label"
        className="flex flex-wrap items-center gap-x-12 gap-y-6"
      >
        {providers.map((provider) => (
          <li
            key={provider.name}
            className="label text-ink-3 transition hover:text-ink-2"
          >
            {provider.name}
          </li>
        ))}
      </ul>
    </Section>
  );
}
