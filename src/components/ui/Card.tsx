import { ReactNode, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  style?: CSSProperties;
}

export function Card({ children, className, hover = true, style }: CardProps) {
  return (
    <div
      className={cn(
        'p-6 border border-[var(--border)] rounded-xl bg-[var(--bg-card)] transition-all duration-300',
        hover && 'hover:border-primary hover:shadow-lg hover:-translate-y-1',
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
