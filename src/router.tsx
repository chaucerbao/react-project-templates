// Libraries
import { inject, observer } from 'mobx-react'
import * as React from 'react'

// Components
import Layout from './pages/layout'

// Pages
import NotFound from './pages/not-found'

// Interfaces
import { IRoute } from './routes'
import { IStores } from './stores'

// Definitions
interface IProps {
  routes: IRoute[]
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
    return <Layout>{this.renderPage()}</Layout>
  }

  private renderPage() {
    const { routes } = this.props
    const { stores: { viewStore } } = this.injected

    const routeFound = routes.find(route => route.name === viewStore.page.name)

    if (routeFound) {
      return <routeFound.Component />
    }

    return <NotFound />
  }
}

// Exports
export default Router
