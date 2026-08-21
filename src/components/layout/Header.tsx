'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Github, Menu, Xmark } from 'iconoir-react';
import { useLanguage } from '@/lib/language-context';
import { Wordmark } from '@/components/primitives';
import { Button } from '@/components/ui';
import { CHROME_STORE_URL, GITHUB_URL } from '@/data/constants';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, t } = useLanguage();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-hairline bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-container items-center justify-between px-6">
        <Link href={`/${language}/`} aria-label="Ahtapot">
          <Wordmark />
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-1 text-ink-2 transition-colors hover:text-ink"
          >
            <Github width={19} height={19} />
          </a>
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
        <div className="flex flex-col items-start gap-5 border-b border-hairline bg-bg p-6 md:hidden">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-ink-2 hover:text-ink"
            onClick={() => setIsMenuOpen(false)}
          >
            <Github width={18} height={18} />
            GitHub
          </a>
          <Button as="a" href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">
            {t('nav.install')}
          </Button>
        </div>
      )}
    </header>
  );
}
