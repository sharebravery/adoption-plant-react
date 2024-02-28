type KeySelector<T> = (item: T) => string

export function groupBy<T>(arr: T[], keySelector: KeySelector<T>): Record<string, T[]> {
  return arr.reduce((acc: Record<string, T[]>, current: T) => {
    const key = keySelector(current)
    if (!acc[key])
      acc[key] = []

    acc[key].push(current)
    return acc
  }, {})
}
