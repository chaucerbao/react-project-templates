// Libraries
import { getParent, process, types } from 'mobx-state-tree'

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
    users: types.map(User)
  })
  .views(self => ({
    get stores() {
      return getParent(self)
    }
  }))
  .actions(self => {
    function updateUsers(json: IUser[]) {
      json.forEach(userJson => self.users.put(userJson))
    }

    const getUsers = process(function*() {
      const json = yield self.stores.api.getUsers()
      updateUsers(json)
    })

    return {
      getUsers,
      updateUsers
    }
  })

// Exports
export { User }
export default UserStore

export type IUser = typeof User.Type
export type IUserStore = typeof UserStore.Type
