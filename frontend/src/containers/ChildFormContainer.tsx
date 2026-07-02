import { useState, useEffect, type FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import type { RootState } from '../reducers'
import { fetchChild, createChild, updateChild } from '../actions/childrenActions'
import ImagePreview from '../components/ImagePreview'

const GENDER_OPTIONS = [
  { value: 'not_specified', label: '未設定' },
  { value: 'male',          label: '男の子' },
  { value: 'female',        label: '女の子' },
  { value: 'other',         label: 'その他' },
]

export default function ChildFormContainer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)

  const { current: child, loading, error } = useSelector((state: RootState) => state.children)

  const [name, setName]       = useState('')
  const [birthday, setBirthday] = useState('')
  const [gender, setGender]   = useState('not_specified')
  const [iconFile, setIconFile] = useState<File | null>(null)

  // 編集時: ストアからこどものデータを取得して初期値にセット
  useEffect(() => {
    if (isEdit && id) {
      dispatch(fetchChild(Number(id)) as any)
    }
  }, [dispatch, id, isEdit])

  useEffect(() => {
    if (isEdit && child && child.id === Number(id)) {
      setName(child.name)
      setBirthday(child.birthday)
      setGender(child.gender)
    }
  }, [child, id, isEdit])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('child[name]', name)
    formData.append('child[birthday]', birthday)
    formData.append('child[gender]', gender)
    if (iconFile) formData.append('child[icon]', iconFile)

    let result: any
    if (isEdit && id) {
      result = await (dispatch(updateChild(Number(id), formData) as any))
    } else {
      result = await (dispatch(createChild(formData) as any))
    }

    if (result) navigate('/')
  }

  return (
    <div className="form-container">
      <div className="page-header">
        <h2 className="page-title">{isEdit ? '👤 こどもを編集' : '👶 こどもを追加'}</h2>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>← 戻る</button>
      </div>

      {error && <div className="error-box">{error}</div>}

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">アイコン写真</label>
            {/* ImagePreview: ストアの icon_url を defaultSrc として受け取る */}
            <ImagePreview
              defaultSrc={isEdit ? (child?.icon_url ?? null) : null}
              onChange={setIconFile}
            />
          </div>

          <div className="form-group">
            <label className="form-label">お名前 *</label>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="名前を入力"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">誕生日 *</label>
            <input
              type="date"
              className="form-input"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">性別</label>
            <select
              className="form-input form-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              {GENDER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '保存中...' : (isEdit ? '更新する' : '登録する')}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
              キャンセル
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
