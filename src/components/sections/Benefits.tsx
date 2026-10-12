import { benefits } from '../../data/site';
import { cn } from '../../utils/cn';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import styles from './Benefits.module.css';

/**
 * "Por qué elegirnos": motivos diferenciales con iconos.
 * Se presenta como lista numerada visualmente para facilitar el escaneo.
 */
export function Benefits() {
  return (
    <section id="confianza" className={cn('section', styles.section)}>
      <div className="container">
        <SectionHeading
          align="center"
          eyebrow="Por qué elegirnos"
          title={
            <>
              Seis motivos para <em>confiar tu sonrisa</em> a Lumina
            </>
          }
          description="No sólo tratamos dientes: cuidamos la experiencia completa, desde la primera llamada hasta la revisión de mantenimiento."
        />

        <ul className={styles.grid}>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <Reveal as="li" key={benefit.id} delay={index * 60} className={styles.item}>
                <article className={styles.card}>
                  <span className={styles.icon} aria-hidden="true">
                    <Icon size={22} strokeWidth={1.9} />
                  </span>
                  <div className={styles.text}>
                    <h3 className={styles.title}>{benefit.title}</h3>
                    <p className={styles.description}>{benefit.description}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
