import type { ComponentPropsWithRef } from 'react';

import { cn } from '../../utils/cn';
import { controlAriaProps } from './aria';
import { Field } from './Field';
import styles from './Field.module.css';

export interface TextareaFieldProps extends ComponentPropsWithRef<'textarea'> {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  /** Número máximo de caracteres permitidos (muestra un contador). */
  maxLength?: number;
  /** Longitud actual del texto, para el contador. */
  currentLength?: number;
}

/** Área de texto con contador de caracteres opcional. */
export function TextareaField({
  id,
  label,
  error,
  hint,
  className,
  required,
  maxLength,
  currentLength,
  ...textareaProps
}: TextareaFieldProps) {
  return (
    <Field id={id} label={label} error={error} hint={hint} required={required}>
      <textarea
        id={id}
        className={cn(styles.control, styles.textarea, className)}
        required={required}
        maxLength={maxLength}
        {...controlAriaProps(id, error, hint)}
        {...textareaProps}
      />
      {maxLength ? (
        <span className={styles.counter}>
          {currentLength ?? 0} / {maxLength}
        </span>
      ) : null}
    </Field>
  );
}
