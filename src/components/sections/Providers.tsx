'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import { useTheme } from '@/lib/theme-context';
import { SectionTitle } from '@/components/ui';
import { providers } from '@/data/constants';

export function Providers() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <section className="py-16 px-8 bg-[var(--bg-secondary)]">
      <div className="max-w-[1000px] mx-auto text-center">
        <SectionTitle>{t('providers.title')}</SectionTitle>
        <p className="text-[var(--text-secondary)] mb-12">
          {t('providers.subtitle')}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {providers.map((provider) => (
            <div
              key={provider.name}
              className="flex items-center justify-center p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl hover:-translate-y-1 hover:shadow-lg hover:border-primary transition-all h-[100px]"
            >
              <Image
                src={provider.logo}
                alt={provider.alt}
                width={100}
                height={60}
                className={`max-w-full max-h-[60px] object-contain transition-all ${
                  theme === 'dark'
                    ? 'grayscale brightness-0 invert opacity-60 hover:grayscale-0 hover:brightness-100 hover:invert-0 hover:opacity-100'
                    : 'grayscale opacity-70 hover:grayscale-0 hover:opacity-100'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
