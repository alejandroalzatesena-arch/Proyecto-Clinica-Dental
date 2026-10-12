/**
 * Glifo de diente en SVG.
 * Es puramente decorativo (aria-hidden) y hereda el color con `currentColor`,
 * por lo que se puede reutilizar sobre fondos claros u oscuros.
 */
export function ToothGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M32 12.5c-4.6 0-7.1-2-10.6-2C16.4 10.5 13 14.7 13 21.1c0 7.9 3 13.4 5.3 19.9 1.4 4 2 9.5 4.6 9.5 2.4 0 2.9-5.2 4.1-9.1.7-2.4 1.5-3.6 5-3.6s4.3 1.2 5 3.6c1.2 3.9 1.7 9.1 4.1 9.1 2.6 0 3.2-5.5 4.6-9.5C48 34.5 51 29 51 21.1 51 14.7 47.6 10.5 42.6 10.5c-3.5 0-6 2-10.6 2z" />
    </svg>
  );
}
