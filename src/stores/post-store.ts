// Libraries
import { getParent, process, types } from 'mobx-state-tree'

// Interfaces
import { User } from './user-store'

// Models
const Comment = types.model('Comment', {
  body: types.string,
  email: types.string,
  id: types.identifier(types.number),
  name: types.string,
  postId: types.number
})
const Post = types.model('Post', {
  author: types.reference(User),
  body: types.string,
  comments: types.optional(types.array(types.reference(Comment)), []),
  id: types.identifier(types.number),
  title: types.string,
  userId: types.number
})

// Store
const PostStore = types
  .model('PostStore', {
    comments: types.map(Comment),
    posts: types.map(Post)
  })
  .views(self => ({
    get stores() {
      return getParent(self)
    }
  }))
  .actions(self => {
    function updatePosts(json: IPost[]) {
      json.forEach(postJson => {
        self.posts.put({ ...postJson, author: postJson.userId })
      })
    }

    function updateComments(postId: number, json: IComment[]) {
      const post = self.posts.get(postId.toString())

      if (!post) {
        return
      }

      json.forEach(commentJson => {
        const comment = self.comments
          .put(commentJson)
          .get(commentJson.id.toString())!

        post.comments.push(comment)
      })
    }

    const getPosts = process(function*() {
      if (self.posts.size === 0) {
        const json = yield self.stores.api.getPosts()
        updatePosts(json)
      }
    })

    const getComments = process(function*(postId: number) {
      const post = self.posts.get(postId.toString())

      if (post && post.comments.length === 0) {
        const json = yield self.stores.api.getComments(postId)
        updateComments(postId, json)
      }
    })

    return {
      getComments,
      getPosts,
      updateComments,
      updatePosts
    }
  })

// Exports
export { Comment, Post }
export default PostStore

export type IComment = typeof Comment.Type
export type IPost = typeof Post.Type
export type IPostStore = typeof PostStore.Type
