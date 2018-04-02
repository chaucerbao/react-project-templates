// Stores
import ItemStore from './item'

// Type definitions
export interface Store {
  item: ItemStore
}

// Store collection
const store: Store = {
  item: new ItemStore()
}

// Exports
export default store
