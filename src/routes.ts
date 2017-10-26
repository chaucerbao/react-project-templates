// Libraries
import * as UrlPattern from 'url-pattern'

// Interfaces
import { IStores } from './stores'

// Pages
import Homepage from './pages/homepage'
import Post from './pages/post'

// Definitions
interface IRoute {
  Component: any
  init?: (
    stores: IStores,
    params?: { [param: string]: string | number }
  ) => void
  path: UrlPattern
}
interface IRoutes {
  [name: string]: IRoute
}

const routes: IRoutes = {
  homepage: {
    Component: Homepage,
    init: async stores => {
      const { postStore, userStore } = stores
      await userStore.getUsers()
      await postStore.getPosts()
    },
    path: new UrlPattern('/')
  },
  post: {
    Component: Post,
    init: async (stores, params: { id: number }) => {
      const { postStore, userStore } = stores

      await Promise.all([userStore.getUsers(), postStore.getPosts()])
      await postStore.getComments(params.id)
    },
    path: new UrlPattern('/post/:id')
  }
}

// Exports
export default routes

export { IRoutes }
