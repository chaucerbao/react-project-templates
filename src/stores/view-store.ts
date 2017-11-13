// Libraries
import { getParent, types } from 'mobx-state-tree'

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
      const { routes } = getParent(self)
      const { page: { name, params } } = self
      const routeFound = routes[name]

      if (routeFound) {
        return routeFound.path.stringify(params)
      }

      return '/page-not-found'
    },
    get routes() {
      return getParent(self).routes
    }
  }))
  .actions(self => ({
    goTo: (url: string) => {
      const { routes, stores } = self
      const key = Object.keys(routes).find(name => routes[name].path.match(url))

      if (key) {
        const { init, path } = routes[key]
        const match = path.match(url)

        if (init) {
          init(stores, match)
        }

        self.page = {
          name: key,
          params: match
        }

        return
      }

      self.page = {
        name: 'page-not-found',
        params: {}
      }
    }
  }))

// Exports
export default ViewStore

export type IViewStore = typeof ViewStore.Type
