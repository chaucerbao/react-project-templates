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
  scale: IScaleValue[]
  unit: string
}
type IScaleValue = [string, number]

// Theme
const breakpoints: IScale = {
  scale: [['mobile', 0], ['tablet', 768], ['desktop', 1280]],
  unit: 'px',
}

const colors: IDictionary = {
  primary: '#444',
  grey: '#888',
  white: '#fafafa',
}

const spacers: IScale = {
  scale: [['0', 0], ['xs', 4], ['sm', 8], ['md', 16], ['lg', 24], ['xl', 32]],
  unit: 'px',
}

// Exports
export default {
  breakpoints,
  colors,
  spacers,
}
