'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';

export function Footer() {
  const { language, t } = useLanguage();

  const externalLinks = [
    { href: 'https://github.com/abdullahcicekli/ahtapot', label: 'GitHub' },
    { href: 'https://github.com/abdullahcicekli/ahtapot/blob/main/LICENSE', label: t('footer.license') },
    { href: 'https://github.com/abdullahcicekli/ahtapot/issues', label: t('footer.support') },
    { href: '#feedback', label: t('footer.feedback') },
  ];

  return (
    <footer className="py-12 px-8 bg-[var(--bg-secondary)] border-t border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-wrap justify-center gap-8">
          {externalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-[var(--text-secondary)] hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            href={`/${language}/privacy`}
            className="text-[var(--text-secondary)] hover:text-primary transition-colors"
          >
            {t('footer.privacy')}
          </Link>
        </div>
        <p className="text-[var(--text-muted)] text-sm">
          {t('footer.madeWith')}
        </p>
      </div>
    </footer>
  );
}
