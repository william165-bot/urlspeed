"use client"
import { useState } from 'react'

export default function AdminLogin(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setLoading(true)
    try{
      const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ username, password }) })
      if(res.ok){
        window.location.href = '/admin/panel'
      } else {
        const j = await res.json().catch(()=>({error:'Login failed'}))
        setMessage(j.error || 'Login failed')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid">
      <div className="card" style={{maxWidth:480, margin:'0 auto'}}>
        <h1 className="title">Admin login</h1>
        <form onSubmit={submit} className="grid" style={{gap:12}}>
          <input className="input" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
          <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          {message && <div className="error">{message}</div>}
          <button className="btn btn-primary" disabled={loading}>{loading ? 'Checking...' : 'Login'}</button>
        </form>
      </div>
    </div>
  )
}
