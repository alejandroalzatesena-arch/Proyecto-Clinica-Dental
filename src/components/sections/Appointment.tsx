import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  CalendarCheck,
  CircleAlert,
  CircleCheckBig,
  Clock,
  ListChecks,
  LoaderCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  RotateCcw,
  Send,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';

import { clinicInfo, serviceOptions } from '../../data/site';
import {
  appointmentDefaultValues,
  appointmentSchema,
  type AppointmentFormValues,
} from '../../schemas/appointmentSchema';
import { cn } from '../../utils/cn';
import { formatDateEs, getMaxBookingISO, getTodayISO } from '../../utils/date';
import { CheckboxField } from '../form/CheckboxField';
import { InputField } from '../form/InputField';
import { SelectField } from '../form/SelectField';
import { TextareaField } from '../form/TextareaField';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import styles from './Appointment.module.css';

/** Longitud máxima del mensaje (coincide con el esquema de Zod). */
const MESSAGE_MAX_LENGTH = 600;

/** Estado del envío: inactivo, enviando o completado con éxito. */
type FormStatus = 'idle' | 'sending' | 'success';

/**
 * Formulario de cita con React Hook Form + Zod.
 *
 * Por qué este stack:
 *  · Zod valida en un único esquema tipado (una sola fuente de verdad) y
 *    `z.infer` genera el tipo del formulario automáticamente.
 *  · React Hook Form trabaja sin controlar cada campo: sólo se re-renderiza
 *    el campo que cambia, lo que mantiene el formulario muy fluido.
 *  · `zodResolver` conecta ambos mundos sin escribir validaciones a mano.
 */
export function Appointment() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [submitted, setSubmitted] = useState<AppointmentFormValues | null>(null);

  // Fechas límite del selector (se calculan una sola vez por render de sesión).
  const today = useMemo(getTodayISO, []);
  const maxDate = useMemo(getMaxBookingISO, []);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: appointmentDefaultValues,
    // Valida al salir del campo y después en cada cambio: feedback temprano,
    // pero sin regañar al usuario mientras escribe la primera vez.
    mode: 'onTouched',
  });

  const message = watch('message') ?? '';
  const privacyChecked = watch('privacy');
  const privacyField = register('privacy');
  const errorCount = Object.keys(errors).length;

  const serviceLabel =
    serviceOptions.find((option) => option.value === submitted?.service)?.label ?? '';
  const firstName = submitted?.fullName.trim().split(' ')[0] ?? '';

  /** Envío simulado: aquí iría la llamada real a la API/CRM de la clínica. */
  const onSubmit = async (values: AppointmentFormValues) => {
    setStatus('sending');
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSubmitted(values);
    setStatus('success');
    reset();
  };

  /** Vuelve a mostrar el formulario vacío tras un envío correcto. */
  const handleReset = () => {
    setSubmitted(null);
    setStatus('idle');
  };

  return (
    <section id="cita" className={cn('section', styles.section)}>
      <div className="container">
        <SectionHeading
          eyebrow="Agenda tu cita"
          title={
            <>
              Cuéntanos qué necesitas y <em>nosotros nos ocupamos</em>
            </>
          }
          description="Rellena el formulario y te llamamos en menos de 24 horas laborables para confirmar día y hora. Sin compromiso y con la primera visita gratuita."
        />

        <div className={styles.layout}>
          {/* ------------------------------ Formulario ------------------------ */}
          <Reveal className={styles.formColumn}>
            <div className={styles.formCard}>
              {status === 'success' && submitted ? (
                /* ---------------------- Estado de éxito --------------------- */
                <div className={styles.success} role="status" aria-live="polite">
                  <span className={styles.successIcon} aria-hidden="true">
                    <CircleCheckBig size={40} strokeWidth={1.8} />
                  </span>

                  <h3 className={styles.successTitle}>¡Gracias, {firstName}!</h3>
                  <p className={styles.successText}>
                    Hemos recibido tu solicitud correctamente. Te llamaremos al{' '}
                    <strong>{submitted.phone}</strong> en menos de 24 horas laborables para
                    confirmar tu cita.
                  </p>

                  <ul className={styles.successList}>
                    <li>
                      <CalendarCheck size={17} strokeWidth={2} aria-hidden="true" />
                      Fecha preferida: <strong>{formatDateEs(submitted.preferredDate)}</strong>
                    </li>
                    <li>
                      <Stethoscope size={17} strokeWidth={2} aria-hidden="true" />
                      Servicio: <strong>{serviceLabel}</strong>
                    </li>
                  </ul>

                  <div className={styles.successActions}>
                    <Button
                      href={clinicInfo.whatsapp.href}
                      iconLeft={<MessageCircle size={18} strokeWidth={2.2} />}
                    >
                      Escribir por WhatsApp
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                      iconLeft={<RotateCcw size={17} strokeWidth={2.2} />}
                    >
                      Enviar otra solicitud
                    </Button>
                  </div>
                </div>
              ) : (
                /* -------------------------- Formulario ---------------------- */
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/* Resumen accesible de errores */}
                  {errorCount > 0 ? (
                    <p className={styles.formAlert} role="alert">
                      <CircleAlert size={16} strokeWidth={2.4} aria-hidden="true" />
                      Revisa {errorCount === 1 ? 'el campo marcado' : `los ${errorCount} campos marcados`}{' '}
                      para poder enviar tu solicitud.
                    </p>
                  ) : null}

                  <div className={styles.row}>
                    <InputField
                      id="fullName"
                      label="Nombre completo"
                      required
                      placeholder="Ej. Marta Ruiz Gómez"
                      autoComplete="name"
                      error={errors.fullName?.message}
                      {...register('fullName')}
                    />

                    <InputField
                      id="phone"
                      label="Teléfono"
                      type="tel"
                      required
                      inputMode="tel"
                      placeholder="Ej. 612 345 678"
                      autoComplete="tel"
                      hint="Te llamamos a este número para confirmar la cita."
                      error={errors.phone?.message}
                      {...register('phone')}
                    />
                  </div>

                  <div className={styles.row}>
                    <InputField
                      id="email"
                      label="Correo electrónico"
                      type="email"
                      required
                      placeholder="nombre@correo.com"
                      autoComplete="email"
                      error={errors.email?.message}
                      {...register('email')}
                    />

                    <SelectField
                      id="service"
                      label="Servicio de interés"
                      required
                      defaultValue=""
                      hint="Si no lo tienes claro, elige “Primera visita”."
                      error={errors.service?.message}
                      {...register('service')}
                    >
                      <option value="" disabled>
                        Selecciona un tratamiento
                      </option>
                      {serviceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </SelectField>
                  </div>

                  <InputField
                    id="preferredDate"
                    label="Fecha preferida"
                    type="date"
                    required
                    min={today}
                    max={maxDate}
                    hint="Elige el día que mejor te venga; acordamos la hora por teléfono."
                    error={errors.preferredDate?.message}
                    {...register('preferredDate')}
                  />

                  <TextareaField
                    id="message"
                    label="Cuéntanos tu caso (opcional)"
                    placeholder="¿Tienes dolor, llevas tiempo queriendo mejorar tu sonrisa, algún tratamiento previo…?"
                    maxLength={MESSAGE_MAX_LENGTH}
                    currentLength={message.length}
                    error={errors.message?.message}
                    {...register('message')}
                  />

                  <CheckboxField
                    id="privacy"
                    name={privacyField.name}
                    onChange={privacyField.onChange}
                    onBlur={privacyField.onBlur}
                    inputRef={privacyField.ref}
                    checked={Boolean(privacyChecked)}
                    error={errors.privacy?.message}
                    label={
                      <>
                        He leído y acepto el <a href="#aviso-legal">aviso legal</a> y el
                        tratamiento de mis datos para gestionar mi cita, conforme al RGPD.
                        No compartimos tu información con terceros.
                      </>
                    }
                  />

                  <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    disabled={status === 'sending'}
                    iconLeft={
                      status === 'sending' ? (
                        <LoaderCircle className={styles.spinner} size={18} strokeWidth={2.4} />
                      ) : (
                        <Send size={18} strokeWidth={2.2} />
                      )
                    }
                  >
                    {status === 'sending' ? 'Enviando solicitud…' : 'Solicitar cita'}
                  </Button>

                  <p className={styles.formNote}>
                    <ShieldCheck size={15} strokeWidth={2.2} aria-hidden="true" />
                    Respuesta en menos de 24 h laborables. Tus datos se tratan de forma
                    confidencial.
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          {/* -------------------------- Columna informativa ------------------- */}
          <Reveal delay={120} className={styles.infoColumn}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Contacto directo</h3>
              <ul className={styles.infoList}>
                <li>
                  <a className={styles.infoLink} href={clinicInfo.phone.href}>
                    <span className={styles.infoIcon}>
                      <Phone size={17} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span>
                      <strong>{clinicInfo.phone.label}</strong>
                      <span>Llámanos de 9:00 a 21:00</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className={styles.infoLink}
                    href={clinicInfo.whatsapp.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className={styles.infoIcon}>
                      <MessageCircle size={17} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span>
                      <strong>WhatsApp {clinicInfo.whatsapp.label}</strong>
                      <span>Respuesta rápida en horario de clínica</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a className={styles.infoLink} href={`mailto:${clinicInfo.email}`}>
                    <span className={styles.infoIcon}>
                      <Mail size={17} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span>
                      <strong>{clinicInfo.email}</strong>
                      <span>Para informes y documentación</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className={styles.infoLink}
                    href={clinicInfo.address.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className={styles.infoIcon}>
                      <MapPin size={17} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span>
                      <strong>{clinicInfo.address.street}</strong>
                      <span>
                        {clinicInfo.address.postalCode} {clinicInfo.address.city}
                      </span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>
                <Clock size={18} strokeWidth={2} aria-hidden="true" />
                Horario de atención
              </h3>
              <dl className={styles.schedule}>
                {clinicInfo.schedule.map((entry) => (
                  <div key={entry.day} className={styles.scheduleRow}>
                    <dt>{entry.day}</dt>
                    <dd className={cn(entry.closed && styles.scheduleClosed)}>{entry.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className={cn(styles.infoCard, styles.infoHighlight)}>
              <h3 className={styles.infoTitle}>
                <ListChecks size={18} strokeWidth={2} aria-hidden="true" />
                Qué incluye tu primera visita
              </h3>
              <ul className={styles.includes}>
                <li>Revisión completa y radiografía digital sin coste</li>
                <li>Diagnóstico explicado con imágenes en pantalla</li>
                <li>Plan de tratamiento y presupuesto cerrado por escrito</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
