// Store
import UserStore from './user-store';

// Mocks
const stores = {fake: {}};

// Tests
it('creates a new store', () => {
  const store = new UserStore(stores);

  expect(store._stores).toBe(stores);
});

it('retrieves all users', async () => {
  const store = new UserStore(stores);

  global.fetch = jest.fn(() => {
    return new Promise(resolve => {
      resolve({
        ok: true,
        redirected: false,
        status: 200,
        statusText: 'OK',
        type: 'cors',
        url: 'https://jsonplaceholder.typicode.com/users',
        json: () => [{id: 10}, {id: 20}]
      });
    });
  });

  await store.getAll();

  expect(global.fetch.mock.calls.length).toBe(1);
  expect(global.fetch.mock.calls[0][0]).toBe(
    'https://jsonplaceholder.typicode.com/users'
  );
  expect(store.all.length).toBe(2);
  expect(store.all[0]).toMatchObject({id: 10});
  expect(store.all[1]).toMatchObject({id: 20});
});
