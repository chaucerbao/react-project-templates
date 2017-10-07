// Libraries
import { inject, observer } from 'mobx-react'
import * as React from 'react'

// Interfaces
import { IPostStore } from '../stores/post-store'
import { IUserStore } from '../stores/user-store'

// Definitions
interface IProps {
  postStore?: IPostStore
  userStore?: IUserStore
}

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
        <h1>Here are some posts</h1>

        {posts.map(post => {
          const author = users.find(user => user.id === post.userId)

          return (
            <article key={post.id}>
              <h2>{post.title}</h2>
              <small>{author && author.name}</small>
              <div>{post.body}</div>
            </article>
          )
        })}
      </section>
    )
  }
}

export default inject('postStore', 'userStore')(observer(Homepage))
