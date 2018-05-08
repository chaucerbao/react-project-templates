// Dependencies
import React from 'react'
import Link, { IProps as ILink } from './link'

// Type definitions
interface IProps {
  disabled?: boolean
  primary?: boolean
}
type IButton = React.HTMLProps<HTMLButtonElement>

// Component
const Button = (props: IProps & (IButton | ILink)) =>
  (props as ILink).to ? (
    <Link {...props as ILink} />
  ) : (
    <button {...props as IButton} />
  )

// Exports
export default Button
