// Libraries
import * as UrlPattern from 'url-pattern'

// Interfaces
import { IStores } from './stores'

// Pages
import Homepage from './pages/homepage'
import Post from './pages/post'
import PostEdit from './pages/post-edit'

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

      await Promise.all([userStore.getUsers(), postStore.getPosts()])
    },
    path: new UrlPattern('/')
  },
  post: {
    Component: Post,
    init: async (stores, params: { id: number }) => {
      const { postStore, userStore } = stores

      await Promise.all([userStore.getUsers(), postStore.getPost(params.id)])
      await postStore.getComments(params.id)
    },
    path: new UrlPattern('/post/:id')
  },
  postEdit: {
    Component: PostEdit,
    init: async (stores, params: { id: number }) => {
      const { postStore } = stores

      await postStore.getPost(params.id)
    },
    path: new UrlPattern('/post/:id/edit')
  }
}

// Exports
export default routes

export { IRoutes }
