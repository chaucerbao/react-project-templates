// Dependencies
import { css } from 'styled-components'

// Type definitions
import { IDictionary, IScale, ITheme } from './theme'
interface IProps {
  theme?: ITheme
}

// Theme selectors
const theme = (key: keyof ITheme) => (target: number | string) => (
  props: IProps,
) => {
  const group = props.theme![key]
  const unit = (group as IScale).unit || ''
  const value =
    (group as IScale).scale && typeof target === 'number'
      ? (group as IScale).scale[target]
      : (group as IDictionary)[target]

  return `${value}${unit}`
}
export const breakpoint = theme('breakpoints')
export const color = theme('colors')
export const spacer = theme('spacers')

// Media queries
export const minWidth = (scale: number) => (props: IProps) =>
  `(min-width: ${breakpoint(scale)(props)})`

// Helper for boolean properties
export const has = (...properties: string[]) => (
  strings: TemplateStringsArray,
  ...values: any[]
) => (props: any) =>
  properties.every((prop) => Boolean(props[prop])) ? css(strings, ...values) : []
