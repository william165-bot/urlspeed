import { NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { getUserByEmail } from '@/src/lib/store'
import { setUserCookie } from '@/src/lib/auth'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export async function POST(req: Request){
  try{
    const body = await req.json()
    const { email, password } = schema.parse(body)
    const user = getUserByEmail(email)
    if(!user){
      return NextResponse.json({ error: 'No account found. Please sign up first.' }, { status: 401 })
    }
    const ok = await bcrypt.compare(password, user.passwordHash)
    if(!ok){
      return NextResponse.json({ error: 'Incorrect email or password' }, { status: 401 })
    }
    setUserCookie(user.email)
    return NextResponse.json({ ok: true })
  }catch(err:any){
    if(err?.name === 'ZodError'){
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Sign in failed' }, { status: 500 })
  }
}
