// Libraries
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'

// Interfaces
import { IPostStore } from '../stores/post-store'
import { IUserStore } from '../stores/user-store'

// Definitions
interface IProps {
  postStore?: IPostStore
  userStore?: IUserStore
}

// Styles
const PostTitle = styled.h2`
  color: black;
`
const PostAuthor = styled.small`
  color: black;
`
const PostBody = styled.div`
  color: black;
`

// Page
class Homepage extends React.Component<IProps> {
  public componentWillMount() {
    this.props.postStore!.fetchPosts()
    this.props.userStore!.fetchUsers()
  }

  public render() {
    const { posts } = this.props.postStore!
    const { users } = this.props.userStore!

    return (
      <section>
        {posts.map(post => {
          const author = users.find(user => user.id === post.userId)

          return (
            <article key={post.id}>
              <PostTitle>{post.title}</PostTitle>
              <PostAuthor>{author && author.name}</PostAuthor>
              <PostBody>{post.body}</PostBody>
            </article>
          )
        })}
      </section>
    )
  }
}

export default inject('postStore', 'userStore')(observer(Homepage))
