// Libraries
import * as React from 'react'
import styled from 'styled-components'

// Definitions
interface IFieldProps {
  children?: any
  error?: string
  label?: string
  name: string
}
interface IProps {
  name: string
  options?: IOption[]
  [key: string]: any
}
interface IMultipleProps extends IProps {
  options: IOption[]
  value: Array<number | string>
}
type IOption = [number | string, string]

// Styles
const FormField = styled.div`
  display: flex;
  flex-flow: column;
`
const Label = styled.label`
  font-weight: bold;
`
const ErrorMessage = styled.span`
  color: red;
`

// Components
const Field = ({ children, error, label, name }: IFieldProps) => (
  <FormField>
    {label && <Label htmlFor={name}>{label}</Label>}
    {children}
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </FormField>
)

const Input = ({ error, label, name, ...props }: IProps) => (
  <Field label={label} name={name} error={error}>
    <input {...props} id={name} name={name} type="text" />
  </Field>
)

const TextArea = ({ error, label, name, ...props }: IProps) => (
  <Field label={label} name={name} error={error}>
    <textarea {...props} id={name} name={name} />
  </Field>
)

const Checkbox = ({
  error,
  label,
  name,
  value = [],
  options = [],
  ...props
}: IMultipleProps) => (
  <Field label={label} name={name} error={error}>
    {options.map(([optionValue, optionLabel]) => (
      <label key={`${props.name}:${optionLabel}`}>
        <span>{optionLabel}</span>
        <input
          {...props}
          name={name}
          value={optionValue}
          type="checkbox"
          checked={value.indexOf(optionValue.toString()) > -1}
        />
      </label>
    ))}
  </Field>
)

// Exports
export { Checkbox, Input, TextArea }
