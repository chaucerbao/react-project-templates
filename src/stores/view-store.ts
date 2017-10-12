// Libraries
import { getParent, types } from 'mobx-state-tree'
import * as UrlPattern from 'url-pattern'

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
    }
    // get path() {
    //   const { page: { name, params } } = self

    //   switch (name) {
    //     case 'homepage':
    //       return '/'
    //     case 'post':
    //       return `/post/${params.id}`
    //     default:
    //       return '/page-not-found'
    //   }
    // }
  }))
  .actions(self => {
    function goTo(url: string) {
      const routes = {
        '/': () => showHomepage(),
        '/post/:id': ({ id }: { id: number }) => showPost(id)
      }

      for (const path in routes) {
        if (routes.hasOwnProperty(path)) {
          const pattern = new UrlPattern(path)
          const match = pattern.match(url)

          if (match) {
            routes[path](match)
            return
          }
        }
      }

      show404()
    }

    function showHomepage() {
      const { postStore, userStore } = self.stores

      postStore.getPosts()
      userStore.getUsers()

      self.page = { name: 'homepage', params: {} }
    }

    function showPost(id: number) {
      const { postStore, userStore } = self.stores

      postStore.getPosts()
      postStore.getComments(id)
      userStore.getUsers()

      self.page = { name: 'post', params: { id } }
    }

    function show404() {
      self.page = { name: 'page-not-found', params: {} }
    }

    return {
      goTo,
      show404,
      showHomepage,
      showPost
    }
  })

// Exports
export default ViewStore

export type IViewStore = typeof ViewStore.Type
