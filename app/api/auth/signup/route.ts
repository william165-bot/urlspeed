import { NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { createUser, getUserByEmail } from '@/src/lib/store'
import { setUserCookie } from '@/src/lib/auth'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export async function POST(req: Request){
  try{
    const body = await req.json()
    const { email, password } = schema.parse(body)
    if(!/^[^@\s]+@gmail\.com$/i.test(email)){
      return NextResponse.json({ error: 'Only @gmail.com emails are allowed' }, { status: 400 })
    }
    const existing = getUserByEmail(email)
    if(existing){
      return NextResponse.json({ error: 'Account already exists. Please sign in.' }, { status: 400 })
    }
    const hash = await bcrypt.hash(password, 10)
    createUser(email, hash)
    setUserCookie(email)
    return NextResponse.json({ ok: true })
  }catch(err:any){
    if(err?.name === 'ZodError'){
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Sign up failed' }, { status: 500 })
  }
}
