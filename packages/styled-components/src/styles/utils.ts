// Dependencies
import { css } from 'styled-components'

// Type definitions
import { IDictionary, IScale, ITheme } from './theme'
interface IProps {
  theme?: ITheme
}

// Theme selectors
const theme = (key: keyof ITheme) => (target: string) => (props: IProps) => {
  const group = props.theme![key]
  const unit = (group as IScale).unit || ''
  const scaleTuple =
    (group as IScale).scale &&
    (group as IScale).scale.find((tuple) => tuple[0] === target)
  const value = scaleTuple ? scaleTuple[1] : (group as IDictionary)[target]

  return `${value}${unit}`
}
export const breakpoint = theme('breakpoints')
export const color = theme('colors')
export const spacer = theme('spacers')

// Media queries
export const minWidth = (target: string) => (props: IProps) =>
  `(min-width: ${breakpoint(target)(props)})`

// Helper for boolean properties
export const has = (...properties: string[]) => (
  strings: TemplateStringsArray,
  ...values: any[]
) => (props: any) =>
  properties.every((prop) => Boolean(props[prop])) ? css(strings, ...values) : []
