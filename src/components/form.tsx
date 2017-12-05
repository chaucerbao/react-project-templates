// Third-party dependencies
import * as React from 'react'
import styled, { css } from 'styled-components'

// Type definitions
interface IStyledComponent {
  ref?: any
}
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
type IInput = IField & IStyledComponent & React.HTMLProps<HTMLInputElement>
type ITextArea = IField &
  IStyledComponent &
  React.HTMLProps<HTMLTextAreaElement>
type ISelect = IField &
  IStyledComponent &
  React.HTMLProps<HTMLSelectElement> &
  IOptionSet
type ICheckbox = IInput & IOptionSet

// Components
const Field = ({
  children,
  error,
  label,
  name
}: IField & { children: any }) => (
  <StyledField>
    {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
    {children}
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </StyledField>
)

const Input = ({ error, label, name, type = 'text', ...props }: IInput) => (
  <Field label={label} name={name} error={error}>
    <StyledInput {...props} id={name} name={name} type={type} />
  </Field>
)

const TextArea = ({ error, label, name, ...props }: ITextArea) => (
  <Field label={label} name={name} error={error}>
    <StyledTextArea {...props} id={name} name={name} />
  </Field>
)

const Select = ({
  error,
  label,
  name,
  value,
  options = [],
  ...props
}: ISelect) => (
  <Field label={label} name={name} error={error}>
    <SelectWrapper>
      <StyledSelect {...props} id={name} name={name} value={value}>
        {options.map(option => (
          <option key={`${name}:${option.label}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </SelectWrapper>
  </Field>
)

const Checkbox = ({
  error,
  label,
  name,
  value,
  type = 'checkbox',
  options = [],
  ...props
}: ICheckbox) => (
  <Field label={label} name={name} error={error}>
    {options.map(option => (
      <label key={`${name}:${option.label}`}>
        <CheckboxField
          {...props}
          name={name}
          value={option.value}
          type={type}
          checked={
            Array.isArray(value)
              ? value.indexOf(option.value.toString()) > -1
              : value === option.value
          }
        />
        <CheckboxLabel>{option.label}</CheckboxLabel>
      </label>
    ))}
  </Field>
)

const Radio = (props: ICheckbox) => <Checkbox {...props} type="radio" />

// Styles
const StyledField = styled.div`
  display: flex;
  flex-flow: column;
`
const FieldLabel = styled.label`
  font-weight: bold;
`
const ErrorMessage = styled.span`
  color: ${props => props.theme.red};
`
const inputBox = css`
  margin: 0;
  outline: none;
  border: 1px solid ${props => props.theme.darkgray};
  border-radius: 0;
  background: ${props => props.theme.white};
  padding: 4px;
  &:focus {
    border-color: ${props => props.theme.darkblue};
  }
`
const StyledInput = styled.input`
  ${inputBox};
`
const StyledTextArea = styled.textarea`
  ${inputBox};
`
const StyledSelect = styled.select`
  ${inputBox};
  appearance: none;
  flex: 1;
`
const SelectWrapper = styled.div`
  display: flex;
  position: relative;
  &::after {
    display: block;
    position: absolute;
    top: calc(50% - 5px / 2);
    right: 5px;
    border: 5px solid;
    border-color: ${props => props.theme.darkgray} transparent transparent
      transparent;
    pointer-events: none;
    content: '';
  }
`
const CheckboxLabel = styled.span`
  display: flex;
  position: relative;
  align-items: center;
  &::before {
    ${inputBox};
    display: block;
    margin-right: 4px;
    padding: 0;
    width: 13px;
    height: 13px;
    content: '';
  }
  &::after {
    position: absolute;
    top: calc(50% - 11px / 2);
    left: 2px;
    transform: scale(0);
    transition: transform 0.2s;
    background: ${props => props.theme.darkblue};
    width: 11px;
    height: 11px;
    content: '';
  }
`
const CheckboxField = styled.input`
  position: absolute;
  opacity: 0;
  &:checked + span::after {
    transform: scale(1);
  }
  & + span::before,
  &:checked + span::after {
    border-radius: ${props => (props.type === 'radio' ? '50%' : '0')};
  }
  &:focus + span::before {
    border-color: ${props => props.theme.darkblue};
  }
`

// Exports
export { Checkbox, Input, Radio, Select, TextArea }
