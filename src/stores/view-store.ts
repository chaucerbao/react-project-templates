// Libraries
import { getParent, process, types } from 'mobx-state-tree'
import * as UrlPattern from 'url-pattern'

import { Post } from './post-store'

// Model
const View = types.model('View', {
  name: types.identifier(types.string),
  params: types.optional(types.frozen, {})
})

// Store
const ViewStore = types
  .model('ViewStore', {
    page: View,
    selectedPost: types.maybe(types.reference(Post))
  })
  .views(self => ({
    get stores() {
      return getParent(self)
    },
    get path() {
      const { page: { name, params } } = self

      switch (name) {
        case 'homepage':
          return '/'
        case 'post':
          return `/post/${params.id}`
        default:
          return '/page-not-found'
      }
    }
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

    const showHomepage = process(function*() {
      const { postStore, userStore } = self.stores

      yield userStore.getUsers()
      postStore.getPosts()

      self.page = { name: 'homepage', params: {} }
    })

    const showPost = process(function*(id: number) {
      const { postStore, userStore } = self.stores

      yield userStore.getUsers()
      yield postStore.getPosts()

      const post = postStore.posts.get(id)

      if (!post) {
        show404()
        return
      }

      selectPost(id)
      postStore.getComments(id)

      self.page = { name: 'post', params: { id } }
    })

    function selectPost(id: any) {
      self.selectedPost = id
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
