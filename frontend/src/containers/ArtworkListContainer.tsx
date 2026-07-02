import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import type { RootState } from '../reducers'
import { fetchArtworks, deleteArtwork } from '../actions/artworksActions'
import { fetchChild } from '../actions/childrenActions'
import ArtworkList from '../components/ArtworkList'

export default function ArtworkListContainer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { childId } = useParams<{ childId: string }>()
  const id = Number(childId)

  const { list, loading, error } = useSelector((state: RootState) => state.artworks)
  const child = useSelector((state: RootState) => state.children.current)

  useEffect(() => {
    if (!id) return
    dispatch(fetchChild(id) as any)
    dispatch(fetchArtworks(id) as any)
  }, [dispatch, id])

  const handleArtworkClick = (artworkId: number) => {
    navigate(`/children/${id}/artworks/${artworkId}`)
  }

  const handleArtworkDelete = (artworkId: number) => {
    dispatch(deleteArtwork(id, artworkId) as any)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>← 戻る</button>
        <h2 style={{ margin: 0 }}>{child?.name ?? '...'} の作品</h2>
        <a href={`/children/${id}/artworks/new`} className="btn btn-primary" style={{ marginLeft: 'auto' }}>
          + 作品を追加
        </a>
      </div>

      <ArtworkList
        artworks={list}
        childId={id}
        loading={loading}
        error={error}
        onArtworkClick={handleArtworkClick}
        onArtworkDelete={handleArtworkDelete}
      />
    </div>
  )
}
