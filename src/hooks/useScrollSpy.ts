import { useEffect, useState } from 'react';

/**
 * Devuelve el `id` de la sección visible actualmente, para resaltar el enlace
 * correspondiente en la navegación.
 *
 * Se resuelve con un listener de scroll (con `requestAnimationFrame` para no
 * saturar el hilo principal) en lugar de IntersectionObserver: es más preciso
 * cuando las secciones tienen alturas muy distintas.
 */
export function useScrollSpy(sectionIds: string[], offset = 140): string {
  const [activeId, setActiveId] = useState<string>('');

  // La clave serializada evita recrear el efecto si el array se re-crea.
  const key = sectionIds.join('|');

  useEffect(() => {
    const ids = key.split('|').filter(Boolean);
    if (ids.length === 0) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollY = window.scrollY;
      let current = '';

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;
        // Posición absoluta del elemento: `getBoundingClientRect` es inmune a
        // ancestros posicionados (a diferencia de `offsetTop`).
        const top = element.getBoundingClientRect().top + scrollY;
        if (top - offset <= scrollY) current = id;
      }

      setActiveId(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [key, offset]);

  return activeId;
}
