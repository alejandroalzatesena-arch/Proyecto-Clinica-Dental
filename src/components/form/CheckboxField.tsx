import type { ChangeEvent, FocusEvent, ReactNode, Ref } from 'react';

import { cn } from '../../utils/cn';
import styles from './Field.module.css';

export interface CheckboxFieldProps {
  id: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  name: string;
  /** Contenido de la etiqueta: admite enlaces (por ejemplo, a la política de privacidad). */
  label: ReactNode;
  error?: string;
  inputRef?: Ref<HTMLInputElement>;
}

/** Casilla de verificación con etiqueta enriquecida y estado de error. */
export function CheckboxField({
  id,
  checked,
  onChange,
  onBlur,
  name,
  label,
  error,
  inputRef,
}: CheckboxFieldProps) {
  return (
    <div className={cn(styles.field, error ? styles.hasError : '')}>
      <div className={styles.checkboxRow}>
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="checkbox"
          className={styles.checkbox}
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <label className={styles.checkboxLabel} htmlFor={id}>
          {label}
        </label>
      </div>

      {error ? (
        <p className={styles.error} id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
