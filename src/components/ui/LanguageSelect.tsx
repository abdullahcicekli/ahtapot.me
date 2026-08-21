'use client';

import { NavArrowDown } from 'iconoir-react';
import { useLanguage } from '@/lib/language-context';
import type { Language } from '@/types';
import { cn } from '@/lib/utils';

/* Native select styled as a neutral pill: full keyboard/AT support for free,
   options named in their own language so each reader can find their own. */
export function LanguageSelect({ className }: { className?: string }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <span className={cn('relative inline-flex items-center', className)}>
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value as Language)}
        aria-label={t('nav.language')}
        className="cursor-pointer appearance-none rounded-full border border-hairline bg-transparent py-1.5 pl-3.5 pr-8 text-[13px] text-ink-2 transition-colors hover:border-hairline-hi hover:text-ink"
      >
        <option value="en" lang="en" className="bg-raised text-ink">
          English
        </option>
        <option value="tr" lang="tr" className="bg-raised text-ink">
          Türkçe
        </option>
      </select>
      <NavArrowDown
        width={13}
        height={13}
        aria-hidden="true"
        className="pointer-events-none absolute right-2.5 text-ink-3"
      />
    </span>
  );
}
