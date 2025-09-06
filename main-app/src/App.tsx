// import React, { Suspense } from 'react'
// import { AuthProvider, useAuth } from './auth'

// // Federated import resolved at runtime
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// const MusicLibrary = React.lazy(() => import('music_lib/MusicLibrary'))

// const Toolbar: React.FC = () => {
//   const { role, login, logout } = useAuth()
//   return (
//     <div className="toolbar">
//       <b>Main App (Container)</b>
//       <div className="spacer"></div>
//       {role ? (
//         <>
//           <span>Role: <code>{role}</code></span>
//           <button onClick={logout}>Logout</button>
//         </>
//       ) : (
//         <>
//           <button onClick={() => login('user')}>Login as User</button>
//           <button onClick={() => login('admin')}>Login as Admin</button>
//         </>
//       )}
//     </div>
//   )
// }

// const Home: React.FC = () => {
//   const { role } = useAuth()
//   return (
//     <div className="container">
//       <Suspense fallback={<div className="card">Loading Music Library…</div>}>
//         <MusicLibrary role={role ?? 'user'} />
//       </Suspense>
//     </div>
//   )
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <Toolbar />
//       <Home />
//     </AuthProvider>
//   )
// }

// import React, { Suspense } from 'react'
// import { AuthProvider, useAuth } from './auth'

// // @ts-ignore - resolved by Module Federation at runtime
// const MusicLibrary = React.lazy(() => import('music_lib/MusicLibrary'))

// class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: any }> {
//   constructor(props: any) { super(props); this.state = { error: null } }
//   static getDerivedStateFromError(error: any) { return { error } }
//   render() {
//     if (this.state.error) {
//       return (
//         <div className="card" style={{ borderColor: '#f66' }}>
//           <h3 style={{ marginTop: 0 }}>Micro Frontend failed to load</h3>
//           <pre style={{ whiteSpace: 'pre-wrap' }}>{String(this.state.error)}</pre>
//           <p>Open DevTools → Console & Network. Check <code>remoteEntry.js</code> URL and that <b>music-lib</b> is running.</p>
//         </div>
//       )
//     }
//     return this.props.children
//   }
// }

// const Toolbar: React.FC = () => {
//   const { role, login, logout } = useAuth()
//   return (
//     <div className="toolbar">
//       <b>Main App (Container)</b>
//       <div className="spacer" />
//       {role ? (
//         <>
//           <span>Role: <code>{role}</code></span>
//           <button onClick={logout}>Logout</button>
//         </>
//       ) : (
//         <>
//           <button onClick={() => login('user')}>Login as User</button>
//           <button onClick={() => login('admin')}>Login as Admin</button>
//         </>
//       )}
//     </div>
//   )
// }

// const Home: React.FC = () => {
//   const { role } = useAuth()
//   return (
//     <div className="container">
//       <ErrorBoundary>
//         <Suspense fallback={<div className="card">Loading Music Library…</div>}>
//           <MusicLibrary role={role ?? 'user'} />
//         </Suspense>
//       </ErrorBoundary>
//     </div>
//   )
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <Toolbar />
//       <Home />
//     </AuthProvider>
//   )
// }

import React, { Suspense } from 'react'
import { AuthProvider, useAuth } from './auth'
import { SongsProvider, useSongsStore } from './songsStore'
import './styles.css'

const LoginModal: React.FC = () => {
  const { loginWithCredentials, login } = useAuth()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
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
            type="email" autoComplete="username" placeholder="Email"
            value={email} onChange={e=>setEmail(e.target.value)}
          />
          <input
            type="password" autoComplete="current-password" placeholder="Password"
            value={password} onChange={e=>setPassword(e.target.value)}
          />
          {error && <div className="card" style={{ margin: 0, background: 'rgba(255,0,0,.08)', borderColor: '#ef4444' }}>{error}</div>}
          <button type="submit" className="btn-login" style={{ width: '100%' }}>Sign In</button>
        </form>

        {/* (Optional) quick-role buttons for demoing */}
        {/* <div className="login-actions" style={{ marginTop: 10 }}>
          <button className="btn-login" onClick={() => login('user')}>Login as User</button>
          <button className="btn-login" onClick={() => login('admin')}>Login as Admin</button>
        </div> */}
      </div>
    </div>
  )
}

const LoginGate: React.FC = () => {
  const { role } = useAuth()
  return role ? null : <LoginModal />
}

// @ts-ignore – provided by Module Federation at runtime
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
      <b>Main App (Container)</b>
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
        <b>Store debug:</b> songs count = {songs.length}
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
