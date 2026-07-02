import type { Artwork } from '../types'
import {
  ARTWORKS_REQUEST,
  ARTWORKS_SUCCESS,
  ARTWORKS_FAILURE,
  ARTWORK_FETCH_SUCCESS,
  ARTWORK_DELETE_SUCCESS,
} from '../actions/types'

interface ArtworksState {
  list: Artwork[]
  current: Artwork | null
  loading: boolean
  error: string | null
}

const initialState: ArtworksState = {
  list: [],
  current: null,
  loading: false,
  error: null,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const artworksReducer = (state = initialState, action: any): ArtworksState => {
  switch (action.type) {
    case ARTWORKS_REQUEST:
      return { ...state, loading: true, error: null }

    case ARTWORKS_SUCCESS:
      return { ...state, loading: false, list: action.payload }

    case ARTWORKS_FAILURE:
      return { ...state, loading: false, error: action.payload }

    case ARTWORK_FETCH_SUCCESS:
      return { ...state, loading: false, current: action.payload }

    case ARTWORK_DELETE_SUCCESS:
      return {
        ...state,
        list: state.list.filter((a) => a.id !== action.payload),
        current: state.current?.id === action.payload ? null : state.current,
      }

    default:
      return state
  }
}

export type { ArtworksState }
export default artworksReducer
