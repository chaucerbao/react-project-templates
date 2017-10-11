// Libraries
import { getEnv, types } from 'mobx-state-tree'

// Individual stores
import PostStore from './post-store'
import UserStore from './user-store'

// Combined stores
const Stores = types
  .model('Stores', {
    postStore: types.optional(PostStore, {
      comments: {},
      posts: {}
    }),
    userStore: types.optional(UserStore, {
      users: {}
    })
  })
  .views(self => ({
    get api() {
      return getEnv(self).api
    }
  }))
  .actions(self => {
    const { postStore, userStore } = self

    return {
      afterCreate() {
        postStore.getPosts()
        userStore.getUsers()
      }
    }
  })

// Exports
export default Stores

export type IStores = typeof Stores.Type
