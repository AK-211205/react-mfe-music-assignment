// import React, { useMemo, useState } from 'react'
// import { SongsProvider, useSongs } from './store'
// import { initialSongs } from './data'
// import type { Song } from './types'
// import { makeId } from './utils'
// import './styles.css'

// type Role = 'admin' | 'user'
// type Props = { role?: Role }

// const Controls: React.FC<{ role?: Role }> = ({ role }) => {
//   const { dispatch } = useSongs()
//   const [form, setForm] = useState({ title: '', artist: '', album: '' })
//   if (role !== 'admin') return null

//   return (
//     <div className="controls">
//       <input placeholder="Title" value={form.title} onChange={e=>setForm(f=>({...f, title:e.target.value}))}/>
//       <input placeholder="Artist" value={form.artist} onChange={e=>setForm(f=>({...f, artist:e.target.value}))}/>
//       <input placeholder="Album" value={form.album} onChange={e=>setForm(f=>({...f, album:e.target.value}))}/>
//       <button onClick={()=>{
//         if(!form.title || !form.artist || !form.album) return
//         const song: Song = { id: makeId(), ...form }
//         dispatch({ type: 'ADD', payload: song })
//         setForm({ title:'', artist:'', album:'' })
//       }}>Add</button>
//     </div>
//   )
// }

// const List: React.FC<{
//   role?: Role
//   filterKey: 'title'|'artist'|'album'
//   q: string
//   sortKey: 'title'|'artist'|'album'
//   groupBy?: 'title'|'artist'|'album'
// }> = ({ role, filterKey, q, sortKey, groupBy }) => {
//   const { songs, dispatch } = useSongs()

//   // filter + sort using Array.filter and Array.sort
//   const filtered = useMemo(() => {
//     const needle = q.trim().toLowerCase()
//     const arr = songs
//       .filter(s => s[filterKey].toLowerCase().includes(needle)) // filter
//       .sort((a,b) => a[sortKey].localeCompare(b[sortKey]))      // sort
//     return arr
//   }, [songs, filterKey, q, sortKey])

//   if (groupBy) {
//     // reduce to map of groups
//     const groups = filtered.reduce<Record<string, Song[]>>((acc, s) => {
//       (acc[s[groupBy]] ||= []).push(s)
//       return acc
//     }, {}) // reduce

//     return (
//       <div>
//         {Object.entries(groups).map(([key, list]) => (
//           <div className="group" key={key}>
//             <h3 style={{marginTop:0}}>{groupBy}: {key} ({list.length})</h3>
//             {list.map(s => (
//               <div key={s.id} className="row">
//                 <span><b>{s.title}</b> — {s.artist} · <i>{s.album}</i></span>
//                 {role==='admin' && <button onClick={()=>dispatch({type:'DELETE', payload:{id:s.id}})}>Delete</button>}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     )
//   }

//   return (
//     <div className="list">
//       {filtered.map(s => (
//         <div key={s.id} className="row">
//           <span><b>{s.title}</b> — {s.artist} · <i>{s.album}</i></span>
//           {role==='admin' && <button onClick={()=>dispatch({type:'DELETE', payload:{id:s.id}})}>Delete</button>}
//         </div>
//       ))}
//     </div>
//   )
// }

// const LibraryInner: React.FC<{ role?: Role }> = ({ role }) => {
//   const [q, setQ] = useState('')
//   const [filterKey, setFilterKey] = useState<'title'|'artist'|'album'>('title')
//   const [sortKey, setSortKey] = useState<'title'|'artist'|'album'>('title')
//   const [groupBy, setGroupBy] = useState<undefined|'title'|'artist'|'album'>(undefined)

//   return (
//     <div className="wrap">
//       <h2>Music Library</h2>
//       <Controls role={role} />
//       <div className="controls">
//         <input placeholder="Search..." value={q} onChange={e=>setQ(e.target.value)} />
//         <select value={filterKey} onChange={e=>setFilterKey(e.target.value as any)}>
//           <option value="title">Filter by Title</option>
//           <option value="artist">Filter by Artist</option>
//           <option value="album">Filter by Album</option>
//         </select>
//         <select value={sortKey} onChange={e=>setSortKey(e.target.value as any)}>
//           <option value="title">Sort by Title</option>
//           <option value="artist">Sort by Artist</option>
//           <option value="album">Sort by Album</option>
//         </select>
//         <select value={groupBy ?? ''} onChange={e=>setGroupBy((e.target.value || undefined) as any)}>
//           <option value="">No Grouping</option>
//           <option value="title">Group by Title</option>
//           <option value="artist">Group by Artist</option>
//           <option value="album">Group by Album</option>
//         </select>
//       </div>
//       <List role={role} q={q} filterKey={filterKey} sortKey={sortKey} groupBy={groupBy} />
//     </div>
//   )
// }

// const MusicLibrary: React.FC<Props> = ({ role = 'user' }) => {
//   return (
//     <SongsProvider initial={initialSongs}>
//       <LibraryInner role={role} />
//     </SongsProvider>
//   )
// }

// export default MusicLibrary

import React, { useMemo, useState } from 'react'
import type { Song } from './types'
import { SongsProvider, useSongs } from './store'
import { initialSongs } from './data'
import './styles.css'

type Role = 'admin' | 'user'
type Props = {
  role?: Role
  songs?: Song[]
  onAdd?: (d: Omit<Song,'id'>) => void
  onDelete?: (id: string) => void
}

const AddForm: React.FC<{ onSubmit:(d: Omit<Song,'id'>)=>void }> = ({ onSubmit }) => {
  const [form, setForm] = useState({ title:'', artist:'', album:'' })
  return (
    <>
      <input placeholder="Title"  value={form.title}  onChange={e=>setForm(f=>({...f, title:e.target.value}))}/>
      <input placeholder="Artist" value={form.artist} onChange={e=>setForm(f=>({...f, artist:e.target.value}))}/>
      <input placeholder="Album"  value={form.album}  onChange={e=>setForm(f=>({...f, album:e.target.value}))}/>
      <button onClick={()=>{
        if(!form.title || !form.artist || !form.album) return
        onSubmit({ title: form.title, artist: form.artist, album: form.album })
        setForm({ title:'', artist:'', album:'' })
      }}>Add</button>
    </>
  )
}

const ExternalUI: React.FC<{ role?: Role; songs: Song[]; onAdd:(d:Omit<Song,'id'>)=>void; onDelete:(id:string)=>void }> =
({ role, songs, onAdd, onDelete }) => {
  const [q, setQ] = useState(''), [filterKey, setFilterKey] = useState<'title'|'artist'|'album'>('title')
  const [sortKey, setSortKey]   = useState<'title'|'artist'|'album'>('title')
  const [groupBy, setGroupBy]   = useState<undefined|'title'|'artist'|'album'>(undefined)

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return songs
      .filter(s => s[filterKey].toLowerCase().includes(needle))
      .sort((a,b)=>a[sortKey].localeCompare(b[sortKey]))
  }, [songs, filterKey, q, sortKey])

  return (
    <div className="wrap">
      <h2>Music Library</h2>
      {role==='admin' && <div className="controls"><AddForm onSubmit={onAdd} /></div>}
      <div className="controls">
        <input placeholder="Search..." value={q} onChange={e=>setQ(e.target.value)} />
        <select value={filterKey} onChange={e=>setFilterKey(e.target.value as any)}>
          <option value="title">Filter by Title</option>
          <option value="artist">Filter by Artist</option>
          <option value="album">Filter by Album</option>
        </select>
        <select value={sortKey} onChange={e=>setSortKey(e.target.value as any)}>
          <option value="title">Sort by Title</option>
          <option value="artist">Sort by Artist</option>
          <option value="album">Sort by Album</option>
        </select>
        <select value={groupBy ?? ''} onChange={e=>setGroupBy((e.target.value||undefined) as any)}>
          <option value="">No Grouping</option>
          <option value="title">Group by Title</option>
          <option value="artist">Group by Artist</option>
          <option value="album">Group by Album</option>
        </select>
      </div>

      {groupBy ? (
        <div>
          {Object.entries(filtered.reduce<Record<string, Song[]>>((acc, s) => {
            (acc[s[groupBy!]] ||= []).push(s); return acc
          }, {})).map(([key, list]) => (
            <div className="group" key={key}>
              <h3 style={{marginTop:0}}>{groupBy}: {key} ({list.length})</h3>
              {list.map(s => (
                <div key={s.id} className="row">
                  <span><b>{s.title}</b> — {s.artist} · <i>{s.album}</i></span>
                  {role==='admin' && <button onClick={()=>onDelete(s.id)}>Delete</button>}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="list">
          {filtered.map(s => (
            <div key={s.id} className="row">
              <span><b>{s.title}</b> — {s.artist} · <i>{s.album}</i></span>
              {role==='admin' && <button onClick={()=>onDelete(s.id)}>Delete</button>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/** Fallback when remote runs standalone on :5174 */
const InternalUI: React.FC<{ role?: Role }> = ({ role }) => {
  const { songs, dispatch } = useSongs()
  const [q, setQ] = useState(''), [filterKey, setFilterKey] = useState<'title'|'artist'|'album'>('title')
  const [sortKey, setSortKey]   = useState<'title'|'artist'|'album'>('title')
  const [groupBy, setGroupBy]   = useState<undefined|'title'|'artist'|'album'>(undefined)

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return songs
      .filter(s => s[filterKey].toLowerCase().includes(needle))
      .sort((a,b)=>a[sortKey].localeCompare(b[sortKey]))
  }, [songs, filterKey, q, sortKey])

  return (
    <div  className="card library-card">
      <h2>Music Library</h2>
      {role==='admin' && (
        <div className="controls">
          <AddForm onSubmit={(d)=>dispatch({ type:'ADD', payload: { id: (crypto as any).randomUUID?.() ?? String(Date.now()), ...d } as Song })} />
        </div>
      )}
      {groupBy ? (
        <div>
          {Object.entries(filtered.reduce<Record<string, Song[]>>((acc, s) => {
            (acc[s[groupBy!]] ||= []).push(s); return acc
          }, {})).map(([key, list]) => (
            <div className="group" key={key}>
              <h3 style={{marginTop:0}}>{groupBy}: {key} ({list.length})</h3>
              {list.map(s => (
                <div key={s.id} className="row">
                  <span><b>{s.title}</b> — {s.artist} · <i>{s.album}</i></span>
                  {role==='admin' && <button onClick={()=>dispatch({type:'DELETE', payload:{ id:s.id }})}>Delete</button>}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="list">
          {filtered.map(s => (
            <div key={s.id} className="row">
              <span><b>{s.title}</b> — {s.artist} · <i>{s.album}</i></span>
              {role==='admin' && <button onClick={()=>dispatch({type:'DELETE', payload:{ id:s.id }})}>Delete</button>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const MusicLibrary: React.FC<Props> = ({ role = 'user', songs, onAdd, onDelete }) => {
  console.log('[music-lib] props seen:', {
    role,
    songsLen: Array.isArray(songs) ? songs.length : undefined,
    hasOnAdd: typeof onAdd === 'function',
    hasOnDelete: typeof onDelete === 'function'
  });

  // If container passes props, always use them
  if (Array.isArray(songs) && typeof onAdd === 'function' && typeof onDelete === 'function') {
    return <ExternalUI role={role} songs={songs} onAdd={onAdd} onDelete={onDelete} />;
  }

  // If running standalone (directly on :5174), show internal demo store
  return (
    <SongsProvider initial={initialSongs}>
      <InternalUI role={role} />
    </SongsProvider>
  );
};


export default MusicLibrary
