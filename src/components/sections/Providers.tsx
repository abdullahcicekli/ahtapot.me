'use client';

import { useLanguage } from '@/lib/language-context';
import { Section } from '@/components/primitives';
import { providers } from '@/data/constants';

export function Providers() {
  const { t } = useLanguage();

  return (
    <Section className="py-16 md:py-20">
      <p id="providers-label" className="label mb-10 text-center text-ink-3">
        {t('providers.title')}
      </p>

      {/* Flex, not grid: with eleven entries the last row centers instead of
          leaving a lone item hanging on the left. */}
      <ul
        role="list"
        aria-labelledby="providers-label"
        className="flex flex-wrap justify-center"
      >
        {providers.map((provider) => (
          <li
            key={provider.name}
            lang="en"
            className="group flex h-24 w-1/2 min-w-0 items-center justify-center gap-2.5 px-4 sm:w-1/3 lg:w-1/5"
          >
            {/* Logos render monochrome so mixed brand palettes read as one wall;
                grayscale+brightness lifts dark marks without clipping light ones. */}
            <img
              src={provider.logo}
              alt={provider.wordmark ? provider.name : ''}
              loading="lazy"
              className="h-6 w-auto max-w-full shrink-0 opacity-75 transition-opacity [filter:grayscale(1)_brightness(1.5)] group-hover:opacity-100"
            />
            {!provider.wordmark && (
              <span className="truncate text-[15px] font-medium text-ink-2 transition-colors group-hover:text-ink">
                {provider.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
