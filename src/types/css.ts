import type { CSSProperties } from 'react';

/**
 * Permite usar variables CSS personalizadas (p. ej. `--reveal-delay`)
 * dentro del atributo `style` con tipado correcto y sin `as`.
 *
 * Ejemplo: `style={{ '--reveal-delay': '120ms' }}`
 */
export type CSSVariables = CSSProperties & Record<`--${string}`, string | number>;
