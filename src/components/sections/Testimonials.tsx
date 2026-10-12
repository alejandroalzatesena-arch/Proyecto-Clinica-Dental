import { Quote, Star } from 'lucide-react';

import { testimonials } from '../../data/site';
import { cn } from '../../utils/cn';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import styles from './Testimonials.module.css';

/** Estrellas de puntuación (siempre 5 en la media de la clínica). */
function Stars({ rating }: { rating: number }) {
  return (
    <span className={styles.stars} aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={15}
          strokeWidth={1.6}
          fill={index < rating ? 'currentColor' : 'none'}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

/**
 * Testimonios sobre fondo oscuro: rompe el ritmo de secciones claras y da
 * más peso emocional a las opiniones de los pacientes.
 */
export function Testimonials() {
  return (
    <section id="testimonios" className={styles.section}>
      {/* Textura decorativa sutil */}
      <div className={styles.pattern} aria-hidden="true" />

      <div className="container">
        <div className={styles.headline}>
          <SectionHeading
            invert
            eyebrow="Opiniones reales"
            title={
              <>
                Pacientes que ya <em>sonríen tranquilos</em>
              </>
            }
            description="Más de 1.240 valoraciones verificadas con una media de 4,9 sobre 5. Estas son algunas de las historias que nos animan a seguir cuidando sonrisas cada día."
          />

          <div className={styles.score}>
            <span className={styles.scoreValue}>4,9</span>
            <div className={styles.scoreMeta}>
              <Stars rating={5} />
              <span>1.240 reseñas verificadas</span>
            </div>
          </div>
        </div>

        <ul className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <Reveal
              as="li"
              key={testimonial.id}
              delay={index * 60}
              className={styles.item}
            >
              <figure className={styles.card}>
                <Quote className={styles.quoteIcon} size={26} strokeWidth={1.6} aria-hidden="true" />
                <Stars rating={testimonial.rating} />
                <blockquote className={styles.quote}>{testimonial.quote}</blockquote>

                <figcaption className={styles.author}>
                  <span className={styles.avatar} aria-hidden="true">
                    {testimonial.initials}
                  </span>
                  <span className={styles.authorText}>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.treatment}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
