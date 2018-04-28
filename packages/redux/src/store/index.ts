// Dependencies
import {
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware,
} from 'redux'
import logger from 'redux-logger'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

// Reducers
import items, { IState as ItemsState } from './items'

// Type definitions
export interface IState {
  items: ItemsState
}

// Reducers
const reducers = {
  items,
}

// Middleware
const middleware: Middleware[] = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger)
}

// Store
const store = createStore(
  persistReducer({ key: 'persistStore', storage }, combineReducers(reducers)),
  applyMiddleware(...middleware),
)

// Exports
export default store
export const persistor = persistStore(store)
