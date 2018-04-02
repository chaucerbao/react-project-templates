// Stores
import ItemsStore from './items'

// Type definitions
export interface Store {
  items: ItemsStore
}

// Store collection
const store: Store = {
  items: new ItemsStore()
}

// Exports
export default store
