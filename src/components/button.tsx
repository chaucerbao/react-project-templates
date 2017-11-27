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
  margin: 0;
  outline: none;
  border: 1px solid ${props => props.theme.lightgray};
  border-radius: 0;
  background: ${props => props.theme.lightgray};
  cursor: pointer;
  padding: 4px 8px;
  color: ${props => props.theme.dimgray};
  font: inherit;
  &:hover {
    background: ${props => props.theme.lightgray};
  }
  &:focus {
    border-color: ${props => props.theme.dimgray};
  }
  & {
    ${props =>
      props.primary
        ? `
            border-color: ${props.theme.blue};
            background: ${props.theme.blue};
            color: ${props.theme.white};

            &:hover {
              background: ${props.theme.darkblue};
            }
            &:focus {
              border-color: ${props.theme.lightblue};
            }
          `
        : ``};
    ${props =>
      props.disabled
        ? `
            border-color: ${props.theme.lightgray};
            background: ${props.theme.lightgray};
            color: ${props.theme.white};

            &:hover {
              background: ${props.theme.lightgray};
            }
          `
        : ''};
  }
`
const LinkButton: any = StyledButton.withComponent(Link as any).extend`
  text-decoration: none;
`

// Exports
export default StyledButton
export { LinkButton }
