import type { LucideIcon } from 'lucide-react';

/* ============================================================================
   Tipos compartidos del sitio.
   Centralizarlos aquí evita duplicar "formas" entre datos y componentes.
   ========================================================================== */

/** Enlace del menú de navegación (siempre un ancla interna). */
export interface NavItem {
  id: string;
  label: string;
  href: string;
}

/** Servicio odontológico mostrado en la tarjeta correspondiente. */
export interface Service {
  id: string;
  title: string;
  summary: string;
  /** Icono de Lucide asociado al servicio. */
  icon: LucideIcon;
  /** Bullets cortos que refuerzan la propuesta de valor. */
  features: string[];
}

/** Motivo por el que elegir la clínica ("Por qué elegirnos"). */
export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

/** Testimonio de un paciente. */
export interface Testimonial {
  id: string;
  name: string;
  /** Tratamiento realizado (contexto del testimonio). */
  treatment: string;
  quote: string;
  /** Puntuación de 1 a 5. */
  rating: number;
  /** Iniciales usadas como avatar sin necesidad de imágenes externas. */
  initials: string;
}

/** Cifra destacada del hero / banda de confianza. */
export interface Stat {
  id: string;
  value: string;
  label: string;
}

/** Fila del horario de atención. */
export interface ScheduleEntry {
  day: string;
  hours: string;
  /** Marca los días en los que la clínica permanece cerrada. */
  closed?: boolean;
}

/** Redes sociales disponibles (iconos propios, ver components/icons). */
export type SocialPlatform = 'instagram' | 'facebook' | 'linkedin' | 'whatsapp';

export interface SocialLink {
  id: SocialPlatform;
  label: string;
  href: string;
}

/** Información corporativa de la clínica. */
export interface ClinicInfo {
  name: string;
  shortName: string;
  tagline: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    /** URL de búsqueda en Google Maps para el enlace "Cómo llegar". */
    mapsUrl: string;
  };
  /** Teléfono en formato visible y en formato E.164 (para `tel:`). */
  phone: { label: string; href: string };
  whatsapp: { label: string; href: string };
  email: string;
  schedule: ScheduleEntry[];
  socials: SocialLink[];
}

/** Perfil del doctor/a responsable de la clínica. */
export interface DoctorProfile {
  name: string;
  role: string;
  /** Número de colegiado (dato de confianza muy habitual en España). */
  license: string;
  bio: string[];
  credentials: string[];
}

/** Opción del `<select>` de servicios en el formulario. */
export interface ServiceOption {
  value: string;
  label: string;
}
