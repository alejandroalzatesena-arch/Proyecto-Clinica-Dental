import { useEffect, useRef, useState } from 'react';
import type { ElementType, ReactNode } from 'react';

import type { CSSVariables } from '../../types/css';
import { cn } from '../../utils/cn';
import styles from './Reveal.module.css';

interface RevealProps {
  children: ReactNode;
  /** Retraso en ms para crear un efecto escalonado entre elementos. */
  delay?: number;
  /** Etiqueta a renderizar (por defecto `div`; útil `li` dentro de listas). */
  as?: ElementType;
  className?: string;
}

/** ¿El navegador soporta IntersectionObserver? (constante por entorno) */
const supportsObserver = typeof IntersectionObserver !== 'undefined';

/**
 * Envuelve contenido y lo muestra con una animación sutil (fade + subida)
 * cuando entra en el viewport.
 *
 * Detalles de implementación:
 *  · usa un `useRef` estable para el nodo (un callback ref nuevo en cada render
 *    haría que React lo desmontara y remontara constantemente),
 *  · se anima una sola vez: al entrar, se deja de observar el elemento,
 *  · si el navegador no soporta IntersectionObserver, el contenido se muestra
 *    directamente (estado inicial `visible`).
 */
export function Reveal({ children, delay = 0, as: Tag = 'div', className }: RevealProps) {
  const nodeRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(!supportsObserver);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !supportsObserver) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      // Se dispara un poco antes de que el elemento esté totalmente visible.
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={nodeRef}
      className={cn(styles.reveal, visible && styles.visible, className)}
      style={{ '--reveal-delay': `${delay}ms` } as CSSVariables}
    >
      {children}
    </Tag>
  );
}
