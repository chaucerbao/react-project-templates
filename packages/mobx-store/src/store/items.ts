// Dependencies
import { computed, flow, observable } from 'mobx'
import Stow from '@chaucerbao/stow'

// Model
class Item {
  id: number = 0
  name: string = ''
}

// Store
export default class ItemsStore {
  private stow: Stow<Item>

  constructor() {
    this.stow = new Stow(() => new Item(), { observable })
  }

  @computed
  get all() {
    return Array.from(this.stow.dump())
  }

  fetchItems = flow(function* fetchItems(this: ItemsStore) {
    const items: Item[] = yield fetch(
      'http://jsonplaceholder.typicode.com/users'
    ).then(response => response.json())

    items.forEach(item => this.stow.set(item.id, item))
  })
}
