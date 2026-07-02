import type { Child } from '../types'

const GENDER_LABELS: Record<string, string> = {
  not_specified: '未設定',
  male: '男の子',
  female: '女の子',
  other: 'その他',
}

interface Props {
  child: Child
  onClick: (id: number) => void
  onDelete: (id: number) => void
}

export default function ChildCard({ child, onClick, onDelete }: Props) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm(`${child.name}を削除しますか？`)) {
      onDelete(child.id)
    }
  }

  return (
    <div className="child-card" onClick={() => onClick(child.id)}>
      <div className="child-icon">
        {child.icon_url ? (
          <img src={child.icon_url} alt={child.name} className="child-avatar" />
        ) : (
          <span className="child-avatar-placeholder">👤</span>
        )}
      </div>

      <h3 className="child-name">{child.name}</h3>

      <div style={{ color: 'var(--c-text-muted)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
        {GENDER_LABELS[child.gender] || child.gender}
      </div>

      <div className="artwork-count">🎨 {child.artworks_count}作品</div>

      <div className="card-actions" style={{ marginTop: '1rem' }}>
        <a
          href={`/children/${child.id}/edit`}
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
