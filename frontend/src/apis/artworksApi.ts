import client from './client'
import type { Artwork } from '../types'

export const fetchArtworksApi = (childId: number) =>
  client.get<{ artworks: Artwork[] }>(`/children/${childId}/artworks`)

export const fetchArtworkApi = (childId: number, id: number) =>
  client.get<{ artwork: Artwork }>(`/children/${childId}/artworks/${id}`)

export const createArtworkApi = (childId: number, formData: FormData) =>
  client.post<{ artwork: Artwork }>(`/children/${childId}/artworks`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export const updateArtworkApi = (childId: number, id: number, formData: FormData) =>
  client.patch<{ artwork: Artwork }>(`/children/${childId}/artworks/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export const deleteArtworkApi = (childId: number, id: number) =>
  client.delete<{ message: string }>(`/children/${childId}/artworks/${id}`)
