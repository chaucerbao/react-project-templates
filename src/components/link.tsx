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

    const computedProps = {
      rel: this.isExternalLink() ? 'noopener' : filteredProps.rel
    }

    return (
      <a
        {...computedProps}
        {...filteredProps}
        href={to}
        onClick={this.routeTo(to, onClick, disabled)}
      >
        {children}
      </a>
    )
  }

  private isExternalLink() {
    const { rel, target, to } = this.props

    return target === '_blank' && !rel && /^([^:]+:)?\/\//.test(to)
  }

  private routeTo = (
    path: string,
    onClick: IClickHandler,
    disabled = false
  ) => {
    const { stores: { viewStore } } = this.injected

    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled || onClick(e) === false) {
        e.preventDefault()
        return
      }

      if (!this.isExternalLink()) {
        e.preventDefault()
        viewStore.goTo(path)
      }
    }
  }
}

// Styles
const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.blue};
  &:hover {
    text-decoration: underline;
  }
  &:active {
    color: ${props => props.theme.lightblue};
  }
`

// Exports
export default StyledLink
export { Link }
