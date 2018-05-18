// Dependencies
import { css } from 'styled-components'

// Type definitions
import { ITheme } from './theme'
interface IProps {
  theme?: ITheme
  [key: string]: any
}

// Theme selectors
const theme = (key: keyof ITheme) => (target: string) => (props: IProps) =>
  props.theme![key][target]
export const breakpoint = theme('breakpoints')
export const color = theme('colors')
export const fontFamily = theme('fontFamilies')
export const fontSize = theme('fontSizes')
export const spacer = theme('spacers')

// Media queries
export const minWidth = (target: string) => (props: IProps) =>
  `(min-width: ${breakpoint(target)(props)})`
export const maxWidth = (target: string) => (props: IProps) => {
  const targetBreakpoint = breakpoint(target)(props).toString()
  const value = parseFloat(targetBreakpoint) - 0.001
  const unit = targetBreakpoint.replace(/^[^a-z]+/, '')

  return `(max-width: ${value}${unit})`
}
export const only = (target: string) => (props: IProps) => {
  const keys = Object.keys(props.theme!.breakpoints)
  const i = keys.indexOf(target)
  const nextTarget = keys[i + 1]

  if (i === -1) {
    throw new Error('Invalid breakpoint')
  }

  if (i === 0) {
    return maxWidth(nextTarget)(props)
  }

  if (i === keys.length - 1) {
    return minWidth(target)(props)
  }

  return `${minWidth(target)(props)} and ${maxWidth(nextTarget)(props)}`
}

// Helper for boolean properties
export const has = (...properties: string[]) => (
  strings: TemplateStringsArray,
  ...values: any[]
) => (props: IProps) =>
  properties.every((prop) => Boolean(props[prop])) ? css(strings, ...values) : []
