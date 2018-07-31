// Dependencies
import produce from 'immer'
import { Dispatch } from 'redux'
import { Action, createAction, handleActions } from 'redux-actions'
import { createSelector } from 'reselect'
import { orderBy } from '../lib/helper'
import { IState as StoreState } from '../store'
import * as api from './api'

// Type definitions
export interface IState {
  _cache: { [key: number]: IItem }
  isLoading: boolean
}

export interface IItem {
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
  items => orderBy<IItem>('name')(Object.values(items))
)
export const selectItem = (state: StoreState, id: IItem['id']) =>
  state.items._cache[id]
export const selectIsLoading = (state: StoreState) => state.items.isLoading

// Actions
const setLoading = createAction<boolean>('ITEMS/SET_LOADING')
export const cacheItems = createAction<IItem[]>('ITEMS/CACHE_ITEMS')

// Thunk actions
export const fetchItems = () => async (
  dispatch: Dispatch<Action<any>>,
  getState: () => StoreState
) => {
  if (Object.keys(getState().items._cache).length > 0) {
    return
  }

  dispatch(setLoading(true))
  dispatch(cacheItems(await api.getItems()))
  dispatch(setLoading(false))
}

// Reducer
export default handleActions<IState, any>(
  {
    [setLoading.toString()]: (state, { payload }: Action<boolean>) =>
      produce(state, draft => {
        draft.isLoading = !!payload
      }),

    [cacheItems.toString()]: (state, { payload }: Action<IItem[]>) =>
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
