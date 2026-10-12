import { ArrowUpRight, MapPin, Navigation } from 'lucide-react';

import { clinicInfo } from '../../data/site';
import styles from './ClinicMap.module.css';

/**
 * Mapa estilizado de la clínica (SVG, sin depender de servicios externos).
 * Incluye un enlace real a Google Maps para que el paciente pueda navegar.
 */
export function ClinicMap() {
  const { street, city, postalCode, mapsUrl } = clinicInfo.address;

  return (
    <div className={styles.wrapper}>
      <svg className={styles.canvas} viewBox="0 0 640 340" role="img" aria-label={`Mapa de situación de ${clinicInfo.name}`}>
        <defs>
          <linearGradient id="map-water" x1="0" y1="240" x2="640" y2="340">
            <stop offset="0" stopColor="#d5ebf2" />
            <stop offset="1" stopColor="#c7e6ef" />
          </linearGradient>
        </defs>

        {/* Base urbana */}
        <rect width="640" height="340" fill="#eaf1f2" />

        {/* Zonas verdes */}
        <rect x="36" y="30" width="176" height="112" rx="14" fill="#dff6ef" />
        <rect x="470" y="212" width="140" height="104" rx="14" fill="#dff6ef" />
        <g fill="#b7e5d6">
          <circle cx="76" cy="72" r="13" />
          <circle cx="122" cy="98" r="17" />
          <circle cx="172" cy="64" r="11" />
          <circle cx="520" cy="256" r="14" />
          <circle cx="566" cy="288" r="11" />
        </g>

        {/* Manzanas de edificios */}
        <g fill="#dde7e9">
          <rect x="240" y="40" width="110" height="70" rx="8" />
          <rect x="392" y="30" width="130" height="80" rx="8" />
          <rect x="120" y="196" width="120" height="86" rx="8" />
          <rect x="300" y="212" width="110" height="70" rx="8" />
        </g>

        {/* Agua / canal */}
        <path d="M0 332c96-6 168-30 246-52 78-22 150-40 230-34 56 4 108 18 164 26v68H0z" fill="url(#map-water)" />

        {/* Trama viaria: las calles son los trazos blancos */}
        <g stroke="#ffffff" strokeLinecap="square" fill="none">
          <path d="M0 168h640" strokeWidth="16" />
          <path d="M0 306h640" strokeWidth="12" />
          <path d="M222 0v340" strokeWidth="16" />
          <path d="M416 0v340" strokeWidth="14" />
          <path d="M600 0v340" strokeWidth="10" />
          <path d="M0 296 640 128" strokeWidth="10" />
        </g>

        {/* Marcador de la clínica */}
        <g>
          <circle
            className={styles.pulse}
            cx="222"
            cy="168"
            r="26"
            fill="none"
            stroke="#45b7c4"
            strokeWidth="2.5"
          />
          <path d="M222 214l-11-18h22z" fill="#0e7c8c" />
          <circle cx="222" cy="168" r="25" fill="#0e7c8c" stroke="#ffffff" strokeWidth="5" />
          <g transform="translate(208 154) scale(0.44)">
            <path
              d="M32 6.5c-4.6 0-7.1-2-10.6-2C16.4 4.5 13 8.7 13 15.1c0 7.9 3 13.4 5.3 19.9 1.4 4 2 9.5 4.6 9.5 2.4 0 2.9-5.2 4.1-9.1.7-2.4 1.5-3.6 5-3.6s4.3 1.2 5 3.6c1.2 3.9 1.7 9.1 4.1 9.1 2.6 0 3.2-5.5 4.6-9.5C48 28.5 51 23 51 15.1 51 8.7 47.6 4.5 42.6 4.5c-3.5 0-6 2-10.6 2z"
              fill="#ffffff"
            />
          </g>
        </g>
      </svg>

      {/* Tarjeta con la dirección + enlace a Google Maps */}
      <div className={styles.card}>
        <span className={styles.icon}>
          <MapPin size={20} strokeWidth={2} />
        </span>
        <address className={styles.address}>
          <strong>{clinicInfo.name}</strong>
          <span>
            {street} · {postalCode} {city}
          </span>
        </address>
        <a className={styles.link} href={mapsUrl} target="_blank" rel="noreferrer">
          <Navigation size={15} strokeWidth={2.2} />
          Cómo llegar
          <ArrowUpRight size={15} strokeWidth={2.2} />
        </a>
      </div>
    </div>
  );
}
