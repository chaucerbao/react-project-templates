// Dependencies
import React from 'react'
import Link, { IProps as LinkProps } from './link'

// Type definitions
interface IProps {
  disabled?: boolean
  primary?: boolean
}
type ButtonProps = React.HTMLProps<HTMLButtonElement> & IProps
type LinkButtonProps = LinkProps & IProps

// Component
const Button = ({ children, ...props }: ButtonProps | LinkButtonProps) =>
  (props as LinkProps).to ? (
    <Link {...props as LinkProps}>{children}</Link>
  ) : (
    <button {...props}>{children}</button>
  )

// Exports
export default Button
