'use client';

import Link from 'next/link';
import { Github } from 'iconoir-react';
import { useLanguage } from '@/lib/language-context';
import { Wordmark } from '@/components/primitives';
import { LanguageSelect } from '@/components/ui';
import { GITHUB_URL } from '@/data/constants';

export function Footer() {
  const { language, t } = useLanguage();
  const year = new Date().getFullYear();

  const columns: {
    label: string;
    links: { label: string; href: string; icon?: boolean; internal?: boolean }[];
  }[] = [
    {
      label: t('footer.project'),
      links: [
        { label: 'GitHub', href: GITHUB_URL, icon: true },
        { label: 'Product Hunt', href: 'https://www.producthunt.com/products/ahtapot' },
      ],
    },
    {
      label: t('footer.legal'),
      links: [
        { label: t('footer.privacy'), href: `/${language}/privacy/`, internal: true },
        { label: t('footer.license'), href: `${GITHUB_URL}/blob/main/LICENSE` },
      ],
    },
  ];

  return (
    <footer className="border-t border-hairline px-6 py-14">
      <div className="mx-auto max-w-container">
        <div className="flex flex-col justify-between gap-12 sm:flex-row">
          <div className="flex max-w-xs flex-col gap-3">
            <Wordmark />
            <p className="text-[13px] leading-relaxed text-ink-3">{t('footer.madeWith')}</p>
          </div>

          <div className="flex gap-16 sm:gap-20">
            {columns.map((column) => (
              <div key={column.label} className="flex flex-col gap-3">
                <span className="label text-ink-3">{column.label}</span>
                {column.links.map((link) =>
                  link.internal ? (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-[14px] text-ink-2 transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[14px] text-ink-2 transition-colors hover:text-ink"
                    >
                      {link.icon && <Github width={15} height={15} aria-hidden="true" />}
                      {link.label}
                    </a>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center">
          <p className="text-[12px] text-ink-3">
            © {year} Ahtapot · {t('social.openSource')}
          </p>
          <LanguageSelect />
        </div>
      </div>
    </footer>
  );
}
