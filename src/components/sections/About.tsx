import { BadgeCheck, CalendarCheck, Quote, Trophy } from 'lucide-react';

import { doctorProfile } from '../../data/site';
import { cn } from '../../utils/cn';
import { DoctorPortrait } from '../illustrations/DoctorPortrait';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import styles from './About.module.css';

/**
 * "Sobre la clínica": retrato ilustrado de la doctora + trayectoria
 * profesional. El objetivo es transmitir criterio clínico y confianza.
 */
export function About() {
  return (
    <section id="clinica" className={cn('section', styles.section)}>
      <div className={cn('container', styles.inner)}>
        {/* --------------------------- Columna visual ------------------------- */}
        <Reveal className={styles.visual}>
          <DoctorPortrait />

          {/* Tarjeta flotante con la experiencia */}
          <div className={styles.experienceCard}>
            <span className={styles.experienceIcon} aria-hidden="true">
              <Trophy size={20} strokeWidth={2} />
            </span>
            <span className={styles.experienceText}>
              <strong>+15 años</strong>
              <span>de experiencia clínica</span>
            </span>
          </div>
        </Reveal>

        {/* ---------------------------- Columna texto ------------------------- */}
        <div className={styles.content}>
          <SectionHeading
            eyebrow="Nuestra clínica"
            title={
              <>
                Un equipo que <em>escucha</em> antes de tratar
              </>
            }
          />

          <div className={styles.bio}>
            {doctorProfile.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          {/* Cita destacada: refuerza el tono humano */}
          <blockquote className={styles.quote}>
            <Quote size={22} strokeWidth={1.8} aria-hidden="true" />
            <p>
              «Una buena sonrisa empieza por entender qué necesita cada persona. Lo demás
              es técnica.»
            </p>
          </blockquote>

          {/* Formación: lista de credenciales */}
          <ul className={styles.credentials}>
            {doctorProfile.credentials.map((credential) => (
              <li key={credential} className={styles.credential}>
                <BadgeCheck size={18} strokeWidth={2} aria-hidden="true" />
                {credential}
              </li>
            ))}
          </ul>

          {/* Firma profesional */}
          <footer className={styles.signature}>
            <span className={styles.signatureName}>{doctorProfile.name}</span>
            <span className={styles.signatureRole}>{doctorProfile.role}</span>
            <span className={styles.signatureLicense}>{doctorProfile.license}</span>
          </footer>

          <div className={styles.actions}>
            <Button
              href="#cita"
              iconLeft={<CalendarCheck size={18} strokeWidth={2.2} />}
            >
              Agendar con la Dra. Ortega
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
