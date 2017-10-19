// Interfaces
import { IStores } from './stores'

// Pages
import Homepage from './pages/homepage'
import Post from './pages/post'

// Definitions
interface IRoute {
  Component: any
  init: (stores: IStores, params?: any) => void
  name: string
  path: string
}

const routes: IRoute[] = [
  {
    Component: Homepage,
    init: async stores => {
      const { postStore, userStore } = stores
      await userStore.getUsers()
      await postStore.getPosts()
    },
    name: 'homepage',
    path: '/'
  },
  {
    Component: Post,
    init: async (stores, params) => {
      const { postStore, userStore } = stores

      await Promise.all([userStore.getUsers(), postStore.getPosts()])
      await postStore.getComments(params.id)
    },
    name: 'post',
    path: '/post/:id'
  }
]

// Exports
export default routes

export { IRoute }
