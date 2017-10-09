// Libraries
import { Provider } from 'mobx-react'
import * as React from 'react'
import { render } from 'react-dom'
import registerServiceWorker from './register-service-worker'

// Stores
import PostStore from './stores/post-store'
import UserStore from './stores/user-store'

// Pages
import Homepage from './pages/homepage'

// Global styles
import './styles/global'

render(
  <Provider
    postStore={PostStore.create({ posts: [], selectedPost: undefined })}
    userStore={UserStore.create({ users: [] })}
  >
    <Homepage />
  </Provider>,
  document.getElementById('root') as HTMLElement
)

registerServiceWorker()
