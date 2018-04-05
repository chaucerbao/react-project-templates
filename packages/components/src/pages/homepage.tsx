// Dependencies
import React from 'react'

// Components
import Button from '../components/button'
import {
  Input,
  TextArea,
  Select,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  FileUpload,
  ChangeEvent,
  fieldValue
} from '../components/form'
import Link from '../components/link'

// Homepage
export default class extends React.Component {
  categories = [
    { label: 'Category A', value: 'A' },
    { label: 'Category B', value: 'B' },
    { label: 'Category C', value: 'C' }
  ]

  tags = [
    { label: 'Tag 1', value: '1' },
    { label: 'Tag 2', value: '2' },
    { label: 'Tag 3', value: '3' }
  ]

  state = {
    form: {
      title: '',
      body: '',
      category: '',
      categories: [],
      related_category: '',
      isPublished: false,
      tags: [],
      image: undefined,
      attachments: []
    },
    errors: {
      title: '',
      body: '',
      category: '',
      categories: '',
      related_category: '',
      isPublished: '',
      tags: '',
      image: '',
      attachments: ''
    }
  }

  updateField = (e: ChangeEvent) => {
    this.setState({
      form: { ...this.state.form, [e.currentTarget.name]: fieldValue(e) }
    })
  }

  submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Submitting', this.state.form)
  }

  render() {
    const { form, errors } = this.state

    return (
      <>
        <h1>Welcome home</h1>

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
            render={() => !form.image && <div>Click to add an image</div>}
            renderPreview={(key, Image, file) => (
              <div key={key}>
                <Image width={320} />
                <br />
                {file.name}
              </div>
            )}
          />
          <FileUpload
            multiple={true}
            label="Attachments"
            name="attachments"
            onChange={this.updateField}
            render={() =>
              form.attachments.length === 0 && (
                <div>Click to add an attachment</div>
              )
            }
            renderPreview={(key, Image, file) => (
              <div key={key}>
                <Image width={320} />
                <br />
                {file.name}
              </div>
            )}
          />

          <Button type="submit">Submit</Button>
          <Link to="/">Cancel</Link>
        </form>
      </>
    )
  }
}
