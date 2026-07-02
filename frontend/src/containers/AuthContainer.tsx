import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../reducers'
import { login, signup, clearAuthError } from '../actions/authActions'
import type { SignupParams } from '../apis/authApi'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'

export default function AuthContainer() {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state: RootState) => state.auth)
  const [mode, setMode] = useState<'login' | 'signup'>('login')

  const handleLogin = (email: string, password: string) => {
    dispatch(login(email, password) as any)
  }

  const handleSignup = (params: SignupParams) => {
    dispatch(signup(params) as any)
  }

  const switchMode = (next: 'login' | 'signup') => {
    dispatch(clearAuthError())
    setMode(next)
  }

  if (mode === 'signup') {
    return (
      <SignupForm
        onSubmit={handleSignup}
        onSwitchToLogin={() => switchMode('login')}
        loading={loading}
        error={error}
      />
    )
  }

  return (
    <LoginForm
      onSubmit={handleLogin}
      onSwitchToSignup={() => switchMode('signup')}
      loading={loading}
      error={error}
    />
  )
}
