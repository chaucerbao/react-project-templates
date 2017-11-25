// Third-party dependencies
import { applySnapshot, flow, getParent, types } from 'mobx-state-tree'

// External models
import { User } from './user-store'

// External type definitions
interface IPostJson {
  body: string
  id: number
  title: string
  userId: number
}

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
    function updateCache(json: IPostJson | IPostJson[]) {
      const items = Array.isArray(json) ? json : [json]

      items.forEach(item => {
        const snapshot = (({ body, id, title, userId }) => ({
          author: userId,
          body,
          id,
          title
        }))(item)
        const node = self._cache.get(snapshot.id.toString())

        if (node) {
          applySnapshot(node, { ...snapshot, comments: node.comments })
        } else {
          self._cache.put(snapshot)
        }
      })
    }

    function selectPost(id: number) {
      self.selected = self._cache.get(id.toString())!

      return self.selected
    }

    const getPosts = flow(function*() {
      const { api, userStore } = self.stores

      yield userStore.getUsers()

      updateCache(yield api.getPosts())

      self.list.replace(
        self._cache.values().sort((a, b) => (a.id < b.id ? -1 : 1))
      )
    })

    const getPost = flow(function*(id: number, withComments: boolean) {
      const { api, userStore } = self.stores

      yield userStore.getUsers()

      selectPost(id)
      updateCache(yield api.getPost(id))
      const post = selectPost(id)

      if (withComments) {
        post.comments.replace(yield api.getComments(id))
      }
    })

    const savePost = flow(function*(id: number, body: Partial<IPostJson>) {
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
export default PostStore
export { Comment, Post }

export type IComment = typeof Comment.Type
export type IPost = typeof Post.Type
export type IPostStore = typeof PostStore.Type
export { IPostJson }
