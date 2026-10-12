/** Une clases condicionalmente: `cn('a', isActive && 'b')` → "a b". */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
