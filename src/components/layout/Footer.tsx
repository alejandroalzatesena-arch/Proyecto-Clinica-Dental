import { ArrowUp, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

import { clinicInfo, navItems, services } from '../../data/site';
import { cn } from '../../utils/cn';
import { ClinicMap } from '../illustrations/ClinicMap';
import { socialIconMap } from '../icons/SocialIcons';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';
import styles from './Footer.module.css';

/**
 * Pie de página completo: datos de contacto, navegación, tratamientos,
 * horarios, mapa, redes sociales y línea legal.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* ------------------------- Banda de urgencias ------------------------- */}
      <div className={styles.urgency}>
        <div className={cn('container', styles.urgencyInner)}>
          <p className={styles.urgencyText}>
            <Clock size={18} strokeWidth={2.2} aria-hidden="true" />
            <span>
              <strong>¿Urgencia dental?</strong> Atendemos el mismo día, también los fines
              de semana.
            </span>
          </p>
          <Button
            href={clinicInfo.phone.href}
            variant="light"
            iconLeft={<Phone size={17} strokeWidth={2.2} />}
          >
            Llamar ahora · {clinicInfo.phone.label}
          </Button>
        </div>
      </div>

      <div className={cn('container', styles.top)}>
        {/* ------------------------------ Marca ----------------------------- */}
        <div className={styles.brandCol}>
          <Logo variant="light" />
          <p className={styles.tagline}>{clinicInfo.tagline}</p>
          <p className={styles.brandText}>
            Clínica dental en {clinicInfo.address.city} especializada en implantología,
            ortodoncia invisible y estética dental. Tecnología digital y trato humano.
          </p>

          <ul className={styles.socials}>
            {clinicInfo.socials.map((social) => {
              const Icon = socialIconMap[social.id];

              return (
                <li key={social.id}>
                  <a
                    className={styles.social}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${clinicInfo.shortName} en ${social.label}`}
                  >
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* --------------------------- Navegación --------------------------- */}
        <nav className={styles.col} aria-labelledby="footer-navegacion">
          <h2 className={styles.colTitle} id="footer-navegacion">
            Navegación
          </h2>
          <ul className={styles.list}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a className={styles.link} href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a className={styles.link} href="#inicio">
                Inicio
              </a>
            </li>
          </ul>
        </nav>

        {/* -------------------------- Tratamientos -------------------------- */}
        <div className={styles.col}>
          <h2 className={styles.colTitle}>Tratamientos</h2>
          <ul className={styles.list}>
            {services.map((service) => (
              <li key={service.id}>
                <a className={styles.link} href="#servicios">
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ----------------------------- Contacto --------------------------- */}
        <div className={styles.col}>
          <h2 className={styles.colTitle}>Contacto</h2>
          <ul className={styles.contactList}>
            <li>
              <MapPin size={17} strokeWidth={2} aria-hidden="true" />
              <address className={styles.address}>
                {clinicInfo.address.street}
                <br />
                {clinicInfo.address.postalCode} {clinicInfo.address.city}
              </address>
            </li>
            <li>
              <Phone size={17} strokeWidth={2} aria-hidden="true" />
              <a className={styles.link} href={clinicInfo.phone.href}>
                {clinicInfo.phone.label}
              </a>
            </li>
            <li>
              <MessageCircle size={17} strokeWidth={2} aria-hidden="true" />
              <a
                className={styles.link}
                href={clinicInfo.whatsapp.href}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp {clinicInfo.whatsapp.label}
              </a>
            </li>
            <li>
              <Mail size={17} strokeWidth={2} aria-hidden="true" />
              <a className={styles.link} href={`mailto:${clinicInfo.email}`}>
                {clinicInfo.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* -------------------- Mapa + horario de atención -------------------- */}
      <div className={cn('container', styles.mapRow)}>
        <ClinicMap />

        <div className={styles.hoursCard}>
          <h2 className={styles.colTitle}>
            <Clock size={17} strokeWidth={2} aria-hidden="true" />
            Horario
          </h2>
          <dl className={styles.hours}>
            {clinicInfo.schedule.map((entry) => (
              <div key={entry.day} className={styles.hoursRow}>
                <dt>{entry.day}</dt>
                <dd className={cn(entry.closed && styles.hoursClosed)}>{entry.hours}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.hoursNote}>
            Fuera de horario, déjanos un mensaje y te respondemos a primera hora del día
            siguiente.
          </p>
        </div>
      </div>

      {/* ------------------------------ Línea legal ------------------------- */}
      <div className={styles.bottom}>
        <div className={cn('container', styles.bottomInner)}>
          <p className={styles.copy}>
            © {year} {clinicInfo.name}. Todos los derechos reservados.
          </p>

          <ul className={styles.legal}>
            <li>
              <a className={styles.link} href="#aviso-legal">
                Aviso legal
              </a>
            </li>
            <li>
              <a className={styles.link} href="#privacidad">
                Política de privacidad
              </a>
            </li>
            <li>
              <a className={styles.link} href="#cookies">
                Cookies
              </a>
            </li>
          </ul>

          <p className={styles.registry}>
            Centro sanitario autorizado · N.º de registro CS-14872
          </p>

          <a className={styles.toTop} href="#inicio">
            <ArrowUp size={16} strokeWidth={2.4} aria-hidden="true" />
            Volver arriba
          </a>
        </div>
      </div>
    </footer>
  );
}
