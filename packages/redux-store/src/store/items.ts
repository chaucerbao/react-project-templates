// Dependencies
import produce from 'immer'
import { Dispatch } from 'redux'
import { createAction, handleActions, Action } from 'redux-actions'
import { createSelector } from 'reselect'
import { State as StoreState } from '../store'
import { orderBy } from '../lib/helper'

// Type definitions
export interface State {
  _cache: { [key: number]: Item }
  isLoading: boolean
}

export interface Item {
  id: number
  name: string
}

// Default state
const defaultState = {
  _cache: {},
  isLoading: false
}

// Selectors
export const selectItems = createSelector(
  (state: StoreState) => state.items._cache,
  items =>
    orderBy<Item>('name')(Object.values(items))
)
export const selectItem = (state: StoreState, id: Item['id']) => state.items._cache[id]
export const selectIsLoading = (state: StoreState) => state.items.isLoading

// Actions
const setLoading = createAction<boolean>('ITEMS/SET_LOADING')
export const cacheItems = createAction<Item[]>('ITEMS/CACHE_ITEMS')

// Thunk actions
export const fetchItems = () => async (
  dispatch: Dispatch<StoreState>,
  getState: () => StoreState
) => {
  if (Object.keys(getState().items._cache).length > 0) return

  dispatch(setLoading(true))

  dispatch(
    cacheItems(
      await fetch('http://jsonplaceholder.typicode.com/users').then(response =>
        response.json()
      )
    )
  )

  dispatch(setLoading(false))
}

// Reducer
export default handleActions<State, any>(
  {
    [setLoading.toString()]: (state, { payload }: Action<boolean>) =>
      produce(state, draft => {
        draft.isLoading = !!payload
      }),

    [cacheItems.toString()]: (state, { payload }: Action<Item[]>) =>
      produce(state, draft => {
        if (payload) {
          payload.forEach(item => {
            draft._cache[item.id] = { ...draft._cache[item.id], ...item }
          })
        }
      })
  },
  defaultState
)
