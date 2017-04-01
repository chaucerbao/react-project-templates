// Model
import BaseModel from './base-model';

// Tests
it('creates a new model', () => {
  const model = new BaseModel();

  expect(model.id).toBe(0);
});

it('knows if it is from is an existing model', () => {
  const model = new BaseModel();

  expect(model.exists).toBe(false);

  model.id = 5;

  expect(model.exists).toBe(true);
});

it('updates existing attributes', () => {
  const model = new BaseModel();

  expect(model.id).toBe(0);
  expect(model.fakeProperty).toBe(undefined);

  const returnValue = model.update({
    id: 5,
    fakeProperty: 'String'
  });

  expect(model.id).toBe(5);
  expect(model.fakeProperty).toBe(undefined);
  expect(returnValue).toBe(model);
});
