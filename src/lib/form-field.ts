// Libraries
import { action, isObservableArray, observable } from 'mobx'

// Definitions
type IValue = Date | boolean | number | string
type IValidator<T> = (value: T) => string

// Class
class FormField<T extends IValue | IValue[]> {
  @observable public error: string = ''
  @observable private Value: T
  private validator?: IValidator<T>

  constructor(value: T, validator?: IValidator<T>) {
    this.Value = value
    this.validator = validator
  }

  get value() {
    if (isObservableArray(this.Value)) {
      return this.Value.peek() as T
    }

    return this.Value
  }

  @action
  public set(value: T) {
    this.Value = value
  }

  @action
  public toggle(value: T) {
    if (isObservableArray(this.Value)) {
      if (this.Value.indexOf(value) > -1) {
        this.Value.remove(value)
      } else {
        this.Value.push(value)
      }
    }
  }

  @action
  public validate() {
    if (this.validator) {
      this.error = this.validator(this.Value)

      return this.error
    }

    return ''
  }
}

// Exports
export default FormField
