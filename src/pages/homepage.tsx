// Libraries
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'

// Components
import Layout from './layout'

// Interfaces
import { IPostStore } from '../stores/post-store'
import { IUserStore } from '../stores/user-store'

// Definitions
interface IProps {
  postStore?: IPostStore
  userStore?: IUserStore
}

// Styles
const tilesPerRow = (count: number) =>
  `width: calc(100% / ${count} - 2px - 16px)`

const Posts = styled.section`
  display: flex;
  flex-wrap: wrap;
`
const Post = styled.article`
  ${tilesPerRow(1)};
  display: flex;
  flex-direction: column;
  margin: 8px;
  border: solid black 1px;
  border-radius: 12px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  background-color: white;
  overflow: hidden;

  @media (min-width: 425px) {
    ${tilesPerRow(2)};
  }

  @media (min-width: 768px) {
    ${tilesPerRow(3)};
  }

  @media (min-width: 1280px) {
    ${tilesPerRow(4)};
  }
`
const PostContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px;
`
const PostImage = styled.img`
  display: block;
  width: 100%;
  object-fit: cover;
`
const PostTitle = styled.h2`
  margin: 0 0 8px;

  &::first-letter {
    text-transform: capitalize;
  }
`
const PostAuthor = styled.small`
  display: block;
  margin: 0 0 16px;
`
const PostBody = styled.div`
  position: relative;
  flex: 0 1 100%;

  &::first-letter {
    text-transform: capitalize;
  }

  &::after {
    position: absolute;
    top: 40%;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    content: '';
    pointer-events: none;
  }
`

// Page
class Homepage extends React.Component<IProps> {
  public componentWillMount() {
    this.props.postStore!.getPosts()
    this.props.userStore!.getUsers()
  }

  public render() {
    const { posts } = this.props.postStore!
    const { users } = this.props.userStore!

    return (
      <Layout>
        <Posts>
          {posts.map(post => {
            const author = users.find(user => user.id === post.userId)

            return (
              <Post key={post.id}>
                <PostImage src="//unsplash.it/460/230" />

                <PostContent>
                  <PostTitle>{post.title}</PostTitle>
                  <PostAuthor>{author && author.name}</PostAuthor>
                  <PostBody>{post.body}</PostBody>
                </PostContent>
              </Post>
            )
          })}
        </Posts>
      </Layout>
    )
  }
}

export default inject('postStore', 'userStore')(observer(Homepage))
