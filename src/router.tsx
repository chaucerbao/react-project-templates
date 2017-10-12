// Libraries
import { inject, observer } from 'mobx-react'
import * as React from 'react'

// Pages
import Homepage from './pages/homepage'
import NotFound from './pages/not-found'

// Interfaces
import { IStores } from './stores'

// Definitions
interface IInjectedProps {
  stores: IStores
}

// Router
@inject('stores')
@observer
class Router extends React.Component<{}, {}> {
  get injected() {
    return this.props as IInjectedProps
  }

  public render() {
    const { stores: { viewStore } } = this.injected

    switch (viewStore.page.name) {
      case 'homepage':
        return <Homepage />
      default:
        return <NotFound />
    }
  }
}

// Exports
export default Router
