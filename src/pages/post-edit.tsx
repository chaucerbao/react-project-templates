// Third-party dependencies
import { action, computed, extendObservable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'

// Components
import Button, { LinkButton } from '../components/button'
import { Checkbox, Input, Radio, Select, TextArea } from '../components/form'
import Loading from '../components/loading'

// Helpers
import FormField from '../lib/form-field'

// External type definitions
import { IStores } from '../stores'

// Type definitions
interface IInjectedProps {
  stores: IStores
}
interface IForm {
  body: FormField<string>
  category: FormField<string>
  published: FormField<string>
  tags: FormField<string[]>
  title: FormField<string>
}

// Page
@inject('stores')
@observer
class PostEdit extends React.Component<{}, {}> {
  private form: IForm
  private isPrepopulated = false
  private isSubmitting = false

  get injected() {
    return this.props as IInjectedProps
  }

  @computed
  get selectedPost() {
    return this.injected.stores.postStore.selected
  }

  constructor(props: {}) {
    super(props)

    extendObservable(this, {
      isSubmitting: false
    })

    this.form = {
      body: new FormField({
        validate: value => (value ? '' : 'Body is required'),
        value: ''
      }),
      category: new FormField({
        validate: value => (value ? '' : 'Category is required'),
        value: ''
      }),
      published: new FormField({ value: 'no' }),
      tags: new FormField({
        validate: value => (value.length ? '' : 'At least 1 tag is required'),
        value: [] as string[]
      }),
      title: new FormField({
        validate: value => (value ? '' : 'Title is required'),
        value: ''
      })
    }

    this.updateField = this.updateField.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  public componentWillMount() {
    this.prepopulateForm()
  }

  public componentWillReact() {
    this.prepopulateForm()
  }

  public render() {
    const { body, category, published, tags, title } = this.form

    return (
      <PostForm onSubmit={this.submitForm}>
        {!this.selectedPost && <Loading />}

        {this.selectedPost && [
          <Input
            key="title"
            label="Title"
            name="title"
            value={title.value}
            error={title.error}
            onChange={this.updateField}
          />,
          <TextArea
            key="body"
            label="Body"
            name="body"
            value={body.value}
            error={body.error}
            onChange={this.updateField}
          />,
          <Select
            key="category"
            label="Category"
            name="category"
            value={category.value}
            options={[
              { label: 'Category 1', value: 'One' },
              { label: 'Category 2', value: 'Two' },
              { label: 'Category 3', value: 'Three' }
            ]}
            error={category.error}
            onChange={this.updateField}
          />,
          <Checkbox
            key="tags"
            label="Tags"
            name="tags"
            value={tags.value}
            options={[
              { label: 'Tag 1', value: '1' },
              { label: 'Tag 2', value: '2' },
              { label: 'Tag 3', value: '3' }
            ]}
            error={tags.error}
            onChange={this.updateField}
          />,
          <Radio
            key="published"
            label="Published"
            name="published"
            value={published.value}
            options={[
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' }
            ]}
            error={published.error}
            onChange={this.updateField}
          />,
          <Button
            key="submit"
            type="submit"
            primary={true}
            disabled={this.isSubmitting}
          >
            Submit
          </Button>,
          <LinkButton key="cancel" to={`/post/${this.selectedPost.id}`}>
            Cancel
          </LinkButton>
        ]}
      </PostForm>
    )
  }

  @action
  private prepopulateForm() {
    if (!this.isPrepopulated && this.selectedPost) {
      const form = this.form
      const { body, title } = this.selectedPost

      form.body.set(body)
      form.title.set(title)

      this.isPrepopulated = true
    }
  }

  @action
  private updateField(
    e: React.FormEvent<
      HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement
    >
  ) {
    const field = this.form[e.currentTarget.name]

    field.setOnChange(e)

    if (field.error) {
      field.validate()
    }
  }

  @action
  private async submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const hasErrors = Object.keys(this.form)
      .map(field => this.form[field].validate())
      .some(error => error)

    if (this.selectedPost && !hasErrors) {
      const { stores: { postStore, viewStore } } = this.injected
      const { id } = this.selectedPost
      const { body, title } = this.form

      this.isSubmitting = true
      await postStore.savePost(id, {
        body: body.value,
        title: title.value
      })
      this.isSubmitting = false

      viewStore.goTo(`/post/${id}`)
    }
  }
}

// Styles
const PostForm = styled.form`
  padding: 10px;
`

// Exports
export default PostEdit
