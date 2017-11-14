// Libraries
import { applySnapshot, getParent, process, types } from 'mobx-state-tree'

// Interfaces
import { IPostJson } from './api'
import { User } from './user-store'

// Models
const Comment = types.model('Comment', {
  body: types.string,
  email: types.string,
  id: types.identifier(types.number),
  name: types.string
})
const Post = types.model('Post', {
  author: types.reference(User),
  body: types.string,
  comments: types.optional(types.array(Comment), []),
  id: types.identifier(types.number),
  title: types.string
})

// Store
const PostStore = types
  .model('PostStore', {
    _cache: types.map(Post),
    list: types.array(types.reference(Post)),
    selected: types.maybe(types.reference(Post))
  })
  .views(self => ({
    get stores() {
      return getParent(self)
    }
  }))
  .actions(self => {
    function updateCache(postsJson: IPostJson[]) {
      postsJson.forEach(json => {
        const snapshot = (({ body, id, title, userId }) => ({
          author: userId,
          body,
          id,
          title
        }))(json)
        const node = self._cache.get(snapshot.id.toString())

        if (node) {
          applySnapshot(node, snapshot)
        } else {
          self._cache.put(snapshot)
        }
      })
    }

    function selectPost(id: number) {
      self.selected = self._cache.get(id.toString())!

      return self.selected
    }

    const getPosts = process(function*() {
      const { userStore } = self.stores

      yield userStore.getUsers()

      updateCache(yield self.stores.api.getPosts())

      self.list.replace(
        self._cache.values().sort((a, b) => (a.id < b.id ? -1 : 1))
      )
    })

    const getPost = process(function*(id: number, withComments: boolean) {
      const { api, userStore } = self.stores

      yield userStore.getUsers()

      selectPost(id)
      updateCache([yield api.getPost(id)])
      const post = selectPost(id)

      if (withComments) {
        post.comments.replace(yield api.getComments(id))
      }
    })

    const savePost = process(function*(id: number, body: Partial<IPostJson>) {
      yield self.stores.api.savePost(id, body)
    })

    return {
      getPost,
      getPosts,
      savePost,
      selectPost,
      updateCache
    }
  })

// Exports
export { Comment, Post }
export default PostStore

export type IComment = typeof Comment.Type
export type IPost = typeof Post.Type
export type IPostStore = typeof PostStore.Type
