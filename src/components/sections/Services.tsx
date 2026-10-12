import { ArrowRight, CalendarCheck, Check, Phone } from 'lucide-react';

import { clinicInfo, services } from '../../data/site';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import styles from './Services.module.css';

/**
 * Servicios: tarjetas elegantes con icono, descripción y puntos clave.
 * Los datos provienen de `services` (src/data/site.ts), por lo que añadir un
 * tratamiento nuevo no requiere tocar la maquetación.
 */
export function Services() {
  return (
    <section id="servicios" className={cn('section', styles.section)}>
      <div className="container">
        <SectionHeading
          eyebrow="Tratamientos"
          title={
            <>
              Todo lo que tu sonrisa necesita, <em>en un mismo equipo</em>
            </>
          }
          description="Desde una limpieza de mantenimiento hasta una rehabilitación completa con implantes. Estudiamos cada caso con diagnóstico digital y te explicamos las opciones antes de decidir."
        />

        <ul className={styles.grid}>
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Reveal
                as="li"
                key={service.id}
                delay={index * 70}
                className={styles.cardWrapper}
              >
                <article className={styles.card}>
                  <span className={styles.icon} aria-hidden="true">
                    <Icon size={24} strokeWidth={1.9} />
                  </span>

                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardSummary}>{service.summary}</p>

                  <ul className={styles.features}>
                    {service.features.map((feature) => (
                      <li key={feature} className={styles.feature}>
                        <Check size={13} strokeWidth={3} aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a className={styles.more} href="#cita">
                    Pedir información
                    <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </ul>

        {/* Banda de cierre de la sección */}
        <Reveal className={styles.band}>
          <div className={styles.bandText}>
            <strong>¿Dudas sobre qué tratamiento necesitas?</strong>
            <span>
              Te hacemos un estudio inicial sin coste y sin compromiso para que lo tengas
              claro antes de empezar.
            </span>
          </div>
          <div className={styles.bandActions}>
            <Button href="#cita" iconLeft={<CalendarCheck size={18} strokeWidth={2.2} />}>
              Reservar primera visita
            </Button>
            <Button
              href={clinicInfo.phone.href}
              variant="outline"
              iconLeft={<Phone size={17} strokeWidth={2.2} />}
            >
              {clinicInfo.phone.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
