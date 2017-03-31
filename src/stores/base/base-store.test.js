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
