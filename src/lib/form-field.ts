// Libraries
import { action, isObservableArray, observable } from 'mobx'

// Definitions
type IValue = Date | boolean | number | string
type IValidator<T> = (value: T) => string
interface IProps<T> {
  validate?: IValidator<T>
  value: T
}

// Class
class FormField<T extends IValue | IValue[]> {
  @observable private Value: T
  @observable private Error = ''
  private validator?: IValidator<T>

  constructor({ validate, value }: IProps<T>) {
    this.Value = value
    this.validator = validate
  }

  get value() {
    if (isObservableArray(this.Value)) {
      return this.Value.peek() as T
    }

    return this.Value
  }

  get error() {
    return this.Error
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
      this.Error = this.validator(this.Value)

      return this.Error
    }

    return ''
  }
}

// Exports
export default FormField
