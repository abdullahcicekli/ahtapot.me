'use client';

import { useLanguage } from '@/lib/language-context';
import { Section } from '@/components/primitives';
import { testimonials } from '@/data/constants';

export function SocialProof() {
  const { t } = useLanguage();

  return (
    <Section className="py-20 md:py-24">
      <div className="mb-12 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
        <p id="social-proof-label" className="label text-ink-3">
          {t('social.title')}
        </p>
        <p className="text-[14px] text-ink-3">{t('social.openSource')}</p>
      </div>

      <div
        aria-labelledby="social-proof-label"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {testimonials.map((testimonial) => (
          <blockquote
            key={testimonial.id}
            className="flex flex-col justify-between gap-5 rounded-card border border-hairline bg-raised p-6 transition-colors hover:border-hairline-hi"
          >
            <p className="text-[15px] leading-relaxed text-ink-2">“{testimonial.quote}”</p>
            {/* Reviewer names are Turkish; lang keeps i→İ uppercasing correct on the EN route */}
            <footer lang="tr" className="label text-ink-3">{testimonial.author}</footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}
