import type { ComponentPropsWithRef } from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '../../utils/cn';
import { controlAriaProps } from './aria';
import { Field } from './Field';
import styles from './Field.module.css';

export interface SelectFieldProps extends ComponentPropsWithRef<'select'> {
  id: string;
  label: string;
  error?: string;
  hint?: string;
}

/** Desplegable con chevron personalizado y el mismo lenguaje visual del resto. */
export function SelectField({
  id,
  label,
  error,
  hint,
  className,
  required,
  children,
  ...selectProps
}: SelectFieldProps) {
  return (
    <Field id={id} label={label} error={error} hint={hint} required={required}>
      <div className={styles.selectWrapper}>
        <select
          id={id}
          className={cn(styles.control, styles.select, className)}
          required={required}
          {...controlAriaProps(id, error, hint)}
          {...selectProps}
        >
          {children}
        </select>
        <span className={styles.chevron} aria-hidden="true">
          <ChevronDown size={18} strokeWidth={2.2} />
        </span>
      </div>
    </Field>
  );
}
