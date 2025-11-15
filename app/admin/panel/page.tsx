"use client"
import useSWR from 'swr'
import { useState } from 'react'

const fetcher = (url: string) => fetch(url).then(r=>r.json())

export default function AdminPanel(){
  const { data, error, mutate } = useSWR('/api/admin/users', fetcher)
  const [email, setEmail] = useState('')

  const grant = async (target: string) => {
    await fetch('/api/admin/grant', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email: target }) })
    mutate()
  }
  const revoke = async (target: string) => {
    await fetch('/api/admin/revoke', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email: target }) })
    mutate()
  }

  if(error) return <div className="error">Failed to load</div>
  if(!data) return <div className="subtitle">Loading users...</div>

  return (
    <div className="grid">
      <div className="card">
        <h1 className="title">Admin panel</h1>
        <p className="subtitle">Grant or revoke premium for users.</p>
        <div style={{display:'flex',gap:8, margin:'12px 0'}}>
          <input className="input" placeholder="user@gmail.com" value={email} onChange={e=>setEmail(e.target.value)} />
          <button className="btn btn-primary" onClick={()=>grant(email)}>Grant 1 month</button>
          <button className="btn" onClick={()=>revoke(email)}>Revoke</button>
        </div>
        <table className="list">
          <thead>
            <tr>
              <th>Email</th>
              <th>Created</th>
              <th>Trial until</th>
              <th>Premium until</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((u:any)=> (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>{new Date(u.createdAt).toLocaleString()}</td>
                <td>{new Date(u.trialExpiresAt).toLocaleString()}</td>
                <td>{u.premiumExpiresAt ? new Date(u.premiumExpiresAt).toLocaleString() : '-'}</td>
                <td>
                  <button className="btn" onClick={()=>grant(u.email)} style={{marginRight:8}}>Grant</button>
                  <button className="btn" onClick={()=>revoke(u.email)}>Revoke</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
