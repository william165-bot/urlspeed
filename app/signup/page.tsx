"use client"
import { useState } from 'react'

export default function SignUpPage(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    if(!/^[^@\s]+@gmail\.com$/i.test(email)){
      setMessage('Only @gmail.com addresses are allowed')
      return
    }
    if(password.length < 6){
      setMessage('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try{
      const res = await fetch('/api/auth/signup', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ email, password }) })
      if(res.ok){
        window.location.href = '/'
      } else {
        const j = await res.json().catch(()=>({error:'Sign up failed'}))
        setMessage(j.error || 'Sign up failed')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid">
      <div className="card" style={{maxWidth:480, margin:'0 auto'}}>
        <h1 className="title">Create account</h1>
        <p className="subtitle">Use your Gmail to start a 1‑day free trial.</p>
        <form onSubmit={submit} className="grid" style={{gap:12}}>
          <input className="input" type="email" placeholder="you@gmail.com" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
          {message && <div className="error">{message}</div>}
          <button className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  )
}
