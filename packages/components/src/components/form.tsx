// Dependencies
import React from 'react'

// Type definitions
interface IFieldProps {
  children: React.ReactNode
  error?: string
  label?: string
  name: string
}
type FieldGroupProps = Pick<IFieldProps, Exclude<keyof IFieldProps, 'name'>>
type FormFieldProps = Pick<IFieldProps, Exclude<keyof IFieldProps, 'children'>>
type FormFieldGroupProps = Pick<
  FieldGroupProps,
  Exclude<keyof FieldGroupProps, 'children'>
>
interface IOptionProps {
  options: Array<{ label: string; value: string }>
}
interface IFileUploadProps {
  render?: () => React.ReactNode
  renderPreview?: (
    key: string,
    Image: React.StatelessComponent<{ [key: string]: any }>,
    file: File,
  ) => React.ReactNode
}
export type ChangeEvent = React.FormEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>

// Components
const Field = ({ children, error, label, name }: IFieldProps) => (
  <div>
    <label htmlFor={name}>
      {label && <span>{label}</span>}
      {children}
    </label>
    {error && <span>{error}</span>}
  </div>
)

const FieldGroup = ({ children, error, label }: FieldGroupProps) => (
  <div>
    {label && <span>{label}</span>}
    {error && <span>{error}</span>}
    {children}
  </div>
)

const Input = ({
  error,
  label,
  ...props,
}: FormFieldProps & React.HTMLProps<HTMLInputElement>) => (
  <Field error={error} label={label} name={props.name}>
    <input {...props} id={props.name} type="text" />
  </Field>
)

const TextArea = ({
  error,
  label,
  ...props,
}: FormFieldProps & React.HTMLProps<HTMLTextAreaElement>) => (
  <Field error={error} label={label} name={props.name}>
    <textarea {...props} id={props.name} />
  </Field>
)

const Select = ({
  error,
  label,
  options,
  ...props,
}: FormFieldProps & React.HTMLProps<HTMLSelectElement> & IOptionProps) => (
  <Field error={error} label={label} name={props.name}>
    <select {...props} id={props.name}>
      {options.map(({ label: optionLabel, value }) => (
        <option key={`${props.name}:${value}`} value={value}>
          {optionLabel}
        </option>
      ))}
    </select>
  </Field>
)

const Checkbox = ({
  error,
  label,
  ...props,
}: FormFieldProps & React.HTMLProps<HTMLInputElement>) => (
  <Field error={error} label={label} name={props.name}>
    <input {...props} id={props.name} type="checkbox" />
  </Field>
)

const CheckboxGroup = ({
  error,
  label,
  name,
  options,
  ...props,
}: FormFieldGroupProps & React.HTMLProps<HTMLInputElement> & IOptionProps) => (
  <FieldGroup error={error} label={label}>
    {options.map(({ label: optionLabel, value }) => (
      <label key={`${name}:${value}`} htmlFor={`${name}:${value}`}>
        <input
          {...props}
          id={`${name}:${value}`}
          name={name}
          value={value}
          type="checkbox"
          checked={
            Array.isArray(props.value) && props.value.indexOf(value) > -1
          }
          data-checkbox-group
        />
        <span>{optionLabel}</span>
      </label>
    ))}
  </FieldGroup>
)

const RadioGroup = ({
  error,
  label,
  name,
  options,
  ...props,
}: FormFieldGroupProps & React.HTMLProps<HTMLInputElement> & IOptionProps) => (
  <FieldGroup error={error} label={label}>
    {options.map(({ label: optionLabel, value }) => (
      <label key={`${name}:${value}`} htmlFor={`${name}:${value}`}>
        <input
          {...props}
          id={`${name}:${value}`}
          name={name}
          value={value}
          type="radio"
        />
        <span>{optionLabel}</span>
      </label>
    ))}
  </FieldGroup>
)

class FileUpload extends React.Component<
  FormFieldProps & IFileUploadProps & React.HTMLProps<HTMLInputElement>
> {
  private input?: HTMLInputElement
  private imageFiles: File[] = []
  private imagePreviews: HTMLImageElement[] = []

  public componentWillUpdate() {
    const { input } = this

    const imageFiles =
      input && input.files
        ? Array.from(input.files).filter((file) =>
            /\.(gif|jpg|png)$/.test(file.name),
          )
        : []

    if (imageFiles) {
      imageFiles.forEach((file, i) => {
        const fileReader = new FileReader()

        fileReader.addEventListener('load', () => {
          if (this.imagePreviews[i]) {
            this.imagePreviews[i].src = fileReader.result
          }
        })
        fileReader.readAsDataURL(file)
      })
    }

    this.imageFiles = imageFiles
    this.imagePreviews = []
  }

  public render() {
    const { error, label, render, renderPreview, ...props } = this.props

    return (
      <Field error={error} label={label} name={props.name}>
        {render && render()}
        {renderPreview &&
          this.imageFiles.map((file, i) =>
            renderPreview(
              `${props.name}:${i}`,
              (imageProps) => (
                <img
                  {...imageProps}
                  ref={(img) => (this.imagePreviews[i] = img!)}
                />
              ),
              file,
            ),
          )}
        <input
          {...props}
          id={props.name}
          type="file"
          ref={(input) => (this.input = input!)}
        />
      </Field>
    )
  }
}

function fieldValue(e: ChangeEvent) {
  const field = e.currentTarget

  if (field instanceof HTMLSelectElement && field.multiple) {
    return Array.from(field.options)
      .filter((option) => option.selected)
      .map((option) => option.value)
  } else if (field instanceof HTMLInputElement && field.type === 'checkbox') {
    if (field.dataset.checkboxGroup) {
      return Array.from(
        field.parentElement!.parentElement!.querySelectorAll('input:checked'),
      ).map((input) => (input as HTMLInputElement).value)
    } else {
      return field.checked
    }
  } else if (
    field instanceof HTMLInputElement &&
    field.type === 'file' &&
    field.files
  ) {
    return field.multiple ? Array.from(field.files) : field.files[0]
  }

  return field.value
}

// Exports
export {
  Input,
  TextArea,
  Select,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  FileUpload,
  fieldValue,
}