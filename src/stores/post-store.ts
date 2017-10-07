import { process, types } from 'mobx-state-tree'

const Post = types.model('Post', {
  body: types.string,
  id: types.identifier(types.number),
  title: types.string,
  userId: types.number
})

const PostStore = types
  .model('PostStore', {
    posts: types.array(Post),
    selectedPost: types.maybe(types.reference(Post))
  })
  .actions(self => ({
    fetchPosts: process(function*() {
      const response = yield fetch('//jsonplaceholder.typicode.com/posts')
      self.posts = yield response.json()

      return self.posts
    })
  }))

export type IPostStore = typeof PostStore.Type

export default PostStore
