import client from './client'
import type { User } from '../types'

export interface SignupParams {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export const loginApi = (email: string, password: string) =>
  client.post<{ user: User }>('/auth/login', { email, password })

export const logoutApi = () =>
  client.delete<{ message: string }>('/auth/logout')

export const signupApi = (params: SignupParams) =>
  client.post<{ user: User }>('/auth/signup', { user: params })

export const meApi = () =>
  client.get<{ user: User }>('/auth/me')
