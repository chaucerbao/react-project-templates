// Dependencies
import Stow from '@chaucerbao/stow'
import { computed, flow, observable } from 'mobx'
import Store from '../store'
import * as api from './api'

// Model
class Item {
  public id: number = 0
  public name: string = ''
}

// Store
// tslint:disable-next-line max-classes-per-file
export default class ItemsStore {
  public fetchItems = flow(function* fetchItems(this: ItemsStore) {
    const items: Item[] = yield api.getItems()

    items.forEach(item => this.stow.set(item.id, item))
  })

  private store: Store
  private stow: Stow<Item>

  constructor(store: Store) {
    this.store = store
    this.stow = new Stow(() => new Item(), { observable })
  }

  @computed
  get all() {
    return Array.from(this.stow.values())
  }
}
