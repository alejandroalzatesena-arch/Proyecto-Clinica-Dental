import type { ComponentType, SVGProps } from 'react';

import type { SocialPlatform } from '../../types/site';

/* ============================================================================
   Iconos de redes sociales.
   Lucide ya no incluye logos de marcas, así que se dibujan a medida con el
   MISMO lenguaje visual (trazo 1.75, esquinas redondeadas) para que no
   desentonen con el resto de iconos del sitio.
   ========================================================================== */

type IconProps = SVGProps<SVGSVGElement>;

/** Base común: tamaño 20, trazo y color heredado del contenedor. */
const baseProps: IconProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M17 2.5h-2.6a4.4 4.4 0 0 0-4.4 4.4v2.6H7.4v3.4H10v8.6h3.6v-8.6h2.7l.7-3.4h-3.4V7.2c0-.7.5-1.3 1.2-1.3H17z" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M15.6 8.4a5.4 5.4 0 0 1 5.4 5.4v7.7h-3.6v-7.7a1.8 1.8 0 0 0-3.6 0v7.7H10.2v-7.7a5.4 5.4 0 0 1 5.4-5.4z" />
      <rect x="3" y="9" width="3.6" height="12.5" rx="0.6" />
      <circle cx="4.8" cy="4.7" r="1.9" />
    </svg>
  );
}

export function WhatsappIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M20.6 11.7a8.6 8.6 0 0 1-12.8 7.5L3.4 20.6l1.4-4.3a8.6 8.6 0 1 1 15.8-4.6z" />
      <path d="M9.2 8.3c-.6.2-1 .8-.9 1.5.3 2.3 2.2 4.2 4.5 4.5.7.1 1.3-.3 1.5-.9l.1-.5a.6.6 0 0 0-.3-.7l-1-.5a.6.6 0 0 0-.7.1l-.4.4a5.6 5.6 0 0 1-1.9-1.9l.4-.4a.6.6 0 0 0 .1-.7l-.5-1a.6.6 0 0 0-.7-.3z" />
    </svg>
  );
}

/** Mapa plataforma → componente, para renderizar redes desde los datos. */
export const socialIconMap: Record<SocialPlatform, ComponentType<IconProps>> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
  whatsapp: WhatsappIcon,
};
