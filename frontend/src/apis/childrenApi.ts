import client from './client'
import type { Child } from '../types'

export const fetchChildrenApi = () =>
  client.get<{ children: Child[] }>('/children')

export const fetchChildApi = (id: number) =>
  client.get<{ child: Child }>(`/children/${id}`)

export const createChildApi = (formData: FormData) =>
  client.post<{ child: Child }>('/children', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export const updateChildApi = (id: number, formData: FormData) =>
  client.patch<{ child: Child }>(`/children/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export const deleteChildApi = (id: number) =>
  client.delete<{ message: string }>(`/children/${id}`)
