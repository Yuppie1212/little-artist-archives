export interface User {
  id: number
  name: string
  email: string
  gender: string | null
  birthday: string | null
}

export interface Child {
  id: number
  name: string
  birthday: string
  gender: string
  icon_url: string | null
  artworks_count: number
  created_at: string
}

export interface ArtworkPhoto {
  signed_id: string
  url: string
}

export interface Artwork {
  id: number
  title: string
  drawn_at: string
  what_drawn: string | null
  why_drawn: string | null
  child_comment: string | null
  parent_memo: string | null
  photos: ArtworkPhoto[]
  photo_urls: string[]
  created_at: string
}
