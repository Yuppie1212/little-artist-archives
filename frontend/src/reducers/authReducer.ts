import type { User } from '../types'
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_LOGOUT,
  AUTH_CLEAR_ERROR,
} from '../actions/types'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  initialized: boolean
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  initialized: false,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { ...state, loading: true, error: null }

    case AUTH_SUCCESS:
      return { ...state, loading: false, user: action.payload, initialized: true }

    case AUTH_FAILURE:
      return { ...state, loading: false, error: action.payload || null, initialized: true }

    case AUTH_LOGOUT:
      return { ...initialState, initialized: true }

    case AUTH_CLEAR_ERROR:
      return { ...state, error: null }

    default:
      return state
  }
}

export type { AuthState }
export default authReducer
