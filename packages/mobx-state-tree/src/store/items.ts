// Dependencies
import { flow, types } from 'mobx-state-tree'

// Model
const Item = types.model('Item', {
  id: types.number,
  name: types.string,
})

// Store
const ItemsStore = types
  .model('ItemsStore', {
    _cache: types.map(Item),
  })
  .actions((self) => {
    const fetchItems = flow(function*() {
      const items: Array<typeof Item.Type> = yield fetch(
        'http://jsonplaceholder.typicode.com/users',
      ).then((response) => response.json())

      items.forEach((item) => self._cache.set(item.id.toString(), item))
    })

    return {
      fetchItems,
    }
  })
  .views((self) => ({
    get all() {
      return Array.from(self._cache.values())
    },
  }))

// Exports
export default ItemsStore
