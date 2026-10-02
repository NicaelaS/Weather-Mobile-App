export function cToF(celsius: number | null | undefined): number | null {
  if (typeof celsius !== 'number' || Number.isNaN(celsius)) return null
  return (celsius * 9) / 5 + 32
}

export function formatTempBoth(celsius: number | null | undefined): string {
  if (celsius == null || Number.isNaN(celsius)) return '--'
  const c = Math.round(celsius)
  const f = Math.round(cToF(celsius) ?? 0)
  return `${c}°C / ${f}°F`
}

export default formatTempBoth
