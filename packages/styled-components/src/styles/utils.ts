// Dependencies
import { css } from 'styled-components'

// Type definitions
import { ITheme } from './theme'
interface IProps {
  theme?: ITheme
  [name: string]: any
}

// Theme selectors
const theme = (group: keyof ITheme) => (name: string) => (props: IProps) =>
  props.theme![group][name]
export const breakpoint = theme('breakpoints')
export const color = theme('colors')
export const fontFamily = theme('fontFamilies')
export const fontSize = theme('fontSizes')
export const spacer = theme('spacers')
export const zIndex = theme('zIndexes')

// Media queries
export const minWidth = (name: string) => (props: IProps) =>
  `(min-width: ${breakpoint(name)(props)})`
export const maxWidth = (name: string) => (props: IProps) => {
  const target = breakpoint(name)(props).toString()
  const value = parseFloat(target) - 0.001
  const unit = target.replace(/^[^a-z]+/, '')

  return `(max-width: ${value}${unit})`
}
export const only = (name: string) => (props: IProps) => {
  const keys = Object.keys(props.theme!.breakpoints)
  const i = keys.indexOf(name)
  const nextBreakpoint = keys[i + 1]

  if (i === -1) {
    throw new Error('Invalid breakpoint')
  }

  if (i === 0) {
    return maxWidth(nextBreakpoint)(props)
  }

  if (i === keys.length - 1) {
    return minWidth(name)(props)
  }

  return `${minWidth(name)(props)} and ${maxWidth(nextBreakpoint)(props)}`
}

// Properties
export const has = (...properties: string[]) => (
  strings: TemplateStringsArray,
  ...values: any[]
) => (props: IProps) =>
  properties.every(property => Boolean(props[property]))
    ? css(strings, ...values)
    : []
