import { useEffect, useState } from 'react';
import { CalendarCheck, Clock, MapPin, Menu, Phone, X } from 'lucide-react';

import { clinicInfo, navItems } from '../../data/site';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { cn } from '../../utils/cn';
import { socialIconMap } from '../icons/SocialIcons';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';
import styles from './Header.module.css';

/**
 * Cabecera fija del sitio.
 *
 * Estructura:
 *  · barra superior (sólo escritorio) con teléfono, dirección y horario,
 *  · header sticky con logo, navegación y CTA "Agendar cita",
 *  · panel lateral para móvil con cierre por Escape, clic en enlace o fondo.
 */
export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeId = useScrollSpy(navItems.map((item) => item.id));

  // El menú móvil bloquea el scroll del documento mientras está abierto.
  useLockBodyScroll(isOpen);

  // Cambia el estilo del header al hacer scroll (efecto "cristal").
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cerrar el menú con la tecla Escape.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* ------------------------- Barra informativa superior ------------------- */}
      <div className={styles.topbar}>
        <div className={cn('container', styles.topbarInner)}>
          <p className={styles.topbarItem}>
            <MapPin size={14} strokeWidth={2} aria-hidden="true" />
            {clinicInfo.address.street} · {clinicInfo.address.city}
          </p>
          <p className={styles.topbarItem}>
            <Clock size={14} strokeWidth={2} aria-hidden="true" />
            Lunes a viernes de 9:00 a 21:00
          </p>
          <a className={styles.topbarItem} href={clinicInfo.phone.href}>
            <Phone size={14} strokeWidth={2} aria-hidden="true" />
            {clinicInfo.phone.label}
          </a>
        </div>
      </div>

      {/* -------------------------------- Header -------------------------------- */}
      <header className={cn(styles.header, isScrolled && styles.scrolled)}>
        <div className={cn('container', styles.inner)}>
          <a
            className={styles.brand}
            href="#inicio"
            aria-label={`${clinicInfo.name} — inicio`}
            onClick={closeMenu}
          >
            <Logo />
          </a>

          {/* Navegación de escritorio */}
          <nav className={styles.nav} aria-label="Navegación principal">
            <ul className={styles.navList}>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    className={cn(
                      styles.navLink,
                      activeId === item.id && styles.navLinkActive,
                    )}
                    href={item.href}
                    aria-current={activeId === item.id ? 'true' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <a className={styles.phone} href={clinicInfo.phone.href}>
              <span className={styles.phoneIcon}>
                <Phone size={16} strokeWidth={2.2} aria-hidden="true" />
              </span>
              <span className={styles.phoneText}>
                <span className={styles.phoneLabel}>Llámanos</span>
                <span className={styles.phoneNumber}>{clinicInfo.phone.label}</span>
              </span>
            </a>

            <Button
              href="#cita"
              variant="primary"
              className={styles.cta}
              iconLeft={<CalendarCheck size={17} strokeWidth={2.2} />}
            >
              Agendar cita
            </Button>

            <button
              type="button"
              className={styles.burger}
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls="menu-movil"
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* ----------------------------- Menú móvil ------------------------------ */}
      <div
        className={cn(styles.backdrop, isOpen && styles.backdropOpen)}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <div
        id="menu-movil"
        className={cn(styles.drawer, isOpen && styles.drawerOpen)}
        // `inert` evita que el foco entre en el panel cuando está cerrado.
        {...(!isOpen ? { inert: true } : {})}
      >
        <nav aria-label="Navegación móvil">
          <ul className={styles.drawerList}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a className={styles.drawerLink} href={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.drawerFooter}>
          <Button
            href="#cita"
            size="lg"
            fullWidth
            iconLeft={<CalendarCheck size={18} strokeWidth={2.2} />}
            onClick={closeMenu}
          >
            Agendar cita
          </Button>

          <a className={styles.drawerPhone} href={clinicInfo.phone.href}>
            <Phone size={17} strokeWidth={2.2} aria-hidden="true" />
            {clinicInfo.phone.label}
          </a>

          <ul className={styles.drawerSocials}>
            {clinicInfo.socials.map((social) => {
              const Icon = socialIconMap[social.id];
              return (
                <li key={social.id}>
                  <a
                    className={styles.drawerSocial}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                  >
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
