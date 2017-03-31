// Model
import User from './user-model';

// Tests
it('creates a new model', () => {
  const model = new User();

  expect(model.id).toBe(0);
  expect(model.name).toBe('');
  expect(model.email).toBe('');
});
