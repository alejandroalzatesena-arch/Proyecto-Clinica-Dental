import { useEffect } from 'react';

/**
 * Bloquea el scroll del documento mientras un panel (menú móvil, modal)
 * está abierto. Usa el atributo `data-scroll-locked` definido en base.css,
 * así el estilo sigue viviendo en CSS y no en JavaScript.
 */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    document.body.dataset.scrollLocked = 'true';
    return () => {
      delete document.body.dataset.scrollLocked;
    };
  }, [locked]);
}
