// Libraries
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'

// Components
import Loading from '../components/loading'

// Interfaces
import { IStores } from '../stores'

// Definitions
interface IInjectedProps {
  stores: IStores
}

// Styles
const Title = styled.h2`
  &::first-letter {
    text-transform: capitalize;
  }
`
const Body = styled.div`
  position: relative;
  flex: 0 1 100%;

  &::first-letter {
    text-transform: capitalize;
  }
`
const Comment = styled.div`
  margin: 10px;
  border: 1px solid black;
  padding: 10px;

  &::first-letter {
    text-transform: capitalize;
  }
`
const CommentAuthor = styled.div`
  font-style: italic;

  &::before {
    content: '- ';
  }

  &::first-letter {
    text-transform: capitalize;
  }
`

// Page
@inject('stores')
@observer
class Post extends React.Component<{}, {}> {
  get injected() {
    return this.props as IInjectedProps
  }

  public render() {
    const { stores: { postStore, viewStore } } = this.injected
    const post = postStore.posts.get(viewStore.page.params.id)!

    return [
      <article key="post">
        {!post && <Loading />}

        {post && [
          <Title key="title">{post.title}</Title>,
          <Body key="body">{post.body}</Body>
        ]}
      </article>,
      post && (
        <section key="comments">
          <h3>Comments</h3>

          {post.comments.map(comment => (
            <Comment key={comment.id}>
              {comment.body}
              <CommentAuthor>{comment.name}</CommentAuthor>
            </Comment>
          ))}
        </section>
      )
    ]
  }
}

// Exports
export default Post
