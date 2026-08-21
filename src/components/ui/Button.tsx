import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'ghost';

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
  'inline-flex items-center gap-2 rounded-control px-4 py-2 text-[14px] font-medium transition-colors';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-ink hover:brightness-95',
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
