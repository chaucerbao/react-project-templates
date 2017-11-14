// Libraries
import * as React from 'react'
import styled, { css } from 'styled-components'

// Definitions
interface IProps {
  children?: any
  to?: string
  primary?: boolean
  [key: string]: any
}
interface IStyleProps {
  primary?: boolean
}

// Components
import Link from './link'

// Styles
const buttonStyles = css`
  transition: background 0.25s;
  border: 1px solid gainsboro;
  cursor: pointer;
  padding: 4px 8px;
  font: inherit;
  ${(props: IStyleProps) =>
    props.primary
      ? `
        background: steelblue;
        color: white;

        &:hover {
          background: royalblue;
        }
      `
      : `
        background: gainsboro;
        color: dimgray;

        &:hover {
          background: lightgray;
        }
  `};
`
const StyledButton = styled.button`
  ${buttonStyles};
`
const StyledLink = styled(Link)`
  ${buttonStyles};
  text-decoration: none;
`

// Component
const Button = ({ children, to, ...props }: IProps) =>
  to ? (
    <StyledLink {...props} to={to}>
      {children}
    </StyledLink>
  ) : (
    <StyledButton {...props}>{children}</StyledButton>
  )

// Exports
export default Button
