'use client';

import { useLanguage } from '@/lib/language-context';
import { Section } from '@/components/primitives';
import { storeStats, testimonials } from '@/data/constants';

export function SocialProof() {
  const { t } = useLanguage();

  return (
    <Section className="py-20 md:py-24">
      <div className="mb-12 flex flex-wrap items-baseline gap-x-8 gap-y-3">
        <p className="text-[14px] text-ink-3">
          <span className="mr-2 font-display text-[32px] font-medium tracking-[-0.02em] text-ink">
            {storeStats.rating.toFixed(1)}
          </span>{' '}
          {t('social.rating')}
        </p>

        <p className="text-[14px] text-ink-3">
          <span className="mr-2 font-display text-[32px] font-medium tracking-[-0.02em] text-ink">
            {storeStats.userCount}
          </span>{' '}
          {t('social.users')}
        </p>

        <p className="text-[14px] text-ink-3">{t('social.openSource')}</p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {testimonials.map((testimonial) => (
          <blockquote key={testimonial.id} className="space-y-3">
            <p className="text-[15px] leading-relaxed text-ink-2">“{testimonial.quote}”</p>
            <footer className="label text-ink-3">{testimonial.author}</footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}
