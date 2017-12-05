// Third-party dependencies
import { darken, lighten } from 'polished'
import * as React from 'react'
import styled from 'styled-components'

// Components
import { Link } from './link'

// Type definitions
interface IProps extends React.HTMLProps<HTMLButtonElement> {
  children: any
  disabled?: boolean
  primary?: boolean
}

// Component
const Button = ({ children, ...props }: IProps) => {
  const filteredProps = {
    ...props,
    primary: undefined
  }

  return <button {...filteredProps}>{children}</button>
}

// Styles
const buttonTheme = (
  { foreground, background }: { foreground: string; background: string },
  disabled = false
) => `
  border: 1px solid ${background};
  background: ${background};
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
  color: ${foreground};

  &:hover {
    border-color: ${disabled ? background : lighten(0.05, background)};
    background: ${disabled ? background : lighten(0.05, background)};
  }
  &:focus {
    border-color: ${disabled ? background : darken(0.25, background)};
  }
  &:active {
    background: ${disabled ? background : darken(0.05, background)};
  }
`
const StyledButton = styled(Button)`
  transition: background 0.2s;
  margin: 0;
  outline: none;
  border-radius: 0;
  padding: 4px 8px;
  font: inherit;
  ${({ disabled, primary, theme }) => {
    if (primary) {
      return `${buttonTheme(
        {
          background: disabled ? lighten(0.2, theme.blue) : theme.blue,
          foreground: theme.white
        },
        disabled
      )}`
    }

    return `${buttonTheme(
      {
        background: disabled ? lighten(0.05, theme.lightgray) : theme.lightgray,
        foreground: disabled ? theme.white : theme.dimgray
      },
      disabled
    )}`
  }};
`
const LinkButton: any = StyledButton.withComponent(Link as any).extend`
  text-decoration: none;
`

// Exports
export default StyledButton
export { LinkButton }
