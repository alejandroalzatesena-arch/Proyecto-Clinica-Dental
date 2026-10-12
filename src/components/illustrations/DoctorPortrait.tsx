import styles from './DoctorPortrait.module.css';

/**
 * Retrato ilustrado de la doctora, en SVG plano (sin fotos externas).
 * Se mantiene decorativo: el nombre y la trayectoria se leen en el texto
 * adyacente, por lo que el SVG lleva `aria-hidden`.
 */
export function DoctorPortrait() {
  return (
    <div className={styles.frame} aria-hidden="true">
      <svg className={styles.art} viewBox="0 0 460 540" role="presentation">
        <defs>
          <linearGradient id="dp-bg" x1="20" y1="0" x2="440" y2="540">
            <stop offset="0" stopColor="#e1f4f6" />
            <stop offset="0.55" stopColor="#f1fafb" />
            <stop offset="1" stopColor="#ffffff" />
          </linearGradient>
          <linearGradient id="dp-coat" x1="70" y1="360" x2="380" y2="540">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#f2f8f9" />
          </linearGradient>
          <radialGradient id="dp-glow" cx="50%" cy="30%" r="60%">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Fondo del retrato */}
        <rect width="460" height="540" rx="34" fill="url(#dp-bg)" />
        <circle cx="352" cy="96" r="86" fill="#dff6ef" opacity="0.75" />
        <circle cx="86" cy="180" r="54" fill="#bee7eb" opacity="0.55" />
        <rect width="460" height="540" rx="34" fill="url(#dp-glow)" />

        {/* Retícula decorativa */}
        <g stroke="#0e7c8c" strokeOpacity="0.14" strokeWidth="1.5">
          <path d="M40 40h26M40 40v26M420 500h-26M420 500v-26" strokeLinecap="round" />
        </g>

        {/* ------------------------------- Figura ------------------------------ */}
        {/* Cabello (parte trasera) */}
        <ellipse cx="230" cy="252" rx="99" ry="107" fill="#2f3b45" />
        {/* Moño alto */}
        <circle cx="230" cy="128" r="31" fill="#2f3b45" />
        <circle cx="230" cy="128" r="31" fill="#3a4853" opacity="0.35" />
        {/* Orejas */}
        <ellipse cx="134" cy="274" rx="13" ry="19" fill="#e8b795" />
        <ellipse cx="326" cy="274" rx="13" ry="19" fill="#e8b795" />
        {/* Rostro */}
        <ellipse cx="230" cy="268" rx="79" ry="93" fill="#f4cdad" />
        {/* Sombra de la mandíbula */}
        <path
          d="M160 300c14 34 42 54 70 54s56-20 70-54c-20 26-44 38-70 38s-50-12-70-38z"
          fill="#eab992"
          opacity="0.55"
        />
        {/* Cejas */}
        <path
          d="M186 240c6-5 18-5 24 0M250 240c6-5 18-5 24 0"
          stroke="#3a4853"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Ojos */}
        <ellipse cx="198" cy="264" rx="7.5" ry="8.5" fill="#2f3b45" />
        <ellipse cx="262" cy="264" rx="7.5" ry="8.5" fill="#2f3b45" />
        <circle cx="200.5" cy="261" r="2.4" fill="#ffffff" />
        <circle cx="264.5" cy="261" r="2.4" fill="#ffffff" />
        {/* Sonrisa amable */}
        <path
          d="M206 302c10 13 38 13 48 0"
          stroke="#c2705a"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Rubor */}
        <ellipse cx="176" cy="288" rx="15" ry="9" fill="#e58b78" opacity="0.28" />
        <ellipse cx="284" cy="288" rx="15" ry="9" fill="#e58b78" opacity="0.28" />
        {/* Cuello */}
        <rect x="198" y="338" width="64" height="62" rx="26" fill="#e8b795" />
        <ellipse cx="230" cy="350" rx="34" ry="13" fill="#dda583" opacity="0.8" />

        {/* ------------------------------- Bata -------------------------------- */}
        <path
          d="M64 540c0-88 48-146 122-168l44-14 44 14c74 22 122 80 122 168z"
          fill="url(#dp-coat)"
          stroke="#dcebee"
          strokeWidth="2"
        />
        {/* Camiseta interior (color menta) */}
        <path d="M198 364l32 46 32-46c-12-7-52-7-64 0z" fill="#26b698" />
        {/* Solapas de la bata */}
        <path
          d="M198 364l32 46-26 44-42-88z"
          fill="#ffffff"
          stroke="#dcebee"
          strokeWidth="2"
        />
        <path
          d="M262 364l-32 46 26 44 42-88z"
          fill="#ffffff"
          stroke="#dcebee"
          strokeWidth="2"
        />
        {/* Estetoscopio */}
        <path
          d="M168 384c0 64 24 96 62 96s62-32 62-96"
          fill="none"
          stroke="#cfe1e4"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <circle cx="230" cy="470" r="13" fill="#45b7c4" stroke="#0e7c8c" strokeWidth="3" />

        {/* Identificador profesional con el logotipo del diente */}
        <rect
          x="268"
          y="418"
          width="64"
          height="40"
          rx="9"
          fill="#f1fafb"
          stroke="#bee7eb"
          strokeWidth="2"
        />
        <g transform="translate(276 426) scale(0.42)">
          <path
            d="M32 6.5c-4.6 0-7.1-2-10.6-2C16.4 4.5 13 8.7 13 15.1c0 7.9 3 13.4 5.3 19.9 1.4 4 2 9.5 4.6 9.5 2.4 0 2.9-5.2 4.1-9.1.7-2.4 1.5-3.6 5-3.6s4.3 1.2 5 3.6c1.2 3.9 1.7 9.1 4.1 9.1 2.6 0 3.2-5.5 4.6-9.5C48 28.5 51 23 51 15.1 51 8.7 47.6 4.5 42.6 4.5c-3.5 0-6 2-10.6 2z"
            fill="#0e7c8c"
          />
        </g>
        <g stroke="#8ad4dc" strokeWidth="3" strokeLinecap="round">
          <path d="M296 440h24M296 448h16" />
        </g>
      </svg>
    </div>
  );
}
