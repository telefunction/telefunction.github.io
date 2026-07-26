/** Appends GitHub's avatar-resizing query param, so the CDN serves a file sized for actual display instead of the ~460px original. */
export function getSizedAvatarUrl(avatarUrl: string, size: number): string {
  const url = new URL(avatarUrl)
  url.searchParams.set('s', String(size))
  return url.toString()
}
