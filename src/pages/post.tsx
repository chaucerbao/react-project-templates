// Libraries
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'

// Components
import Link from '../components/link'
import Loading from '../components/loading'

// Interfaces
import { IStores } from '../stores'

// Definitions
interface IInjectedProps {
  stores: IStores
}

// Styles
const Article = styled.article`
  padding: 40px 20px 0;
`
const Title = styled.h2`
  margin: 0;

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
const Comments = styled.section`
  padding: 0 20px 40px;
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
    const post = postStore._cache.get(viewStore.page.params.id)!

    return [
      <Article key="post">
        {!post && <Loading />}

        {post && [
          <Link key="edit-link" to={`/post/${post.id}/edit`}>
            Edit
          </Link>,
          <Title key="title">{post.title}</Title>,
          <Body key="body">{post.body}</Body>
        ]}
      </Article>,
      post && (
        <Comments key="comments">
          <h3>Comments</h3>

          {post.comments.map(comment => (
            <Comment key={comment.id}>
              {comment.body}
              <CommentAuthor>{comment.name}</CommentAuthor>
            </Comment>
          ))}
        </Comments>
      )
    ]
  }
}

// Exports
export default Post
