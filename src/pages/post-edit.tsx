// Libraries
import { computed, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'

// Components
import Button from '../components/button'
import { Checkbox, Input, TextArea } from '../components/form'
import Loading from '../components/loading'

// Helpers
import FormField from '../lib/form-field'

// Interfaces
import { IStores } from '../stores'

// Definitions
interface IInjectedProps {
  stores: IStores
}
interface IForm {
  body: FormField<string>
  tags: FormField<number[]>
  title: FormField<string>
}

// Styles
const PostForm = styled.form`
  padding: 10px;
`

// Page
@inject('stores')
@observer
class PostEdit extends React.Component<{}, {}> {
  @observable private form: IForm
  private isPrepopulated = false

  get injected() {
    return this.props as IInjectedProps
  }

  @computed
  get selectedPost() {
    return this.injected.stores.postStore.selected
  }

  constructor() {
    super()

    this.form = {
      body: new FormField('', value => (value ? '' : 'Body is required')),
      tags: new FormField(
        [],
        value => (value.length ? '' : 'At least 1 tag is required')
      ),
      title: new FormField('', value => (value ? '' : 'Title is required'))
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
    const { body, tags, title } = this.form

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
          <Checkbox
            key="tags"
            label="Tags"
            name="tags"
            value={tags.value}
            options={[[1, 'Tag 1'], [2, 'Tag 2'], [3, 'Tag 3']]}
            error={tags.error}
            onChange={this.updateField}
          />,
          <Button primary={true} key="submit" type="submit">
            Submit
          </Button>,
          <Button key="cancel" to={`/post/${this.selectedPost.id}`}>
            Cancel
          </Button>
        ]}
      </PostForm>
    )
  }

  private prepopulateForm() {
    if (!this.isPrepopulated && this.selectedPost) {
      const form = this.form
      const { body, title } = this.selectedPost

      form.body.set(body)
      form.title.set(title)

      this.isPrepopulated = true
    }
  }

  private updateField(e: React.FormEvent<HTMLFormElement>) {
    const { name, value } = e.currentTarget
    const field = this.form[name]

    if (Array.isArray(field.value)) {
      field.toggle(value)
    } else {
      field.set(value)
    }

    if (field.error) {
      field.validate()
    }
  }

  private async submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const hasErrors = Object.keys(this.form)
      .map(field => this.form[field].validate())
      .some(error => error)

    if (this.selectedPost && !hasErrors) {
      const { stores: { postStore, viewStore } } = this.injected
      const { id } = this.selectedPost
      const { body, title } = this.form

      await postStore.savePost(id, {
        body: body.value,
        title: title.value
      })

      viewStore.goTo(`/post/${id}`)
    }
  }
}

// Exports
export default PostEdit
