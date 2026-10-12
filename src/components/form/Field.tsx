import type { ReactNode } from 'react';
import { CircleAlert } from 'lucide-react';

import { cn } from '../../utils/cn';
import styles from './Field.module.css';

export interface FieldProps {
  id: string;
  label: string;
  /** Mensaje de error a mostrar (si existe, se anuncia a lectores de pantalla). */
  error?: string;
  /** Texto de ayuda que se oculta cuando hay error para no repetir información. */
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Envoltorio común de todos los campos: etiqueta accesible, control,
 * ayuda contextual y mensaje de error consistente.
 */
export function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
  className,
}: FieldProps) {
  return (
    <div className={cn(styles.field, error ? styles.hasError : '', className)}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required ? (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        ) : null}
      </label>

      {children}

      {hint && !error ? (
        <p className={styles.hint} id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}

      {error ? (
        <p className={styles.error} id={`${id}-error`}>
          <CircleAlert size={14} strokeWidth={2.4} aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Atributos ARIA compartidos por los controles: marcan el campo como inválido
 * y lo asocian al texto de ayuda o al mensaje de error correspondiente.
 */
export function controlAriaProps(id: string, error?: string, hint?: string) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return {
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
  };
}
