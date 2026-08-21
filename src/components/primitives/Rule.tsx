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
      <div className="relative mx-auto w-full max-w-container">
        <span
          data-rule
          aria-hidden="true"
          className="pointer-events-none absolute -left-6 top-0 hidden h-full w-px bg-hairline md:block"
        />
        <span
          data-rule
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 top-0 hidden h-full w-px bg-hairline md:block"
        />
        {children}
      </div>
    </section>
  );
}
