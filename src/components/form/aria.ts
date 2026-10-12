/**
 * Atributos ARIA compartidos por los controles del formulario.
 *
 * Marca el campo como inválido y lo asocia al texto de ayuda o al mensaje de
 * error correspondiente, de modo que los lectores de pantalla lo anuncien.
 */
export function controlAriaProps(id: string, error?: string, hint?: string) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return {
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
  };
}
