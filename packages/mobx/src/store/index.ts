// Stores
import ItemsStore from './items'

// Store collection
export default class Store {
  public items = new ItemsStore(this)
}
