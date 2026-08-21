'use client';

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  children: (activeId: string) => ReactNode;
  className?: string;
  panelClassName?: string;
}

/* The shell outline: a rounded panel whose top edge rises up and wraps the
   active tab, like a folder tab. Drawn clockwise from the cap's top-left.
   r1 is the convex corner radius; the concave joints where the cap meets the
   panel top need r1 + r2 to equal the panel's top offset so the arcs land
   exactly on both edges. r1 is half the tab height, so the cap's corners
   continue the stadium-shaped tab pills, and the r1:r2 ratio stays close to
   the reference's 40:64, a balanced S-curve rather than a tight corner into
   a wide sweep. */
function shellPath(W: number, H: number, P: number, L: number, R: number) {
  const r1 = 32;
  const r2 = P - r1;
  const flushLeft = L <= 1;
  const flushRight = R >= W - 1;

  const p = [`M ${L + r1} 0`, `H ${R - r1}`, `A ${r1} ${r1} 0 0 1 ${R} ${r1}`];
  if (flushRight) {
    p.push(`V ${H - r1}`);
  } else {
    p.push(`A ${r2} ${r2} 0 0 0 ${R + r2} ${P}`);
    p.push(`H ${W - r1}`, `A ${r1} ${r1} 0 0 1 ${W} ${P + r1}`, `V ${H - r1}`);
  }
  p.push(`A ${r1} ${r1} 0 0 1 ${W - r1} ${H}`, `H ${r1}`, `A ${r1} ${r1} 0 0 1 0 ${H - r1}`);
  if (flushLeft) {
    p.push(`V ${r1}`);
  } else {
    p.push(`V ${P + r1}`, `A ${r1} ${r1} 0 0 1 ${r1} ${P}`);
    p.push(`H ${L - r2}`, `A ${r2} ${r2} 0 0 0 ${L} ${r1}`);
  }
  p.push(`A ${r1} ${r1} 0 0 1 ${L + r1} 0`, 'Z');
  return p.join(' ');
}

interface Shell {
  d: string;
  w: number;
  h: number;
  /* Active tab bounds, so the glow/grain spotlight tracks the selected cap. */
  l: number;
  r: number;
}

export function Tabs({ items, children, className, panelClassName }: TabsProps) {
  const [active, setActive] = useState(items[0]?.id ?? '');
  const [shell, setShell] = useState<Shell | null>(null);
  const base = useId();
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const rootRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const noiseId = `${base}-noise`;
  const glowId = `${base}-glow`;

  const tabId = (id: string) => `${base}-tab-${id}`;
  const panelId = `${base}-panel`;

  const measure = useCallback(() => {
    const root = rootRef.current;
    const panel = panelRef.current;
    const btn = refs.current[active];
    if (!root || !panel || !btn) return setShell(null);

    const W = root.clientWidth;
    const H = root.clientHeight;
    const P = panel.offsetTop;
    // The cap only makes sense when the tab row is a single line and there is
    // room for the concave joints; otherwise fall back to a plain panel box.
    if (!W || !H || !P || btn.offsetTop > 4 || btn.offsetHeight >= P) return setShell(null);

    const L = btn.offsetLeft;
    const R = L + btn.offsetWidth;
    setShell({ d: shellPath(W, H, P, L, R), w: W, h: H, l: L, r: R });
  }, [active]);

  useLayoutEffect(measure, [measure, items.length]);

  useEffect(() => {
    if (typeof ResizeObserver === 'undefined' || !rootRef.current) return;
    const observer = new ResizeObserver(measure);
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, [measure]);

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
    <div ref={rootRef} className={cn('relative', className)}>
      {shell && (
        <svg
          aria-hidden="true"
          width={shell.w}
          height={shell.h}
          viewBox={`0 0 ${shell.w} ${shell.h}`}
          className="pointer-events-none absolute inset-0 z-0 overflow-visible"
        >
          <defs>
            {/* Spotlight anchored to the active cap, like the reference shader:
                brightest inside the cap, fading down into the panel. */}
            <radialGradient
              id={glowId}
              gradientUnits="userSpaceOnUse"
              cx={(shell.l + shell.r) / 2}
              cy={0}
              r={shell.w * 0.42}
            >
              <stop offset="0%" stopColor="white" stopOpacity="0.34" />
              <stop offset="35%" stopColor="white" stopOpacity="0.12" />
              <stop offset="70%" stopColor="white" stopOpacity="0.025" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            {/* Grain rides the glow: feComposite keeps the gradient's alpha, so
                the speckle is dense near the cap and dissolves with the light. */}
            <filter id={noiseId}>
              <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.9" intercept="0" />
              </feComponentTransfer>
              <feComposite operator="in" in2="SourceGraphic" />
            </filter>
          </defs>
          <path d={shell.d} fill="var(--bg-raised)" />
          <path d={shell.d} fill={`url(#${glowId})`} opacity="0.35" />
          <path d={shell.d} fill={`url(#${glowId})`} filter={`url(#${noiseId})`} />
          <path d={shell.d} fill="none" stroke="var(--border-hi)" strokeWidth="1" />
        </svg>
      )}

      <div
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className="relative z-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5"
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
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(item.id)}
              className={cn(
                'flex h-14 min-w-0 items-center justify-center gap-2.5 rounded-full border px-4 transition-colors md:h-16',
                selected
                  ? shell
                    ? 'border-transparent text-ink'
                    : 'border-hairline-hi bg-raised text-ink'
                  : 'border-hairline text-ink-3 hover:border-hairline-hi hover:bg-raised hover:text-ink-2',
              )}
            >
              {item.icon && (
                <span aria-hidden="true" className="shrink-0 [&>svg]:h-5 [&>svg]:w-5">
                  {item.icon}
                </span>
              )}
              <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[13px] uppercase leading-none tracking-[0.1em]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <div
        ref={panelRef}
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId(active)}
        tabIndex={0}
        className={cn(
          'relative z-10 mt-5 overflow-hidden p-6 md:p-10',
          // Clip radius matches the shell's 32px corners; fallback draws its own box.
          shell ? 'rounded-[32px]' : 'rounded-outer border border-hairline bg-raised',
          panelClassName,
        )}
      >
        <div key={active} className="animate-panel-in">
          {children(active)}
        </div>
      </div>
    </div>
  );
}
