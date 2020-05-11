import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

import clientMiddleware from './middleware/client'
import { reducers } from './ducks'

export function initializeStore (initialState) {
  return createStore(
    combineReducers({ ...reducers, form: formReducer }),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware, clientMiddleware()))
  )
}