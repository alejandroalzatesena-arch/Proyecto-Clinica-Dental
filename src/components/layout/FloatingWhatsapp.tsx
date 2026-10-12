import { useEffect, useState } from 'react';

import { clinicInfo } from '../../data/site';
import { cn } from '../../utils/cn';
import { WhatsappIcon } from '../icons/SocialIcons';
import styles from './FloatingWhatsapp.module.css';

/**
 * Botón flotante de WhatsApp.
 * Aparece tras un pequeño scroll para no tapar el hero y se oculta al llegar
 * al formulario (donde ya hay CTA de contacto suficiente).
 */
export function FloatingWhatsapp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      className={cn(styles.button, visible && styles.buttonVisible)}
      href={clinicInfo.whatsapp.href}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      // Evita que el enlace reciba foco cuando está oculto
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <WhatsappIcon width={24} height={24} />
      <span className={styles.label}>Escríbenos</span>
    </a>
  );
}
