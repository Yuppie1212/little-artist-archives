import { useState, type FormEvent } from 'react'
import type { SignupParams } from '../apis/authApi'

interface Props {
  onSubmit: (params: SignupParams) => void
  onSwitchToLogin: () => void
  loading: boolean
  error: string | null
}

export default function SignupForm({ onSubmit, onSwitchToLogin, loading, error }: Props) {
  const [form, setForm] = useState<SignupParams>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const handleChange = (field: keyof SignupParams) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <div className="auth-card">
      <div className="auth-icon">🌸</div>
      <h1 className="auth-title">新規登録</h1>
      <p className="auth-subtitle">アカウントを作って始めよう</p>

      {error && <p style={{ color: 'var(--accent-pink)', marginBottom: '1rem' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">お名前</label>
          <input
            type="text"
            className="form-input"
            value={form.name}
            onChange={handleChange('name')}
            placeholder="山田 花子"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">メールアドレス</label>
          <input
            type="email"
            className="form-input"
            value={form.email}
            onChange={handleChange('email')}
            placeholder="example@mail.com"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">パスワード</label>
          <input
            type="password"
            className="form-input"
            value={form.password}
            onChange={handleChange('password')}
            placeholder="6文字以上"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">パスワード（確認）</label>
          <input
            type="password"
            className="form-input"
            value={form.password_confirmation}
            onChange={handleChange('password_confirmation')}
            placeholder="もう一度入力"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
          {loading ? '登録中...' : '登録する'}
        </button>
      </form>

      <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#888' }}>
        すでにアカウントをお持ちの方は{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}
        >
          ログイン
        </button>
      </p>
    </div>
  )
}
