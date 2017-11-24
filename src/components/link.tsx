// Third-party dependencies
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'

// External type definitions
import { IStores } from '../stores'

// Components
import Button from './button'

// Type definitions
type IClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => false | void
interface IProps extends React.HTMLProps<HTMLAnchorElement> {
  children: any
  onClick?: IClickHandler
  to: string
}
interface IInjectedProps extends IProps {
  stores: IStores
}

// Component
@inject('stores')
@observer
class Link extends React.Component<IProps> {
  get injected() {
    return this.props as IInjectedProps
  }

  public render() {
    const {
      children,
      onClick = () => undefined,
      to,
      stores,
      ...props
    } = this.injected

    return (
      <a {...props} href={to} onClick={this.routeTo(to, onClick)}>
        {children}
      </a>
    )
  }

  private routeTo = (path: string, onClick: IClickHandler) => {
    const { stores: { viewStore } } = this.injected

    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()

      if (onClick(e) === false) {
        return
      }

      viewStore.goTo(path)
    }
  }
}

// Styles
const StyledLink = styled(Link)`
  color: blue;
`
const LinkButton: any = Button.withComponent(Link as any).extend`
  text-decoration: none;
`

// Exports
export default StyledLink
export { Link, LinkButton }
