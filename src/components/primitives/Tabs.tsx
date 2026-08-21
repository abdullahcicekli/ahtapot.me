'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  items: TabItem[];
  children: (activeId: string) => ReactNode;
  className?: string;
}

export function Tabs({ items, children, className }: TabsProps) {
  const [active, setActive] = useState(items[0]?.id ?? '');
  const base = useId();
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const tabId = (id: string) => `${base}-tab-${id}`;
  const panelId = (id: string) => `${base}-panel-${id}`;

  function focusTab(id: string) {
    setActive(id);
    refs.current[id]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = items.findIndex((i) => i.id === active);
    if (index < 0) return;

    const moves: Record<string, number | 'first' | 'last'> = {
      ArrowRight: 1,
      ArrowLeft: -1,
      Home: 'first',
      End: 'last',
    };
    const move = moves[event.key];
    if (move === undefined) return;

    event.preventDefault();
    if (move === 'first') return focusTab(items[0].id);
    if (move === 'last') return focusTab(items[items.length - 1].id);
    focusTab(items[(index + move + items.length) % items.length].id);
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className="flex gap-1 overflow-x-auto pb-px [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                refs.current[item.id] = el;
              }}
              id={tabId(item.id)}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={panelId(item.id)}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(item.id)}
              className={cn(
                'label shrink-0 rounded-t-card border border-b-0 px-5 py-3 transition-colors',
                selected
                  ? 'border-hairline bg-raised text-ink'
                  : 'border-transparent text-ink-3 hover:text-ink-2',
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        id={panelId(active)}
        role="tabpanel"
        aria-labelledby={tabId(active)}
        tabIndex={0}
        className="rounded-b-outer rounded-tr-outer border border-hairline bg-raised p-6"
      >
        {children(active)}
      </div>
    </div>
  );
}
