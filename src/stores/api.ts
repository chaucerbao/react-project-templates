// Definitions
type Fetch = typeof window.fetch

// Class
class Api {
  private fetch: Fetch

  constructor(fetch: Fetch) {
    this.fetch = fetch
  }

  public async getPosts() {
    const response = await fetch('//jsonplaceholder.typicode.com/posts')

    return await response.json()
  }

  public async getUsers() {
    const response = await fetch('//jsonplaceholder.typicode.com/users')

    return await response.json()
  }
}

export default Api
