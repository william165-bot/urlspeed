import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

export type User = {
  id: string
  email: string
  passwordHash: string
  createdAt: string
  trialExpiresAt: string
  premiumExpiresAt?: string | null
}

export type Payment = {
  id: string
  userId: string
  amount: number
  createdAt: string
  source: 'flutterwave' | 'admin'
}

export type DB = {
  users: User[]
  payments: Payment[]
}

const dataDir = path.join(process.cwd(), 'data')
const dbFile = path.join(dataDir, 'db.json')

function ensureDB() {
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true })
  }
  if (!existsSync(dbFile)) {
    const initial: DB = { users: [], payments: [] }
    writeFileSync(dbFile, JSON.stringify(initial, null, 2), 'utf8')
  }
}

function load(): DB {
  try {
    ensureDB()
    const raw = readFileSync(dbFile, 'utf8')
    return JSON.parse(raw) as DB
  } catch {
    return { users: [], payments: [] }
  }
}

function save(db: DB) {
  try {
    ensureDB()
    writeFileSync(dbFile, JSON.stringify(db, null, 2), 'utf8')
  } catch {
    // read-only FS: ignore persist errors; best-effort in-memory not maintained here
  }
}

export function getUserByEmail(email: string): User | undefined {
  const db = load()
  return db.users.find(u => u.email.toLowerCase() === email.toLowerCase())
}

export function listUsers(): User[] {
  const db = load()
  return db.users.slice().sort((a,b) => a.createdAt.localeCompare(b.createdAt))
}

export function createUser(email: string, passwordHash: string): User {
  const db = load()
  const now = new Date()
  const trial = new Date(now.getTime() + 24*60*60*1000)
  const user: User = {
    id: crypto.randomUUID(),
    email,
    passwordHash,
    createdAt: now.toISOString(),
    trialExpiresAt: trial.toISOString(),
    premiumExpiresAt: null
  }
  db.users.push(user)
  save(db)
  return user
}

export function setPremiumMonths(email: string, months = 1) {
  const db = load()
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (!user) return
  const now = new Date()
  const current = user.premiumExpiresAt ? new Date(user.premiumExpiresAt) : now
  const base = current > now ? current : now
  const next = new Date(base)
  next.setMonth(base.getMonth() + months)
  user.premiumExpiresAt = next.toISOString()
  save(db)
}

export function revokePremium(email: string) {
  const db = load()
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (!user) return
  user.premiumExpiresAt = new Date(0).toISOString()
  save(db)
}

export function recordPayment(userId: string, amount: number, source: Payment['source']) {
  const db = load()
  const payment: Payment = {
    id: crypto.randomUUID(),
    userId,
    amount,
    source,
    createdAt: new Date().toISOString()
  }
  db.payments.push(payment)
  save(db)
}

export function isPremiumActive(user: User): boolean {
  const now = new Date()
  const trialOk = new Date(user.trialExpiresAt) > now
  const premiumOk = user.premiumExpiresAt ? new Date(user.premiumExpiresAt) > now : false
  return trialOk || premiumOk
}
