// Third-party dependencies
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'

// External type definitions
import { IStores } from '../stores'

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
    const { disabled, ...filteredProps } = props

    return (
      <a
        {...filteredProps}
        href={to}
        onClick={this.routeTo(to, onClick, disabled)}
      >
        {children}
      </a>
    )
  }

  private routeTo = (
    path: string,
    onClick: IClickHandler,
    disabled = false
  ) => {
    const { stores: { viewStore } } = this.injected

    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()

      if (disabled || onClick(e) === false) {
        return
      }

      viewStore.goTo(path)
    }
  }
}

// Styles
const StyledLink = styled(Link)`
  color: ${props => props.theme.blue};
`

// Exports
export default StyledLink
export { Link }
