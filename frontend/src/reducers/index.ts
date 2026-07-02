import { combineReducers, createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import authReducer from './authReducer'
import childrenReducer from './childrenReducer'
import artworksReducer from './artworksReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  children: childrenReducer,
  artworks: artworksReducer,
})

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
