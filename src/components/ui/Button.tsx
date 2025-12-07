import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary';

interface BaseButtonProps {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
    href?: never;
  };

type ButtonAsLink = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a';
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  const baseStyles = 'btn';
  const variantStyles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
  };

  const combinedClassName = cn(baseStyles, variantStyles[variant], className);

  if (props.as === 'a') {
    const { as, ...linkProps } = props;
    return (
      <a className={combinedClassName} {...linkProps}>
        {children}
      </a>
    );
  }

  const { as, ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={combinedClassName} {...buttonProps}>
      {children}
    </button>
  );
}
