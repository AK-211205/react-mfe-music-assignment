import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Role = 'admin' | 'user'
type TokenPayload = { sub: string; role: Role; name?: string; iat: number }
type AuthContextValue = {
  role: Role | null
  user: { email: string; name?: string } | null
  login: (role: Role) => void                         
  loginWithCredentials: (email: string, password: string) => boolean
  logout: () => void
}

const TOKEN_KEY = 'auth_token_v1'

const DEMO_USERS: Record<string, { password: string; role: Role; name?: string }> = {
  'admin@demo.com': { password: 'admin123', role: 'admin', name: 'Admin' },
  'user@demo.com':  { password: 'user123',  role: 'user',  name: 'User'  },
}

// --- Fake JWT helpers (base64 payload only) ---
const b64 = (s: string) => btoa(unescape(encodeURIComponent(s)))
const ub64 = (s: string) => decodeURIComponent(escape(atob(s)))

function makeToken(payload: TokenPayload): string {
  const header = b64(JSON.stringify({ alg: 'none', typ: 'JWT' }))
  const body   = b64(JSON.stringify(payload))
  const sig    = 'demo-sign' // not validated; for demo only
  return `${header}.${body}.${sig}`
}

function readToken(): TokenPayload | null {
  const raw = localStorage.getItem(TOKEN_KEY)
  if (!raw) return null
  const parts = raw.split('.')
  if (parts.length < 2) return null
  try { return JSON.parse(ub64(parts[1])) as TokenPayload } catch { return null }
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [payload, setPayload] = useState<TokenPayload | null>(() => readToken())

  useEffect(() => {
    if (payload) localStorage.setItem(TOKEN_KEY, makeToken(payload))
    else localStorage.removeItem(TOKEN_KEY)
  }, [payload])

  const value = useMemo<AuthContextValue>(() => ({
    role: payload?.role ?? null,
    user: payload ? { email: payload.sub, name: payload.name } : null,
    login: (role: Role) => {
      const email = role === 'admin' ? 'admin@demo.com' : 'user@demo.com'
      const name  = role === 'admin' ? 'Admin' : 'User'
      setPayload({ sub: email, role, name, iat: Date.now() })
    },
    loginWithCredentials: (email: string, password: string) => {
      const rec = DEMO_USERS[email.trim().toLowerCase()]
      if (!rec || rec.password !== password) return false
      setPayload({ sub: email.trim().toLowerCase(), role: rec.role, name: rec.name, iat: Date.now() })
      return true
    },

    logout: () => setPayload(null),
  }), [payload])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
