import type { Artwork } from '../types'

interface Props {
  artwork: Artwork
  childId: number
  onClick: (id: number) => void
  onDelete: (id: number) => void
}

export default function ArtworkCard({ artwork, childId, onClick, onDelete }: Props) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm(`「${artwork.title}」を削除しますか？`)) {
      onDelete(artwork.id)
    }
  }

  const mainPhoto = artwork.photo_urls[0]

  return (
    <div className="artwork-card" onClick={() => onClick(artwork.id)}>
      <div className="artwork-photo">
        {mainPhoto ? (
          <img src={mainPhoto} alt={artwork.title} />
        ) : (
          <span className="artwork-photo-empty">🎨</span>
        )}
      </div>

      <div className="artwork-info">
        <h3 className="artwork-title">{artwork.title}</h3>
        <p className="artwork-date">{artwork.drawn_at}</p>
      </div>

      <div className="card-actions" style={{ padding: '0 14px 14px' }}>
        <a
          href={`/children/${childId}/artworks/${artwork.id}/edit`}
          className="btn btn-secondary btn-sm"
          onClick={(e) => e.stopPropagation()}
        >
          編集
        </a>
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>
          削除
        </button>
      </div>
    </div>
  )
}
