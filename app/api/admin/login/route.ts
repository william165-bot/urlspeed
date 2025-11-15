import { NextResponse } from 'next/server'
import { z } from 'zod'
import { setAdminCookie } from '@/src/lib/auth'

const schema = z.object({ username: z.string().min(1), password: z.string().min(1) })

export async function POST(req: Request){
  try{
    const body = await req.json()
    const { username, password } = schema.parse(body)
    if(username === 'nethunter' && password === 'cbtpratice@nethunter'){
      setAdminCookie()
      return NextResponse.json({ ok: true })
    }
    return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 })
  }catch(err:any){
    if(err?.name === 'ZodError'){
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
