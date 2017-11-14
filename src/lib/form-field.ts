// Libraries
import { action, observable } from 'mobx'

// Definitions
type IValue = boolean | number | string
type IValidator<T> = (value: T) => string

// Class
class FormField<T extends IValue> {
  @observable public error: string = ''

  @observable public value: T

  private validator?: IValidator<T>

  constructor(value: T, validator?: IValidator<T>) {
    this.value = value
    this.validator = validator
  }

  @action
  public set(value: T) {
    this.value = value
  }

  @action
  public validate() {
    if (this.validator) {
      this.error = this.validator(this.value)

      return this.error
    }

    return ''
  }
}

// Exports
export default FormField
