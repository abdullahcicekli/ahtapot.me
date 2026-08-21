'use client';

import { useLanguage } from '@/lib/language-context';
import { Section } from '@/components/primitives';
import { getFaqItems } from '@/data/faq';

/* Renders the same items the FAQPage JSON-LD schema is built from; keeping the
   marked-up content visible is a Google structured-data requirement. Native
   details/summary keeps the accordion accessible with no JS. */
export function FAQ() {
  const { t, language } = useLanguage();
  const items = getFaqItems(language);

  return (
    <Section id="faq" className="py-20 md:py-24">
      <h2 className="h2 mb-12 text-ink">{t('faq.title')}</h2>

      <div className="overflow-hidden rounded-outer border border-hairline bg-raised px-6 md:px-10">
        {items.map((item, index) => (
          <details
            key={item.question}
            open={index === 0}
            className="group border-b border-hairline last:border-b-0"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[17px] font-medium text-ink transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
              {item.question}
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="h-4 w-4 shrink-0 text-ink-3 transition-transform group-open:rotate-90"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 3.5 10.5 8 6 12.5" />
              </svg>
            </summary>
            <p className="max-w-[72ch] pb-6 text-[14px] leading-relaxed text-ink-2">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
