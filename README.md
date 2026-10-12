# 🦷 Clínica Dental Lumina — Landing page

Sitio web de una clínica dental (una sola página con secciones ancladas), construido con
**React + TypeScript + Vite**, formularios reactivos con **React Hook Form + Zod** y estilos
con **CSS Modules sobre un sistema de design tokens**.

Todo el contenido está en español, el diseño es responsive (móvil, tablet y escritorio) y
no depende de imágenes externas: las ilustraciones (diente del hero, retrato de la doctora
y mapa de la clínica) son **SVG propios** dibujados en el proyecto.

---

## 🚀 Cómo ejecutar el proyecto

Requisitos: **Node.js 20 o superior** (desarrollado y probado con Node 24) y npm.

```bash
cd clinica-dental

# 1. Instalar dependencias
npm install

# 2. Arrancar el servidor de desarrollo
npm run dev
# → http://localhost:5173
```

### Scripts disponibles

| Script            | Qué hace                                                        |
| ----------------- | --------------------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con recarga en caliente (HMR).           |
| `npm run build`   | Comprueba tipos y genera la versión de producción en `dist/`.   |
| `npm run preview` | Sirve localmente la build de producción (para revisarla).       |
| `npm run lint`    | Analiza el código con Oxlint (`oxlint`).                        |

---

## 🧱 Stack y por qué

| Decisión                | Elección                                | Motivo                                                                                                                                                                                        |
| ----------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework               | **React 19 + TypeScript + Vite**        | Componentes reutilizables, tipado estricto en todo el sitio y un servidor de desarrollo instantáneo.                                                                                          |
| Formularios             | **React Hook Form + Zod**               | Zod declara **todas** las reglas y los mensajes de error en un único esquema tipado (`z.infer` genera el tipo del formulario, así nunca se desincronizan). RHF no controla cada campo: sólo se re-renderiza el campo que cambia, lo que mantiene el formulario fluido. `zodResolver` une ambos mundos sin escribir validaciones a mano. |
| Estilos                 | **CSS Modules + variables CSS (tokens)** | Un sitio de clínica necesita gradientes, animaciones propias y jerarquía tipográfica fina. Con tokens centralizados, cambiar el color corporativo o la tipografía es tocar **un solo archivo** (`src/styles/tokens.css`). Y cada componente mantiene su CSS aislado y comentado, sin cadenas de utilidades ilegibles. |
| Iconos                  | **Lucide React**                        | Iconos modernos de trazo fino, coherentes entre sí. Los logos de redes sociales se dibujan a mano porque Lucide ya no incluye iconos de marca.                                                  |
| Tipografías             | **Playfair Display + Inter**            | La serif aporta elegancia y "trayectoria" a los titulares; Inter garantiza máxima legibilidad en textos, formularios y UI. Se cargan desde Google Fonts con *fallback* al sistema.               |

---

## 📁 Estructura del proyecto

```
clinica-dental/
├─ index.html                     # Metadatos SEO, Open Graph y carga de tipografías
├─ public/
│  └─ favicon.svg                 # Favicon (diente) en SVG
└─ src/
   ├─ main.tsx                    # Punto de entrada de React
   ├─ App.tsx                     # Composición de la página y orden de secciones
   ├─ index.css                   # Importa tokens + estilos base
   │
   ├─ styles/
   │  ├─ tokens.css               # 🎨 Design tokens: color, tipografía, espaciado, sombras, movimiento
   │  └─ base.css                 # Reset, tipografía base, utilidades y @keyframes globales
   │
   ├─ types/
   │  ├─ site.ts                  # Tipos del dominio (Service, Testimonial, ClinicInfo…)
   │  └─ css.ts                   # CSSVariables: permite usar variables CSS en `style` con tipado
   │
   ├─ data/
   │  └─ site.ts                  # ✍️ TODO el contenido editable del sitio (textos, servicios, testimonios, horarios)
   │
   ├─ schemas/
   │  └─ appointmentSchema.ts     # ✅ Esquema Zod del formulario + valores iniciales
   │
   ├─ utils/
   │  ├─ cn.ts                    # Une clases condicionalmente
   │  └─ date.ts                  # Fechas ISO: hoy, límite de reserva, formato en español
   │
   ├─ hooks/
   │  ├─ useScrollSpy.ts          # Sección activa en el menú según el scroll
   │  └─ useLockBodyScroll.ts     # Bloquea el scroll con el menú móvil abierto
   │
   └─ components/
      ├─ ui/                      # Reutilizables y agnósticos del contenido
      │  ├─ Button.tsx            # Botón polimórfico (renderiza <a> si recibe href)
      │  ├─ Logo.tsx              # Marca de la clínica (claro/oscuro)
      │  ├─ Reveal.tsx            # Animación de aparición al entrar en viewport
      │  └─ SectionHeading.tsx    # Encabezado de sección (eyebrow + título + entradilla)
      │
      ├─ form/                    # Primitivas del formulario
      │  ├─ Field.tsx             # Etiqueta + ayuda + error, accesible
      │  ├─ aria.ts               # Atributos ARIA compartidos por los controles
      │  ├─ InputField.tsx        # Campo de texto / fecha / teléfono / email
      │  ├─ SelectField.tsx       # Desplegable con chevron propio
      │  ├─ TextareaField.tsx     # Área de texto con contador de caracteres
      │  └─ CheckboxField.tsx     # Casilla de consentimiento (RGPD)
      │
      ├─ illustrations/           # Todo SVG, sin imágenes externas
      │  ├─ HeroVisual.tsx        # Diente flotando + tarjetas de confianza
      │  ├─ DoctorPortrait.tsx    # Retrato ilustrado de la doctora
      │  ├─ ClinicMap.tsx         # Mapa estilizado + enlace a Google Maps
      │  └─ ToothGlyph.tsx        # Glifo del diente (logo)
      │
      ├─ icons/
      │  └─ SocialIcons.tsx       # Instagram, Facebook, LinkedIn y WhatsApp
      │
      ├─ layout/
      │  ├─ Header.tsx            # Barra informativa + header sticky + menú móvil
      │  ├─ Footer.tsx            # Contacto, horarios, mapa, redes y línea legal
      │  └─ FloatingWhatsapp.tsx  # Botón flotante de WhatsApp
      │
      └─ sections/                # Secciones de la página, en orden
         ├─ Hero.tsx              # 1. Portada: promesa + CTA + cifras
         ├─ Services.tsx          # 2. Tratamientos
         ├─ About.tsx             # 3. La clínica y la doctora
         ├─ Testimonials.tsx      # 4. Opiniones de pacientes
         ├─ Benefits.tsx          # 5. Por qué elegirnos
         └─ Appointment.tsx       # 6. Formulario de cita + contacto
```

---

## 📋 Secciones incluidas

1. **Header sticky** con logo, menú de navegación (resalta la sección activa), teléfono de
   contacto y botón **“Agendar cita”**. En móvil se convierte en un panel lateral con cierre
   por `Escape`, clic en el fondo o en un enlace.
2. **Hero** con ilustración dental (SVG animado con sutileza), titular, subtítulo, doble CTA
   y una banda de **cifras de confianza** (+15 años, +12.000 pacientes, 4,9 de valoración…).
3. **Servicios**: 6 tarjetas (implantes, ortodoncia invisible, estética y carillas,
   blanqueamiento, limpieza y prevención, odontología general y niños) con icono, bullets y
   enlace de contacto, más una banda de cierre con CTA.
4. **Sobre la clínica / la doctora** con retrato ilustrado, biografía, cita destacada,
   credenciales y firma profesional (n.º de colegiada incluido).
5. **Testimonios** sobre fondo oscuro: 6 opiniones con valoración, avatar por iniciales y
   nota media agregada.
6. **Por qué elegirnos**: 6 motivos diferenciales con iconos (tecnología 3D, trato cercano,
   seguridad certificada, financiación, horarios, equipo especialista).
7. **Formulario de cita** (ver más abajo) acompañado de tarjetas de contacto directo,
   horario de atención y lo que incluye la primera visita.
8. **Footer** completo: banda de urgencias, navegación, tratamientos, datos de contacto,
   mapas, horarios, redes sociales y línea legal con número de registro sanitario.

---

## ✅ Formulario reactivo

**Campos:** nombre completo, teléfono, email, servicio de interés (`select`), fecha preferida,
mensaje (opcional) y consentimiento RGPD.

**Validaciones (todas en `src/schemas/appointmentSchema.ts`):**

| Campo             | Reglas                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------- |
| Nombre completo   | Obligatorio · mínimo 3 caracteres · máximo 80 · sólo letras (con acentos), espacios y guiones |
| Teléfono          | Obligatorio · 9-12 dígitos · admite prefijo internacional (`+34`) y separadores (espacios, puntos, guiones) |
| Email             | Obligatorio · formato válido · máximo 120 caracteres                                          |
| Servicio          | Obligatorio (debe elegirse una opción del desplegable)                                        |
| Fecha preferida   | Obligatoria · fecha real · **no puede ser anterior a hoy** · `min`/`max` también en el input |
| Mensaje           | Opcional · máximo 600 caracteres (con contador en vivo)                                        |
| Consentimiento    | Obligatorio para poder enviar                                                                 |

**Experiencia de uso**

- Validación en modo `onTouched`: el error aparece al salir del campo y se recalcula al escribir.
- Mensajes de error **claros y en español**, asociados al campo con `aria-describedby` y `aria-invalid`.
- Resumen accesible en la cabecera del formulario cuando hay errores (`role="alert"`).
- Botón con estado *“Enviando solicitud…”* y spinner mientras se procesa.
- **Estado de éxito**: tarjeta de confirmación con el nombre, la fecha formateada en español y el
  servicio elegido, más accesos directos a WhatsApp y a enviar otra solicitud.
- El envío está **simulado** (900 ms). Para conectarlo a un backend real, sustituye el bloque
  marcado en `src/components/sections/Appointment.tsx`:

```ts
const onSubmit = async (values: AppointmentFormValues) => {
  setStatus('sending');
  await fetch('/api/citas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
  setSubmitted(values);
  setStatus('success');
  reset();
};
```

---

## 🎨 Sistema de diseño

Todo se controla desde `src/styles/tokens.css`:

- **Color**: escala de marca cian-turquesa (`--clr-brand-50 … --clr-brand-900`), acento menta
  (`--clr-mint-*`), neutros fríos, estados semánticos (error/éxito) y degradados reutilizables.
- **Tipografía**: `--font-display` (Playfair Display) y `--font-sans` (Inter) con una escala
  fluida basada en `clamp()` (de `--fs-xs` a `--fs-5xl`): el texto se adapta sin media queries.
- **Espaciado y layout**: escala de 4 px (`--space-*`), aire vertical de sección (`--section-y`),
  ancho de contenedor y altura del header.
- **Sombras, radios y capas** (`--shadow-*`, `--radius-*`, `--z-*`) y **movimiento**
  (`--ease-out-soft`, `--dur-*`).

> Cambiar el azul corporativo = editar `--clr-brand-600`. Cambiar la tipografía = editar
> `--font-display`. Nada más.

### Personalizar el contenido

Todo el texto vive en **`src/data/site.ts`** (nombre de la clínica, teléfono, WhatsApp, email,
dirección, horarios, redes, servicios, testimonios, beneficios y cifras). Los componentes sólo
lo presentan: añadir un servicio nuevo a `services` crea automáticamente su tarjeta **y** su
opción en el desplegable del formulario.

---

## ♿ Accesibilidad y rendimiento

- HTML semántico: `header`, `main`, `section`, `footer`, `nav`, `figure/figcaption`, `address`,
  `blockquote`, `dl/dt/dd`.
- Enlace **“Saltar al contenido principal”**, estilos de `:focus-visible` visibles y navegación
  completa por teclado (el menú móvil usa `inert` cuando está cerrado y se cierra con `Escape`).
- Formularios con `label` asociado, `aria-invalid`, `aria-describedby` y anuncios de error/éxito
  (`role="alert"` / `role="status"`).
- Contraste verificado sobre fondos claros y oscuros; los textos decorativos van con `aria-hidden`.
- Se respeta `prefers-reduced-motion`: todas las animaciones se desactivan si el sistema lo pide.
- Animaciones con `opacity`/`transform` (baratas para la GPU) y `IntersectionObserver` con
  `unobserve` tras la primera aparición.
- Ilustraciones en SVG (nítidas en cualquier pantalla y sin peticiones de red extra).

## 📱 Responsive

Diseño *mobile first* con puntos de ruptura en **640 px**, **768 px**, **900 px**, **1024 px** y
**1200 px**: 1 columna en móvil, 2 en tablet y 3-4 en escritorio, tipografía fluida y menú
lateral en pantallas pequeñas. El header mantiene su versión completa desde 1024 px.

---

## 📝 Notas

- El contenido (nombre, doctora, testimonios, importes, registro sanitario) es **de ejemplo**:
  sustitúyelo por los datos reales de la clínica antes de publicar.
- Los enlaces legales (`#aviso-legal`, `#privacidad`, `#cookies`) son marcadores: apúntalos a
  las páginas reales cuando existan.
- Las tipografías se cargan desde Google Fonts; si el usuario está sin conexión se usa el
  *fallback* tipográfico del sistema y el diseño sigue siendo correcto.
