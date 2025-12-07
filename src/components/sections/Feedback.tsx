'use client';

import { Send } from 'iconoir-react';
import { useLanguage } from '@/lib/language-context';
import { SectionTitle, Button } from '@/components/ui';
import { FORMSPREE_URL } from '@/data/constants';

export function Feedback() {
  const { t } = useLanguage();

  return (
    <section id="feedback" className="py-16 px-8 max-w-[800px] mx-auto">
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-8 md:p-12">
        <SectionTitle>{t('feedback.title')}</SectionTitle>
        <p className="text-center text-[var(--text-secondary)] mb-8">
          {t('feedback.subtitle')}
        </p>

        <form action={FORMSPREE_URL} method="POST" className="max-w-[600px] mx-auto space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-[var(--text-primary)]"
            >
              {t('feedback.emailLabel')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-[var(--accent-dim)] transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block mb-2 font-medium text-[var(--text-primary)]"
            >
              {t('feedback.messageLabel')}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              placeholder={t('feedback.messagePlaceholder')}
              className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] resize-y min-h-[120px] focus:outline-none focus:border-primary focus:ring-2 focus:ring-[var(--accent-dim)] transition-all"
            />
          </div>

          <Button type="submit" className="w-full justify-center">
            <Send width={20} height={20} />
            {t('feedback.sendBtn')}
          </Button>
        </form>
      </div>
    </section>
  );
}
