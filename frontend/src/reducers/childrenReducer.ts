import type { Child } from '../types'
import {
  CHILDREN_REQUEST,
  CHILDREN_SUCCESS,
  CHILDREN_FAILURE,
  CHILD_FETCH_SUCCESS,
  CHILD_DELETE_SUCCESS,
} from '../actions/types'

interface ChildrenState {
  list: Child[]
  current: Child | null
  loading: boolean
  error: string | null
}

const initialState: ChildrenState = {
  list: [],
  current: null,
  loading: false,
  error: null,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const childrenReducer = (state = initialState, action: any): ChildrenState => {
  switch (action.type) {
    case CHILDREN_REQUEST:
      return { ...state, loading: true, error: null }

    case CHILDREN_SUCCESS:
      return { ...state, loading: false, list: action.payload }

    case CHILDREN_FAILURE:
      return { ...state, loading: false, error: action.payload }

    case CHILD_FETCH_SUCCESS:
      return { ...state, loading: false, current: action.payload }

    case CHILD_DELETE_SUCCESS:
      return {
        ...state,
        list: state.list.filter((c) => c.id !== action.payload),
        current: state.current?.id === action.payload ? null : state.current,
      }

    default:
      return state
  }
}

export type { ChildrenState }
export default childrenReducer
