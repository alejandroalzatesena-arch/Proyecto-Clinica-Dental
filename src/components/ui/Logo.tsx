import { clinicInfo } from '../../data/site';
import { cn } from '../../utils/cn';
import { ToothGlyph } from '../illustrations/ToothGlyph';
import styles from './Logo.module.css';

interface LogoProps {
  /** `light` para usarse sobre fondos oscuros. */
  variant?: 'dark' | 'light';
  className?: string;
}

/**
 * Marca de la clínica: glifo del diente + tipografía display.
 * Es un bloque de marca, no un enlace: el enlace del header envuelve al Logo.
 */
export function Logo({ variant = 'dark', className }: LogoProps) {
  return (
    <span className={cn(styles.logo, styles[variant], className)}>
      <span className={styles.mark} aria-hidden="true">
        <ToothGlyph className={styles.glyph} />
      </span>
      <span className={styles.text}>
        <span className={styles.name}>{clinicInfo.shortName}</span>
        <span className={styles.subtitle}>Clínica dental</span>
      </span>
    </span>
  );
}
