import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'accent';
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold',
        variant === 'default' && 'bg-[var(--accent-dim)] border border-[var(--border)] text-[var(--text-secondary)]',
        variant === 'accent' && 'bg-primary text-primary-dark',
        className
      )}
    >
      {children}
    </span>
  );
}
