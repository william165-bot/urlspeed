import './globals.css'
import Link from 'next/link'
import { getAuthUser } from '@/src/lib/auth'

export const metadata = {
  title: 'Nethunt URL Extractor',
  description: 'All-in-one URL downloader gateway with trial and premium access.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const user = getAuthUser()
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="logo">nethunt <span className="tag">url extractor</span></div>
          <nav className="nav" style={{display:'flex',gap:8,alignItems:'center'}}>
            <Link href="/">Home</Link>
            <Link href="/pricing">Premium</Link>
            {user ? (
              <form action="/api/auth/logout" method="post">
                <button type="submit">Logout</button>
              </form>
            ) : (
              <>
                <Link href="/signin">Sign in</Link>
                <Link href="/signup">Sign up</Link>
              </>
            )}
            <Link href="/admin/login">Admin</Link>
          </nav>
        </header>
        <main className="container">{children}</main>
        <footer className="footer">© {new Date().getFullYear()} Nethunt. All rights reserved.</footer>
      </body>
    </html>
  )
}
