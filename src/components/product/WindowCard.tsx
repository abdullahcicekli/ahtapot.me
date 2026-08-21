import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface WindowCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  /* Set when the card body holds real controls: an aria-hidden ancestor would
     hide focusable elements from assistive tech. */
  interactive?: boolean;
}

/* A product-mockup frame: window chrome dots plus a mono title, so panel
   visuals read as software rather than floating boxes. Decorative unless
   marked interactive. */
export function WindowCard({ title, children, className, bodyClassName, interactive = false }: WindowCardProps) {
  return (
    <div
      aria-hidden={interactive ? undefined : true}
      className={cn('overflow-hidden rounded-card border border-hairline bg-card', className)}
    >
      <div className="flex items-center gap-1.5 border-b border-hairline px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-input" />
        <span className="h-2 w-2 rounded-full bg-input" />
        <span className="h-2 w-2 rounded-full bg-input" />
        <span lang="en" className="label ml-2 text-ink-3">
          {title}
        </span>
      </div>
      <div className={cn('p-4', bodyClassName)}>{children}</div>
    </div>
  );
}
