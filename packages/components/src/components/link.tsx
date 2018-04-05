// Dependencies
import React from 'react'

// Stub a Link component from some router
const RouteLink = ({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLProps<HTMLAnchorElement>) => (
  <a {...props}>{children}</a>
)

// Type definitions
export interface Props {
  children: React.ReactNode
  external?: boolean
  to: string
}

// Component
const Link = ({ children, external, to, ...props }: Props) =>
  external ? (
    <a {...props} href={to} target="_blank" rel="noopener">
      {children}
    </a>
  ) : (
    <RouteLink {...props} href={to}>
      {children}
    </RouteLink>
  )

// Exports
export default Link
