// Dependencies
import { css } from 'styled-components'

// Theme selectors
const theme = (group: string) => (key: string) => (props: { theme: any }) =>
  props.theme[group][key]
export const breakpoint = theme('breakpoints')
export const color = theme('colors')
export const spacer = theme('spacers')

// Helper for boolean properties
export const has = (...properties: string[]) => (
  strings: TemplateStringsArray,
  ...values: any[]
) => (props: any) =>
  properties.every((prop) => Boolean(props[prop])) ? css(strings, ...values) : []
