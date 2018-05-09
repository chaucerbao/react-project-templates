// Dependencies
import { css } from 'styled-components'

// Theme selectors
export const color = (key: string) => (props: any) => props.theme.colors[key]
export const spacer = (key: string) => (props: any) => props.theme.spacers[key]

// Helper for boolean properties
export const has = (...properties: string[]) => (
  strings: TemplateStringsArray,
  ...values: any[]
) => (props: any) =>
  properties.every((prop) => Boolean(props[prop])) ? css(strings, ...values) : []
