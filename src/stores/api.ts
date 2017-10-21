// Definitions
type Fetcher = typeof window.fetch

// API
class Api {
  private fetcher: Fetcher

  constructor(fetcher: Fetcher) {
    this.fetcher = fetcher
  }

  public getPosts() {
    return this.fetch('//jsonplaceholder.typicode.com/posts')
  }

  public getComments(postId: number) {
    return this.fetch(`//jsonplaceholder.typicode.com/posts/${postId}/comments`)
  }

  public getUsers() {
    return this.fetch('//jsonplaceholder.typicode.com/users')
  }

  private async fetch(input: RequestInfo, init?: RequestInit) {
    return (await this.fetcher(input, init)).json()
  }
}

// Exports
export default Api
