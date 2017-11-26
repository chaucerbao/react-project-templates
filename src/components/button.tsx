// Third-party dependencies
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
const StyledButton = styled(Button)`
  transition: background 0.25s;
  border: 1px solid ${props => props.theme.lightgray};
  border-radius: 0;
  cursor: pointer;
  padding: 4px 8px;
  font: inherit;
  ${props =>
    props.primary
      ? `
        background: ${props.theme.blue};
        color: ${props.theme.white};

        &:hover {
          background: ${props.theme.darkblue};
        }
      `
      : `
        background: ${props.theme.lightgray};
        color: ${props.theme.dimgray};

        &:hover {
          background: ${props.theme.lightgray};
        }
  `};
  ${props =>
    props.disabled
      ? `
        background: ${props.theme.lightgray};
        color: ${props.theme.white};

        &:hover {
          background: ${props.theme.lightgray};
        }
      `
      : ''};
`
const LinkButton: any = StyledButton.withComponent(Link as any).extend`
  text-decoration: none;
`

// Exports
export default StyledButton
export { LinkButton }
