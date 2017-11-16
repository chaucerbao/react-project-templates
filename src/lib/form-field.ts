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

function updateFormField(
  field: FormField<IValue | IValue[]>,
  e: React.FormEvent<HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement>
) {
  const { multiple, options, value } = e.currentTarget

  if (multiple) {
    const selected = []

    for (let i = 0, size = options.length; i < size; i++) {
      if (options[i].selected) {
        selected.push(options[i].value)
      }
    }

    field.set(selected)
  } else if (Array.isArray(field.value)) {
    field.toggle(value)
  } else {
    field.set(value)
  }
}

// Exports
export default FormField
export { updateFormField }
