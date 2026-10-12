import { FloatingWhatsapp } from './components/layout/FloatingWhatsapp';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { About } from './components/sections/About';
import { Appointment } from './components/sections/Appointment';
import { Benefits } from './components/sections/Benefits';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { Testimonials } from './components/sections/Testimonials';

/**
 * Página de la Clínica Dental Lumina.
 *
 * El orden de las secciones sigue un recorrido de venta natural:
 * promesa (Hero) → qué ofrecemos (Servicios) → quién lo hace (La clínica)
 * → prueba social (Testimonios) → motivos para elegirnos (Confianza)
 * → conversión (Formulario) → cierre (Footer).
 */
export default function App() {
  return (
    <>
      {/* Atajo de teclado para saltar directamente al contenido */}
      <a className="skipLink" href="#contenido">
        Saltar al contenido principal
      </a>

      <Header />

      <main id="contenido">
        <Hero />
        <Services />
        <About />
        <Testimonials />
        <Benefits />
        <Appointment />
      </main>

      <Footer />
      <FloatingWhatsapp />
    </>
  );
}
