// Libraries
import * as React from 'react'
import styled from 'styled-components'

// Definitions
interface IField {
  children?: any
  error?: string
  label?: string
  name: string
}
interface ITextField extends IField {
  [key: string]: any
}
interface IOptionSetField extends IField {
  [key: string]: any
  options: IOption[]
  value: number | string | Array<number | string>
}
interface IOption {
  label: string
  value: number | string
}

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
const Field = ({ children, error, label, name }: IField) => (
  <FormField>
    {label && <Label htmlFor={name}>{label}</Label>}
    {children}
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </FormField>
)

const Input = ({ error, label, name, ...props }: ITextField) => (
  <Field label={label} name={name} error={error}>
    <input {...props} id={name} name={name} type="text" />
  </Field>
)

const TextArea = ({ error, label, name, ...props }: ITextField) => (
  <Field label={label} name={name} error={error}>
    <textarea {...props} id={name} name={name} />
  </Field>
)

const Checkbox = ({
  error,
  label,
  name,
  value,
  options = [],
  ...props
}: IOptionSetField) => (
  <Field label={label} name={name} error={error}>
    {options.map((option: IOption) => (
      <label key={`${name}:${option.label}`}>
        <span>{option.label}</span>
        <input
          {...props}
          name={name}
          value={option.value}
          type="checkbox"
          checked={
            Array.isArray(value)
              ? value.indexOf(option.value.toString()) > -1
              : value === option.value
          }
        />
      </label>
    ))}
  </Field>
)

const Radio = ({
  error,
  label,
  name,
  value,
  options = [],
  ...props
}: IOptionSetField) => (
  <Field label={label} name={name} error={error}>
    {options.map((option: IOption) => (
      <label key={`${name}:${option.label}`}>
        <span>{option.label}</span>
        <input
          {...props}
          name={name}
          value={option.value}
          type="radio"
          checked={value === option.value}
        />
      </label>
    ))}
  </Field>
)

const Select = ({
  error,
  label,
  name,
  value,
  options = [],
  ...props
}: IOptionSetField) => (
  <Field label={label} name={name} error={error}>
    <select {...props} id={name} name={name}>
      {options.map((option: IOption) => (
        <option
          key={`${name}:${option.label}`}
          value={option.value}
          selected={
            Array.isArray(value)
              ? value.indexOf(option.value.toString()) > -1
              : value === option.value
          }
        >
          {option.label}
        </option>
      ))}
    </select>
  </Field>
)
// Exports
export { Checkbox, Input, Radio, Select, TextArea }
