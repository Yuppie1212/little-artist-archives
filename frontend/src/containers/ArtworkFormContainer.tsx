import { useState, useEffect, type FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import type { RootState } from '../reducers'
import { fetchArtwork, createArtwork, updateArtwork } from '../actions/artworksActions'
import MultiImageUpload from '../components/MultiImageUpload'

export default function ArtworkFormContainer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { childId, id } = useParams<{ childId: string; id: string }>()
  const cid = Number(childId)
  const isEdit = Boolean(id)

  const { current: artwork, loading, error } = useSelector((state: RootState) => state.artworks)

  const [title, setTitle]       = useState('')
  const [drawnAt, setDrawnAt]   = useState('')
  const [whatDrawn, setWhatDrawn] = useState('')
  const [whyDrawn, setWhyDrawn]   = useState('')
  const [childComment, setChildComment] = useState('')
  const [parentMemo, setParentMemo]     = useState('')
  const [signedIds, setSignedIds] = useState<string[]>([])

  // 編集時: ストアから作品データを取得して初期値にセット
  useEffect(() => {
    if (isEdit && id) {
      dispatch(fetchArtwork(cid, Number(id)) as any)
    }
  }, [dispatch, cid, id, isEdit])

  useEffect(() => {
    if (isEdit && artwork && artwork.id === Number(id)) {
      setTitle(artwork.title)
      setDrawnAt(artwork.drawn_at)
      setWhatDrawn(artwork.what_drawn ?? '')
      setWhyDrawn(artwork.why_drawn ?? '')
      setChildComment(artwork.child_comment ?? '')
      setParentMemo(artwork.parent_memo ?? '')
      // MultiImageUpload の初期値は existingPhotos prop として渡すので、
      // signedIds は onChange で最初から受け取る
    }
  }, [artwork, id, isEdit])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('artwork[title]', title)
    formData.append('artwork[drawn_at]', drawnAt)
    formData.append('artwork[what_drawn]', whatDrawn)
    formData.append('artwork[why_drawn]', whyDrawn)
    formData.append('artwork[child_comment]', childComment)
    formData.append('artwork[parent_memo]', parentMemo)
    signedIds.forEach((sid) => formData.append('artwork[photos][]', sid))

    let result: any
    if (isEdit && id) {
      result = await (dispatch(updateArtwork(cid, Number(id), formData) as any))
    } else {
      result = await (dispatch(createArtwork(cid, formData) as any))
    }

    if (result) navigate(`/children/${cid}/artworks/${result.id}`)
  }

  // 編集時に既存写真を MultiImageUpload に渡す形式に変換
  // ストアの artwork.photos: { signed_id, url }[] をそのまま使用
  const existingPhotos = isEdit && artwork?.id === Number(id)
    ? artwork.photos
    : []

  return (
    <div className="form-container">
      <div className="page-header">
        <h2 className="page-title">{isEdit ? '🖼️ 作品を編集' : '🎨 作品を追加'}</h2>
        <button className="btn btn-secondary" onClick={() => navigate(`/children/${cid}`)}>
          ← 戻る
        </button>
      </div>

      {error && <div className="error-box">{error}</div>}

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">タイトル *</label>
            <input
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="作品のタイトル"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">制作日 *</label>
            <input
              type="date"
              className="form-input"
              value={drawnAt}
              onChange={(e) => setDrawnAt(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">写真</label>
            {/* MultiImageUpload: ストアの artwork.photos (signed_id+url) を existingPhotos として受け取る */}
            <MultiImageUpload
              existingPhotos={existingPhotos}
              onChange={setSignedIds}
            />
          </div>

          <div className="form-group">
            <label className="form-label">描いたもの</label>
            <input
              type="text"
              className="form-input"
              value={whatDrawn}
              onChange={(e) => setWhatDrawn(e.target.value)}
              placeholder="何を描いたか"
            />
          </div>

          <div className="form-group">
            <label className="form-label">描いた理由</label>
            <input
              type="text"
              className="form-input"
              value={whyDrawn}
              onChange={(e) => setWhyDrawn(e.target.value)}
              placeholder="なぜ描いたか"
            />
          </div>

          <div className="form-group">
            <label className="form-label">こどものコメント</label>
            <textarea
              className="form-input form-textarea"
              value={childComment}
              onChange={(e) => setChildComment(e.target.value)}
              placeholder="こどもが言っていたこと"
            />
          </div>

          <div className="form-group">
            <label className="form-label">親メモ</label>
            <textarea
              className="form-input form-textarea"
              value={parentMemo}
              onChange={(e) => setParentMemo(e.target.value)}
              placeholder="親が残しておきたいメモ"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '保存中...' : (isEdit ? '更新する' : '登録する')}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(`/children/${cid}`)}
            >
              キャンセル
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
