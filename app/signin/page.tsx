"use client"
import { useState } from 'react'

export default function SignInPage(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setLoading(true)
    try{
      const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ email, password }) })
      if(res.ok){
        window.location.href = '/'
      } else {
        const j = await res.json().catch(()=>({error:'Sign in failed'}))
        setMessage(j.error || 'Sign in failed')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid">
      <div className="card" style={{maxWidth:480, margin:'0 auto'}}>
        <h1 className="title">Sign in</h1>
        <p className="subtitle">Use the Gmail and password you signed up with.</p>
        <form onSubmit={submit} className="grid" style={{gap:12}}>
          <input className="input" type="email" placeholder="you@gmail.com" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
          {message && <div className="error">{message}</div>}
          <button className="btn btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
