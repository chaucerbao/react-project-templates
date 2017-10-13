// Libraries
import { getEnv, types } from 'mobx-state-tree'

// Individual stores
import PostStore from './post-store'
import UserStore from './user-store'
import ViewStore from './view-store'

// Combined stores
const Stores = types
  .model('Stores', {
    postStore: types.optional(PostStore, {
      comments: {},
      posts: {}
    }),
    userStore: types.optional(UserStore, {
      users: {}
    }),
    viewStore: types.optional(ViewStore, {
      page: {
        name: 'loading',
        params: {}
      }
    })
  })
  .views(self => ({
    get api() {
      return getEnv(self).api
    }
  }))
  .actions(self => {
    const { viewStore } = self

    return {
      afterCreate() {
        viewStore.goTo(getEnv(self).path)
      }
    }
  })

// Exports
export default Stores

export type IStores = typeof Stores.Type
