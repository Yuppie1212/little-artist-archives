import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import type { RootState } from '../reducers'
import { fetchArtwork, deleteArtwork } from '../actions/artworksActions'
import PhotoSlider from '../components/PhotoSlider'

export default function ArtworkDetailContainer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { childId, id } = useParams<{ childId: string; id: string }>()
  const cid = Number(childId)
  const aid = Number(id)

  const { current: artwork, loading, error } = useSelector((state: RootState) => state.artworks)

  useEffect(() => {
    if (!cid || !aid) return
    dispatch(fetchArtwork(cid, aid) as any)
  }, [dispatch, cid, aid])

  const handleDelete = () => {
    if (!artwork) return
    if (confirm(`「${artwork.title}」を削除しますか？`)) {
      dispatch(deleteArtwork(cid, aid) as any)
      navigate(`/children/${cid}`)
    }
  }

  if (loading) {
    return (
      <div className="empty-state">
        <span className="empty-icon" style={{ animation: 'none' }}>⏳</span>
        <p>読み込み中...</p>
      </div>
    )
  }
  if (error) return <div className="error-box">{error}</div>
  if (!artwork) return null

  return (
    <div className="artwork-detail">
      <div className="artwork-detail-actions">
        <button className="btn btn-secondary" onClick={() => navigate(`/children/${cid}`)}>
          ← 戻る
        </button>
        <a href={`/children/${cid}/artworks/${aid}/edit`} className="btn btn-secondary">
          編集
        </a>
        <button className="btn btn-danger" onClick={handleDelete}>
          削除
        </button>
      </div>

      <h2 className="artwork-detail-title" style={{ marginTop: '1.5rem' }}>{artwork.title}</h2>
      <p className="artwork-detail-date">{artwork.drawn_at}</p>

      {/* PhotoSlider: Storeの photo_urls を受け取って表示 */}
      <PhotoSlider photos={artwork.photo_urls} />

      {artwork.what_drawn && (
        <div className="detail-section detail-section--child">
          <p className="detail-label">描いたもの</p>
          <p className="detail-content">{artwork.what_drawn}</p>
        </div>
      )}
      {artwork.why_drawn && (
        <div className="detail-section detail-section--child">
          <p className="detail-label">描いた理由</p>
          <p className="detail-content">{artwork.why_drawn}</p>
        </div>
      )}
      {artwork.child_comment && (
        <div className="detail-section detail-section--child">
          <p className="detail-label">こどものコメント</p>
          <p className="detail-content">{artwork.child_comment}</p>
        </div>
      )}
      {artwork.parent_memo && (
        <div className="detail-section detail-section--parent">
          <p className="detail-label">親メモ</p>
          <p className="detail-content">{artwork.parent_memo}</p>
        </div>
      )}
    </div>
  )
}
