'use client';

import { useLanguage } from '@/lib/language-context';
import { stats } from '@/data/constants';

export function Stats() {
  const { t } = useLanguage();

  return (
    <section className="py-16 px-8 max-w-[1000px] mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.labelKey}>
            <h3 className="text-4xl font-bold text-primary dark:text-primary mb-2">
              {stat.value}
            </h3>
            <p className="text-[var(--text-secondary)]">
              {t(stat.labelKey as any)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
