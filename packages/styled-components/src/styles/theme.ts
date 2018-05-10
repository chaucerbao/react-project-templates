// tslint:disable object-literal-sort-keys

// Type definitions
export interface ITheme {
  breakpoints: IScale
  colors: IDictionary
  spacers: IScale
}
export interface IDictionary {
  [key: string]: string
}
export interface IScale {
  scale: number[]
  unit: string
}

// Theme
const breakpoints: IScale = {
  scale: [0, 768, 1280],
  unit: 'px',
}

const colors: IDictionary = {
  primary: '#444',
  grey: '#888',
  white: '#fafafa',
}

const spacers: IScale = {
  scale: [0, 4, 8, 16, 24, 32],
  unit: 'px',
}

// Exports
export default {
  breakpoints,
  colors,
  spacers,
}
