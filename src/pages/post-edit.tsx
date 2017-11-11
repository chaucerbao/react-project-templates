// Libraries
import { computed, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import Form from '../lib/form'

// Components
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
  private isFormPopulated = false

  @observable private postForm: Form<IPostFormFields>

  get injected() {
    return this.props as IInjectedProps
  }

  @computed
  get post() {
    const { stores: { postStore, viewStore } } = this.injected

    return postStore.posts.get(viewStore.page.params.id)!
  }

  constructor() {
    super()

    this.postForm = new Form(
      {
        body: '',
        title: ''
      },
      {
        body: (value: string) => (value.length ? '' : 'Body is required'),
        title: (value: string) => (value.length ? '' : 'Title is required')
      }
    )

    this.setPostFormValue = this.setPostFormValue.bind(this)
    this.submitPostForm = this.submitPostForm.bind(this)
  }

  public componentWillMount() {
    this.componentWillReact()
  }

  public componentWillReact() {
    if (!this.isFormPopulated && this.post) {
      const { body, title } = this.post

      this.postForm.setValues({
        body,
        title
      })

      this.isFormPopulated = true
    }
  }

  public render() {
    const isPostLoaded = !!this.post
    const { fields, errors } = this.postForm

    return (
      <PostForm onSubmit={this.submitPostForm}>
        {!isPostLoaded && <Loading />}

        {isPostLoaded && [
          <Input
            key="title"
            label="Title"
            name="title"
            value={fields.title}
            error={errors.title}
            onChange={this.setPostFormValue}
          />,
          <TextArea
            key="body"
            label="Body"
            name="body"
            value={fields.body}
            error={errors.body}
            onChange={this.setPostFormValue}
          />
        ]}
      </PostForm>
    )
  }

  private setPostFormValue(e: React.FormEvent<HTMLFormElement>) {
    const { name, value } = e.currentTarget

    this.postForm.setValues({ [name]: value })

    if (this.postForm.errors[name]) {
      this.postForm.validate(name)
    }
  }

  private submitPostForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (this.postForm.validate()) {
      // Success
    }
  }
}

// Exports
export default PostEdit
