import React, { Suspense } from 'react'
import { AuthProvider, useAuth } from './auth'
import { SongsProvider, useSongsStore } from './songsStore'
import './styles.css'

const LoginModal: React.FC = () => {
  const { loginWithCredentials, login } = useAuth()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
    const [showPwd, setShowPwd] = React.useState(false) 
  const [error, setError] = React.useState<string | null>(null)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const ok = loginWithCredentials(email, password)
    if (!ok) setError('Invalid email or password')
  }

  return (
    <div className="login-backdrop">
      <div className="card login-card">
        <h2 style={{ marginBottom: 6 }}>Welcome</h2>
        <p className="muted" style={{ marginTop: 0 }}>Sign in to continue</p>

        <form onSubmit={submit} className="login-form">
          <input
            type="email"
            autoComplete="username"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <div className="input-with-icon">
            <input
              type={showPwd ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <button
              type="button"
              className="field-eye"
              aria-label={showPwd ? 'Hide password' : 'Show password'}
              onClick={()=>setShowPwd(v=>!v)}
              title={showPwd ? 'Hide password' : 'Show password'}
            >
              {showPwd ? (
                /* eye-off */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M10.58 10.58A3 3 0 0012 15a3 3 0 002.42-4.42M9.88 5.1A10.8 10.8 0 0121 12c-1.62 2.86-4.9 6-9 6a9.9 9.9 0 01-3.3-.57M5.1 9.88A10.8 10.8 0 013 12c1.21 2.14 3.21 4.35 6 5.43" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                /* eye */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              )}
            </button>
          </div>

          {error && (
            <div className="card" style={{ margin: 0, background: 'rgba(255,0,0,.08)', borderColor: '#ef4444' }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn-login" style={{ width: '100%' }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  )

}

const LoginGate: React.FC = () => {
  const { role } = useAuth()
  return role ? null : <LoginModal />
}

const MusicLibrary = React.lazy(() => import('music_lib/MusicLibrary'))

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: any }> {
  constructor(props: any) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(error: any) { return { error } }
  render() { return this.state.error
    ? <div className="card" style={{ borderColor: '#f66' }}>
        <h3 style={{ marginTop: 0 }}>Micro Frontend failed to load</h3>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{String(this.state.error)}</pre>
      </div>
    : this.props.children }
}

const Toolbar: React.FC = () => {
  const { role, login, logout } = useAuth()
  return (
    <div className="toolbar">
      <h1>Your Music Shelf</h1>
      <div className="spacer" />
      {role
        ? (<><span>Role: <code>{role}</code></span><button onClick={logout}>Logout</button></>)
        : (<><button onClick={()=>login('user')}>Login as User</button><button onClick={()=>login('admin')}>Login as Admin</button></>)
      }
    </div>
  )
}



const Home: React.FC = () => {
  const { role } = useAuth()
  const { songs, add, remove } = useSongsStore()
  return (
    <div className="container">
      <div className="card" style={{ marginBottom: 12 }}>
        <b>Songs in playlist :</b>  {songs.length}
      </div>
      {/* <LocalQuickAdd /> */}
      <ErrorBoundary>
        <Suspense fallback={<div className="card">Loading Music Library…</div>}>
          <MusicLibrary role={role ?? 'user'} songs={songs} onAdd={add} onDelete={remove} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <SongsProvider>
        <Toolbar />
        <Home />
         <LoginGate />
      </SongsProvider>
    </AuthProvider>
  )
}
