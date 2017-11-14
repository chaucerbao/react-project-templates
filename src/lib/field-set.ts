// Libraries
import { extendObservable, observable } from 'mobx'

// Definitions
type IValue = boolean | number | string
interface IErrors {
  [field: string]: string
}
interface IValidators {
  [field: string]: (value: IValue) => string | null
}

// Class
class FieldSet<T> {
  @observable public errors: IErrors = {}
  @observable public fields: T

  private validators = {}

  constructor(fields: T, validators: IValidators) {
    const errors = {}

    Object.keys(fields).forEach(field => (errors[field] = ''))
    extendObservable(this.errors, errors)

    this.fields = fields
    this.validators = validators
  }

  public setValues(values: Partial<T>) {
    extendObservable(this.fields, values)
  }

  public validate(fieldName?: string) {
    let hasErrors = false

    const fields = fieldName ? [fieldName] : Object.keys(this.validators)

    fields.forEach(field => {
      if (this.fields.hasOwnProperty(field)) {
        this.errors[field] = this.validators[field](this.fields[field])

        if (this.errors[field]) {
          hasErrors = true
        }
      }
    })

    return !hasErrors
  }
}

// Exports
export default FieldSet
