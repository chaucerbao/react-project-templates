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
  [key: string]: any
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
const Field = ({ children, error, label, name }: IFieldProps) => (
  <FormField>
    {label && <Label htmlFor={name}>{label}</Label>}
    {children}
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </FormField>
)

const Input = ({ error, label, ...props }: IProps) => (
  <Field label={label} name={props.name} error={error}>
    <input {...props} id={props.name} type="text" />
  </Field>
)

const TextArea = ({ error, label, ...props }: IProps) => (
  <Field label={label} name={props.name} error={error}>
    <textarea {...props} id={props.name} />
  </Field>
)

// Exports
export { Input, TextArea }
