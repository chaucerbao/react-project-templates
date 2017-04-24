// Store
import UiStore from './ui-store'

// Mocks
const stores = {fake: {}}

// Tests
it('creates a new store', () => {
  const store = new UiStore(stores)

  expect(store._stores).toBe(stores)
})
