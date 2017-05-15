// Model
import User from './user-model'

// Mocks
const stores = { fake: {} }

// Tests
it('constructs a new model', () => {
  const model = new User(stores)

  expect(model.id).toBe(0)
  expect(model.name).toBe('')
  expect(model.email).toBe('')
  expect(model._stores).toBe(stores)
})
