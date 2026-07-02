import type { Child } from '../types'
import ChildCard from './ChildCard'

interface Props {
  children: Child[]
  loading: boolean
  error: string | null
  onChildClick: (id: number) => void
  onChildDelete: (id: number) => void
  onAddChild: () => void
}

export default function ChildrenGrid({
  children,
  loading,
  error,
  onChildClick,
  onChildDelete,
  onAddChild,
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
    return (
      <div className="error-box" style={{ textAlign: 'center' }}>{error}</div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">👶 こどもたち</h2>
        <button className="btn btn-primary" onClick={onAddChild}>+ こどもを追加</button>
      </div>

      {children.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">👶</span>
          <p>まだこどもが登録されていません</p>
          <button className="btn btn-primary" onClick={onAddChild}>こどもを追加する</button>
        </div>
      ) : (
        <div className="children-grid">
          {children.map((child) => (
            <ChildCard
              key={child.id}
              child={child}
              onClick={onChildClick}
              onDelete={onChildDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
