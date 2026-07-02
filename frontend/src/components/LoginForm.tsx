import { useState, type FormEvent } from 'react'

interface Props {
  onSubmit: (email: string, password: string) => void
  onSwitchToSignup: () => void
  loading: boolean
  error: string | null
}

export default function LoginForm({ onSubmit, onSwitchToSignup, loading, error }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(email, password)
  }

  return (
    <div className="auth-card">
      <div className="auth-icon">🎨</div>
      <h1 className="auth-title">こどもの作品アーカイブ</h1>
      <p className="auth-subtitle">大切な思い出を残そう</p>

      {error && <p style={{ color: 'var(--accent-pink)', marginBottom: '1rem' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">メールアドレス</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">パスワード</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワードを入力"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'ログイン中...' : 'ログイン'}
        </button>
      </form>

      <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#888' }}>
        アカウントをお持ちでない方は{' '}
        <button
          type="button"
          onClick={onSwitchToSignup}
          style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}
        >
          新規登録
        </button>
      </p>
    </div>
  )
}
