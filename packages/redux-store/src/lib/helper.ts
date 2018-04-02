export const orderBy = <T>(key: keyof T) => (items: T[]) =>
  items.sort((a, b) => {
    if (a[key] < b[key]) return -1
    if (a[key] > b[key]) return 1

    return 0
  })
