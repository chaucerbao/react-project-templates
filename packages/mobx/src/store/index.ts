// Stores
import ItemsStore from './items'

// Type definitions
export interface IStore {
  items: ItemsStore
}

// Store collection
const store: IStore = {
  items: new ItemsStore(),
}

// Exports
export default store
