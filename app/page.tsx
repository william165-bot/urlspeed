import Link from 'next/link'
import { getAuthUser } from '@/src/lib/auth'
import { isPremiumActive } from '@/src/lib/store'

export default function HomePage() {
  const user = getAuthUser()
  if (!user) {
    return (
      <div className="grid grid-2">
        <div className="card">
          <h1 className="title">Welcome to Nethunt</h1>
          <p className="subtitle">Sign up with your Gmail to start your 1‑day free trial and access our embedded URL extractor.</p>
          <div style={{display:'flex',gap:12}}>
            <Link href="/signup" className="btn btn-primary">Get started</Link>
            <Link href="/signin" className="btn">I already have an account</Link>
          </div>
        </div>
        <div className="card">
          <p className="badge">Trial + Premium access</p>
          <ul style={{marginTop:12,color:'#cbd5e1'}}>
            <li>• Gmail-only sign up</li>
            <li>• 1-day free trial</li>
            <li>• Premium for 1 month via Flutterwave</li>
            <li>• Admin can grant/revoke premium</li>
          </ul>
        </div>
      </div>
    )
  }

  const access = isPremiumActive(user)
  return (
    <div className="grid">
      {access ? (
        <>
          <h1 className="title">Extractor</h1>
          <p className="subtitle">Securely embedded. If it doesn’t display due to site restrictions, open directly in a new tab.</p>
          <div className="embedWrap">
            <iframe className="embed" src="https://getindevice.com/" allowFullScreen />
          </div>
          <div style={{marginTop:12}}>
            <a className="link" href="https://getindevice.com/" target="_blank">Open in a new tab</a>
          </div>
        </>
      ) : (
        <div className="card">
          <h1 className="title">Premium required</h1>
          <p className="subtitle">Your free trial has ended. Please upgrade to continue using Nethunt.</p>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <a className="btn btn-primary" href="https://flutterwave.com/pay/7k8wh62jmtzh" target="_blank" rel="noopener noreferrer">Make payment</a>
            <Link className="btn" href="/payment/success">I’ve paid – unlock now</Link>
            <Link className="btn" href="/pricing">See premium options</Link>
          </div>
        </div>
      )}
    </div>
  )
}
