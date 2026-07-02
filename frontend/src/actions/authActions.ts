import type { Dispatch } from 'redux'
import { loginApi, logoutApi, signupApi, meApi } from '../apis/authApi'
import type { SignupParams } from '../apis/authApi'
import type { User } from '../types'
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_LOGOUT,
  AUTH_CLEAR_ERROR,
} from './types'

export type AuthAction =
  | { type: typeof AUTH_REQUEST }
  | { type: typeof AUTH_SUCCESS; payload: User }
  | { type: typeof AUTH_FAILURE; payload: string }
  | { type: typeof AUTH_LOGOUT }
  | { type: typeof AUTH_CLEAR_ERROR }

export const login =
  (email: string, password: string) => async (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: AUTH_REQUEST })
    try {
      const res = await loginApi(email, password)
      dispatch({ type: AUTH_SUCCESS, payload: res.data.user })
    } catch {
      dispatch({ type: AUTH_FAILURE, payload: 'メールアドレスまたはパスワードが違います' })
    }
  }

export const logout = () => async (dispatch: Dispatch<AuthAction>) => {
  try {
    await logoutApi()
  } finally {
    dispatch({ type: AUTH_LOGOUT })
  }
}

export const signup =
  (params: SignupParams) => async (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: AUTH_REQUEST })
    try {
      const res = await signupApi(params)
      dispatch({ type: AUTH_SUCCESS, payload: res.data.user })
    } catch {
      dispatch({ type: AUTH_FAILURE, payload: '登録に失敗しました' })
    }
  }

export const fetchCurrentUser = () => async (dispatch: Dispatch<AuthAction>) => {
  dispatch({ type: AUTH_REQUEST })
  try {
    const res = await meApi()
    dispatch({ type: AUTH_SUCCESS, payload: res.data.user })
  } catch {
    dispatch({ type: AUTH_FAILURE, payload: '' })
  }
}

export const clearAuthError = (): AuthAction => ({ type: AUTH_CLEAR_ERROR })
