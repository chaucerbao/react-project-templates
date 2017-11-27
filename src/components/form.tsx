// Third-party dependencies
import * as React from 'react'
import styled from 'styled-components'

// Type definitions
interface IField {
  error?: string
  label?: string
  name: string
}
interface IOptionSet {
  options: IOption[]
}
interface IOption {
  label: string
  value: string
}

// Components
const Field = ({
  children,
  error,
  label,
  name
}: IField & { children: any }) => (
  <StyledField>
    {label && <Label htmlFor={name}>{label}</Label>}
    {children}
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </StyledField>
)

const Input = ({
  error,
  label,
  name,
  type = 'text',
  ...props
}: IField & React.HTMLProps<HTMLInputElement>) => (
  <Field label={label} name={name} error={error}>
    <input {...props} id={name} name={name} type={type} />
  </Field>
)

const TextArea = ({
  error,
  label,
  name,
  ...props
}: IField & React.HTMLProps<HTMLTextAreaElement>) => (
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
}: IField & IOptionSet & React.HTMLProps<HTMLInputElement>) => (
  <Field label={label} name={name} error={error}>
    {options.map(option => (
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
}: IField & IOptionSet & React.HTMLProps<HTMLInputElement>) => (
  <Field label={label} name={name} error={error}>
    {options.map(option => (
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
}: IField & IOptionSet & React.HTMLProps<HTMLSelectElement>) => (
  <Field label={label} name={name} error={error}>
    <select {...props} id={name} name={name} value={value}>
      {options.map(option => (
        <option key={`${name}:${option.label}`} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </Field>
)

// Styles
const StyledField = styled.div`
  display: flex;
  flex-flow: column;
`
const Label = styled.label`
  font-weight: bold;
`
const ErrorMessage = styled.span`
  color: ${props => props.theme.red};
`

// Exports
export { Checkbox, Input, Radio, Select, TextArea }
