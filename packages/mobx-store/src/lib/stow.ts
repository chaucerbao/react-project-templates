// Dependencies
import { observable } from 'mobx'

// Type definitions
export type Key = string | number

// Stow
export default class Stow<Model extends { [key: string]: any }> {
  @observable private stowage: Map<Key, Model> = new Map()

  constructor(private newModel: () => Model) {}

  get size() {
    return this.stowage.size
  }

  get(id: Key) {
    const { stowage, newModel } = this
    const idString = id.toString()

    if (!stowage.has(idString)) {
      stowage.set(idString, newModel())
    }

    return stowage.get(idString)!
  }

  set(id: Key, props?: Partial<Model>) {
    const model = this.get(id.toString())

    if (props) {
      Object.keys(props).forEach(prop => {
        if (model.hasOwnProperty(prop)) {
          model[prop] = props[prop]
        }
      })
    }

    return model
  }

  dump() {
    return this.stowage.values()
  }
}
