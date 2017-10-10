// Libraries
import { getEnv, process, types } from 'mobx-state-tree'

// Model
const Post = types.model('Post', {
  body: types.string,
  id: types.identifier(types.number),
  title: types.string,
  userId: types.number
})

// Store
const PostStore = types
  .model('PostStore', {
    posts: types.array(Post),
    selectedPost: types.maybe(types.reference(Post))
  })
  .actions(self => ({
    getPosts: process(function*() {
      self.posts = yield getEnv(self).api.getPosts()
    })
  }))

export type IPostStore = typeof PostStore.Type

export default PostStore
