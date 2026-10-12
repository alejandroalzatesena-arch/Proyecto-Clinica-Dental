import type { ReactNode } from 'react';

import { cn } from '../../utils/cn';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  /** Etiqueta corta superior (contexto de la sección). */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  /** Nivel del encabezado: mantiene la jerarquía correcta del documento. */
  level?: 2 | 3;
  /** `true` cuando el bloque se sitúa sobre un fondo oscuro. */
  invert?: boolean;
  className?: string;
}

/**
 * Encabezado de sección reutilizable: eyebrow + título + entradilla.
 * Garantiza el mismo ritmo tipográfico en todo el sitio.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  level = 2,
  invert = false,
  className,
}: SectionHeadingProps) {
  const Heading = level === 2 ? 'h2' : 'h3';

  return (
    <div
      className={cn(styles.wrapper, styles[align], invert && styles.invert, className)}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <Heading className={styles.title}>{title}</Heading>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  );
}
