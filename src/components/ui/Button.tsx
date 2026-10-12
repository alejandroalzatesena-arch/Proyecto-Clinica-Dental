import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.css';

type Variant = 'primary' | 'outline' | 'ghost' | 'light';
type Size = 'md' | 'lg';

interface SharedProps {
  /** Estilo visual del botón. */
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  /** Ocupa el 100 % del ancho del contenedor (útil en móvil). */
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Botón polimórfico: si recibe `href` se renderiza como `<a>` (correcto para
 * navegación/anclas), de lo contrario como `<button>` (acciones de formulario).
 */
export type ButtonProps = SharedProps &
  (
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
  );

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {iconLeft ? <span className={styles.icon}>{iconLeft}</span> : null}
      <span>{children}</span>
      {iconRight ? <span className={styles.icon}>{iconRight}</span> : null}
    </>
  );

  if (href !== undefined) {
    return (
      <a
        href={href}
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  // `rest` ya no contiene `href`, por lo que sólo quedan props de <button>.
  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
