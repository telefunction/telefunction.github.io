const formatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' })

/** Formats an ISO date string as "Jul 20, 2026" — pinned to UTC so the output is identical everywhere, unlike the visitor's local relative time. */
export function formatAbsoluteDate(isoDate: string): string {
  return formatter.format(new Date(isoDate))
}
