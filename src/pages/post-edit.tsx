// Libraries
import { computed, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import FieldSet from '../lib/field-set'

// Components
import Button from '../components/button'
import { Input, TextArea } from '../components/form'
import Loading from '../components/loading'

// Interfaces
import { IStores } from '../stores'

// Definitions
interface IInjectedProps {
  stores: IStores
}
interface IPostFormFields {
  title: string
  body: string
}

// Styles
const PostForm = styled.form`
  padding: 10px;
`

// Page
@inject('stores')
@observer
class PostEdit extends React.Component<{}, {}> {
  @observable private postForm: FieldSet<IPostFormFields>
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

    this.postForm = new FieldSet(
      {
        body: '',
        title: ''
      },
      {
        body: (value: string) => (value.length ? '' : 'Body is required'),
        title: (value: string) => (value.length ? '' : 'Title is required')
      }
    )

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
    const { fields, errors } = this.postForm

    return (
      <PostForm onSubmit={this.submitForm}>
        {!this.selectedPost && <Loading />}

        {this.selectedPost && [
          <Input
            key="title"
            label="Title"
            name="title"
            value={fields.title}
            error={errors.title}
            onChange={this.updateField}
          />,
          <TextArea
            key="body"
            label="Body"
            name="body"
            value={fields.body}
            error={errors.body}
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
      const { body, title } = this.selectedPost

      this.postForm.setValues({
        body,
        title
      })

      this.isPrepopulated = true
    }
  }

  private updateField(e: React.FormEvent<HTMLFormElement>) {
    const { name, value } = e.currentTarget

    this.postForm.setValues({ [name]: value })

    if (this.postForm.errors[name]) {
      this.postForm.validate(name)
    }
  }

  private async submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (this.selectedPost && this.postForm.validate()) {
      const { stores: { postStore, viewStore } } = this.injected
      const { id } = this.selectedPost

      await postStore.savePost(id, this.postForm.fields)

      viewStore.goTo(`/post/${id}`)
    }
  }
}

// Exports
export default PostEdit
