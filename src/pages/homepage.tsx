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
const Posts = styled.section`
  display: grid;
  grid: auto / auto;
  grid-gap: 16px;
  padding: 40px 20px;

  @media (min-width: 425px) {
    grid-template-columns: repeat(2, auto);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, auto);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, auto);
  }
`
const Post = styled(Link)`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 12px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  background-color: white;
  overflow: hidden;
  text-decoration: none;
  color: black;
`
const PostImage = styled.img`
  width: 100%;
  object-fit: cover;
`
const PostContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px;
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
  color: dimgray;

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
@inject('stores')
@observer
class Homepage extends React.Component<{}, {}> {
  get injected() {
    return this.props as IInjectedProps
  }

  public render() {
    const { stores: { postStore: { list } } } = this.injected

    return (
      <Posts>
        {list.length === 0 && <Loading />}

        {list.map(post => {
          return (
            <Post key={post.id} to={`/post/${post.id}`}>
              <PostImage src="//unsplash.it/460/230" />

              <PostContent>
                <PostTitle>{post.title}</PostTitle>
                <PostAuthor>{post.author.name}</PostAuthor>
                <PostBody>{post.body}</PostBody>
              </PostContent>
            </Post>
          )
        })}
      </Posts>
    )
  }
}

// Exports
export default Homepage
