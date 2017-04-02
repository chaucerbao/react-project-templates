// Store
import BaseStore from './base-store';
import BaseModel from './base-model';

// Mocks
const stores = {fake: {}};
class SomeModel extends BaseModel {
  someProperty = '';
}
class SomeStore extends BaseStore {
  Model = SomeModel;
}

// Tests
it('creates a new store', () => {
  const store = new SomeStore(stores);

  expect(store._stores).toBe(stores);
});

it('loads cached models', () => {
  const store = new SomeStore(stores);

  const first = store._load(5);
  expect(first.id).toBe(0);
  expect(first.someProperty).toBe('');

  const second = store._load(5, {id: 10, someProperty: 'Text'});
  expect(second.id).toBe(10);
  expect(second.someProperty).toBe('Text');

  expect(first).toBe(second);
});

describe('fetch', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => {
      return new Promise(resolve => {
        resolve({
          ok: true,
          redirected: false,
          status: 200,
          statusText: 'OK',
          type: 'cors',
          url: 'http://example/api',
          json: () => ({
            id: 10,
            content: 'Something important'
          })
        });
      });
    });
  });

  it('returns data successfully', async () => {
    const store = new SomeStore(stores);

    expect(global.fetch.mock.calls.length).toBe(0);

    const response = await store._fetch('http://example/api');

    expect(global.fetch.mock.calls.length).toBe(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://example/api');
    expect(response.ok).toBe(true);
    expect(response.redirected).toBe(false);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(response.type).toBe('cors');
    expect(response.url).toBe('http://example/api');
    expect(response.body).toMatchObject({
      id: 10,
      content: 'Something important'
    });
  });

  it('throws on duplicate requests while pending', async () => {
    const store = new SomeStore(stores);

    expect(global.fetch.mock.calls.length).toBe(0);

    try {
      store._fetch('http://example/api');
      await store._fetch('http://example/api');
    } catch (err) {
      expect(err.name).toBe('FetchError');
      expect(global.fetch.mock.calls.length).toBe(1);
    }
  });
});
