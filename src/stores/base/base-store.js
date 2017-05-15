// Custom error
class FetchError extends Error {
  constructor (message) {
    super(message)
    this.name = 'FetchError'
  }
}

// Store
class BaseStore {
  Model
  _stores = {}
  _cache = {}

  constructor (stores = {}) {
    this._stores = stores
    this._fetch._pending = {}
  }

  _load (id, attributes = {}) {
    const key = parseInt(id, 10)

    this._cache[key] = this._cache[key] || new this.Model(this._stores)

    return this._cache[key].update(attributes)
  }

  _map (models, transform = model => model) {
    return models.map(model => this._load(model.id, transform(model)))
  }

  async _fetch (request) {
    const key = JSON.stringify(request)
    const pendingRequests = this._fetch._pending

    try {
      if (pendingRequests[key]) {
        throw new FetchError('Duplicate request')
      }

      pendingRequests[key] = true

      const response = await fetch(request)
      const body = await response.json()

      delete pendingRequests[key]

      const { ok, redirected, status, statusText, type, url } = response

      return { ok, redirected, status, statusText, type, url, body }
    } catch (err) {
      if (err.name !== 'FetchError') {
        delete pendingRequests[key]
      }

      throw err
    }
  }
}

// Exports
export default BaseStore
