// Libraries
import { getParent, process, types } from 'mobx-state-tree'
import * as UrlPattern from 'url-pattern'

// Routes
import routes from '../routes'

// Model
const View = types.model('View', {
  name: types.identifier(types.string),
  params: types.optional(types.frozen, {})
})

// Store
const ViewStore = types
  .model('ViewStore', {
    page: View
  })
  .views(self => ({
    get stores() {
      return getParent(self)
    },
    get path() {
      const { page: { name, params } } = self
      const routeFound = routes.find(route => route.name === name)

      if (routeFound) {
        const pattern = new UrlPattern(routeFound.path)

        return pattern.stringify(params)
      }

      return '/page-not-found'
    }
  }))
  .actions(self => {
    const goTo = process(function*(url: string): any {
      const routeFound = routes.find(route =>
        new UrlPattern(route.path).match(url)
      )

      if (routeFound) {
        const pattern = new UrlPattern(routeFound.path)
        const match = pattern.match(url)

        yield routeFound.init(self.stores, match)

        self.page = {
          name: routeFound.name,
          params: match
        }

        return
      }

      self.page = {
        name: 'page-not-found',
        params: {}
      }
    })

    return {
      goTo
    }
  })

// Exports
export default ViewStore

export type IViewStore = typeof ViewStore.Type
