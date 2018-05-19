// Vendor Dependencies
import { css } from 'styled-components'

// Local Dependencies
import theme from './theme'

// Theme settings
const { breakpoints, spacers } = theme
import { minWidth } from '../styles/utils'

// Mixins
export const aspectRatio = (ratio: number) => css`
  &::before {
    content: '';
    display: block;
    padding-top: ${ratio * 100}%;
  }
`

export const contained = () => css`
  position: relative;
  overflow: hidden;
`

export const flex = (
  justify?: string,
  align?: string,
  direction?: string,
  wrap?: string,
) => css`
  display: flex;
  ${justify ? `justify-content: ${justify}` : ''};
  ${align ? `align-items: ${align}` : ''};
  ${direction || wrap
    ? `flex-flow: ${direction ? direction : ''} ${wrap ? wrap : ''}`
    : ''};
`

export const flexColumns = (
  columns: number,
  gutter: string = spacers.md.toString(),
) => css`
  > * {
    width: calc((100% - (${columns} - 1) * ${gutter}) / ${columns});

    &:not(:nth-child(${columns}n)) {
      margin-right: ${gutter};
    }

    &:nth-child(n + ${columns + 1}) {
      margin-top: ${gutter};
    }
  }
`

export const position = (
  type: string,
  top?: string | 0,
  right?: string | 0,
  bottom?: string | 0,
  left?: string | 0,
  zIndex?: number,
) => css`
  position: ${type};
  ${top ? `top: ${top}` : ''};
  ${right ? `right: ${right}` : ''};
  ${bottom ? `bottom: ${bottom}` : ''};
  ${left ? `left: ${left}` : ''};
  ${zIndex ? `zIndex: ${zIndex}` : ''};
`

export const siteWidth = () => css`
  margin-left: auto;
  margin-right: auto;
  max-width: calc(100% - 2 * ${spacers.sm});

  @media ${minWidth('tablet')({ theme })} {
    max-width: calc(100% - 2 * ${spacers.lg});
  }

  @media ${minWidth('desktop')({ theme })} {
    max-width: calc(${breakpoints.desktop} - 2 * ${spacers.lg});
  }
`
