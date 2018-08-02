// Dependencies
import { types } from 'mobx-state-tree'

// Stores
import ItemsStore from './items'

// Type definitions
export type IStore = typeof Store.Type

// Store collection
const Store = types.model('Store', { items: ItemsStore })

// Exports
export default Store.create({
  items: {
    _cache: {}
  }
})
