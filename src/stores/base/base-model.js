// Model
class BaseModel {
  id = 0;

  _update(attributes) {
    Object.keys(attributes).forEach(key => {
      if (typeof this[key] !== 'undefined') {
        this[key] = attributes[key];
      }
    });

    return this;
  }
}

// Exports
export default BaseModel;
