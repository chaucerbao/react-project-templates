// Libraries
import { inject, observer } from 'mobx-react'
import * as React from 'react'

// Interfaces
import { IStores } from '../stores'

// Definitions
type IEventHandler = (e?: React.MouseEvent<HTMLAnchorElement>) => boolean | void
interface IProps {
  children: any
  onClick?: IEventHandler
  to: string
}
interface IInjectedProps extends IProps {
  stores: IStores
}

// Component
@inject('stores')
@observer
class Link extends React.Component<IProps, {}> {
  get injected() {
    return this.props as IInjectedProps
  }

  public render() {
    const {
      children,
      onClick = () => true,
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

  private routeTo = (path: string, onClick: IEventHandler) => {
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

// Exports
export default Link
