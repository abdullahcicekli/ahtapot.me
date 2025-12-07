'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Xmark, HalfMoon, SunLight, Language } from 'iconoir-react';
import { useLanguage } from '@/lib/language-context';
import { useTheme } from '@/lib/theme-context';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const otherLang = language === 'en' ? 'tr' : 'en';

  const navLinks = [
    { href: `/${language}/#features`, label: t('nav.features') },
    { href: `/${language}/#how-it-works`, label: t('nav.howItWorks') },
    { href: `/${language}/#feedback`, label: t('nav.feedback') },
    { href: 'https://github.com/abdullahcicekli/ahtapot', label: 'GitHub', external: true },
  ];

  return (
    <header className="fixed top-0 w-full bg-[var(--bg-primary)] border-b border-[var(--border)] z-50 transition-colors duration-300">
      <nav className="max-w-[1400px] mx-auto px-6 py-3 flex justify-between items-center">
        {/* Left - Logo */}
        <Link href={`/${language}/`} className="flex items-center">
          <Image
            src={theme === 'dark' ? '/images/ahtapot-logo-white.png' : '/images/ahtapot-logo-black.png'}
            alt="Ahtapot Logo"
            width={140}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Center - Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="text-[var(--text-secondary)] text-sm font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Language Toggle */}
          <Link
            href={`/${otherLang}/`}
            className="text-[var(--text-secondary)] text-sm font-medium hover:text-primary transition-colors"
            title={otherLang === 'tr' ? 'Türkçe' : 'English'}
          >
            {otherLang.toUpperCase()}
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-[var(--text-secondary)] hover:text-primary transition-colors"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <SunLight width={18} height={18} /> : <HalfMoon width={18} height={18} />}
          </button>
        </div>

        {/* Right - Chrome Store Button */}
        <div className="flex items-center gap-3">
          <a
            href="https://chromewebstore.google.com/detail/ahtapot-ioc-analysis-tool/gmekhigahdiddngdhfdkeefcomcankpg"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block hover:opacity-90 transition-opacity"
          >
            <Image
              src="/images/chromeAvailable.png"
              alt="Available on Chrome Web Store"
              width={140}
              height={42}
              className="object-contain"
            />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[var(--text-primary)]"
          >
            {isMenuOpen ? <Xmark width={24} height={24} /> : <Menu width={24} height={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[var(--bg-primary)] border-b border-[var(--border)] p-4 flex flex-col gap-4 z-50">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="text-[var(--text-secondary)] hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-2 border-t border-[var(--border)]">
            <Link
              href={`/${otherLang}/`}
              className="text-[var(--text-secondary)] hover:text-primary transition-colors"
            >
              {otherLang === 'tr' ? 'Türkçe' : 'English'}
            </Link>
            <button
              onClick={toggleTheme}
              className="text-[var(--text-secondary)] hover:text-primary transition-colors"
            >
              {theme === 'dark' ? <SunLight width={20} height={20} /> : <HalfMoon width={20} height={20} />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
