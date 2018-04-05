// Dependencies
import React from 'react'
import Link, { Props as LinkProps } from './link'

// Type definitions
interface Props {
  disabled?: boolean
  primary?: boolean
}
type ButtonProps = React.HTMLProps<HTMLButtonElement> & Props
type LinkButtonProps = LinkProps & Props

// Component
const Button = ({ children, ...props }: ButtonProps | LinkButtonProps) =>
  (props as LinkProps).to ? (
    <Link {...props as LinkProps}>{children}</Link>
  ) : (
    <button {...props}>{children}</button>
  )

// Exports
export default Button
