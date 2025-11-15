import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import type { User } from './store'
import { getUserByEmail } from './store'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'

export type JWTPayload = {
  email: string
}

export function signUserToken(payload: JWTPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' })
}

export function verifyUserToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

export function getAuthUser(): User | null {
  const store = cookies()
  const token = store.get('token')?.value
  if (!token) return null
  const payload = verifyUserToken(token)
  if (!payload) return null
  const user = getUserByEmail(payload.email)
  return user || null
}

export function setUserCookie(email: string) {
  const token = signUserToken({ email })
  const store = cookies()
  store.set('token', token, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60*60*24*30 })
}

export function clearUserCookie() {
  const store = cookies()
  store.set('token', '', { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 0 })
}

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'admin-secret'

export function setAdminCookie() {
  const token = jwt.sign({ role: 'admin' }, ADMIN_SECRET, { expiresIn: '1d' })
  const store = cookies()
  store.set('admin', token, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60*60*24 })
}

export function isAdmin(): boolean {
  const store = cookies()
  const token = store.get('admin')?.value
  if (!token) return false
  try {
    jwt.verify(token, ADMIN_SECRET)
    return true
  } catch {
    return false
  }
}

export function clearAdminCookie() {
  const store = cookies()
  store.set('admin', '', { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 0 })
}
