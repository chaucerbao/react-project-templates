// Model
import BaseModel from './base-model';

// Tests
it('creates a new model', () => {
  const model = new BaseModel();

  expect(model.id).toBe(0);
});

it('updates existing attributes', () => {
  const model = new BaseModel();

  expect(model.id).toBe(0);
  expect(model.fakeProperty).toBe(undefined);

  model._update({
    id: 5,
    fakeProperty: 'String'
  });

  expect(model.id).toBe(5);
  expect(model.fakeProperty).toBe(undefined);
});
