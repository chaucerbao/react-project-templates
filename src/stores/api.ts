// Type definitions
type Fetcher = typeof window.fetch

// External type definitions
import { IPostJson } from './post-store'

// API
class Api {
  private fetcher: Fetcher

  constructor(fetcher: Fetcher) {
    this.fetcher = fetcher
  }

  public getPosts() {
    return this.fetch('https://jsonplaceholder.typicode.com/posts')
  }

  public getPost(id: number) {
    return this.fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  }

  public getComments(postId: number) {
    return this.fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    )
  }

  public savePost(id: number, body: IPostJson) {
    return this.fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      body: JSON.stringify(body),
      method: 'PUT'
    })
  }

  public getUsers() {
    return this.fetch('https://jsonplaceholder.typicode.com/users')
  }

  private async fetch(input: RequestInfo, init?: RequestInit) {
    return (await this.fetcher(input, init)).json()
  }
}

// Exports
export default Api
