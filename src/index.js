// Dependencies
import React from 'react'
import {render} from 'react-dom'

// Router
import Router from './router'
import stores from './stores'

// Global styles
import 'normalize.css/normalize.css'
import './styles/global'

// Mount
render(<Router stores={stores} />, document.getElementById('root'))
