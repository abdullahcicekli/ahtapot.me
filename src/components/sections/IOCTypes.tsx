'use client';

import { useLanguage } from '@/lib/language-context';
import { SectionTitle } from '@/components/ui';
import { iocTypes } from '@/data/constants';

export function IOCTypes() {
  const { t } = useLanguage();

  return (
    <section className="py-16 px-8 bg-[var(--bg-secondary)]">
      <div className="max-w-[1000px] mx-auto text-center">
        <SectionTitle>{t('ioc.title')}</SectionTitle>

        <div className="flex flex-wrap gap-3 justify-center mt-8">
          {iocTypes.map((ioc) => (
            <span
              key={ioc.name}
              className="px-4 py-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-full text-sm text-[var(--text-secondary)] hover:border-primary hover:text-primary hover:-translate-y-0.5 hover:bg-[var(--accent-dim)] transition-all cursor-default"
            >
              {ioc.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
