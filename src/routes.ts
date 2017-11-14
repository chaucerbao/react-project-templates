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
    init: stores => {
      stores.postStore.getPosts()
    },
    path: new UrlPattern('/')
  },
  post: {
    Component: Post,
    init: (stores, { id }: { id: number }) => {
      stores.postStore.getPost(id, true)
    },
    path: new UrlPattern('/post/:id')
  },
  postEdit: {
    Component: PostEdit,
    init: (stores, { id }: { id: number }) => {
      stores.postStore.getPost(id, false)
    },
    path: new UrlPattern('/post/:id/edit')
  }
}

// Exports
export default routes

export { IRoutes }
