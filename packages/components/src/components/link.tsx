// Dependencies
import React from 'react'

// Stub a Link component from some router
const RouteLink = (props: React.HTMLProps<HTMLAnchorElement>) => (
  <a {...props} />
)

// Type definitions
export interface IProps {
  external?: boolean
  to: string
}

// Component
const Link = ({ external, to, ...props }: IProps) =>
  external && typeof to === 'string' ? (
    <a {...props} href={to} target="_blank" rel="noopener" />
  ) : (
    <RouteLink {...props} href={to} />
  )

// Exports
export default Link
