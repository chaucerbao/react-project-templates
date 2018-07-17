// Dependencies
import React from 'react'

// Components
import Button from '../components/button'
import {
  Checkbox,
  CheckboxGroup,
  fieldValue,
  FileUpload,
  IChangeEvent,
  IFileUpload,
  Input,
  RadioGroup,
  Select,
  TextArea,
} from '../components/form'
import Link from '../components/link'

// Homepage
export default class extends React.Component {
  public state = {
    errors: {
      attachments: '',
      body: '',
      categories: '',
      category: '',
      image: '',
      isPublished: '',
      related_category: '',
      tags: '',
      title: '',
    },
    form: {
      attachments: [],
      body: '',
      categories: [],
      category: '',
      image: undefined,
      isPublished: false,
      related_category: '',
      tags: [],
      title: '',
    },
  }

  private categories = [
    { label: 'Category A', value: 'A' },
    { label: 'Category B', value: 'B' },
    { label: 'Category C', value: 'C' },
  ]

  private tags = [
    { label: 'Tag 1', value: '1' },
    { label: 'Tag 2', value: '2' },
    { label: 'Tag 3', value: '3' },
  ]

  public render() {
    const { form, errors } = this.state

    return (
      <>
        <h1>Welcome home</h1>

        <nav>
          <Link external={true} to="https://google.com/">
            External link
          </Link>
          &nbsp;
          <Button external={true} to="https://google.com/">
            External button
          </Button>
        </nav>

        <form onSubmit={this.submitForm}>
          <Input
            label="Title"
            name="title"
            value={form.title}
            error={errors.title}
            onChange={this.updateField}
          />
          <TextArea
            label="Body"
            name="body"
            value={form.body}
            error={errors.body}
            onChange={this.updateField}
          />
          <Select
            label="Category"
            name="category"
            value={form.category}
            options={this.categories}
            error={errors.category}
            onChange={this.updateField}
          />
          <Select
            multiple={true}
            label="Categories"
            name="categories"
            value={form.categories}
            options={this.categories}
            error={errors.categories}
            onChange={this.updateField}
          />
          <Checkbox
            label="Published?"
            name="isPublished"
            checked={form.isPublished}
            onChange={this.updateField}
          />
          <CheckboxGroup
            label="Tags"
            name="tags"
            value={form.tags}
            options={this.tags}
            error={errors.tags}
            onChange={this.updateField}
          />
          <RadioGroup
            label="Related category"
            name="related_category"
            value={form.related_category}
            options={this.categories}
            onChange={this.updateField}
          />
          <FileUpload
            label="Image"
            name="image"
            onChange={this.updateField}
            render={this.singleUploadCta}
            renderPreview={this.fileUploadPreview}
          />
          <FileUpload
            multiple={true}
            label="Attachments"
            name="attachments"
            onChange={this.updateField}
            render={this.multipleUploadCta}
            renderPreview={this.fileUploadPreview}
          />

          <Button type="submit">Submit</Button>
          <Link to="/">Cancel</Link>
        </form>
      </>
    )
  }

  private singleUploadCta = () => {
    return !this.state.form.image ? <div>Click to add an image</div> : null
  }

  private multipleUploadCta = () => {
    return this.state.form.attachments.length === 0 ? (
      <div>Click to add an attachment</div>
    ) : null
  }

  private fileUploadPreview: IFileUpload['renderPreview'] = (
    key,
    Image,
    file,
  ) => {
    return (
      <div key={key}>
        <Image width={320} />
        <br />
        {file.name}
      </div>
    )
  }

  private updateField = (e: IChangeEvent) => {
    this.setState({
      form: { ...this.state.form, [e.currentTarget.name]: fieldValue(e) },
    })
  }

  private submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Submitting', this.state.form) // tslint:disable-line no-console
  }
}
