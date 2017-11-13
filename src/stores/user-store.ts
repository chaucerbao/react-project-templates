// Libraries
import { applySnapshot, getParent, process, types } from 'mobx-state-tree'

// Definitions
interface IUserJson {
  email: string
  id: number
  name: string
  username: string
  website: string
}

// Model
const User = types.model('User', {
  email: types.string,
  id: types.identifier(types.number),
  name: types.string,
  username: types.string,
  website: types.string
})

// Store
const UserStore = types
  .model('UserStore', {
    _cache: types.map(User)
  })
  .views(self => ({
    get stores() {
      return getParent(self)
    },
    get isLoaded() {
      return self._cache.size > 0
    }
  }))
  .actions(self => {
    function updateCache(usersJson: IUserJson[]) {
      usersJson.forEach(snapshot => {
        const node = self._cache.get(snapshot.id.toString())

        if (node) {
          applySnapshot(node, snapshot)
        } else {
          self._cache.put(snapshot)
        }
      })
    }

    const getUsers = process(function*() {
      if (!self.isLoaded) {
        updateCache(yield self.stores.api.getUsers())
      }
    })

    return {
      getUsers,
      updateCache
    }
  })

// Exports
export { User }
export default UserStore

export type IUser = typeof User.Type
export type IUserStore = typeof UserStore.Type
