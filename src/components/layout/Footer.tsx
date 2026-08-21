'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { Wordmark } from '@/components/primitives';
import { GITHUB_URL } from '@/data/constants';

export function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="border-t border-hairline px-6 py-10">
      <div className="mx-auto flex max-w-container flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <Wordmark />
          <p className="text-[13px] text-ink-3">{t('footer.madeWith')}</p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-[13px] text-ink-2">
          <Link href={`/${language}/privacy/`} className="hover:text-ink">
            {t('footer.privacy')}
          </Link>
          <a href={`${GITHUB_URL}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            {t('footer.license')}
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            GitHub
          </a>
          <a
            href="https://www.producthunt.com/products/ahtapot"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink"
          >
            Product Hunt
          </a>
        </div>
      </div>
    </footer>
  );
}
