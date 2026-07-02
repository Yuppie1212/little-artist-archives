import type { Dispatch } from 'redux'
import {
  fetchChildrenApi,
  fetchChildApi,
  createChildApi,
  updateChildApi,
  deleteChildApi,
} from '../apis/childrenApi'
import type { Child } from '../types'
import {
  CHILDREN_REQUEST,
  CHILDREN_SUCCESS,
  CHILDREN_FAILURE,
  CHILD_FETCH_SUCCESS,
  CHILD_DELETE_SUCCESS,
} from './types'

export type ChildrenAction =
  | { type: typeof CHILDREN_REQUEST }
  | { type: typeof CHILDREN_SUCCESS; payload: Child[] }
  | { type: typeof CHILDREN_FAILURE; payload: string }
  | { type: typeof CHILD_FETCH_SUCCESS; payload: Child }
  | { type: typeof CHILD_DELETE_SUCCESS; payload: number }

export const fetchChildren = () => async (dispatch: Dispatch<ChildrenAction>) => {
  dispatch({ type: CHILDREN_REQUEST })
  try {
    const res = await fetchChildrenApi()
    dispatch({ type: CHILDREN_SUCCESS, payload: res.data.children })
  } catch {
    dispatch({ type: CHILDREN_FAILURE, payload: 'こどもの一覧取得に失敗しました' })
  }
}

export const fetchChild = (id: number) => async (dispatch: Dispatch<ChildrenAction>) => {
  dispatch({ type: CHILDREN_REQUEST })
  try {
    const res = await fetchChildApi(id)
    dispatch({ type: CHILD_FETCH_SUCCESS, payload: res.data.child })
  } catch {
    dispatch({ type: CHILDREN_FAILURE, payload: 'こどもの取得に失敗しました' })
  }
}

export const createChild =
  (formData: FormData) => async (dispatch: Dispatch<ChildrenAction>) => {
    dispatch({ type: CHILDREN_REQUEST })
    try {
      const res = await createChildApi(formData)
      dispatch({ type: CHILD_FETCH_SUCCESS, payload: res.data.child })
      return res.data.child
    } catch {
      dispatch({ type: CHILDREN_FAILURE, payload: 'こどもの登録に失敗しました' })
      return null
    }
  }

export const updateChild =
  (id: number, formData: FormData) => async (dispatch: Dispatch<ChildrenAction>) => {
    dispatch({ type: CHILDREN_REQUEST })
    try {
      const res = await updateChildApi(id, formData)
      dispatch({ type: CHILD_FETCH_SUCCESS, payload: res.data.child })
      return res.data.child
    } catch {
      dispatch({ type: CHILDREN_FAILURE, payload: 'こどもの更新に失敗しました' })
      return null
    }
  }

export const deleteChild = (id: number) => async (dispatch: Dispatch<ChildrenAction>) => {
  try {
    await deleteChildApi(id)
    dispatch({ type: CHILD_DELETE_SUCCESS, payload: id })
  } catch {
    dispatch({ type: CHILDREN_FAILURE, payload: '削除に失敗しました' })
  }
}
