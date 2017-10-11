// Libraries
import { getParent, process, types } from 'mobx-state-tree'

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
    posts: types.map(Post)
  })
  .views(self => ({
    get stores() {
      return getParent(self)
    }
  }))
  .actions(self => {
    function updatePosts(json: IPost[]) {
      json.forEach(postJson => self.posts.put(postJson))
    }

    const getPosts = process(function*() {
      const json = yield self.stores.api.getPosts()
      updatePosts(json)
    })

    return {
      getPosts,
      updatePosts
    }
  })

// Exports
export { Post }
export default PostStore

export type IPost = typeof Post.Type
export type IPostStore = typeof PostStore.Type
