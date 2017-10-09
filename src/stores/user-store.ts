import { getEnv, process, types } from 'mobx-state-tree'

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
    getUsers: process(function*() {
      self.users = yield getEnv(self).api.getUsers()
    })
  }))

export type IUserStore = typeof UserStore.Type

export default UserStore
