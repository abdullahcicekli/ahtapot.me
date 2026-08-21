'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import { Section } from '@/components/primitives';
import { providers } from '@/data/constants';

export function Providers() {
  const { t } = useLanguage();

  return (
    <Section className="py-16 md:py-20">
      <p className="label mb-8 text-ink-3">{t('providers.title')}</p>

      <ul className="flex flex-wrap items-center gap-x-10 gap-y-6">
        {providers.map((provider) => (
          <li key={provider.name}>
            <Image
              src={provider.logo}
              alt={provider.alt}
              width={92}
              height={26}
              className="h-6 w-auto opacity-45 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
