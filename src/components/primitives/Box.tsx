import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BoxProps {
  as?: ElementType;
  tone?: 'outer' | 'card';
  className?: string;
  children: ReactNode;
  [key: string]: unknown;
}

const tones = {
  outer: 'bg-raised rounded-outer',
  card: 'bg-card rounded-card',
} as const;

export function Box({ as: Tag = 'div', tone = 'outer', className, children, ...rest }: BoxProps) {
  return (
    <Tag className={cn('border border-hairline', tones[tone], className)} {...rest}>
      {children}
    </Tag>
  );
}
