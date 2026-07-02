import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from './reducers'
import { fetchCurrentUser, logout } from './actions/authActions'
import AuthContainer from './containers/AuthContainer'
import ChildrenContainer from './containers/ChildrenContainer'
import ChildFormContainer from './containers/ChildFormContainer'
import ArtworkListContainer from './containers/ArtworkListContainer'
import ArtworkDetailContainer from './containers/ArtworkDetailContainer'
import ArtworkFormContainer from './containers/ArtworkFormContainer'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, initialized } = useSelector((state: RootState) => state.auth)

  if (!initialized) {
    return (
      <div className="empty-state">
        <span className="empty-icon" style={{ animation: 'none' }}>⏳</span>
        <p>読み込み中...</p>
      </div>
    )
  }
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(fetchCurrentUser() as any)
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout() as any)
  }

  return (
    <div>
      {user && (
        <header className="header">
          <div className="header-content">
            <a href="/" className="site-title">🎨 こどもの作品アーカイブ</a>
            <nav className="header-nav">
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--c-text-muted)' }}>
                {user.name}
              </span>
              <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                ログアウト
              </button>
            </nav>
          </div>
        </header>
      )}

      <main className="main-content">
        <Routes>
          {/* 認証 */}
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <AuthContainer />}
          />

          {/* こども一覧 */}
          <Route
            path="/"
            element={<ProtectedRoute><ChildrenContainer /></ProtectedRoute>}
          />

          {/* こどもフォーム（新規 / 編集） */}
          <Route
            path="/children/new"
            element={<ProtectedRoute><ChildFormContainer /></ProtectedRoute>}
          />
          <Route
            path="/children/:id/edit"
            element={<ProtectedRoute><ChildFormContainer /></ProtectedRoute>}
          />

          {/* 作品一覧 */}
          <Route
            path="/children/:childId"
            element={<ProtectedRoute><ArtworkListContainer /></ProtectedRoute>}
          />

          {/* 作品フォーム（新規 / 編集） */}
          <Route
            path="/children/:childId/artworks/new"
            element={<ProtectedRoute><ArtworkFormContainer /></ProtectedRoute>}
          />
          <Route
            path="/children/:childId/artworks/:id/edit"
            element={<ProtectedRoute><ArtworkFormContainer /></ProtectedRoute>}
          />

          {/* 作品詳細 */}
          <Route
            path="/children/:childId/artworks/:id"
            element={<ProtectedRoute><ArtworkDetailContainer /></ProtectedRoute>}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
