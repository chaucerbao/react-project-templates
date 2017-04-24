// Model
class BaseModel {
  id = 0
  _stores = {}

  constructor (stores = {}) {
    this._stores = stores
  }

  get exists () {
    return this.id > 0
  }

  update (attributes) {
    Object.keys(attributes).forEach(key => {
      if (typeof this[key] !== 'undefined') {
        this[key] = attributes[key]
      }
    })

    return this
  }
}

// Exports
export default BaseModel
