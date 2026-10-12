import { z } from 'zod';

import { isPastDate, parseISODate } from '../utils/date';

/* ============================================================================
   Esquema de validación del formulario de cita (Zod 4).
   Aquí vive TODA la lógica de validación: los mensajes de error se declaran
   junto a la regla que los provoca, en español y con un tono cercano.
   El tipo del formulario se infiere del esquema: nunca se desincronizan.
   ========================================================================== */

/**
 * Teléfono flexible: acepta 9 dígitos nacionales u opcional prefijo
 * internacional (+34, 0034, 34) con espacios, puntos o guiones.
 */
const PHONE_REGEX = /^(?:\+?\d{1,3}[\s.-]?)?(?:\d[\s.-]?){8,11}\d$/;

/** Sólo letras (incluidas acentuadas), espacios, apóstrofes y guiones. */
const NAME_REGEX = /^[\p{L}\s'.-]+$/u;

export const appointmentSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, { message: 'El nombre es obligatorio.' })
    .min(3, { message: 'Escribe tu nombre completo (mínimo 3 caracteres).' })
    .max(80, { message: 'El nombre no puede superar los 80 caracteres.' })
    .regex(NAME_REGEX, { message: 'El nombre sólo puede contener letras y espacios.' }),

  phone: z
    .string()
    .trim()
    .min(1, { message: 'El teléfono es obligatorio.' })
    .regex(PHONE_REGEX, {
      message: 'Introduce un teléfono válido, por ejemplo 910 245 678 o +34 600 123 456.',
    }),

  email: z
    .string()
    .trim()
    .min(1, { message: 'El correo electrónico es obligatorio.' })
    .max(120, { message: 'El correo no puede superar los 120 caracteres.' })
    .pipe(z.email({ message: 'Escribe un correo válido, por ejemplo nombre@correo.com.' })),

  service: z.string().min(1, { message: 'Selecciona el servicio que te interesa.' }),

  preferredDate: z
    .string()
    .min(1, { message: 'Indica la fecha en la que preferirías venir.' })
    .refine((value) => parseISODate(value) !== null, {
      message: 'La fecha no es válida.',
    })
    .refine((value) => !isPastDate(value), {
      message: 'Elige una fecha de hoy en adelante: no podemos agendar en el pasado.',
    }),

  message: z
    .string()
    .trim()
    .max(600, { message: 'El mensaje no puede superar los 600 caracteres.' })
    .optional()
    .or(z.literal('')),

  privacy: z.literal(true, {
    message: 'Debes aceptar la política de privacidad para que podamos contactarte.',
  }),
});

/** Datos del formulario tal y como los maneja React Hook Form. */
export type AppointmentFormValues = z.infer<typeof appointmentSchema>;

/** Valores iniciales del formulario (campos vacíos). */
export const appointmentDefaultValues: AppointmentFormValues = {
  fullName: '',
  phone: '',
  email: '',
  service: '',
  preferredDate: '',
  message: '',
  privacy: false as unknown as true,
};
