// Dependencies
import React from 'react'

// Stub a Link component from some router
interface IRouterLink extends IAnchorLink {
  to: IAnchorLink['href']
}
const RouterLink = (props: IRouterLink) => <a {...props} href={props.to} />

// Type definitions
export interface IProps {
  external?: boolean
  to: IAnchorLink['href'] | IRouterLink['to']
}
type IAnchorLink = React.HTMLProps<HTMLAnchorElement>

// Component
const Link = ({
  external,
  to,
  ...props,
}: IProps & (IAnchorLink | IRouterLink)) =>
  external && typeof to === 'string' ? (
    <a {...props as IAnchorLink} href={to} target="_blank" rel="noopener" />
  ) : (
    <RouterLink {...props as IRouterLink} />
  )

// Exports
export default Link
