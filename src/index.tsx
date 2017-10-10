// Libraries
import { Provider } from 'mobx-react'
import * as React from 'react'
import { render } from 'react-dom'
import registerServiceWorker from './register-service-worker'

// Stores
import Api from './stores/api'
import PostStore from './stores/post-store'
import UserStore from './stores/user-store'

// Router
import Router from './router'

// Global styles
import './styles/global'

// Environment
const api = new Api(window.fetch)

render(
  <Provider
    postStore={PostStore.create(
      { posts: [], selectedPost: undefined },
      { api }
    )}
    userStore={UserStore.create({ users: [] }, { api })}
  >
    <Router />
  </Provider>,
  document.getElementById('root') as HTMLElement
)

registerServiceWorker()
