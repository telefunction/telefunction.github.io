/** Formats a count as "1.2k" above 1000, otherwise the plain number. */
export function formatCount(value: number): string {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(value)
}
