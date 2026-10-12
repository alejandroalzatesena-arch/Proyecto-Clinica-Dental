import { CalendarCheck, Scan } from 'lucide-react';

import type { CSSVariables } from '../../types/css';
import { cn } from '../../utils/cn';
import styles from './HeroVisual.module.css';

/**
 * Ilustración principal del hero.
 *
 * Es 100 % SVG/CSS (sin imágenes externas):
 *  · un diente estilizado flotando sobre un halo degradado,
 *  · destellos y anillos decorativos animados de forma sutil,
 *  · tarjetas de "vidrio" flotantes con datos de confianza.
 *
 * Todo el bloque es decorativo, por eso lleva `aria-hidden`.
 */
export function HeroVisual() {
  return (
    <div className={styles.scene} aria-hidden="true">
      {/* Capas de fondo: halo suave y retícula de puntos */}
      <span className={styles.halo} />
      <span className={styles.dots} />

      <svg className={styles.art} viewBox="0 0 560 560" role="presentation">
        <defs>
          {/* Relleno del diente: blanco con un leve tinte de marca */}
          <linearGradient id="hv-tooth" x1="180" y1="150" x2="380" y2="470">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#e6f6f8" />
          </linearGradient>
          {/* Degradado de los anillos decorativos */}
          <linearGradient id="hv-ring" x1="80" y1="80" x2="480" y2="480">
            <stop offset="0" stopColor="#1598a8" stopOpacity="0.5" />
            <stop offset="1" stopColor="#26b698" stopOpacity="0.05" />
          </linearGradient>
          <radialGradient id="hv-glow" cx="50%" cy="48%" r="52%">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <filter id="hv-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow
              dx="0"
              dy="22"
              stdDeviation="22"
              floodColor="#0a3d47"
              floodOpacity="0.16"
            />
          </filter>
        </defs>

        {/* Halo interior */}
        <circle cx="280" cy="280" r="228" fill="url(#hv-glow)" />

        {/* Anillos concéntricos: dan profundidad de "tecnología" */}
        <circle
          className={styles.ring}
          cx="280"
          cy="280"
          r="212"
          fill="none"
          stroke="url(#hv-ring)"
          strokeWidth="1.5"
          strokeDasharray="6 12"
        />
        <circle
          cx="280"
          cy="280"
          r="176"
          fill="none"
          stroke="#bee7eb"
          strokeWidth="1.5"
        />
        <circle
          className={styles.pulse}
          cx="280"
          cy="280"
          r="176"
          fill="none"
          stroke="#8ad4dc"
          strokeWidth="2"
        />

        {/* Diente principal */}
        <g className={styles.tooth} filter="url(#hv-shadow)">
          <g transform="translate(168 168) scale(3.5)">
            <path
              d="M32 6.5c-4.6 0-7.1-2-10.6-2C16.4 4.5 13 8.7 13 15.1c0 7.9 3 13.4 5.3 19.9 1.4 4 2 9.5 4.6 9.5 2.4 0 2.9-5.2 4.1-9.1.7-2.4 1.5-3.6 5-3.6s4.3 1.2 5 3.6c1.2 3.9 1.7 9.1 4.1 9.1 2.6 0 3.2-5.5 4.6-9.5C48 28.5 51 23 51 15.1 51 8.7 47.6 4.5 42.6 4.5c-3.5 0-6 2-10.6 2z"
              fill="url(#hv-tooth)"
              stroke="#bee7eb"
              strokeWidth="0.6"
            />
            {/* Brillo superior izquierdo (efecto esmalte) */}
            <path
              d="M21 17c1.6-3.6 4.6-5.6 8-6"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.6"
              strokeLinecap="round"
              opacity="0.9"
            />
            {/* Volumen inferior */}
            <path
              d="M32 52c-3 0-5.6-1-8-3"
              fill="none"
              stroke="#cfeef1"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* Destellos (mismo lenguaje visual que los iconos Sparkles) */}
        <g className={styles.sparkles} fill="#1598a8">
          <path
            className={styles.sparkle}
            style={{ '--d': '0s' } satisfies CSSVariables}
            transform="translate(400 148) scale(1.35)"
            d="M12 0l2.4 7.6L22 10l-7.6 2.4L12 20l-2.4-7.6L2 10l7.6-2.4z"
          />
          <path
            className={styles.sparkle}
            style={{ '--d': '0.9s' } satisfies CSSVariables}
            transform="translate(120 336) scale(0.95)"
            d="M12 0l2.4 7.6L22 10l-7.6 2.4L12 20l-2.4-7.6L2 10l7.6-2.4z"
            fill="#26b698"
          />
          <path
            className={styles.sparkle}
            style={{ '--d': '1.7s' } satisfies CSSVariables}
            transform="translate(392 386) scale(0.7)"
            d="M12 0l2.4 7.6L22 10l-7.6 2.4L12 20l-2.4-7.6L2 10l7.6-2.4z"
            fill="#45b7c4"
          />
        </g>
      </svg>

      {/* Tarjeta flotante: tecnología digital */}
      <div className={cn(styles.card, styles.cardTech)}>
        <span className={styles.cardIcon}>
          <Scan size={18} strokeWidth={2} />
        </span>
        <span className={styles.cardText}>
          <strong>Escáner 3D digital</strong>
          <span>Diagnóstico sin moldes incómodos</span>
        </span>
      </div>

      {/* Tarjeta flotante: valoración de pacientes */}
      <div className={cn(styles.card, styles.cardRating)}>
        <span className={styles.cardStars} aria-hidden="true">
          ★★★★★
        </span>
        <span className={styles.cardText}>
          <strong>4,9 sobre 5</strong>
          <span>1.240 reseñas verificadas</span>
        </span>
      </div>

      {/* Chip flotante: primera visita */}
      <div className={cn(styles.card, styles.cardVisit)}>
        <CalendarCheck size={16} strokeWidth={2.2} />
        <span>Primera visita gratis</span>
      </div>
    </div>
  );
}
