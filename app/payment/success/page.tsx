"use client"
import { useEffect, useState } from 'react'

export default function PaymentSuccess(){
  const [status, setStatus] = useState<'pending'|'ok'|'error'>('pending')
  const [msg, setMsg] = useState<string>('Unlocking your premium access...')

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch('/api/payment/unlock', { method: 'POST' })
        if(res.ok){
          setStatus('ok')
          setMsg('Premium unlocked for 1 month. Redirecting...')
          setTimeout(()=>{ window.location.href = '/' }, 1200)
        } else {
          const j = await res.json().catch(()=>({error:'Unlock failed. Please sign in first.'}))
          setStatus('error')
          setMsg(j.error || 'Unlock failed. Please sign in first.')
        }
      } catch {
        setStatus('error')
        setMsg('Unable to unlock premium. Please try again.')
      }
    }
    run()
  }, [])

  return (
    <div className="card" style={{maxWidth:560, margin:'0 auto'}}>
      <h1 className="title">Payment success</h1>
      <p className={status==='ok' ? 'success' : status==='error' ? 'error' : 'subtitle'}>{msg}</p>
    </div>
  )
}
