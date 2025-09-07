import React, { createContext, useContext, useEffect, useReducer } from 'react'

export type Song = { id: string; title: string; artist: string; album: string }

type Action =
  | { type: 'ADD'; payload: Omit<Song, 'id'> }
  | { type: 'DELETE'; payload: { id: string } }
  | { type: 'SET'; payload: Song[] }

function reducer(state: Song[], action: Action): Song[] {
  switch (action.type) {
    case 'ADD':
      return [{ id: (crypto as any).randomUUID?.() ?? String(Date.now()), ...action.payload }, ...state]
    case 'DELETE':
      return state.filter(s => s.id !== action.payload.id)
    case 'SET':
      return action.payload
    default:
      return state
  }
}

type Store = { songs: Song[]; add: (d: Omit<Song,'id'>) => void; remove: (id: string) => void }
const SongsContext = createContext<Store | null>(null)

export const SongsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [songs, dispatch] = useReducer(reducer, [], () => {
    const raw = localStorage.getItem('songs_v1')
    return raw ? JSON.parse(raw) as Song[] : [
      { id: '1', title: 'Yellow', artist: 'Coldplay', album: 'Parachutes' },
      { id: '2', title: 'Fix You', artist: 'Coldplay', album: 'X&Y' },
      { id: '3', title: 'Lose Yourself', artist: 'Eminem', album: '8 Mile' },
      { id: '4', title: 'Numb', artist: 'Linkin Park', album: 'Meteora' },
    ]
  })

  useEffect(() => { localStorage.setItem('songs_v1', JSON.stringify(songs)) }, [songs])

  const value: Store = {
    songs,
    add: (d) => dispatch({ type: 'ADD', payload: d }),
    remove: (id) => dispatch({ type: 'DELETE', payload: { id } })
  }
  return <SongsContext.Provider value={value}>{children}</SongsContext.Provider>
}

export const useSongsStore = () => {
  const ctx = useContext(SongsContext)
  if (!ctx) throw new Error('useSongsStore must be used within SongsProvider')
  return ctx
}
