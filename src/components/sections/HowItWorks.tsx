'use client';

import { useLanguage } from '@/lib/language-context';
import { SectionTitle, Card } from '@/components/ui';
import { steps } from '@/data/constants';

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="py-16 px-8 bg-[var(--bg-secondary)]">
      <div className="max-w-[1000px] mx-auto">
        <SectionTitle>{t('howItWorks.title')}</SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <Card key={step.number} className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-dark rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                {step.number}
              </div>
              <h3 className="font-semibold mb-3 text-[var(--text-primary)]">
                {t(step.titleKey as any)}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm">
                {t(step.descKey as any)}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
