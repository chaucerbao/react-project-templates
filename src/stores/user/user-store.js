// Dependencies
import {extendObservable, runInAction} from 'mobx'
import BaseStore from 'stores/base/base-store'
import User from './user-model'

// Store
class UserStore extends BaseStore {
  Model = User

  constructor (stores) {
    super(stores)

    extendObservable(this, {
      all: []
    })
  }

  async getAll () {
    const response = await super._fetch(
      'https://jsonplaceholder.typicode.com/users'
    )

    runInAction(() => {
      this.all = this._map(response.body)
    })
  }
}

// Exports
export default UserStore
