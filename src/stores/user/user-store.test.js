// Store
import UserStore from './user-store';

// Mocks
const stores = {fake: {}};

// Tests
it('creates a new store', () => {
  const store = new UserStore(stores);

  expect(store._stores).toBe(stores);
});

it('retrieves all users', () => {
  const store = new UserStore(stores);

  expect(store.all.length).toBe(0);
});
