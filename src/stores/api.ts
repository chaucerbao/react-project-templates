// Definitions
type Fetch = typeof window.fetch

// API
class Api {
  private fetch: Fetch

  constructor(fetch: Fetch) {
    this.fetch = fetch
  }

  public async getPosts() {
    return (await fetch('//jsonplaceholder.typicode.com/posts')).json()
  }

  public async getComments(postId: number) {
    return (await fetch(
      `//jsonplaceholder.typicode.com/posts/${postId}/comments`
    )).json()
  }

  public async getUsers() {
    return (await fetch('//jsonplaceholder.typicode.com/users')).json()
  }
}

// Exports
export default Api
