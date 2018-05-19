// tslint:disable object-literal-sort-keys

// Type definitions
export interface ITheme {
  breakpoints: IDictionary
  colors: IDictionary
  fontFamilies: IDictionary
  fontSizes: IDictionary
  spacers: IDictionary
  zIndexes: IDictionary
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

const fontFamilies = {
  heading: 'Georgia, Times, "Times New Roman", serif',
  body: 'Verdana, Geneva, sans-serif',
}

const fontSizes = {
  sm: '12px',
  md: '16px',
  lg: '20px',
  h1: '36px',
  h2: '30px',
  h3: '24px',
}

const spacers = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
}

const zIndexes = {
  header: 100,
}

// Sort a dictionary by values
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
    .reduce((sorted: IDictionary, definition) => {
      sorted[definition[0]] = definition[1]

      return sorted
    }, {})

const theme: ITheme = {
  breakpoints: sort(breakpoints),
  colors,
  fontFamilies,
  fontSizes: sort(fontSizes),
  spacers: sort(spacers),
  zIndexes: sort(zIndexes),
}

// Exports
export default theme
