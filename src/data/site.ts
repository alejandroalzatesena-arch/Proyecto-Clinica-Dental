import {
  Anchor,
  Baby,
  Braces,
  Brush,
  Clock,
  CreditCard,
  Gem,
  GraduationCap,
  HeartHandshake,
  Scan,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from 'lucide-react';

import type {
  Benefit,
  ClinicInfo,
  DoctorProfile,
  NavItem,
  Service,
  ServiceOption,
  Stat,
  Testimonial,
} from '../types/site';

/* ============================================================================
   Contenido del sitio (single source of truth).
   Todo el texto vive aquí: los componentes sólo se encargan de presentarlo.
   ========================================================================== */

/** Enlaces del header. Cada `id` coincide con el `id` de la sección destino. */
export const navItems: NavItem[] = [
  { id: 'servicios', label: 'Servicios', href: '#servicios' },
  { id: 'clinica', label: 'La clínica', href: '#clinica' },
  { id: 'testimonios', label: 'Testimonios', href: '#testimonios' },
  { id: 'confianza', label: 'Por qué elegirnos', href: '#confianza' },
  { id: 'cita', label: 'Contacto', href: '#cita' },
];

export const clinicInfo: ClinicInfo = {
  name: 'Clínica Dental Lumina',
  shortName: 'Lumina',
  tagline: 'Odontología estética e integral',
  address: {
    street: 'Calle de Serrano 148, 1.º B',
    city: 'Madrid',
    postalCode: '28002',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Serrano+148+Madrid',
  },
  phone: { label: '910 245 678', href: 'tel:+34910245678' },
  whatsapp: { label: '600 123 456', href: 'https://wa.me/34600123456' },
  email: 'hola@dentalumina.es',
  schedule: [
    { day: 'Lunes a viernes', hours: '09:00 – 21:00' },
    { day: 'Sábado', hours: '10:00 – 14:00' },
    { day: 'Domingo', hours: 'Cerrado', closed: true },
    { day: 'Urgencias', hours: '24 h / 365 días' },
  ],
  socials: [
    { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/dentalumina' },
    { id: 'facebook', label: 'Facebook', href: 'https://facebook.com/dentalumina' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/company/dentalumina' },
    { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/34600123456' },
  ],
};

export const doctorProfile: DoctorProfile = {
  name: 'Dra. Valeria Ortega',
  role: 'Directora clínica · Implantología y estética dental',
  license: 'N.º de colegiada 28009912',
  bio: [
    'Llevo más de 15 años devolviendo la sonrisa a mis pacientes y sigo creyendo que la odontología empieza por escuchar. En Lumina diseñamos cada tratamiento contigo, explicándote cada paso con un lenguaje claro y sin prisas.',
    'Trabajamos con diagnóstico digital 3D, planificación guiada y materiales de última generación, pero lo que de verdad marca la diferencia es el trato: llegas a una consulta y sales con las ideas claras.',
  ],
  credentials: [
    'Licenciada en Odontología · Universidad Complutense de Madrid',
    'Máster en Implantología Oral y Cirugía Protésica',
    'Especialista en Ortodoncia Invisible (Invisalign® Provider)',
    'Miembro de la Sociedad Española de Prótesis Estomatológica y Estética',
  ],
};

/** Cifras de confianza que refuerzan la autoridad de la clínica. */
export const stats: Stat[] = [
  { id: 'years', value: '+15', label: 'años de experiencia' },
  { id: 'patients', value: '+12.000', label: 'pacientes atendidos' },
  { id: 'rating', value: '4,9', label: 'valoración media' },
  { id: 'satisfaction', value: '98 %', label: 'pacientes satisfechos' },
];

export const services: Service[] = [
  {
    id: 'implantes',
    title: 'Implantes dentales',
    summary:
      'Reponemos dientes perdidos con implantes de titanio planificados en 3D, para recuperar masticación y estética de forma natural.',
    icon: Anchor,
    features: ['Cirugía guiada por ordenador', 'Garantía de 5 años', 'Fabricación certificada'],
  },
  {
    id: 'ortodoncia',
    title: 'Ortodoncia invisible',
    summary:
      'Alineamos tu sonrisa con férulas transparentes hechas a medida: cómodas, removibles y prácticamente imperceptibles.',
    icon: Braces,
    features: ['Estudio digital de la sonrisa', 'Sin brackets metálicos', 'Revisiones cada 6 semanas'],
  },
  {
    id: 'estetica',
    title: 'Estética y carillas',
    summary:
      'Diseñamos tu sonrisa con carillas de porcelana ultrafinas que respetan el esmalte y mejoran color, forma y proporción.',
    icon: Gem,
    features: ['Diseño de sonrisa DSD', 'Mínimo desgaste dental', 'Prueba previa en boca'],
  },
  {
    id: 'blanqueamiento',
    title: 'Blanqueamiento dental',
    summary:
      'Aclaramos el tono de tus dientes con técnicas de luz fría o férulas domiciliarias, siempre bajo control profesional.',
    icon: Sparkles,
    features: ['Resultados visibles desde la 1.ª sesión', 'Sin sensibilidad agresiva', 'Kit de mantenimiento'],
  },
  {
    id: 'limpieza',
    title: 'Limpieza y prevención',
    summary:
      'Profilaxis con ultrasonidos, aeropulido y sellado para mantener las encías sanas y prevenir caries a largo plazo.',
    icon: Brush,
    features: ['Revisión completa incluida', 'Tartrectomía sin dolor', 'Plan de higiene personalizado'],
  },
  {
    id: 'general',
    title: 'Odontología general y niños',
    summary:
      'Caries, endodoncia, prótesis y odontopediatría en un mismo equipo, para que toda la familia se cuide en el mismo sitio.',
    icon: Stethoscope,
    features: ['Consulta infantil sin estrés', 'Empastes estéticos', 'Urgencias en el día'],
  },
];

/** Opciones del formulario: derivadas de los servicios (un solo origen de datos). */
export const serviceOptions: ServiceOption[] = [
  ...services.map((service) => ({ value: service.id, label: service.title })),
  { value: 'primera-visita', label: 'Primera visita / diagnóstico' },
  { value: 'otro', label: 'Otro (cuéntame en el mensaje)' },
];

export const benefits: Benefit[] = [
  {
    id: 'tecnologia',
    title: 'Tecnología 3D',
    description:
      'Escáner intraoral, TAC dental y planificación virtual: vemos el resultado antes de empezar para que no haya sorpresas.',
    icon: Scan,
  },
  {
    id: 'trato',
    title: 'Trato cercano',
    description:
      'Cada tratamiento se explica con palabras claras, sin tecnicismos y sin presiones. Tú decides el ritmo.',
    icon: HeartHandshake,
  },
  {
    id: 'seguridad',
    title: 'Seguridad certificada',
    description:
      'Protocolos de esterilización auditados y materiales con trazabilidad europea en todas las consultas.',
    icon: ShieldCheck,
  },
  {
    id: 'financiacion',
    title: 'Financiación sin intereses',
    description:
      'Hasta 24 meses sin intereses y presupuesto cerrado por escrito antes de iniciar cualquier tratamiento.',
    icon: CreditCard,
  },
  {
    id: 'horarios',
    title: 'Horario que encaja',
    description:
      'Abrimos de 9:00 a 21:00 y los sábados por la mañana, además de atención de urgencias todos los días.',
    icon: Clock,
  },
  {
    id: 'equipo',
    title: 'Equipo especialista',
    description:
      'Odontólogos colegiados con formación continua en implantología, ortodoncia y odontopediatría.',
    icon: GraduationCap,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'marta',
    name: 'Marta Ruiz',
    treatment: 'Implantes dentales',
    quote:
      'Llevaba años evitando el dentista por miedo y en Lumina me cambiaron la perspectiva. Me explicaron todo con calma y hoy vuelvo a comer de todo sin pensar en ello.',
    rating: 5,
    initials: 'MR',
  },
  {
    id: 'javier',
    name: 'Javier Molina',
    treatment: 'Ortodoncia invisible',
    quote:
      'Trabajo de cara al público y necesitaba algo discreto. Con las férulas invisibles nadie notó que llevaba ortodoncia y el resultado llegó justo en el plazo prometido.',
    rating: 5,
    initials: 'JM',
  },
  {
    id: 'lucia',
    name: 'Lucía Fernández',
    treatment: 'Diseño de sonrisa',
    quote:
      'El diseño digital de mi sonrisa fue clave: pude ver el antes y el después antes de decidir. El resultado es natural, no ese blanco artificial que me daba miedo.',
    rating: 5,
    initials: 'LF',
  },
  {
    id: 'antonio',
    name: 'Antonio Serrano',
    treatment: 'Limpieza y periodoncia',
    quote:
      'Mis encías sangraban siempre y en dos visitas tenían un plan claro. Un año después las revisiones salen perfectas y con unos hábitos que aprendí aquí.',
    rating: 5,
    initials: 'AS',
  },
  {
    id: 'nerea',
    name: 'Nerea Vidal',
    treatment: 'Odontopediatría',
    quote:
      'Mi hija de seis años entra corriendo a la consulta, algo impensable hace un año. Saben cómo hablarles a los niños y hacerlo divertido.',
    rating: 5,
    initials: 'NV',
  },
  {
    id: 'pedro',
    name: 'Pedro Alonso',
    treatment: 'Blanqueamiento + carillas',
    quote:
      'Presupuesto por escrito, sin extras raros al final y financiado en cómodos plazos. La transparencia es lo que más valoro.',
    rating: 5,
    initials: 'PA',
  },
];

/** Franjas informativas del hero (bajo el CTA). */
export const heroHighlights: string[] = [
  'Primera visita y estudio digital gratuitos',
  'Financiación hasta 24 meses sin intereses',
];
