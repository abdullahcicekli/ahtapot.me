import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn('relative px-6 py-24 md:py-32', className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-container -translate-x-1/2 md:block"
      >
        <span data-rule className="absolute -left-6 top-0 h-full w-px bg-hairline" />
        <span data-rule className="absolute -right-6 top-0 h-full w-px bg-hairline" />
      </div>
      <div className="relative mx-auto w-full max-w-container">{children}</div>
    </section>
  );
}
