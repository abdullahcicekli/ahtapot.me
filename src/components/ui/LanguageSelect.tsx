'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { NavArrowDown } from 'iconoir-react';
import { useLanguage } from '@/lib/language-context';
import type { Language } from '@/types';
import { cn } from '@/lib/utils';

const OPTIONS: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'tr', label: 'Türkçe' },
];

/* Custom dropdown: the native select popup takes the OS menu chrome (blue
   highlight, system font) and cannot be themed. Combobox + listbox ARIA
   pattern; the list opens upward when there is no room below (the footer). */
export function LanguageSelect({ className }: { className?: string }) {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listId = useId();

  const selected = OPTIONS.find((option) => option.value === language);

  const openMenu = useCallback(() => {
    const trigger = triggerRef.current;
    if (trigger) {
      const rect = trigger.getBoundingClientRect();
      const estimatedHeight = OPTIONS.length * 38 + 12;
      setOpenUp(
        window.innerHeight - rect.bottom < estimatedHeight && rect.top > estimatedHeight,
      );
    }
    setActiveIndex(Math.max(0, OPTIONS.findIndex((option) => option.value === language)));
    setOpen(true);
  }, [language]);

  const commit = useCallback(
    (index: number) => {
      const option = OPTIONS[index];
      if (option) setLanguage(option.value);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [setLanguage],
  );

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  function onKeyDown(event: React.KeyboardEvent) {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
        event.preventDefault();
        openMenu();
      }
      return;
    }
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, OPTIONS.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        commit(activeIndex);
        break;
      case 'Escape':
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        break;
      case 'Tab':
        setOpen(false);
        break;
    }
  }

  return (
    <div ref={rootRef} className={cn('relative inline-block', className)} onKeyDown={onKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-label={t('nav.language')}
        aria-activedescendant={open ? `${listId}-${activeIndex}` : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        className="flex cursor-pointer items-center gap-2 rounded-full border border-hairline bg-transparent py-1.5 pl-3.5 pr-3 text-[13px] text-ink-2 transition-colors hover:border-hairline-hi hover:text-ink"
      >
        <span lang={selected?.value}>{selected?.label}</span>
        <NavArrowDown
          width={13}
          height={13}
          aria-hidden="true"
          className={cn('text-ink-3 transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={t('nav.language')}
          className={cn(
            'absolute left-0 z-50 min-w-full rounded-control border border-hairline-hi bg-card p-1 shadow-[0_16px_40px_rgba(0,0,0,0.55)]',
            openUp ? 'bottom-full mb-1.5' : 'top-full mt-1.5',
          )}
        >
          {OPTIONS.map((option, index) => (
            <li
              key={option.value}
              id={`${listId}-${index}`}
              role="option"
              lang={option.value}
              aria-selected={option.value === language}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => commit(index)}
              className={cn(
                'flex cursor-pointer items-center justify-between gap-3 rounded-[6px] px-2.5 py-1.5 text-[13px]',
                index === activeIndex ? 'bg-input text-ink' : 'text-ink-2',
                option.value === language && 'text-ink',
              )}
            >
              {option.label}
              {option.value === language && <span aria-hidden="true">✓</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
