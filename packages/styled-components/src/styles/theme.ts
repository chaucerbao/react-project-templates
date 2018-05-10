// tslint:disable object-literal-sort-keys

// Type definitions
export interface ITheme {
  breakpoints: IDictionary
  colors: IDictionary
  spacers: IDictionary
}
interface IDictionary {
  [key: string]: number | string
}

// Theme
const breakpoints = {
  mobile: '0',
  tablet: '768px',
  desktop: '1280px',
}

const colors = {
  primary: '#444',
  grey: '#888',
  white: '#fafafa',
}

const spacers = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
}

const sort = (dictionary: IDictionary) =>
  Object.entries(dictionary)
    .sort((a, b) => {
      const aValue = parseFloat(a[1].toString())
      const bValue = parseFloat(b[1].toString())

      if (aValue < bValue) {
        return -1
      }
      if (aValue > bValue) {
        return 1
      }

      return 0
    })
    .reduce((sortedDictionary: IDictionary, definition) => {
      sortedDictionary[definition[0]] = definition[1]

      return sortedDictionary
    }, {})

const theme: ITheme = {
  breakpoints: sort(breakpoints),
  colors,
  spacers: sort(spacers),
}

// Exports
export default theme
