import { ArrowRight, Check, Phone, Sparkles } from 'lucide-react';

import { clinicInfo, heroHighlights, stats } from '../../data/site';
import { cn } from '../../utils/cn';
import { HeroVisual } from '../illustrations/HeroVisual';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import styles from './Hero.module.css';

/**
 * Hero principal: propuesta de valor, CTA doble y cifras de confianza.
 * El texto entra con una animación escalonada (Reveal) para dar ritmo.
 */
export function Hero() {
  return (
    <section id="inicio" className={styles.hero}>
      {/* Decoración de fondo: halos difusos que aportan calidez */}
      <div className={styles.background} aria-hidden="true">
        <span className={cn(styles.blob, styles.blobOne)} />
        <span className={cn(styles.blob, styles.blobTwo)} />
      </div>

      <div className={cn('container', styles.inner)}>
        <div className={styles.copy}>
          <Reveal>
            <p className={styles.badge}>
              <span className={styles.badgeDot} aria-hidden="true" />
              Odontología digital en {clinicInfo.address.city}
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className={styles.title}>
              Cuida tu sonrisa con la tranquilidad de estar
              <em> en buenas manos</em>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className={styles.lead}>
              Somos una clínica dental en {clinicInfo.address.city} especializada en
              implantología, ortodoncia invisible y estética dental. Diagnóstico digital,
              presupuesto cerrado y tratamientos sin dolor.
            </p>
          </Reveal>

          <Reveal delay={230}>
            <div className={styles.ctas}>
              <Button
                href="#cita"
                size="lg"
                iconRight={<ArrowRight size={18} strokeWidth={2.2} />}
              >
                Agendar cita
              </Button>
              <Button
                href="#servicios"
                variant="outline"
                size="lg"
                iconLeft={<Sparkles size={18} strokeWidth={2.2} />}
              >
                Ver tratamientos
              </Button>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <ul className={styles.highlights}>
              {heroHighlights.map((highlight) => (
                <li key={highlight} className={styles.highlight}>
                  <span className={styles.check} aria-hidden="true">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={360}>
            <a className={styles.callLink} href={clinicInfo.phone.href}>
              <Phone size={16} strokeWidth={2.2} aria-hidden="true" />
              ¿Prefieres llamar? <strong>{clinicInfo.phone.label}</strong>
            </a>
          </Reveal>
        </div>

        <Reveal delay={220} className={styles.visual}>
          <HeroVisual />
        </Reveal>
      </div>

      {/* ---------------------------- Cifras de confianza --------------------- */}
      <div className={cn('container', styles.statsWrapper)}>
        <Reveal>
          <ul className={styles.stats}>
            {stats.map((stat) => (
              <li key={stat.id} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
