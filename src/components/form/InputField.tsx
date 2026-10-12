import type { ComponentPropsWithRef } from 'react';

import { cn } from '../../utils/cn';
import { controlAriaProps } from './aria';
import { Field } from './Field';
import styles from './Field.module.css';

export interface InputFieldProps extends ComponentPropsWithRef<'input'> {
  id: string;
  label: string;
  error?: string;
  hint?: string;
}

/** Campo de texto de una línea (nombre, teléfono, email, fecha…). */
export function InputField({
  id,
  label,
  error,
  hint,
  className,
  required,
  ...inputProps
}: InputFieldProps) {
  return (
    <Field id={id} label={label} error={error} hint={hint} required={required}>
      <input
        id={id}
        className={cn(styles.control, className)}
        required={required}
        {...controlAriaProps(id, error, hint)}
        {...inputProps}
      />
    </Field>
  );
}
