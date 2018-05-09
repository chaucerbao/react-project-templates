// Dependencies
import { css } from 'styled-components'

// Theme selectors
export const color = (key: string) => (props: any) => props.theme.colors[key]
export const spacer = (key: string) => (props: any) => props.theme.spacers[key]

// Helper for boolean properties
export const is = (key: string) => (
  strings: TemplateStringsArray,
  ...keys: any[]
) => (props: any) => (Boolean(props[key]) ? css(strings, ...keys) : null)
