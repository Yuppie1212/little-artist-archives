import type { Dispatch } from 'redux'
import {
  fetchArtworksApi,
  fetchArtworkApi,
  createArtworkApi,
  updateArtworkApi,
  deleteArtworkApi,
} from '../apis/artworksApi'
import type { Artwork } from '../types'
import {
  ARTWORKS_REQUEST,
  ARTWORKS_SUCCESS,
  ARTWORKS_FAILURE,
  ARTWORK_FETCH_SUCCESS,
  ARTWORK_DELETE_SUCCESS,
} from './types'

export type ArtworksAction =
  | { type: typeof ARTWORKS_REQUEST }
  | { type: typeof ARTWORKS_SUCCESS; payload: Artwork[] }
  | { type: typeof ARTWORKS_FAILURE; payload: string }
  | { type: typeof ARTWORK_FETCH_SUCCESS; payload: Artwork }
  | { type: typeof ARTWORK_DELETE_SUCCESS; payload: number }

export const fetchArtworks =
  (childId: number) => async (dispatch: Dispatch<ArtworksAction>) => {
    dispatch({ type: ARTWORKS_REQUEST })
    try {
      const res = await fetchArtworksApi(childId)
      dispatch({ type: ARTWORKS_SUCCESS, payload: res.data.artworks })
    } catch {
      dispatch({ type: ARTWORKS_FAILURE, payload: '作品一覧の取得に失敗しました' })
    }
  }

export const fetchArtwork =
  (childId: number, id: number) => async (dispatch: Dispatch<ArtworksAction>) => {
    dispatch({ type: ARTWORKS_REQUEST })
    try {
      const res = await fetchArtworkApi(childId, id)
      dispatch({ type: ARTWORK_FETCH_SUCCESS, payload: res.data.artwork })
    } catch {
      dispatch({ type: ARTWORKS_FAILURE, payload: '作品の取得に失敗しました' })
    }
  }

export const createArtwork =
  (childId: number, formData: FormData) => async (dispatch: Dispatch<ArtworksAction>) => {
    dispatch({ type: ARTWORKS_REQUEST })
    try {
      const res = await createArtworkApi(childId, formData)
      dispatch({ type: ARTWORK_FETCH_SUCCESS, payload: res.data.artwork })
      return res.data.artwork
    } catch {
      dispatch({ type: ARTWORKS_FAILURE, payload: '作品の登録に失敗しました' })
      return null
    }
  }

export const updateArtwork =
  (childId: number, id: number, formData: FormData) =>
  async (dispatch: Dispatch<ArtworksAction>) => {
    dispatch({ type: ARTWORKS_REQUEST })
    try {
      const res = await updateArtworkApi(childId, id, formData)
      dispatch({ type: ARTWORK_FETCH_SUCCESS, payload: res.data.artwork })
      return res.data.artwork
    } catch {
      dispatch({ type: ARTWORKS_FAILURE, payload: '作品の更新に失敗しました' })
      return null
    }
  }

export const deleteArtwork =
  (childId: number, id: number) => async (dispatch: Dispatch<ArtworksAction>) => {
    try {
      await deleteArtworkApi(childId, id)
      dispatch({ type: ARTWORK_DELETE_SUCCESS, payload: id })
    } catch {
      dispatch({ type: ARTWORKS_FAILURE, payload: '削除に失敗しました' })
    }
  }
