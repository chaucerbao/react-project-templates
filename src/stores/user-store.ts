import { process, types } from 'mobx-state-tree'

const User = types.model('User', {
  email: types.string,
  id: types.identifier(types.number),
  name: types.string
})

const UserStore = types
  .model('UserStore', {
    users: types.array(User)
  })
  .actions(self => ({
    fetchUsers: process(function*() {
      const response = yield fetch('//jsonplaceholder.typicode.com/users')
      self.users = yield response.json()

      return self.users
    })
  }))

export type IUserStore = typeof UserStore.Type

export default UserStore
