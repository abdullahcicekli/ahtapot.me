import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'soft' | 'ghost';

interface BaseButtonProps {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button'; href?: never };

type ButtonAsLink = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-medium transition-colors';

/* Neutral pills, per the reference: the page's only saturated accent stays on
   the mark and data, never on chrome. */
const variants: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-bg hover:bg-white',
  soft: 'border border-hairline-hi bg-input text-ink hover:bg-card',
  ghost: 'text-ink-2 hover:text-ink',
};

export function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  const cls = cn(base, variants[variant], className);

  if (props.as === 'a') {
    const { as, ...linkProps } = props;
    return <a className={cls} {...linkProps}>{children}</a>;
  }

  const { as, ...buttonProps } = props as ButtonAsButton;
  return <button className={cls} {...buttonProps}>{children}</button>;
}
