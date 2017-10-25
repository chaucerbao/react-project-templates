// Libraries
import { inject, observer } from 'mobx-react'
import * as React from 'react'

// Components
import Layout from './pages/layout'

// Pages
import NotFound from './pages/not-found'

// Interfaces
import { IRoutes } from './routes'
import { IStores } from './stores'

// Definitions
interface IProps {
  routes: IRoutes
}
interface IInjectedProps extends IProps {
  stores: IStores
}

// Router
@inject('stores')
@observer
class Router extends React.Component<IProps, {}> {
  get injected() {
    return this.props as IInjectedProps
  }

  public render() {
    const { stores: { viewStore } } = this.injected
    const { routes } = this.props

    const routeFound = routes[viewStore.page.name]
    const Page = routeFound ? routeFound.Component : NotFound

    return (
      <Layout>
        <Page />
      </Layout>
    )
  }
}

// Exports
export default Router
