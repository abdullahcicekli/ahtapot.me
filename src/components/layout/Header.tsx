'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Xmark } from 'iconoir-react';
import { useLanguage } from '@/lib/language-context';
import { Wordmark } from '@/components/primitives';
import { Button } from '@/components/ui';
import { CHROME_STORE_URL, GITHUB_URL } from '@/data/constants';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, t } = useLanguage();
  const pathname = usePathname();

  const otherLang = language === 'en' ? 'tr' : 'en';
  const pathWithoutLang = pathname.replace(/^\/(en|tr)/, '');
  const otherLangHref = `/${otherLang}${pathWithoutLang || '/'}`;
  const otherLangLabel = otherLang === 'tr' ? 'Türkçe' : 'English';

  const links = [
    { href: `/${language}/#product`, label: t('nav.product') },
    { href: GITHUB_URL, label: 'GitHub', external: true },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-hairline bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-container items-center justify-between px-6">
        <Link href={`/${language}/`} aria-label="Ahtapot">
          <Wordmark />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="text-[14px] text-ink-2 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <Link
            href={otherLangHref}
            aria-label={otherLangLabel}
            hrefLang={otherLang}
            className="text-[14px] text-ink-2 transition-colors hover:text-ink"
          >
            {otherLang.toUpperCase()}
          </Link>
          <Button
            as="a"
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2"
          >
            {t('nav.install')}
          </Button>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-ink md:hidden"
          aria-label="Menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <Xmark width={20} height={20} /> : <Menu width={20} height={20} />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="flex flex-col gap-4 border-b border-hairline bg-bg p-6 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="text-ink-2 hover:text-ink"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link
            href={otherLangHref}
            aria-label={otherLangLabel}
            hrefLang={otherLang}
            className="text-ink-2 hover:text-ink"
          >
            {otherLang.toUpperCase()}
          </Link>
          <Button as="a" href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">
            {t('nav.install')}
          </Button>
        </div>
      )}
    </header>
  );
}
