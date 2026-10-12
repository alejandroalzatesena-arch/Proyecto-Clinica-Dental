/* ============================================================================
   Utilidades de fecha (sin dependencias externas).
   ========================================================================== */

/** Devuelve la fecha local en formato `YYYY-MM-DD` (valor de <input type="date">). */
export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Fecha de hoy, usada como `min` del selector de fecha. */
export function getTodayISO(): string {
  return toISODate(new Date());
}

/** Fecha máxima reservable (por defecto, 12 meses desde hoy). */
export function getMaxBookingISO(months = 12): string {
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  return toISODate(date);
}

/**
 * Convierte `YYYY-MM-DD` en una fecha local.
 * Importante: `new Date('2026-01-05')` se interpreta como UTC y puede
 * desplazar el día según la zona horaria; aquí lo evitamos.
 */
export function parseISODate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Formatea `YYYY-MM-DD` como "5 de enero de 2026". */
export function formatDateEs(value: string): string {
  const date = parseISODate(value);
  if (!date) return value;

  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/** true si la fecha (a nivel de día) anterior a hoy. */
export function isPastDate(value: string): boolean {
  const date = parseISODate(value);
  if (!date) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date.getTime() < today.getTime();
}
