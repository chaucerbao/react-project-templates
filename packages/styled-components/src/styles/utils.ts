// Dependencies
import { css } from 'styled-components'

// Type definitions
import { ITheme } from './theme'
interface IProps {
  theme?: ITheme
}

// Theme selectors
const theme = (key: keyof ITheme) => (target: string) => (props: IProps) =>
  props.theme![key][target]
export const breakpoint = theme('breakpoints')
export const color = theme('colors')
export const spacer = theme('spacers')

// Media queries
export const minWidth = (target: string) => (props: IProps) =>
  `(min-width: ${breakpoint(target)(props)})`
export const maxWidth = (target: string) => (props: IProps) =>
  `(max-width: ${breakpoint(target)(props)})`
export const only = (target: string) => (props: IProps) => {
  const breakpoints = props.theme!.breakpoints
  const keys = Object.keys(breakpoints)
  const i = keys.indexOf(target)

  if (i === -1) {
    throw new Error('Invalid breakpoint')
  }

  const targetBreakpoint = breakpoint(target)(props)

  if (i === keys.length) {
    return `(min-width: ${targetBreakpoint})`
  }

  const nextBreakpoint = breakpoint(keys[i + 1])(props).toString()
  const limit = parseFloat(nextBreakpoint) - 0.01
  const unit = nextBreakpoint.replace(/^[\d\.]+/, '')
  const upperLimit = `${limit}${unit}`

  if (i === 0) {
    return `(max-width: ${upperLimit})`
  }

  return `(min-width: ${targetBreakpoint}) and (max-width: ${upperLimit})`
}

// Helper for boolean properties
export const has = (...properties: string[]) => (
  strings: TemplateStringsArray,
  ...values: any[]
) => (props: any) =>
  properties.every((prop) => Boolean(props[prop])) ? css(strings, ...values) : []
