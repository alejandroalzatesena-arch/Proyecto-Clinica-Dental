import { useEffect, useState } from 'react';
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

/**
 * Envuelve contenido y lo muestra con una animación sutil (fade + subida)
 * cuando entra en el viewport. Sólo se anima una vez y, si el navegador no
 * soporta IntersectionObserver, el contenido se muestra directamente.
 */
export function Reveal({ children, delay = 0, as: Tag = 'div', className }: RevealProps) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            // Animación de una sola pasada: dejamos de observar.
            observer.unobserve(entry.target);
          }
        }
      },
      // Se dispara un poco antes de que el elemento esté totalmente visible.
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  return (
    <Tag
      ref={setNode}
      className={cn(styles.reveal, visible && styles.visible, className)}
      style={{ '--reveal-delay': `${delay}ms` } as CSSVariables}
    >
      {children}
    </Tag>
  );
}
