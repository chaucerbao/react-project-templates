// Third-party dependencies
import * as React from 'react'
import styled from 'styled-components'

// Type definitions
interface IProps extends React.HTMLProps<HTMLButtonElement> {
  children: any
  disabled?: boolean
  primary?: boolean
}

// Component
const Button = ({ children, ...props }: IProps) => (
  <button {...props}>{children}</button>
)

// Styles
const StyledButton = styled(Button)`
  transition: background 0.25s;
  border: 1px solid gainsboro;
  border-radius: 0;
  cursor: pointer;
  padding: 4px 8px;
  font: inherit;
  ${props =>
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
  ${props =>
    props.disabled
      ? `
        background: lightgray;
        color: white;

        &:hover {
          background: lightgray;
        }
      `
      : ''};
`

// Exports
export default StyledButton
