import type { Artwork } from '../types'
import ArtworkCard from './ArtworkCard'

interface Props {
  artworks: Artwork[]
  childId: number
  loading: boolean
  error: string | null
  onArtworkClick: (id: number) => void
  onArtworkDelete: (id: number) => void
}

export default function ArtworkList({
  artworks,
  childId,
  loading,
  error,
  onArtworkClick,
  onArtworkDelete,
}: Props) {
  if (loading) {
    return (
      <div className="empty-state">
        <span className="empty-icon" style={{ animation: 'none' }}>⏳</span>
        <p>読み込み中...</p>
      </div>
    )
  }

  if (error) {
    return <div className="error-box" style={{ textAlign: 'center' }}>{error}</div>
  }

  if (artworks.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">🎨</span>
        <p>まだ作品が登録されていません</p>
        <a href={`/children/${childId}/artworks/new`} className="btn btn-primary">
          作品を追加する
        </a>
      </div>
    )
  }

  return (
    <div className="artworks-grid">
      {artworks.map((artwork) => (
        <ArtworkCard
          key={artwork.id}
          artwork={artwork}
          childId={childId}
          onClick={onArtworkClick}
          onDelete={onArtworkDelete}
        />
      ))}
    </div>
  )
}
