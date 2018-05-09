// Dependencies
import { css } from 'styled-components'

// Theme getters
export const color = (key: string) => (props: any) => props.theme.colors[key]
export const spacer = (key: string) => (props: any) => props.theme.spacer[key]

// Helper for boolean properties
export const is = (key: string) => (strings: any, ...keys: any[]) => (
  props: any,
) => (Boolean(props[key]) ? css(strings, ...keys) : null)
