const UNITS: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
  { unit: 'year', seconds: 31536000 },
  { unit: 'month', seconds: 2592000 },
  { unit: 'week', seconds: 604800 },
  { unit: 'day', seconds: 86400 },
  { unit: 'hour', seconds: 3600 },
  { unit: 'minute', seconds: 60 },
]

const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

/** Formats an ISO date string as "3 hours ago", "2 days ago", etc. */
export function relativeTime(isoDate: string): string {
  const elapsedSeconds = (Date.now() - new Date(isoDate).getTime()) / 1000
  for (const { unit, seconds } of UNITS) {
    if (elapsedSeconds >= seconds) {
      return formatter.format(-Math.round(elapsedSeconds / seconds), unit)
    }
  }
  return formatter.format(0, 'minute')
}
